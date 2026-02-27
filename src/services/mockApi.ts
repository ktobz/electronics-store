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

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    author: string;
    authorRole: string;
    authorImage: string;
    category: string;
    readTime: string;
    tags: string[];
}

// Helper function to generate image URLs
const generateImageUrl = (seed: string, id: number): string => {
    return `https://picsum.photos/seed/${seed}${id}/400/300.jpg`;
};

export const products: Product[] = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        brand: "Apple",
        price: 999.99,
        originalPrice: 1099.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/iphone15pro/400/300.jpg",
        category: "Phones",
        isSale: true
    },
    {
        id: 2,
        name: "Galaxy S24 Ultra",
        brand: "Samsung",
        price: 1199.99,
        rating: 4.8,
        image: generateImageUrl("phone", 6),
        category: "Phones",
        isNew: true
    },
    {
        id: 3,
        name: "WH-1000XM5 Headphones",
        brand: "Sony",
        price: 349.99,
        rating: 4.9,
        image: generateImageUrl("audio", 8),
        category: "Audio"
    },
    {
        id: 4,
        name: "MacBook Pro M3",
        brand: "Apple",
        price: 1999.99,
        rating: 4.9,
        image: generateImageUrl("laptop", 4),
        category: "Laptops"
    },
    {
        id: 5,
        name: "PlayStation 5",
        brand: "Sony",
        price: 499.99,
        rating: 4.8,
        image: generateImageUrl("gaming", 10),
        category: "Gaming"
    },
    {
        id: 6,
        name: "Pixel 8 Pro",
        brand: "Google",
        price: 899.99,
        rating: 4.7,
        image: generateImageUrl("phone", 6),
        category: "Phones",
        isSale: true
    },
    {
        id: 7,
        name: "Watch Series 9",
        brand: "Apple",
        price: 399.99,
        rating: 4.8,
        image: generateImageUrl("product", 7),
        category: "Wearables"
    },
    {
        id: 8,
        name: "QuietComfort Ultra",
        brand: "Bose",
        price: 429.99,
        rating: 4.9,
        image: generateImageUrl("audio", 8),
        category: "Audio"
    },
    {
        id: 9,
        name: "Surface Laptop 5",
        brand: "Microsoft",
        price: 1299.99,
        rating: 4.6,
        image: generateImageUrl("laptop", 4),
        category: "Laptops"
    },
    {
        id: 10,
        name: "ROG Ally",
        brand: "ASUS",
        price: 699.99,
        rating: 4.7,
        image: generateImageUrl("gaming", 10),
        category: "Gaming"
    },
    {
        id: 11,
        name: "Panasonic Lumix S5II",
        brand: "Panasonic",
        price: 1999.99,
        rating: 4.9,
        image: generateImageUrl("product", 7),
        category: "Cameras"
    },
    {
        id: 12,
        name: "Panasonic OLED TV",
        brand: "Panasonic",
        price: 1499.99,
        rating: 4.8,
        image: generateImageUrl("product", 7),
        category: "TVs"
    },
    {
        id: 13,
        name: "Panasonic Microwave",
        brand: "Panasonic",
        price: 249.99,
        rating: 4.5,
        image: generateImageUrl("product", 7),
        category: "Appliances"
    },
    {
        id: 14,
        name: "Panasonic Air Purifier",
        brand: "Panasonic",
        price: 299.99,
        rating: 4.7,
        image: generateImageUrl("product", 7),
        category: "Appliances"
    },
    {
        id: 15,
        name: "Panasonic Earbuds",
        brand: "Panasonic",
        price: 129.99,
        rating: 4.4,
        image: generateImageUrl("audio", 8),
        category: "Audio"
    },
    {
        id: 16,
        name: "Panasonic Beard Trimmer",
        brand: "Panasonic",
        price: 89.99,
        rating: 4.8,
        image: generateImageUrl("product", 7),
        category: "Grooming"
    },
    {
        id: 17,
        name: "Panasonic Rice Cooker",
        brand: "Panasonic",
        price: 159.99,
        rating: 4.9,
        image: generateImageUrl("product", 7),
        category: "Appliances"
    },
    {
        id: 18,
        name: "Panasonic Cordless Phone",
        brand: "Panasonic",
        price: 59.99,
        rating: 4.6,
        image: generateImageUrl("product", 7),
        category: "Communication"
    },
    {
        id: 19,
        name: "Panasonic Bread Maker",
        brand: "Panasonic",
        price: 199.99,
        rating: 4.8,
        image: generateImageUrl("product", 7),
        category: "Appliances"
    },
    {
        id: 20,
        name: "Panasonic Hair Dryer",
        brand: "Panasonic",
        price: 79.99,
        rating: 4.7,
        image: generateImageUrl("product", 7),
        category: "Grooming"
    },
    {
        id: 21,
        name: "Galaxy Z Fold 5",
        brand: "Samsung",
        price: 1799.99,
        rating: 4.8,
        image: generateImageUrl("phone", 6),
        category: "Phones",
        isNew: true
    },
    {
        id: 22,
        name: "Samsung Neo QLED 8K",
        brand: "Samsung",
        price: 2999.99,
        rating: 5.0,
        image: generateImageUrl("product", 7),
        category: "TVs"
    },
    {
        id: 23,
        name: "Samsung Galaxy Tab S9",
        brand: "Samsung",
        price: 799.99,
        rating: 4.9,
        image: generateImageUrl("product", 7),
        category: "Tablets"
    },
    {
        id: 24,
        name: "Samsung Galaxy Watch 6",
        brand: "Samsung",
        price: 299.99,
        rating: 4.7,
        image: generateImageUrl("product", 7),
        category: "Wearables"
    },
    {
        id: 25,
        name: "Samsung Odyssey G9",
        brand: "Samsung",
        price: 1299.99,
        rating: 4.9,
        image: generateImageUrl("product", 7),
        category: "Monitors"
    },
    {
        id: 26,
        name: "Samsung 990 Pro SSD",
        brand: "Samsung",
        price: 169.99,
        rating: 4.9,
        image: generateImageUrl("product", 7),
        category: "Components"
    },
    {
        id: 27,
        name: "Samsung Galaxy Buds2 Pro",
        brand: "Samsung",
        price: 229.99,
        rating: 4.8,
        image: generateImageUrl("audio", 8),
        category: "Audio"
    },
    {
        id: 28,
        name: "Samsung Smart Fridge",
        brand: "Samsung",
        price: 2499.99,
        rating: 4.6,
        image: generateImageUrl("product", 7),
        category: "Appliances"
    },
    {
        id: 29,
        name: "Samsung Jet Bot AI+",
        brand: "Samsung",
        price: 899.99,
        rating: 4.7,
        image: generateImageUrl("product", 7),
        category: "Appliances"
    },
    {
        id: 30,
        name: "Samsung Soundbar Q990C",
        brand: "Samsung",
        price: 1399.99,
        rating: 4.9,
        image: generateImageUrl("audio", 8),
        category: "Audio"
    },
    {
        id: 31,
        name: "Apple iPad Pro M2",
        brand: "Apple",
        price: 1099.99,
        rating: 4.9,
        image: generateImageUrl("product", 7),
        category: "Tablets"
    },
    {
        id: 32,
        name: "Dell XPS 15",
        brand: "Dell",
        price: 1899.99,
        rating: 4.8,
        image: generateImageUrl("laptop", 32),
        category: "Laptops"
    },
    {
        id: 33,
        name: "iPad Air",
        brand: "Apple",
        price: 599.99,
        rating: 4.7,
        image: generateImageUrl("tablet", 33),
        category: "Tablets"
    },
    {
        id: 34,
        name: "Galaxy Tab S9",
        brand: "Samsung",
        price: 799.99,
        rating: 4.6,
        image: generateImageUrl("tablet", 34),
        category: "Tablets"
    },
    {
        id: 35,
        name: "AirPods Pro",
        brand: "Apple",
        price: 249.99,
        rating: 4.8,
        image: generateImageUrl("audio", 35),
        category: "Audio"
    },
    {
        id: 36,
        name: "Galaxy Buds Pro",
        brand: "Samsung",
        price: 199.99,
        rating: 4.5,
        image: generateImageUrl("audio", 36),
        category: "Audio"
    },
    {
        id: 37,
        name: "Sony WH-1000XM4",
        brand: "Sony",
        price: 299.99,
        rating: 4.9,
        image: generateImageUrl("audio", 37),
        category: "Audio"
    },
    {
        id: 38,
        name: "Bose QuietComfort 45",
        brand: "Bose",
        price: 329.99,
        rating: 4.7,
        image: generateImageUrl("audio", 38),
        category: "Audio"
    },
    {
        id: 39,
        name: "Xbox Series X",
        brand: "Microsoft",
        price: 499.99,
        rating: 4.8,
        image: generateImageUrl("gaming", 39),
        category: "Gaming"
    },
    {
        id: 40,
        name: "Nintendo Switch",
        brand: "Nintendo",
        price: 299.99,
        rating: 4.6,
        image: generateImageUrl("gaming", 40),
        category: "Gaming"
    },
    {
        id: 41,
        name: "Steam Deck",
        brand: "Valve",
        price: 399.99,
        rating: 4.5,
        image: generateImageUrl("gaming", 41),
        category: "Gaming"
    },
    {
        id: 42,
        name: "Apple Watch Ultra",
        brand: "Apple",
        price: 799.99,
        rating: 4.8,
        image: generateImageUrl("wearable", 42),
        category: "Wearables"
    },
    {
        id: 43,
        name: "Galaxy Watch 6",
        brand: "Samsung",
        price: 299.99,
        rating: 4.6,
        image: generateImageUrl("wearable", 43),
        category: "Wearables"
    },
    {
        id: 44,
        name: "Fitbit Sense 2",
        brand: "Fitbit",
        price: 249.99,
        rating: 4.4,
        image: generateImageUrl("wearable", 44),
        category: "Wearables"
    },
    {
        id: 45,
        name: "Garmin Fenix 7",
        brand: "Garmin",
        price: 699.99,
        rating: 4.7,
        image: generateImageUrl("wearable", 45),
        category: "Wearables"
    },
    {
        id: 46,
        name: "Canon EOS R5",
        brand: "Canon",
        price: 3899.99,
        rating: 4.9,
        image: generateImageUrl("camera", 46),
        category: "Cameras"
    },
    {
        id: 47,
        name: "Sony Alpha A7 IV",
        brand: "Sony",
        price: 2499.99,
        rating: 4.8,
        image: generateImageUrl("camera", 47),
        category: "Cameras"
    },
    {
        id: 48,
        name: "Nikon Z9",
        brand: "Nikon",
        price: 5499.99,
        rating: 4.9,
        image: generateImageUrl("camera", 48),
        category: "Cameras"
    },
    {
        id: 49,
        name: "LG OLED C3",
        brand: "LG",
        price: 1499.99,
        rating: 4.8,
        image: generateImageUrl("tv", 49),
        category: "TVs"
    },
    {
        id: 50,
        name: "Sony Bravia XR",
        brand: "Sony",
        price: 1999.99,
        rating: 4.7,
        image: generateImageUrl("tv", 50),
        category: "TVs"
    },
    {
        id: 51,
        name: "Samsung QLED 8K",
        brand: "Samsung",
        price: 2999.99,
        rating: 5.0,
        image: generateImageUrl("tv", 51),
        category: "TVs"
    },
    {
        id: 52,
        name: "Dyson V15 Detect",
        brand: "Dyson",
        price: 749.99,
        rating: 4.6,
        image: generateImageUrl("appliance", 52),
        category: "Appliances"
    },
    {
        id: 53,
        name: "iRobot Roomba j7+",
        brand: "iRobot",
        price: 899.99,
        rating: 4.5,
        image: generateImageUrl("appliance", 53),
        category: "Appliances"
    },
    {
        id: 54,
        name: "Instant Pot Duo",
        brand: "Instant Pot",
        price: 99.99,
        rating: 4.4,
        image: generateImageUrl("appliance", 54),
        category: "Appliances"
    },
    {
        id: 55,
        name: "KitchenAid Mixer",
        brand: "KitchenAid",
        price: 379.99,
        rating: 4.8,
        image: generateImageUrl("appliance", 55),
        category: "Appliances"
    },
    {
        id: 56,
        name: "Nespresso Vertuo",
        brand: "Nespresso",
        price: 199.99,
        rating: 4.3,
        image: generateImageUrl("appliance", 56),
        category: "Appliances"
    },
    {
        id: 57,
        name: "Dyson Airwrap",
        brand: "Dyson",
        price: 599.99,
        rating: 4.5,
        image: generateImageUrl("grooming", 57),
        category: "Grooming"
    },
    {
        id: 58,
        name: "Philips OneBlade",
        brand: "Philips",
        price: 79.99,
        rating: 4.2,
        image: generateImageUrl("grooming", 58),
        category: "Grooming"
    },
    {
        id: 59,
        name: "Braun Series 9",
        brand: "Braun",
        price: 299.99,
        rating: 4.6,
        image: generateImageUrl("grooming", 59),
        category: "Grooming"
    },
    {
        id: 60,
        name: "Oral-B iO",
        brand: "Oral-B",
        price: 199.99,
        rating: 4.4,
        image: generateImageUrl("grooming", 60),
        category: "Grooming"
    },
    // 20 Additional Samsung Products
    {
        id: 61,
        name: "Samsung Galaxy Watch 6 Classic",
        brand: "Samsung",
        price: 399.99,
        originalPrice: 449.99,
        rating: 4.7,
        image: generateImageUrl("watch", 61),
        category: "Wearables",
        isSale: true
    },
    {
        id: 62,
        name: "Samsung Galaxy Tab S9 Ultra",
        brand: "Samsung",
        price: 1099.99,
        rating: 4.8,
        image: generateImageUrl("tablet", 62),
        category: "Tablets",
        isNew: true
    },
    {
        id: 63,
        name: "Samsung Galaxy A54 5G",
        brand: "Samsung",
        price: 449.99,
        rating: 4.5,
        image: generateImageUrl("phone", 63),
        category: "Phones"
    },
    {
        id: 64,
        name: "Samsung Galaxy Buds2 Pro",
        brand: "Samsung",
        price: 229.99,
        originalPrice: 279.99,
        rating: 4.6,
        image: generateImageUrl("audio", 64),
        category: "Audio",
        isSale: true
    },
    {
        id: 65,
        name: "Samsung Smart Monitor M8",
        brand: "Samsung",
        price: 699.99,
        rating: 4.4,
        image: generateImageUrl("monitor", 65),
        category: "Monitors"
    },
    {
        id: 66,
        name: "Samsung Galaxy S23 FE",
        brand: "Samsung",
        price: 599.99,
        rating: 4.6,
        image: generateImageUrl("phone", 66),
        category: "Phones",
        isNew: true
    },
    {
        id: 67,
        name: "Samsung Galaxy Book3 Pro",
        brand: "Samsung",
        price: 1399.99,
        rating: 4.7,
        image: generateImageUrl("laptop", 67),
        category: "Laptops"
    },
    {
        id: 68,
        name: "Samsung Galaxy Fit3",
        brand: "Samsung",
        price: 99.99,
        rating: 4.3,
        image: generateImageUrl("wearable", 68),
        category: "Wearables"
    },
    {
        id: 69,
        name: "Samsung Galaxy A34 5G",
        brand: "Samsung",
        price: 349.99,
        rating: 4.4,
        image: generateImageUrl("phone", 69),
        category: "Phones"
    },
    {
        id: 70,
        name: "Samsung SmartThings Hub",
        brand: "Samsung",
        price: 149.99,
        rating: 4.5,
        image: generateImageUrl("smart", 70),
        category: "Smart Home"
    },
    {
        id: 71,
        name: "Samsung Galaxy Tab A9+",
        brand: "Samsung",
        price: 279.99,
        rating: 4.3,
        image: generateImageUrl("tablet", 71),
        category: "Tablets"
    },
    {
        id: 72,
        name: "Samsung Galaxy S23 Ultra",
        brand: "Samsung",
        price: 999.99,
        originalPrice: 1199.99,
        rating: 4.8,
        image: generateImageUrl("phone", 72),
        category: "Phones",
        isSale: true
    },
    {
        id: 73,
        name: "Samsung Galaxy Watch5 Pro",
        brand: "Samsung",
        price: 349.99,
        rating: 4.6,
        image: generateImageUrl("watch", 73),
        category: "Wearables"
    },
    {
        id: 74,
        name: "Samsung Galaxy Tab S9 FE",
        brand: "Samsung",
        price: 449.99,
        rating: 4.5,
        image: generateImageUrl("tablet", 74),
        category: "Tablets",
        isNew: true
    },
    {
        id: 75,
        name: "Samsung Galaxy A14 5G",
        brand: "Samsung",
        price: 199.99,
        rating: 4.2,
        image: generateImageUrl("phone", 75),
        category: "Phones"
    },
    {
        id: 76,
        name: "Samsung Galaxy Buds FE",
        brand: "Samsung",
        price: 99.99,
        rating: 4.4,
        image: generateImageUrl("audio", 76),
        category: "Audio"
    },
    {
        id: 77,
        name: "Samsung Smart TV Q60C",
        brand: "Samsung",
        price: 599.99,
        rating: 4.6,
        image: generateImageUrl("tv", 77),
        category: "TVs"
    },
    {
        id: 78,
        name: "Samsung Galaxy A24",
        brand: "Samsung",
        price: 279.99,
        rating: 4.3,
        image: generateImageUrl("phone", 78),
        category: "Phones"
    },
    {
        id: 79,
        name: "Samsung Galaxy Tab Active Pro",
        brand: "Samsung",
        price: 699.99,
        rating: 4.5,
        image: generateImageUrl("tablet", 79),
        category: "Tablets"
    },
    {
        id: 80,
        name: "Samsung Galaxy Watch4 Classic",
        brand: "Samsung",
        price: 249.99,
        originalPrice: 349.99,
        rating: 4.5,
        image: generateImageUrl("watch", 80),
        category: "Wearables",
        isSale: true
    },
    // 20 Additional Products from Other Brands
    {
        id: 81,
        name: "Google Pixel 8 Pro",
        brand: "Google",
        price: 999.99,
        rating: 4.7,
        image: generateImageUrl("phone", 81),
        category: "Phones",
        isNew: true
    },
    {
        id: 82,
        name: "OnePlus 12",
        brand: "OnePlus",
        price: 799.99,
        rating: 4.6,
        image: generateImageUrl("phone", 82),
        category: "Phones"
    },
    {
        id: 83,
        name: "Xiaomi 14 Pro",
        brand: "Xiaomi",
        price: 699.99,
        rating: 4.5,
        image: generateImageUrl("phone", 83),
        category: "Phones"
    },
    {
        id: 84,
        name: "Oppo Find X6 Pro",
        brand: "Oppo",
        price: 899.99,
        rating: 4.4,
        image: generateImageUrl("phone", 84),
        category: "Phones"
    },
    {
        id: 85,
        name: "Vivo X100 Pro",
        brand: "Vivo",
        price: 749.99,
        rating: 4.3,
        image: generateImageUrl("phone", 85),
        category: "Phones"
    },
    {
        id: 86,
        name: "Realme GT 5 Pro",
        brand: "Realme",
        price: 599.99,
        rating: 4.4,
        image: generateImageUrl("phone", 86),
        category: "Phones"
    },
    {
        id: 87,
        name: "Nothing Phone (2)",
        brand: "Nothing",
        price: 699.99,
        rating: 4.5,
        image: generateImageUrl("phone", 87),
        category: "Phones",
        isNew: true
    },
    {
        id: 88,
        name: "ASUS ROG Phone 8",
        brand: "ASUS",
        price: 1099.99,
        rating: 4.7,
        image: generateImageUrl("gaming", 88),
        category: "Gaming"
    },
    {
        id: 89,
        name: "Razer Phone 2",
        brand: "Razer",
        price: 899.99,
        rating: 4.5,
        image: generateImageUrl("gaming", 89),
        category: "Gaming"
    },
    {
        id: 90,
        name: "Lenovo Legion Phone Duel 2",
        brand: "Lenovo",
        price: 799.99,
        rating: 4.3,
        image: generateImageUrl("gaming", 90),
        category: "Gaming"
    },
    {
        id: 91,
        name: "iPad Pro 12.9\" M2",
        brand: "Apple",
        price: 1099.99,
        rating: 4.9,
        image: generateImageUrl("tablet", 91),
        category: "Tablets"
    },
    {
        id: 92,
        name: "Surface Pro 9",
        brand: "Microsoft",
        price: 999.99,
        rating: 4.6,
        image: generateImageUrl("tablet", 92),
        category: "Tablets"
    },
    {
        id: 93,
        name: "Kindle Oasis",
        brand: "Amazon",
        price: 249.99,
        rating: 4.5,
        image: generateImageUrl("tablet", 93),
        category: "Tablets"
    },
    {
        id: 94,
        name: "Sony WH-1000XM4",
        brand: "Sony",
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.8,
        image: generateImageUrl("audio", 94),
        category: "Audio",
        isSale: true
    },
    {
        id: 95,
        name: "Bose QuietComfort 45",
        brand: "Bose",
        price: 329.99,
        rating: 4.7,
        image: generateImageUrl("audio", 95),
        category: "Audio"
    },
    {
        id: 96,
        name: "JBL Tour Pro 2",
        brand: "JBL",
        price: 249.99,
        rating: 4.4,
        image: generateImageUrl("audio", 96),
        category: "Audio"
    },
    {
        id: 97,
        name: "AirPods Pro 2",
        brand: "Apple",
        price: 249.99,
        rating: 4.8,
        image: generateImageUrl("audio", 97),
        category: "Audio"
    },
    {
        id: 98,
        name: "Dell XPS 13",
        brand: "Dell",
        price: 1199.99,
        rating: 4.7,
        image: generateImageUrl("laptop", 98),
        category: "Laptops"
    },
    {
        id: 99,
        name: "HP Spectre x360",
        brand: "HP",
        price: 1099.99,
        rating: 4.6,
        image: generateImageUrl("laptop", 99),
        category: "Laptops"
    },
    {
        id: 100,
        name: "LG Gram 17",
        brand: "LG",
        price: 1399.99,
        rating: 4.5,
        image: generateImageUrl("laptop", 100),
        category: "Laptops"
    },
    // 40 Car Products
    {
        id: 101,
        name: "Tesla Model S",
        brand: "Tesla",
        price: 74999.99,
        originalPrice: 79999.99,
        rating: 4.9,
        image: generateImageUrl("tesla", 101),
        category: "Cars",
        isSale: true,
        isNew: true
    },
    {
        id: 102,
        name: "Tesla Model 3",
        brand: "Tesla",
        price: 38999.99,
        rating: 4.8,
        image: generateImageUrl("tesla", 102),
        category: "Cars",
        isNew: true
    },
    {
        id: 103,
        name: "Tesla Model Y",
        brand: "Tesla",
        price: 42999.99,
        rating: 4.7,
        image: generateImageUrl("tesla", 103),
        category: "Cars"
    },
    {
        id: 104,
        name: "Tesla Model X",
        brand: "Tesla",
        price: 84999.99,
        originalPrice: 94999.99,
        rating: 4.6,
        image: generateImageUrl("tesla", 104),
        category: "Cars",
        isSale: true
    },
    {
        id: 105,
        name: "BMW i4",
        brand: "BMW",
        price: 51999.99,
        rating: 4.5,
        image: generateImageUrl("bmw", 105),
        category: "Cars",
        isNew: true
    },
    {
        id: 106,
        name: "BMW iX",
        brand: "BMW",
        price: 84999.99,
        rating: 4.7,
        image: generateImageUrl("bmw", 106),
        category: "Cars"
    },
    {
        id: 107,
        name: "BMW i7",
        brand: "BMW",
        price: 94999.99,
        rating: 4.8,
        image: generateImageUrl("bmw", 107),
        category: "Cars"
    },
    {
        id: 108,
        name: "Mercedes EQS",
        brand: "Mercedes-Benz",
        price: 95999.99,
        rating: 4.6,
        image: generateImageUrl("mercedes", 108),
        category: "Cars",
        isNew: true
    },
    {
        id: 109,
        name: "Mercedes EQE",
        brand: "Mercedes-Benz",
        price: 62999.99,
        rating: 4.5,
        image: generateImageUrl("mercedes", 109),
        category: "Cars"
    },
    {
        id: 110,
        name: "Mercedes EQC",
        brand: "Mercedes-Benz",
        price: 42999.99,
        rating: 4.4,
        image: generateImageUrl("mercedes", 110),
        category: "Cars"
    },
    {
        id: 111,
        name: "Audi e-tron GT",
        brand: "Audi",
        price: 102999.99,
        rating: 4.7,
        image: generateImageUrl("audi", 111),
        category: "Cars",
        isNew: true
    },
    {
        id: 112,
        name: "Audi Q4 e-tron",
        brand: "Audi",
        price: 49999.99,
        rating: 4.5,
        image: generateImageUrl("audi", 112),
        category: "Cars"
    },
    {
        id: 113,
        name: "Audi Q8 e-tron",
        brand: "Audi",
        price: 74999.99,
        rating: 4.6,
        image: generateImageUrl("audi", 113),
        category: "Cars"
    },
    {
        id: 114,
        name: "Porsche Taycan",
        brand: "Porsche",
        price: 82999.99,
        rating: 4.8,
        image: generateImageUrl("porsche", 114),
        category: "Cars",
        isNew: true
    },
    {
        id: 115,
        name: "Porsche Macan EV",
        brand: "Porsche",
        price: 62999.99,
        rating: 4.6,
        image: generateImageUrl("porsche", 115),
        category: "Cars"
    },
    {
        id: 116,
        name: "Volkswagen ID.4",
        brand: "Volkswagen",
        price: 35999.99,
        originalPrice: 39999.99,
        rating: 4.3,
        image: generateImageUrl("vw", 116),
        category: "Cars",
        isSale: true
    },
    {
        id: 117,
        name: "Volkswagen ID.7",
        brand: "Volkswagen",
        price: 42999.99,
        rating: 4.4,
        image: generateImageUrl("vw", 117),
        category: "Cars"
    },
    {
        id: 118,
        name: "Ford Mustang Mach-E",
        brand: "Ford",
        price: 42999.99,
        rating: 4.5,
        image: generateImageUrl("ford", 118),
        category: "Cars",
        isNew: true
    },
    {
        id: 119,
        name: "Ford F-150 Lightning",
        brand: "Ford",
        price: 54999.99,
        rating: 4.6,
        image: generateImageUrl("ford", 119),
        category: "Cars"
    },
    {
        id: 120,
        name: "Hyundai Ioniq 5",
        brand: "Hyundai",
        price: 38999.99,
        rating: 4.4,
        image: generateImageUrl("hyundai", 120),
        category: "Cars"
    },
    {
        id: 121,
        name: "Kia EV6",
        brand: "Kia",
        price: 35999.99,
        originalPrice: 37999.99,
        rating: 4.3,
        image: generateImageUrl("kia", 121),
        category: "Cars",
        isSale: true
    },
    {
        id: 122,
        name: "Nissan Ariya",
        brand: "Nissan",
        price: 42999.99,
        rating: 4.2,
        image: generateImageUrl("nissan", 122),
        category: "Cars"
    },
    {
        id: 123,
        name: "Lucid Air",
        brand: "Lucid Motors",
        price: 77499.99,
        rating: 4.7,
        image: generateImageUrl("lucid", 123),
        category: "Cars",
        isNew: true
    },
    {
        id: 124,
        name: "Rivian R1T",
        brand: "Rivian",
        price: 69999.99,
        rating: 4.5,
        image: generateImageUrl("rivian", 124),
        category: "Cars"
    },
    {
        id: 125,
        name: "Rivian R1S",
        brand: "Rivian",
        price: 74999.99,
        rating: 4.6,
        image: generateImageUrl("rivian", 125),
        category: "Cars"
    },
    {
        id: 126,
        name: "Genesis GV60",
        brand: "Genesis",
        price: 54999.99,
        rating: 4.4,
        image: generateImageUrl("genesis", 126),
        category: "Cars"
    },
    {
        id: 127,
        name: "Cadillac Lyriq",
        brand: "Cadillac",
        price: 61999.99,
        rating: 4.3,
        image: generateImageUrl("cadillac", 127),
        category: "Cars"
    },
    {
        id: 128,
        name: "GMC Hummer EV",
        brand: "GMC",
        price: 85999.99,
        rating: 4.2,
        image: generateImageUrl("gmc", 128),
        category: "Cars"
    },
    {
        id: 129,
        name: "Chevrolet Bolt EV",
        brand: "Chevrolet",
        price: 25999.99,
        originalPrice: 27999.99,
        rating: 4.1,
        image: generateImageUrl("chevy", 129),
        category: "Cars",
        isSale: true
    },
    {
        id: 130,
        name: "Toyota bZ4X",
        brand: "Toyota",
        price: 38999.99,
        rating: 4.5,
        image: generateImageUrl("toyota", 130),
        category: "Cars",
        isNew: true
    },
    {
        id: 131,
        name: "Honda Prologue",
        brand: "Honda",
        price: 34999.99,
        rating: 4.3,
        image: generateImageUrl("honda", 131),
        category: "Cars"
    },
    {
        id: 132,
        name: "Mazda MX-30",
        brand: "Mazda",
        price: 32999.99,
        rating: 4.2,
        image: generateImageUrl("mazda", 132),
        category: "Cars"
    },
    {
        id: 133,
        name: "Subaru Solterra",
        brand: "Subaru",
        price: 37999.99,
        rating: 4.1,
        image: generateImageUrl("subaru", 133),
        category: "Cars"
    },
    {
        id: 134,
        name: "Mini Cooper SE",
        brand: "Mini",
        price: 29999.99,
        rating: 4.0,
        image: generateImageUrl("mini", 134),
        category: "Cars"
    },
    {
        id: 135,
        name: "Volvo XC40 Recharge",
        brand: "Volvo",
        price: 41999.99,
        rating: 4.3,
        image: generateImageUrl("volvo", 135),
        category: "Cars"
    },
    {
        id: 136,
        name: "Jaguar I-PACE",
        brand: "Jaguar",
        price: 64999.99,
        rating: 4.4,
        image: generateImageUrl("jaguar", 136),
        category: "Cars"
    },
    {
        id: 137,
        name: "Land Rover Range Rover EV",
        brand: "Land Rover",
        price: 98999.99,
        rating: 4.6,
        image: generateImageUrl("landrover", 137),
        category: "Cars"
    },
    {
        id: 138,
        name: "Fisker Ocean",
        brand: "Fisker",
        price: 32999.99,
        rating: 4.2,
        image: generateImageUrl("fisker", 138),
        category: "Cars",
        isNew: true
    },
    {
        id: 139,
        name: "Polestar 2",
        brand: "Polestar",
        price: 45999.99,
        rating: 4.3,
        image: generateImageUrl("polestar", 139),
        category: "Cars"
    },
    {
        id: 140,
        name: "Smart EQ Fortwo",
        brand: "Smart",
        price: 24999.99,
        rating: 3.9,
        image: generateImageUrl("smart", 140),
        category: "Cars"
    }
];

export const fetchProducts = (
    page: number = 1,
    limit: number = 10,
    brand?: string,
    category?: string
): Promise<{ products: Product[], total: number }> => {
    return new Promise((resolve) => {
        // Reduced delay for better UX and reliability
        setTimeout(() => {
            let filteredProducts = [...products];

            if (brand && brand !== 'all') {
                filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
            }

            if (category && category !== 'all') {
                filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
            }

            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedProducts = filteredProducts.slice(start, end);

            resolve({
                products: paginatedProducts,
                total: filteredProducts.length
            });
        }, 100);
    });
};

// Blog Data
export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "The Future of Smart Homes: Top Trends for 2024",
        excerpt: "Discover how AI and IoT are transforming our living spaces into intelligent environments.",
        content: `
# The Revolution of Living Spaces

AI and IoT have moved beyond being just buzzwords. Today, they are the backbone of the modern home. In 2024, we're seeing an unprecedented shift from "connected" to "intelligent" homes.

### Proactive Intelligence
The next generation of smart home devices doesn't just wait for your command; it anticipates your needs. Imagine your coffee machine starting as your alarm detects you've woken up, or your lighting adjusting based on the time of day and your specific mood.

### Efficiency and Sustainability
Smart thermostats and energy monitors are becoming more sophisticated, learning your habits to minimize waste and lower bills without sacrificing comfort.

### Enhanced Security
Biometric locks and AI-powered security cameras offer a new level of peace of mind, distinguishing between residents, guests, and potential intruders with incredible accuracy.
        `,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "Oct 20, 2023",
        author: "Alex Rivers",
        authorRole: "Senior Tech Analyst",
        authorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
        category: "Tech News",
        readTime: "5 min read",
        tags: ["Smart Home", "AI", "IoT", "2024 Trends"]
    },
    {
        id: 2,
        title: "Sony vs Bose: Which Headphones Should You Choose?",
        excerpt: "An in-depth comparison of the latest noise-canceling flagships in the audio world.",
        content: `
# The Battle for Audio Supremacy

Choosing between Sony and Bose has never been harder. Both brands have recently released their flagship noise-canceling headphones, and the competition is fierce.

### Sound Quality
Sony tends to favor a slightly more bass-heavy, dynamic sound signature, while Bose aims for a more balanced and neutral frequency response. Your preference will depend on your musical tastes.

### Noise Cancellation
Bose has long been the king of ANC, but Sony's latest models are closing the gap rapidly. In some high-frequency scenarios, Sony actually manages to edge ahead.

### Comfort and Design
The Bose QuietComfort series lives up to its name with a lightweight, ergonomic design. Sony's WH-1000XM series feels premium and sturdy but can be slightly heavier for long listening sessions.
        `,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "Oct 18, 2023",
        author: "Sarah Chen",
        authorRole: "Audio Specialist",
        authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
        category: "Comparison",
        readTime: "8 min read",
        tags: ["Audio", "Headphones", "Sony", "Bose", "Review"]
    },
    {
        id: 3,
        title: "Revolutionizing Photography with Panasonic Lumix S5II",
        excerpt: "Why this camera is a game-changer for both videographers and photographers alike.",
        content: `
# The New Era of Hybrid Shooting

Panasonic has finally answered the prayers of hybrid shooters everywhere with the Lumix S5II, introducing Phase Hybrid AF into their full-frame mirrorless lineup.

### Phase Hybrid AF
The headline feature is the autofocus. It's fast, reliable, and keeps track of subjects with impressive tenacity, even in challenging lighting conditions.

### Video Capabilities
Panasonic's legacy in video shines through. With internal 6K recording, incredible stabilization, and professional-grade color tools, it's a powerhouse for small-to-medium productions.

### Handling and Ergonomics
The S5II feels like a tool designed by photographers for photographers. The dials are intuitive, the grip is secure, and the weather-sealed body inspires confidence in the field.
        `,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "Oct 15, 2023",
        author: "Mark Evans",
        authorRole: "Professional Photographer",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
        category: "Cameras",
        readTime: "6 min read",
        tags: ["Panasonic", "Mirrorless", "Hybrid Camera", "Photography", "Videography"]
    }
];

export const fetchBlogPosts = (): Promise<BlogPost[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(blogPosts);
        }, 100);
    });
};

export const fetchBlogPostById = (id: number): Promise<BlogPost | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(blogPosts.find(post => post.id === id));
        }, 100);
    });
};

// User Stories Data Helpers (Adding these for upcoming features)
export const fetchPoints = (): number => {
    const points = localStorage.getItem('electro_points');
    return points ? parseInt(points) : 500; // Starting bonus
};

export const addPoints = (amount: number) => {
    const current = fetchPoints();
    localStorage.setItem('electro_points', (current + amount).toString());
};
