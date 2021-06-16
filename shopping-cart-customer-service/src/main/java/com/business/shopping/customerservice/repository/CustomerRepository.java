package com.business.shopping.customerservice.repository;

import com.business.shopping.customerservice.entity.Customer;
import com.business.shopping.shareservice.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends BaseRepository<Customer, Long> {
}
