package com.business.shopping.customerservice.entity;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "auto_customer_gen")
    @SequenceGenerator(name = "auto_customer_gen", sequenceName = "customer_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private long id;

    @Size(max = 255, message = "Number of characters has maximize of 255")
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 50, message = "Number of characters has maximize of 50")
    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email")
    @Size(max = 255, message = "Number of characters has maximize of 255")
    private String email;

    @Column(name = "address")
    @Size(max = 500, message = "Number of characters has maximize of 500")
    private String address;

    @Column(name = "is_active")
    private Boolean active;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
