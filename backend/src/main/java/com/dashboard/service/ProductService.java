package com.dashboard.service;

import com.dashboard.dto.DashboardStats;
import com.dashboard.model.Product;
import com.dashboard.repository.ProductRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts(String search, String categoryId, String sortOrder, Boolean lowStock) {
        Sort sort;
        if ("asc".equalsIgnoreCase(sortOrder)) {
            sort = Sort.by(Sort.Direction.ASC, "stock");
        } else if ("desc".equalsIgnoreCase(sortOrder)) {
            sort = Sort.by(Sort.Direction.DESC, "stock");
        } else {
            sort = Sort.by(Sort.Direction.DESC, "createdAt");
        }

        List<Product> products;
        boolean hasSearch = search != null && !search.trim().isEmpty();
        boolean hasCategory = categoryId != null && !categoryId.trim().isEmpty();
        boolean hasLowStock = lowStock != null && lowStock;

        if (hasLowStock) {
            products = productRepository.findByStockLessThan(10);
        } else if (hasSearch && hasCategory) {
            products = productRepository.findByNameContainingIgnoreCaseAndCategoryId(search.trim(), categoryId);
        } else if (hasSearch) {
            products = productRepository.findByNameContainingIgnoreCase(search.trim());
        } else if (hasCategory) {
            products = productRepository.findByCategoryId(categoryId);
        } else {
            products = productRepository.findAll(sort);
        }

        return products;
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> updateProduct(String id, Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setStock(productDetails.getStock());
            product.setCategoryId(productDetails.getCategoryId());
            product.setCategoryName(productDetails.getCategoryName());
            product.setImageUrl(productDetails.getImageUrl());
            product.setUpdatedAt(java.time.LocalDateTime.now());
            return productRepository.save(product);
        });
    }

    public boolean deleteProduct(String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public DashboardStats getDashboardStats() {
        long totalProducts = productRepository.count();
        long lowStockCount = productRepository.countByStockLessThan(10);
        List<Product> recentProducts = productRepository.findAllByOrderByCreatedAtDesc();
        if (recentProducts.size() > 5) {
            recentProducts = recentProducts.subList(0, 5);
        }
        return new DashboardStats(totalProducts, 0, lowStockCount, recentProducts);
    }
}
