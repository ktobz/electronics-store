export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;
    category: string;
    isSale?: boolean;
    isNew?: boolean;
    brand: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        brand: "Apple",
        price: 999.99,
        originalPrice: 1099.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Phones",
        isSale: true
    },
    {
        id: 2,
        name: "Galaxy S24 Ultra",
        brand: "Samsung",
        price: 1199.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1707297902774-637dc4d6b63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Phones",
        isNew: true
    },
    {
        id: 3,
        name: "WH-1000XM5 Headphones",
        brand: "Sony",
        price: 349.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Audio"
    },
    {
        id: 4,
        name: "MacBook Pro M3",
        brand: "Apple",
        price: 1999.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Laptops"
    },
    {
        id: 5,
        name: "PlayStation 5",
        brand: "Sony",
        price: 499.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Gaming"
    },
    {
        id: 6,
        name: "Pixel 8 Pro",
        brand: "Google",
        price: 899.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1696446702183-cbd13d78e3e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Phones",
        isSale: true
    },
    {
        id: 7,
        name: "Watch Series 9",
        brand: "Apple",
        price: 399.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544117518-30dd5f48bb23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Wearables"
    },
    {
        id: 8,
        name: "QuietComfort Ultra",
        brand: "Bose",
        price: 429.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Audio"
    },
    {
        id: 9,
        name: "Surface Laptop 5",
        brand: "Microsoft",
        price: 1299.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Laptops"
    },
    {
        id: 10,
        name: "ROG Ally",
        brand: "ASUS",
        price: 699.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Gaming"
    },
    {
        id: 11,
        name: "Panasonic Lumix S5II",
        brand: "Panasonic",
        price: 1999.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Cameras"
    },
    {
        id: 12,
        name: "Panasonic OLED TV",
        brand: "Panasonic",
        price: 1499.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "TVs"
    },
    {
        id: 13,
        name: "Panasonic Microwave",
        brand: "Panasonic",
        price: 249.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1574265366533-5c02604edcf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Appliances"
    },
    {
        id: 14,
        name: "Panasonic Air Purifier",
        brand: "Panasonic",
        price: 299.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Appliances"
    },
    {
        id: 15,
        name: "Panasonic Earbuds",
        brand: "Panasonic",
        price: 129.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Audio"
    },
    {
        id: 16,
        name: "Panasonic Beard Trimmer",
        brand: "Panasonic",
        price: 89.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1621607512214-6829748aa2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Grooming"
    },
    {
        id: 17,
        name: "Panasonic Rice Cooker",
        brand: "Panasonic",
        price: 159.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Appliances"
    },
    {
        id: 18,
        name: "Panasonic Cordless Phone",
        brand: "Panasonic",
        price: 59.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1520923642038-b4259ace9439?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Communication"
    },
    {
        id: 19,
        name: "Panasonic Bread Maker",
        brand: "Panasonic",
        price: 199.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Appliances"
    },
    {
        id: 20,
        name: "Panasonic Hair Dryer",
        brand: "Panasonic",
        price: 79.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Grooming"
    },
    {
        id: 21,
        name: "Galaxy Z Fold 5",
        brand: "Samsung",
        price: 1799.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Phones",
        isNew: true
    },
    {
        id: 22,
        name: "Samsung Neo QLED 8K",
        brand: "Samsung",
        price: 2999.99,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "TVs"
    },
    {
        id: 23,
        name: "Samsung Galaxy Tab S9",
        brand: "Samsung",
        price: 799.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1544244015-0cd4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Tablets"
    },
    {
        id: 24,
        name: "Samsung Galaxy Watch 6",
        brand: "Samsung",
        price: 299.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Wearables"
    },
    {
        id: 25,
        name: "Samsung Odyssey G9",
        brand: "Samsung",
        price: 1299.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Monitors"
    },
    {
        id: 26,
        name: "Samsung 990 Pro SSD",
        brand: "Samsung",
        price: 169.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Components"
    },
    {
        id: 27,
        name: "Samsung Galaxy Buds2 Pro",
        brand: "Samsung",
        price: 229.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1588423770674-f2a96437e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Audio"
    },
    {
        id: 28,
        name: "Samsung Smart Fridge",
        brand: "Samsung",
        price: 2499.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Appliances"
    },
    {
        id: 29,
        name: "Samsung Jet Bot AI+",
        brand: "Samsung",
        price: 899.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Appliances"
    },
    {
        id: 30,
        name: "Samsung Soundbar Q990C",
        brand: "Samsung",
        price: 1399.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1545454675-3531bdf9915e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Audio"
    },
    {
        id: 31,
        name: "Apple iPad Pro M2",
        brand: "Apple",
        price: 1099.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1544244015-0cd4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Tablets"
    },
    {
        id: 32,
        name: "Dell XPS 15",
        brand: "Dell",
        price: 1899.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Laptops"
    }
];

export const fetchProducts = (
    page: number = 1,
    limit: number = 10,
    brand?: string,
    category?: string
): Promise<{ products: Product[], total: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredProducts = products;
            if (brand) {
                filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
            }
            if (category) {
                filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
            }

            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedProducts = filteredProducts.slice(start, end);

            resolve({
                products: paginatedProducts,
                total: filteredProducts.length
            });
        }, 300);
    });
};
