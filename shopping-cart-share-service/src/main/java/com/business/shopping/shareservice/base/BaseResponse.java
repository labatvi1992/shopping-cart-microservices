package com.business.shopping.shareservice.base;

import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.List;

public class BaseResponse {
    private final Date timestamp;
    private final String path;
    private int status;
    private String message;
    private Object data;
    private Long total;
    private List<FieldError> errors;

    private BaseResponse() {
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
        this.timestamp = new Date();
        this.path = location.toString();
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getPath() {
        return path;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }

    public Long getTotal() {
        return total;
    }

    public List<FieldError> getErrors() {
        return errors;
    }

    public static BaseResponse success(Object data, String message) {
        BaseResponse response = new BaseResponse();
        response.status = HttpStatus.OK.value();
        response.data = data;
        response.message = message;
        return response;
    }

    public static BaseResponse success(Object data) {
        return success(data, "");
    }

    public static BaseResponse success(Object data, Long total) {
        BaseResponse response = success(data, "");
        response.total = total;
        return response;
    }

    public static BaseResponse error(HttpStatus status, String message, List<FieldError> errors) {
        BaseResponse response = new BaseResponse();
        response.status = status.value();
        response.message = message;
        response.errors = errors;
        return response;
    }

    public static BaseResponse error(HttpStatus status, String message) {
        return error(status, message, null);
    }
}
