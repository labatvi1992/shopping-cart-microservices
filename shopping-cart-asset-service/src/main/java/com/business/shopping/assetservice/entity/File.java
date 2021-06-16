package com.business.shopping.assetservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "file")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "auto_file_gen")
    @SequenceGenerator(name = "auto_file_gen", sequenceName = "file_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private long id;

    @Size(max = 255, message = "Maximum number of character is 255")
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = Integer.MAX_VALUE)
    @Column(name = "path", nullable = false)
    private String path;

    @Size(max = Integer.MAX_VALUE)
    @Column(name = "description")
    private String description;

    @Column(name = "file_group_id")
    private Long fileGroupId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_group_id", insertable = false, updatable = false)
    @JsonIgnore
    private FileGroup fileGroup;

    @Transient
    @JsonIgnore
    private MultipartFile file;

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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getFileGroupId() {
        return fileGroupId;
    }

    public void setFileGroupId(Long fileGroupId) {
        this.fileGroupId = fileGroupId;
    }

    public FileGroup getFileGroup() {
        return fileGroup;
    }

    public void setFileGroup(FileGroup fileGroup) {
        this.fileGroup = fileGroup;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

}
