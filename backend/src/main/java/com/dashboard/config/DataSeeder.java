package com.dashboard.config;

import com.dashboard.model.Category;
import com.dashboard.model.Product;
import com.dashboard.repository.CategoryRepository;
import com.dashboard.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataSeeder(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) return;

        List<Category> categories = categoryRepository.saveAll(List.of(
            new Category("Electronics", "Electronic devices and accessories"),
            new Category("Clothing", "Apparel and fashion items"),
            new Category("Home & Kitchen", "Home improvement and kitchenware"),
            new Category("Books", "Physical and digital books"),
            new Category("Sports", "Sports equipment and gear")
        ));

        productRepository.saveAll(List.of(
            createProduct("Wireless Headphones", "Bluetooth 5.0 noise-cancelling headphones", 5999, 45, categories.get(0)),
            createProduct("Smart Watch", "Fitness tracker with heart rate monitor", 14999, 8, categories.get(0)),
            createProduct("USB-C Hub", "7-in-1 multiport adapter", 2499, 120, categories.get(0)),
            createProduct("Cotton T-Shirt", "Premium cotton crew neck t-shirt", 1499, 200, categories.get(1)),
            createProduct("Denim Jacket", "Classic blue denim jacket", 6999, 15, categories.get(1)),
            createProduct("Running Shoes", "Lightweight mesh running shoes", 9999, 3, categories.get(1)),
            createProduct("Non-Stick Pan", "Ceramic coated 12-inch frying pan", 3499, 60, categories.get(2)),
            createProduct("Coffee Maker", "12-cup programmable coffee machine", 4999, 5, categories.get(2)),
            createProduct("Throw Blanket", "Soft fleece 50x60 inch blanket", 1999, 90, categories.get(2)),
            createProduct("Cookbook", "100 easy weeknight recipes", 1299, 35, categories.get(3)),
            createProduct("Sci-Fi Novel", "Bestselling space opera trilogy", 999, 2, categories.get(3)),
            createProduct("Self-Help Book", "Guide to building better habits", 1499, 50, categories.get(3)),
            createProduct("Yoga Mat", "Non-slip 6mm thick exercise mat", 2999, 25, categories.get(4)),
            createProduct("Resistance Bands", "Set of 5 resistance bands with handles", 999, 7, categories.get(4)),
            createProduct("Water Bottle", "Stainless steel 32oz insulated bottle", 2499, 80, categories.get(4))
        ));
    }

    private Product createProduct(String name, String desc, double price, int stock, Category category) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setPrice(price);
        p.setStock(stock);
        p.setCategoryId(category.getId());
        p.setCategoryName(category.getName());
        p.setCreatedAt(LocalDateTime.now().minusDays((long) (Math.random() * 30)));
        p.setUpdatedAt(p.getCreatedAt());
        return p;
    }
}
