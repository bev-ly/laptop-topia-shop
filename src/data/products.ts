import { Product } from "../contexts/CartContext";

export const laptops: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 14",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1999.99,
    specs: {
      processor: "Apple M2 Pro",
      memory: "16GB Unified Memory",
      storage: "512GB SSD",
      display: "14-inch Liquid Retina XDR",
      graphics: "16-core GPU"
    }
  },
  {
    id: 2,
    name: "Dell XPS 15",
    brand: "Dell",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1799.99,
    specs: {
      processor: "Intel Core i7-12700H",
      memory: "16GB DDR5",
      storage: "1TB SSD",
      display: "15.6-inch 4K OLED",
      graphics: "NVIDIA GeForce RTX 3050 Ti"
    }
  },
  {
    id: 3,
    name: "HP Spectre x360",
    brand: "HP",
    image: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1499.99,
    specs: {
      processor: "Intel Core i7-1255U",
      memory: "16GB DDR4",
      storage: "1TB SSD",
      display: "13.5-inch 3K2K OLED",
      graphics: "Intel Iris Xe"
    }
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1599.99,
    specs: {
      processor: "Intel Core i7-1260P",
      memory: "16GB LPDDR5",
      storage: "512GB SSD",
      display: "14-inch 2.2K IPS",
      graphics: "Intel Iris Xe"
    }
  },
  {
    id: 5,
    name: "ASUS ROG Zephyrus G14",
    brand: "ASUS",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1699.99,
    specs: {
      processor: "AMD Ryzen 9 6900HS",
      memory: "16GB DDR5",
      storage: "1TB SSD",
      display: "14-inch QHD 120Hz",
      graphics: "NVIDIA GeForce RTX 3060"
    }
  },
  {
    id: 6,
    name: "Microsoft Surface Laptop 5",
    brand: "Microsoft",
    image: "https://images.unsplash.com/photo-1625842268618-7fb5025c45f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1299.99,
    specs: {
      processor: "Intel Core i5-1235U",
      memory: "8GB LPDDR5",
      storage: "512GB SSD",
      display: "13.5-inch PixelSense",
      graphics: "Intel Iris Xe"
    }
  },
  {
    id: 7,
    name: "Razer Blade 15",
    brand: "Razer",
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 2499.99,
    specs: {
      processor: "Intel Core i9-12900H",
      memory: "32GB DDR5",
      storage: "1TB SSD",
      display: "15.6-inch QHD 240Hz",
      graphics: "NVIDIA GeForce RTX 3080 Ti"
    }
  },
  {
    id: 8,
    name: "Acer Swift 5",
    brand: "Acer",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1099.99,
    specs: {
      processor: "Intel Core i7-1260P",
      memory: "16GB LPDDR4X",
      storage: "512GB SSD",
      display: "14-inch FHD IPS",
      graphics: "Intel Iris Xe"
    }
  },
  {
    id: 9,
    name: "Alienware m17 R5",
    brand: "Dell",
    image: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 2799.99,
    originalPrice: 2999.99,
    specs: {
      processor: "AMD Ryzen 9 6900HX",
      memory: "32GB DDR5",
      storage: "2TB SSD",
      display: "17.3-inch QHD 240Hz",
      graphics: "NVIDIA GeForce RTX 3080"
    }
  },
  {
    id: 10,
    name: "LG Gram 17",
    brand: "LG",
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1599.99,
    specs: {
      processor: "Intel Core i7-1260P",
      memory: "16GB LPDDR5",
      storage: "1TB SSD",
      display: "17-inch WQXGA IPS",
      graphics: "Intel Iris Xe"
    }
  },
  {
    id: 11,
    name: "MacBook Air M2",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1199.99,
    specs: {
      processor: "Apple M2",
      memory: "8GB Unified Memory",
      storage: "256GB SSD",
      display: "13.6-inch Liquid Retina",
      graphics: "8-core GPU"
    }
  },
  {
    id: 12,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    price: 1449.99,
    specs: {
      processor: "Intel Core i7-1360P",
      memory: "16GB LPDDR5",
      storage: "512GB SSD",
      display: "14-inch AMOLED 3K",
      graphics: "Intel Iris Xe"
    }
  }
];

export const brands = [
  "All",
  "Apple",
  "Dell",
  "HP",
  "Lenovo",
  "ASUS",
  "Microsoft",
  "Razer",
  "Acer",
  "LG",
  "Samsung"
];

export const filterProductsByBrand = (products: Product[], brand: string) => {
  if (brand === "All") return products;
  return products.filter(product => product.brand === brand);
};

export const getProductById = (id: number): Product | undefined => {
  return laptops.find(laptop => laptop.id === id);
};
