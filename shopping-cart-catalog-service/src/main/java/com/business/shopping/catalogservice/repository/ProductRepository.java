package com.business.shopping.catalogservice.repository;

import com.business.shopping.catalogservice.entity.Product;
import com.business.shopping.shareservice.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends BaseRepository<Product, Long> {
}
