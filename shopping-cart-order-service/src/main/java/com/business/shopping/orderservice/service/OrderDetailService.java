package com.business.shopping.orderservice.service;

import com.business.shopping.orderservice.entity.OrderDetail;
import com.business.shopping.orderservice.repository.OrderDetailRepository;
import com.business.shopping.shareservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Qualifier("orderDetails")
@Service
public class OrderDetailService extends BaseService<OrderDetail> {
    @Autowired
    public OrderDetailService(OrderDetailRepository repository) {
        super(repository);
    }

    @Override
    public Sort defaultSort() {
        return Sort.by(Sort.Direction.DESC, "id");
    }
}
