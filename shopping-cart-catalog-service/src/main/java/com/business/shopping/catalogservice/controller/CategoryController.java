package com.business.shopping.catalogservice.controller;

import com.business.shopping.catalogservice.entity.Category;
import com.business.shopping.catalogservice.service.CategoryService;
import com.business.shopping.shareservice.base.BaseController;
import com.business.shopping.shareservice.base.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@ControllerAdvice
@RestController
@RequestMapping("/categories")
public class CategoryController extends BaseController<Category> {

    @Autowired
    public CategoryController(@Qualifier("categories") CategoryService service) {
        super(service);
    }

    @GetMapping
    public ResponseEntity<BaseResponse> findAll(@RequestParam Map<String, String> params) throws Exception {
        return super.findAll(params);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> findOne(@PathVariable long id) {
        return super.findOne(id);
    }

    @PostMapping
    public ResponseEntity<BaseResponse> addEntity(@Valid @RequestBody Category newEntity) throws Exception {
        return super.addEntity(newEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateEntity(@PathVariable long id, @Valid @RequestBody Category updateEntity) throws Exception {
        return super.updateEntity(id, updateEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteEntity(@PathVariable long id) {
        return super.deleteEntity(id);
    }
}
