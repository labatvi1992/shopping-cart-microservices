package com.business.shopping.assetservice.controller;

import com.business.shopping.assetservice.entity.FileGroup;
import com.business.shopping.assetservice.service.FileGroupService;
import com.business.shopping.shareservice.base.BaseController;
import com.business.shopping.shareservice.base.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@ControllerAdvice
@RestController
@RequestMapping("/file-groups")
public class FileGroupController extends BaseController<FileGroup> {

    @Autowired
    public FileGroupController(@Qualifier("fileGroups") FileGroupService service) {
        super(service);
    }

    @GetMapping
    public ResponseEntity<BaseResponse> findAll() {
        return super.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> findOne(@PathVariable long id) {
        return super.findOne(id);
    }

    @PostMapping
    public ResponseEntity<BaseResponse> addEntity(@Valid @RequestBody FileGroup newEntity) throws Exception {
        return super.addEntity(newEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateEntity(@PathVariable long id, @Valid @RequestBody FileGroup updateEntity) throws Exception {
        return super.updateEntity(id, updateEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteEntity(@PathVariable long id) {
        return super.deleteEntity(id);
    }

}
