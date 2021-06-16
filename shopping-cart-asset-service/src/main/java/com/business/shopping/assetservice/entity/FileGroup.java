package com.business.shopping.assetservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "file_group")
public class FileGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "auto_file_group_gen")
    @SequenceGenerator(name = "auto_file_group_gen", sequenceName = "file_group_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private long id;

    @Size(max = 255, message = "Maximum number of character is 255")
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "fileGroup", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<File> files = new HashSet<>();

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

    public Set<File> getFiles() {
        return files;
    }

    public void setFiles(Set<File> files) {
        this.files = files;
    }
}
