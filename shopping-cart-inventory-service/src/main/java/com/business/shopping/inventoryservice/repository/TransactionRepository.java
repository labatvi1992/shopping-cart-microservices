package com.business.shopping.inventoryservice.repository;

import com.business.shopping.inventoryservice.entity.Transaction;
import com.business.shopping.shareservice.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends BaseRepository<Transaction, Long> {
}
