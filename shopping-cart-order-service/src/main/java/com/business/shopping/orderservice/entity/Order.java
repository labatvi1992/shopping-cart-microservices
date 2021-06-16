package com.business.shopping.orderservice.entity;

import javax.persistence.*;

@Entity
@Table(name = "order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "auto_order_gen")
    @SequenceGenerator(name = "auto_order_gen", sequenceName = "order_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private long id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}