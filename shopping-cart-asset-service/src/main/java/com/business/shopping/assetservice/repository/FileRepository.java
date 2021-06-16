package com.business.shopping.assetservice.repository;

import com.business.shopping.assetservice.entity.File;
import com.business.shopping.shareservice.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends BaseRepository<File, Long> {
}