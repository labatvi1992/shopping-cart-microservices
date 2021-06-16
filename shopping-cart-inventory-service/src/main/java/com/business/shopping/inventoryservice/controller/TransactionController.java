package com.business.shopping.inventoryservice.controller;

import com.business.shopping.inventoryservice.entity.Transaction;
import com.business.shopping.inventoryservice.service.TransactionService;
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
@RequestMapping("/transactions")
public class TransactionController extends BaseController<Transaction> {

    @Autowired
    public TransactionController(@Qualifier("transactions") TransactionService service) {
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
    public ResponseEntity<BaseResponse> addEntity(@Valid @RequestBody Transaction newEntity) throws Exception {
        return super.addEntity(newEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateEntity(@PathVariable long id, @Valid @RequestBody Transaction updateEntity) throws Exception {
        return super.updateEntity(id, updateEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteEntity(@PathVariable long id) {
        return super.deleteEntity(id);
    }
}
