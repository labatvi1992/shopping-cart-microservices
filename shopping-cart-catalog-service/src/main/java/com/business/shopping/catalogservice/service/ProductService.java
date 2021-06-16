package com.business.shopping.catalogservice.service;

import com.business.shopping.catalogservice.entity.Product;
import com.business.shopping.catalogservice.repository.ProductRepository;
import com.business.shopping.shareservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Qualifier("products")
@Service
public class ProductService extends BaseService<Product> {

    @Autowired
    public ProductService(ProductRepository repository) {
        super(repository);
    }

    @Override
    public List<String> globalSearchKeys() {
        return Arrays.asList("code", "name");
    }

    @Override
    public Sort defaultSort() {
        return Sort.by(Sort.DEFAULT_DIRECTION, "id");
    }

    public List<Product> findByIds(Long[] ids) {
        return repository.findAllById(Arrays.asList(ids));
    }

}
