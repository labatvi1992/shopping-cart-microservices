package com.business.shopping.assetservice.controller;

import com.business.shopping.shareservice.base.BaseResponse;
import com.business.shopping.assetservice.entity.File;
import com.business.shopping.assetservice.service.FileService;
import com.business.shopping.assetservice.util.FileUploadUtil;
import com.business.shopping.shareservice.base.BaseController;
import com.business.shopping.shareservice.base.GenericSpecificationsBuilder;
import com.business.shopping.shareservice.base.SearchOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.*;

@ControllerAdvice
@RestController
@RequestMapping("/files")
public class FileController extends BaseController<File> {

    @Autowired
    public FileController(@Qualifier("files") FileService service) {
        super(service);
    }

    private String getRealPath() {
        return "resources/images/";
    }

    private String saveFile(MultipartFile file) throws IOException {
        UUID uuid = UUID.randomUUID();
        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        Optional<String> extension = FileUploadUtil.getFileExtension(originalFileName);
        String fileName = uuid.toString() + "." + extension.orElse("unknown");
        String resourceFolder = getRealPath();
        FileUploadUtil.saveFile(resourceFolder, fileName, file);
        return resourceFolder + fileName;
    }

    @Override
    protected String beforeSave(boolean isCreate, File entity) {
        MultipartFile file = entity.getFile();
        try {
            entity.setName(file.getOriginalFilename());
            entity.setPath(saveFile(file));
        } catch (IOException e) {
            e.printStackTrace();
            return e.getMessage();
        }
        return "";
    }

    @GetMapping
    public ResponseEntity<BaseResponse> findAll() {
        return super.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> findOne(@PathVariable long id) {
        return super.findOne(id);
    }

    @GetMapping("/by-group/{groupId}")
    public ResponseEntity<BaseResponse> findByGroup(@PathVariable long groupId) {
        GenericSpecificationsBuilder<File> builder = new GenericSpecificationsBuilder<>();
        List<String> arguments = new ArrayList<>();
        arguments.add(groupId + "");
        builder.with("fileGroupId", SearchOperation.EQUALITY, true, arguments);
        Specification<File> searchResult = builder.build();
        return ResponseEntity.ok(BaseResponse.success(service.findAll(searchResult)));
    }

    @PostMapping
    public ResponseEntity<BaseResponse> addEntity(@Valid File newEntity) throws Exception {
        return super.addEntity(newEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateEntity(@PathVariable long id, @Valid File updateEntity) throws Exception {
        return super.updateEntity(id, updateEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteEntity(@PathVariable long id) {
        return super.deleteEntity(id);
    }

    @Override
    protected void afterDelete(File entity) {
        try {
            FileUploadUtil.deleteFile(getRealPath() + entity.getPath());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
