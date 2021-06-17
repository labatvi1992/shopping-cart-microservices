package com.business.shopping.orderservice.repository;

import com.business.shopping.orderservice.entity.OrderDetail;
import com.business.shopping.shareservice.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends BaseRepository<OrderDetail, Long> {
}
