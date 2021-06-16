package com.business.shopping.shareservice.base;

import java.util.ArrayList;
import java.util.List;

public class FieldError {
    private final String name;
    private final List<String> errors;

    public FieldError(String name, List<String> errors) {
        this.name = name;
        this.errors = errors;
    }

    public FieldError(String name, String error){
        this.name = name;
        this.errors = new ArrayList<>();
        this.errors.add(error);
    }

    public String getName() {
        return name;
    }

    public List<String> getErrors() {
        return errors;
    }
}
