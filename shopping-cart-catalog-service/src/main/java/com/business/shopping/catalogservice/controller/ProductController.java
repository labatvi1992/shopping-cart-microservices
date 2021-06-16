package com.business.shopping.catalogservice.controller;

import com.business.shopping.catalogservice.entity.Product;
import com.business.shopping.catalogservice.service.ProductService;
import com.business.shopping.shareservice.base.BaseResponse;
import com.business.shopping.shareservice.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@ControllerAdvice
@RestController
@RequestMapping("/products")
public class ProductController extends BaseController<Product> {

    @Autowired
    public ProductController(@Qualifier("products") ProductService service) {
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

    @GetMapping("/get-by")
    public ResponseEntity<BaseResponse> findMany(@RequestParam Long[] ids) {
        return ResponseEntity.ok(BaseResponse.success(((ProductService)service).findByIds(ids)));
    }

    @PostMapping
    public ResponseEntity<BaseResponse> addEntity(@Valid @RequestBody Product newEntity) throws Exception {
        return super.addEntity(newEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateEntity(@PathVariable long id, @Valid @RequestBody Product updateEntity) throws Exception {
        return super.updateEntity(id, updateEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteEntity(@PathVariable long id) {
        return super.deleteEntity(id);
    }
}
