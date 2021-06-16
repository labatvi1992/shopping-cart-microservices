package com.business.shopping.inventoryservice.repository;

import com.business.shopping.inventoryservice.entity.Inventory;
import com.business.shopping.shareservice.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends BaseRepository<Inventory, Long> {
}
