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
    }
];

export const fetchProducts = (page: number = 1, limit: number = 4): Promise<{ products: Product[], total: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;
            resolve({
                products: products.slice(start, end),
                total: products.length
            });
        }, 800); // Simulate network delay
    });
};
