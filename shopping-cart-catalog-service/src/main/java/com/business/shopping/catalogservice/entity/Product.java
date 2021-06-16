package com.business.shopping.catalogservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "auto_product_gen")
    @SequenceGenerator(name = "auto_product_gen", sequenceName = "product_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private long id;

    @Size(max = 100, message = "Number of characters has maximize of 100")
    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @Size(max = 255, message = "Number of characters has maximize of 255")
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "is_active")
    private Boolean active;

    @Column(name = "image_default")
    @Size(max = Integer.MAX_VALUE)
    private String imageDefault;

    @Column(name = "price")
    private Float price;

    @Column(name = "category_id")
    private Long categoryId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    @JsonIgnore
    private Category category;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getImageDefault() {
        return imageDefault;
    }

    public void setImageDefault(String imageDefault) {
        this.imageDefault = imageDefault;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}
