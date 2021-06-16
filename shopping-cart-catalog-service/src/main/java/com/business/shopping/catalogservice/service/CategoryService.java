package com.business.shopping.catalogservice.service;

import com.business.shopping.catalogservice.entity.Category;
import com.business.shopping.catalogservice.repository.CategoryRepository;
import com.business.shopping.shareservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Qualifier("categories")
@Service
public class CategoryService extends BaseService<Category> {

    @Autowired
    public CategoryService(CategoryRepository repository) {
        super(repository);
    }

    @Override
    public List<String> globalSearchKeys() {
        return Collections.singletonList("name");
    }

    @Override
    public Sort defaultSort() {
        return Sort.by(Sort.DEFAULT_DIRECTION, "name");
    }

}
