package com.business.shopping.assetservice.service;

import com.business.shopping.assetservice.entity.File;
import com.business.shopping.assetservice.repository.FileRepository;
import com.business.shopping.shareservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Qualifier("files")
@Service
public class FileService extends BaseService<File> {

    @Autowired
    public FileService(FileRepository repository) {
        super(repository);
    }

}
