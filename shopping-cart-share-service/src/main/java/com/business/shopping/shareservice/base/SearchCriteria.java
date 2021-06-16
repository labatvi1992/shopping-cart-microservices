package com.business.shopping.shareservice.base;

import java.util.ArrayList;
import java.util.List;

public class SearchCriteria {
    private String key;
    private SearchOperation searchOperation;
    private boolean isOrOperation;
    private List<String> arguments;

    public SearchCriteria() {
        this.key = "";
        this.searchOperation = SearchOperation.LIKE;
        this.isOrOperation = false;
        this.arguments = new ArrayList<>();
    }

    public SearchCriteria(String key, SearchOperation searchOperation, boolean isOrOperation, List<String> arguments) {
        this.key = key;
        this.searchOperation = searchOperation;
        this.isOrOperation = isOrOperation;
        this.arguments = arguments != null ? arguments : new ArrayList<>();
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public SearchOperation getSearchOperation() {
        return searchOperation;
    }

    public void setSearchOperation(SearchOperation searchOperation) {
        this.searchOperation = searchOperation;
    }

    public boolean getIsOrOperation() {
        return isOrOperation;
    }

    public void setIsOrOperation(boolean orOperation) {
        isOrOperation = orOperation;
    }

    public List<String> getArguments() {
        return arguments;
    }

    public void setArguments(List<String> arguments) {
        this.arguments = arguments;
    }
}
