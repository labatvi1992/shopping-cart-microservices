package com.business.shopping.orderservice.service;

import com.business.shopping.orderservice.entity.Order;
import com.business.shopping.orderservice.repository.OrderRepository;
import com.business.shopping.shareservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Qualifier("orders")
@Service
public class OrderService extends BaseService<Order> {

    @Autowired
    public OrderService(OrderRepository repository) {
        super(repository);
    }

    @Override
    public Sort defaultSort() {
        return Sort.by(Sort.Direction.DESC, "id");
    }

}