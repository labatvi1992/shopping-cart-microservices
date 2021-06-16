package com.business.shopping.catalogservice.repository;

import com.business.shopping.catalogservice.entity.Category;
import com.business.shopping.shareservice.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends BaseRepository<Category, Long> {
}
