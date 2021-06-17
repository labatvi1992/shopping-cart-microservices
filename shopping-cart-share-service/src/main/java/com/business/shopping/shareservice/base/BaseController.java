package com.business.shopping.shareservice.base;

import com.business.shopping.shareservice.exception.NotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.*;

public class BaseController<T> {

    protected BaseService<T> service;

    public BaseController(BaseService<T> service) {
        this.service = service;
    }

    private BaseResponse createResponse(Exception ex, WebRequest request, HttpStatus status) {
        List<com.business.shopping.shareservice.base.FieldError> errors = new ArrayList<>();
        if (ex instanceof MethodArgumentNotValidException) {
            for (FieldError error : ((MethodArgumentNotValidException) ex).getBindingResult().getFieldErrors()) {
                errors.add(new com.business.shopping.shareservice.base.FieldError(error.getField(), error.getDefaultMessage()));
            }
        }
        return BaseResponse.error(status, ex.getMessage(), errors);
    }

    @ExceptionHandler(NotFoundException.class)
    public final ResponseEntity<BaseResponse> handleNotFoundExceptions(Exception ex, WebRequest request) {
        return new ResponseEntity<>(createResponse(ex, request, HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<BaseResponse> handleAllExceptions(Exception ex, WebRequest request) {
        return new ResponseEntity<>(createResponse(ex, request, HttpStatus.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    protected ResponseEntity<BaseResponse> findAll() {
        return ResponseEntity.ok(BaseResponse.success(service.findAll(service.defaultSort())));
    }

    protected ResponseEntity<BaseResponse> findAll(Map<String, String> params) throws Exception {
        if (params != null && !params.isEmpty()) {
            Page<T> result;
            Sort sortable = null;
            ObjectMapper objectMapper = new ObjectMapper();
            // filter
            GenericSpecificationsBuilder<T> builder = new GenericSpecificationsBuilder<>();
            if (params.containsKey("searchKey")) {
                String searchKey = params.get("searchKey");
                if (!searchKey.isEmpty() && !searchKey.trim().isEmpty()) {
                    List<String> arguments = new ArrayList<>(Collections.singletonList(searchKey));
                    for (String key : service.globalSearchKeys()) {
                        builder.with(key, SearchOperation.LIKE, true, arguments);
                    }
                }
            }
            // advance filter
            if (params.containsKey("searchCriteria")) {
                try {
                    String decodedString = new String(Base64.getDecoder().decode(params.get("searchCriteria")));
                    List<SearchCriteria> searchCriteriaParams = objectMapper.readValue(decodedString, new TypeReference<List<SearchCriteria>>() {});
                    for (SearchCriteria criteria : searchCriteriaParams) {
                        builder.with(criteria);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    throw e;
                }
            }
            Specification<T> searchResult = builder.build();
            if (params.containsKey("sorting")) {
                try {
                    String decodedString = new String(Base64.getDecoder().decode(params.get("sorting")));
                    Sorting sortingParams = objectMapper.readValue(decodedString, Sorting.class);
                    if (sortingParams.direction.equals("ascend")) {
                        sortable = Sort.by(sortingParams.key).ascending();
                    } else {
                        sortable = Sort.by(sortingParams.key).descending();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    throw e;
                }
            }
            // sorting only, no paging
            if (!params.containsKey("paging")) {
                if (searchResult == null || sortable == null) {
                    return findAll();
                }
                return ResponseEntity.ok(BaseResponse.success(service.findAll(searchResult, sortable)));
            } else {
                // sorting and paging
                Pageable pageable;
                try {
                    String decodedString = new String(Base64.getDecoder().decode(params.get("paging")));
                    Paging pagingParams = objectMapper.readValue(decodedString, Paging.class);
                    if (sortable != null) {
                        pageable = PageRequest.of(pagingParams.pageNo, pagingParams.pageSize, sortable);
                    } else {
                        pageable = PageRequest.of(pagingParams.pageNo, pagingParams.pageSize, service.defaultSort());
                    }
                    result = service.findAll(searchResult, pageable);
                    return ResponseEntity.ok(BaseResponse.success(result.toList(), result.getTotalElements()));
                } catch (Exception e) {
                    e.printStackTrace();
                    throw e;
                }
            }
        }
        return findAll();
    }

    protected ResponseEntity<BaseResponse> findOne(long id) {
        Optional<T> entity = service.findOne(id);

        if (!entity.isPresent()) {
            throw new NotFoundException("Not found");
        }

        return ResponseEntity.ok(BaseResponse.success(entity));
    }

    protected void beforeSave(boolean isCreate, T entity) throws Exception {
    }

    protected void afterSave(T entity) throws Exception {
    }

    protected ResponseEntity<BaseResponse> addEntity(T newEntity) throws Exception {
        beforeSave(true, newEntity);
        T entity = service.add(newEntity);
        afterSave(entity);
        if (entity == null) {
            throw new Exception("Failed on create entity");
        }

        return ResponseEntity.ok(BaseResponse.success(entity));
    }

    protected ResponseEntity<BaseResponse> updateEntity(long id, T updateEntity) throws Exception {
        Optional<T> entity = service.findOne(id);
        if (!entity.isPresent()) {
            throw new NotFoundException("Not found");
        }
        beforeSave(false, updateEntity);
        T entityResult = service.update(updateEntity);
        afterSave(entityResult);
        return ResponseEntity.ok(BaseResponse.success(entityResult));
    }

    protected void beforeDelete(T entity) {
    }

    protected void afterDelete(T entity) {
    }

    protected ResponseEntity<BaseResponse> deleteEntity(long id) {
        Optional<T> entity = service.findOne(id);
        if (!entity.isPresent()) {
            throw new NotFoundException("Not found");
        }
        T cloneEntity = entity.get();
        beforeDelete(cloneEntity);
        service.delete(id);
        afterDelete(cloneEntity);
        return ResponseEntity.ok(BaseResponse.success(id, "Delete successfully"));
    }
}
