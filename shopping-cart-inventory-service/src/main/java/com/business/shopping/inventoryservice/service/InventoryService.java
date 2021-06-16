package com.business.shopping.inventoryservice.service;

import com.business.shopping.inventoryservice.entity.Inventory;
import com.business.shopping.inventoryservice.repository.InventoryRepository;
import com.business.shopping.shareservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Qualifier("inventories")
@Service
public class InventoryService extends BaseService<Inventory> {

    @Autowired
    public InventoryService(InventoryRepository repository) {
        super(repository);
    }

    @Override
    public Sort defaultSort() {
        return Sort.by(Sort.Direction.DESC, "id");
    }

}
