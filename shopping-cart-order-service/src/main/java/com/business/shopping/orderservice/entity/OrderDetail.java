package com.business.shopping.orderservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "orders_detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "auto_order_detail_gen")
    @SequenceGenerator(name = "auto_order_detail_gen", sequenceName = "order_detail_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "order_id", unique = true, nullable = false)
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    @JsonIgnore
    private Order order;

    @Column(name = "product_id")
    private Long product;

    @Column(name = "price")
    private float price;

    @Column(name = "count")
    private int count;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Long getProduct() {
        return product;
    }

    public void setProduct(Long product) {
        this.product = product;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
