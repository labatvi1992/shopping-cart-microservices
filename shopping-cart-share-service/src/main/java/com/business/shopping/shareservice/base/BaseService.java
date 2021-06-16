package com.business.shopping.shareservice.base;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class BaseService<T> {

    protected BaseRepository<T, Long> repository;

    public BaseService(BaseRepository<T, Long> repository) {
        this.repository = repository;
    }

    public List<String> globalSearchKeys() {
        return new ArrayList<>();
    }

    public Sort defaultSort() {
        return Sort.unsorted();
    }

    public List<T> findAll() {
        return repository.findAll();
    }

    public List<T> findAll(Specification<T> specification) {
        return repository.findAll(specification);
    }

    public List<T> findAll(Sort sort) {
        return repository.findAll(sort);
    }

    public Page<T> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<T> findAll(Specification<T> specification, Sort sort) {
        return repository.findAll(specification, sort);
    }

    public Page<T> findAll(Specification<T> specification, Pageable pageable) {
        return repository.findAll(specification, pageable);
    }

    public Optional<T> findOne(Long id) {
        return repository.findById(id);
    }

    public T add(T entity) {
        return repository.save(entity);
    }

    public T update(T entity) {
        return repository.save(entity);
    }

    public void delete(long id) {
        repository.deleteById(id);
    }
}
