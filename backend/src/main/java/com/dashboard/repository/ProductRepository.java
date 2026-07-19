package com.dashboard.repository;

import com.dashboard.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findByStockLessThan(int stock);

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByCategoryId(String categoryId);

    List<Product> findByNameContainingIgnoreCaseAndCategoryId(String name, String categoryId);

    List<Product> findAllByOrderByCreatedAtDesc();

    long countByStockLessThan(int stock);
}
