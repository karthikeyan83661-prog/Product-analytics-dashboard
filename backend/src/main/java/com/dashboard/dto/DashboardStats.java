package com.dashboard.dto;

import java.util.List;
import com.dashboard.model.Product;

public class DashboardStats {
    private long totalProducts;
    private long totalCategories;
    private long lowStockCount;
    private List<Product> recentProducts;

    public DashboardStats() {}

    public DashboardStats(long totalProducts, long totalCategories, long lowStockCount, List<Product> recentProducts) {
        this.totalProducts = totalProducts;
        this.totalCategories = totalCategories;
        this.lowStockCount = lowStockCount;
        this.recentProducts = recentProducts;
    }

    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }
    public long getTotalCategories() { return totalCategories; }
    public void setTotalCategories(long totalCategories) { this.totalCategories = totalCategories; }
    public long getLowStockCount() { return lowStockCount; }
    public void setLowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; }
    public List<Product> getRecentProducts() { return recentProducts; }
    public void setRecentProducts(List<Product> recentProducts) { this.recentProducts = recentProducts; }
}
