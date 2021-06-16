package com.business.shopping.customerservice.service;

import com.business.shopping.customerservice.entity.Customer;
import com.business.shopping.customerservice.repository.CustomerRepository;
import com.business.shopping.shareservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Qualifier("customers")
@Service
public class CustomerService extends BaseService<Customer> {
    @Autowired
    public CustomerService(CustomerRepository repository) {
        super(repository);
    }

    @Override
    public List<String> globalSearchKeys() {
        return Arrays.asList("name", "email");
    }

    @Override
    public Sort defaultSort() {
        return Sort.by(Sort.Direction.DESC, "id");
    }
}
