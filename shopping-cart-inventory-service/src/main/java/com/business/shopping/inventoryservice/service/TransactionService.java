package com.business.shopping.inventoryservice.service;

import com.business.shopping.inventoryservice.entity.Transaction;
import com.business.shopping.inventoryservice.repository.TransactionRepository;
import com.business.shopping.shareservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Qualifier("transactions")
@Service
public class TransactionService extends BaseService<Transaction> {

    @Autowired
    public TransactionService(TransactionRepository repository) {
        super(repository);
    }

    @Override
    public Sort defaultSort() {
        return Sort.by(Sort.Direction.DESC, "id");
    }

}