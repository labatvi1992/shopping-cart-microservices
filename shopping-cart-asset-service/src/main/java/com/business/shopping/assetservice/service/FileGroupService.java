package com.business.shopping.assetservice.service;

import com.business.shopping.assetservice.entity.FileGroup;
import com.business.shopping.assetservice.repository.FileGroupRepository;
import com.business.shopping.shareservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Qualifier("fileGroups")
@Service
public class FileGroupService extends BaseService<FileGroup> {

    @Autowired
    public FileGroupService(FileGroupRepository repository) {
        super(repository);
    }

}
