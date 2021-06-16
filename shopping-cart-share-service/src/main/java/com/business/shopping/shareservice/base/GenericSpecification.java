package com.business.shopping.shareservice.base;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;


public class GenericSpecification<T> implements Specification<T> {

    private final SearchCriteria searchCriteria;

    public GenericSpecification(final SearchCriteria searchCriteria) {
        super();
        this.searchCriteria = searchCriteria;
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<String> arguments = searchCriteria.getArguments();
        String arg = arguments.get(0);

        switch (searchCriteria.getSearchOperation()) {
            case EQUALITY:
                return criteriaBuilder.equal(root.get(searchCriteria.getKey()), arg);
            case GREATER_THAN:
                return criteriaBuilder.greaterThan(root.get(searchCriteria.getKey()), arg);
            case LESS_THAN:
                return criteriaBuilder.lessThan(root.get(searchCriteria.getKey()), arg);
            case STARTS_WITH:
                return criteriaBuilder.like(root.get(searchCriteria.getKey()), arg + "%");
            case LIKE:
            default:
                return criteriaBuilder.like(root.get(searchCriteria.getKey()), "%" + arg + "%");
        }
    }
}
