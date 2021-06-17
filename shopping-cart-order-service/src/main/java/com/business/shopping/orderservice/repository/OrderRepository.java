package com.business.shopping.orderservice.repository;

import com.business.shopping.orderservice.entity.Order;
import com.business.shopping.shareservice.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends BaseRepository<Order, Long> {
}
