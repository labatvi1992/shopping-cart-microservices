package com.business.shopping.shareservice.base;

import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class GenericSpecificationsBuilder<T> {

    private final List<SearchCriteria> params;
    private final List<Specification<T>> specifications;

    public GenericSpecificationsBuilder() {
        this.params = new ArrayList<>();
        this.specifications = new ArrayList<>();
    }

    public final GenericSpecificationsBuilder<T> with(final String key, final SearchOperation searchOperation, final List<String> arguments) {
        return with(key, searchOperation, false, arguments);
    }

    public final GenericSpecificationsBuilder<T> with(final String key, final SearchOperation searchOperation, final boolean isOrOperation, final List<String> arguments) {
        params.add(new SearchCriteria(key, searchOperation, isOrOperation, arguments));
        return this;
    }

    public final GenericSpecificationsBuilder<T> with(SearchCriteria searchCriteria) {
        params.add(searchCriteria);
        return this;
    }

    public final GenericSpecificationsBuilder<T> with(Specification<T> specification) {
        specifications.add(specification);
        return this;
    }

    public Specification<T> build() {
        Specification<T> result = null;
        if (!params.isEmpty()) {
            result = new GenericSpecification<>(params.get(0));
            for (int index = 1; index < params.size(); ++index) {
                SearchCriteria searchCriteria = params.get(index);
                result = searchCriteria.getIsOrOperation() ? Specification.where(result).or(new GenericSpecification<>(searchCriteria))
                        : Specification.where(result).and(new GenericSpecification<>(searchCriteria));
            }
        }
        if (!specifications.isEmpty()) {
            int index = 0;
            if (Objects.isNull(result)) {
                result = specifications.get(index++);
            }
            for (; index < specifications.size(); ++index) {
                result = Specification.where(result).and(specifications.get(index));
            }
        }
        return result;
    }
}
