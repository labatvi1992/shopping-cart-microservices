package com.business.shopping.orderservice.controller;

import com.business.shopping.orderservice.common.OrderState;
import com.business.shopping.orderservice.entity.Order;
import com.business.shopping.orderservice.service.OrderService;
import com.business.shopping.shareservice.base.BaseController;
import com.business.shopping.shareservice.base.BaseResponse;
import com.business.shopping.shareservice.dto.CustomerDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.Date;
import java.util.Map;

@ControllerAdvice
@RestController
@RequestMapping("/orders")
public class OrderController extends BaseController<Order> {

    private final RestTemplate restTemplate;

    @Autowired
    public OrderController(@Qualifier("orders") OrderService service, RestTemplate restTemplate) {
        super(service);
        this.restTemplate = restTemplate;
    }

    @GetMapping
    public ResponseEntity<BaseResponse> findAll(@RequestParam Map<String, String> params) throws Exception {
        return super.findAll(params);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> findOne(@PathVariable long id) {
        return super.findOne(id);
    }

    @PostMapping
    public ResponseEntity<BaseResponse> addEntity(@Valid @RequestBody Order newEntity) throws Exception {
        return super.addEntity(newEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateEntity(@PathVariable long id, @Valid @RequestBody Order updateEntity) throws Exception {
        return super.updateEntity(id, updateEntity);
    }

    @Override
    protected void beforeSave(boolean isCreate, Order entity) throws Exception {
        if (isCreate) {
            ObjectMapper mapper = new ObjectMapper();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            CustomerDTO newCustomer = entity.getCustomer();
            newCustomer.setActive(true);
            HttpEntity<String> request = new HttpEntity<>(mapper.writeValueAsString(newCustomer), headers);
            ResponseEntity<BaseResponse> response = restTemplate.postForEntity("http://customer-service/customers", request, BaseResponse.class);
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                BaseResponse baseResponse = response.getBody();
                CustomerDTO customerDTO = mapper.convertValue(baseResponse.getData(), CustomerDTO.class);
                if (customerDTO != null) {
                    entity.setCustomerId(customerDTO.getId());
                    entity.setStatus(OrderState.Created.toString().toLowerCase());
                    entity.setCreatedDate(new Date());
                    if (entity.getCreatedBy() == null) {
                        entity.setCreatedBy("system");
                    }
                } else {
                    throw new Exception("Parse customer failed");
                }
            } else {
                throw new Exception("Create customer on customer service failed");
            }
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteEntity(@PathVariable long id) {
        return super.deleteEntity(id);
    }
}
