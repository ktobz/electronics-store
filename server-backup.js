const express = require('express');
const cors = require('cors');

// Mock products data
const products = [
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
        image: "https://picsum.photos/seed/galaxys24/400/300.jpg",
        category: "Phones",
        isNew: true
    },
    {
        id: 3,
        name: "WH-1000XM5 Headphones",
        brand: "Sony",
        price: 349.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/sonyheadphones/400/300.jpg",
        category: "Audio"
    },
    {
        id: 4,
        name: "MacBook Pro M3",
        brand: "Apple",
        price: 1999.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/macbookpro/400/300.jpg",
        category: "Laptops"
    },
    {
        id: 5,
        name: "PlayStation 5",
        brand: "Sony",
        price: 499.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/ps5console/400/300.jpg",
        category: "Gaming"
    },
    {
        id: 6,
        name: "Pixel 8 Pro",
        brand: "Google",
        price: 899.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/pixel8pro/400/300.jpg",
        category: "Phones",
        isSale: true
    },
    {
        id: 7,
        name: "Watch Series 9",
        brand: "Apple",
        price: 399.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/applewatch9/400/300.jpg",
        category: "Wearables"
    },
    {
        id: 8,
        name: "QuietComfort Ultra",
        brand: "Bose",
        price: 429.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/boseqc/400/300.jpg",
        category: "Audio"
    },
    {
        id: 9,
        name: "Surface Laptop 5",
        brand: "Microsoft",
        price: 1299.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/surfacelaptop/400/300.jpg",
        category: "Laptops"
    },
    {
        id: 10,
        name: "ROG Ally",
        brand: "ASUS",
        price: 699.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/rogally/400/300.jpg",
        category: "Gaming"
    },
    {
        id: 11,
        name: "Panasonic Lumix S5II",
        brand: "Panasonic",
        price: 1999.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/lumixs5/400/300.jpg",
        category: "Cameras"
    },
    {
        id: 12,
        name: "Panasonic OLED TV",
        brand: "Panasonic",
        price: 1499.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/panasonictv/400/300.jpg",
        category: "TVs"
    },
    {
        id: 13,
        name: "Panasonic Microwave",
        brand: "Panasonic",
        price: 249.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/panasonicmicrowave/400/300.jpg",
        category: "Appliances"
    },
    {
        id: 14,
        name: "Panasonic Air Purifier",
        brand: "Panasonic",
        price: 299.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/panasonicpurifier/400/300.jpg",
        category: "Appliances"
    },
    {
        id: 15,
        name: "Panasonic Earbuds",
        brand: "Panasonic",
        price: 129.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/panasonicearbuds/400/300.jpg",
        category: "Audio"
    },
    {
        id: 16,
        name: "Panasonic Beard Trimmer",
        brand: "Panasonic",
        price: 89.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/panasonictrimmer/400/300.jpg",
        category: "Grooming"
    },
    {
        id: 17,
        name: "Panasonic Rice Cooker",
        brand: "Panasonic",
        price: 159.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/panasoniccooker/400/300.jpg",
        category: "Appliances"
    },
    {
        id: 18,
        name: "Panasonic Cordless Phone",
        brand: "Panasonic",
        price: 59.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/panasonicphone/400/300.jpg",
        category: "Communication"
    },
    {
        id: 19,
        name: "Panasonic Bread Maker",
        brand: "Panasonic",
        price: 199.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/panasonicbread/400/300.jpg",
        category: "Appliances"
    },
    {
        id: 20,
        name: "Panasonic Hair Dryer",
        brand: "Panasonic",
        price: 79.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/panasonicdryer/400/300.jpg",
        category: "Grooming"
    },
    {
        id: 21,
        name: "Galaxy Z Fold 5",
        brand: "Samsung",
        price: 1799.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/galaxyfold5/400/300.jpg",
        category: "Phones",
        isNew: true
    },
    {
        id: 22,
        name: "Samsung Neo QLED 8K",
        brand: "Samsung",
        price: 2999.99,
        rating: 5.0,
        image: "https://picsum.photos/seed/samsungqled/400/300.jpg",
        category: "TVs"
    },
    {
        id: 23,
        name: "Samsung Galaxy Tab S9",
        brand: "Samsung",
        price: 799.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/galaxytabs9/400/300.jpg",
        category: "Tablets"
    },
    {
        id: 24,
        name: "Samsung Galaxy Watch 6",
        brand: "Samsung",
        price: 299.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/galaxywatch6/400/300.jpg",
        category: "Wearables"
    },
    {
        id: 25,
        name: "Samsung Odyssey G9",
        brand: "Samsung",
        price: 1299.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/odysseyg9/400/300.jpg",
        category: "Monitors"
    },
    {
        id: 26,
        name: "Samsung 990 Pro SSD",
        brand: "Samsung",
        price: 169.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/samsungssd/400/300.jpg",
        category: "Components"
    },
    {
        id: 27,
        name: "Samsung Galaxy Buds2 Pro",
        brand: "Samsung",
        price: 229.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/galaxybuds2/400/300.jpg",
        category: "Audio"
    },
    {
        id: 28,
        name: "Samsung Smart Fridge",
        brand: "Samsung",
        price: 2499.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/samsungfridge/400/300.jpg",
        category: "Appliances"
    },
    {
        id: 29,
        name: "Samsung Jet Bot AI+",
        brand: "Samsung",
        price: 899.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/samsungrobot/400/300.jpg",
        category: "Appliances"
    },
    {
        id: 30,
        name: "Samsung Soundbar Q990C",
        brand: "Samsung",
        price: 1399.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/samsungsoundbar/400/300.jpg",
        category: "Audio"
    },
    // 20 Additional Samsung Products
    {
        id: 61,
        name: "Samsung Galaxy Watch 6 Classic",
        brand: "Samsung",
        price: 399.99,
        originalPrice: 449.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/galaxywatch6/400/300.jpg",
        category: "Wearables",
        isSale: true
    },
    {
        id: 62,
        name: "Samsung Galaxy Tab S9 Ultra",
        brand: "Samsung",
        price: 1099.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/tabs9ultra/400/300.jpg",
        category: "Tablets",
        isNew: true
    },
    {
        id: 63,
        name: "Samsung Galaxy A54 5G",
        brand: "Samsung",
        price: 449.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/galaxya54/400/300.jpg",
        category: "Phones"
    },
    {
        id: 64,
        name: "Samsung Galaxy Buds2 Pro",
        brand: "Samsung",
        price: 229.99,
        originalPrice: 279.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/buds2pro/400/300.jpg",
        category: "Audio",
        isSale: true
    },
    {
        id: 65,
        name: "Samsung Smart Monitor M8",
        brand: "Samsung",
        price: 699.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/monitorm8/400/300.jpg",
        category: "Monitors"
    },
    {
        id: 66,
        name: "Samsung Galaxy S23 FE",
        brand: "Samsung",
        price: 599.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/galaxys23fe/400/300.jpg",
        category: "Phones",
        isNew: true
    },
    {
        id: 67,
        name: "Samsung Galaxy Book3 Pro",
        brand: "Samsung",
        price: 1399.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/galaxybook3/400/300.jpg",
        category: "Laptops"
    },
    {
        id: 68,
        name: "Samsung Galaxy Fit3",
        brand: "Samsung",
        price: 99.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/galaxyfit3/400/300.jpg",
        category: "Wearables"
    },
    {
        id: 69,
        name: "Samsung Galaxy A34 5G",
        brand: "Samsung",
        price: 349.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/galaxya34/400/300.jpg",
        category: "Phones"
    },
    {
        id: 70,
        name: "Samsung SmartThings Hub",
        brand: "Samsung",
        price: 149.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/smartthings/400/300.jpg",
        category: "Smart Home"
    },
    {
        id: 71,
        name: "Samsung Galaxy Tab A9+",
        brand: "Samsung",
        price: 279.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/taba9plus/400/300.jpg",
        category: "Tablets"
    },
    {
        id: 72,
        name: "Samsung Galaxy S23 Ultra",
        brand: "Samsung",
        price: 999.99,
        originalPrice: 1199.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/galaxys23ultra/400/300.jpg",
        category: "Phones",
        isSale: true
    },
    {
        id: 73,
        name: "Samsung Galaxy Watch5 Pro",
        brand: "Samsung",
        price: 349.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/watch5pro/400/300.jpg",
        category: "Wearables"
    },
    {
        id: 74,
        name: "Samsung Galaxy Tab S9 FE",
        brand: "Samsung",
        price: 449.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/tabs9fe/400/300.jpg",
        category: "Tablets",
        isNew: true
    },
    {
        id: 75,
        name: "Samsung Galaxy A14 5G",
        brand: "Samsung",
        price: 199.99,
        rating: 4.2,
        image: "https://picsum.photos/seed/galaxya14/400/300.jpg",
        category: "Phones"
    },
    {
        id: 76,
        name: "Samsung Galaxy Buds FE",
        brand: "Samsung",
        price: 99.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/budsfe/400/300.jpg",
        category: "Audio"
    },
    {
        id: 77,
        name: "Samsung Smart TV Q60C",
        brand: "Samsung",
        price: 599.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/tvq60c/400/300.jpg",
        category: "TVs"
    },
    {
        id: 78,
        name: "Samsung Galaxy A24",
        brand: "Samsung",
        price: 279.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/galaxya24/400/300.jpg",
        category: "Phones"
    },
    {
        id: 79,
        name: "Samsung Galaxy Tab Active Pro",
        brand: "Samsung",
        price: 699.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/tabactivepro/400/300.jpg",
        category: "Tablets"
    },
    {
        id: 80,
        name: "Samsung Galaxy Watch4 Classic",
        brand: "Samsung",
        price: 249.99,
        originalPrice: 349.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/watch4classic/400/300.jpg",
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
        image: "https://picsum.photos/seed/pixel8pro/400/300.jpg",
        category: "Phones",
        isNew: true
    },
    {
        id: 82,
        name: "OnePlus 12",
        brand: "OnePlus",
        price: 799.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/oneplus12/400/300.jpg",
        category: "Phones"
    },
    {
        id: 83,
        name: "Xiaomi 14 Pro",
        brand: "Xiaomi",
        price: 699.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/xiaomi14pro/400/300.jpg",
        category: "Phones"
    },
    {
        id: 84,
        name: "Oppo Find X6 Pro",
        brand: "Oppo",
        price: 899.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/oppofindx6/400/300.jpg",
        category: "Phones"
    },
    {
        id: 85,
        name: "Vivo X100 Pro",
        brand: "Vivo",
        price: 749.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/vivox100/400/300.jpg",
        category: "Phones"
    },
    {
        id: 86,
        name: "Realme GT 5 Pro",
        brand: "Realme",
        price: 599.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/realme5pro/400/300.jpg",
        category: "Phones"
    },
    {
        id: 87,
        name: "Nothing Phone (2)",
        brand: "Nothing",
        price: 699.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/nothingphone2/400/300.jpg",
        category: "Phones",
        isNew: true
    },
    {
        id: 88,
        name: "ASUS ROG Phone 8",
        brand: "ASUS",
        price: 1099.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/rogphone8/400/300.jpg",
        category: "Gaming"
    },
    {
        id: 89,
        name: "Razer Phone 2",
        brand: "Razer",
        price: 899.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/razerphone2/400/300.jpg",
        category: "Gaming"
    },
    {
        id: 90,
        name: "Lenovo Legion Phone Duel 2",
        brand: "Lenovo",
        price: 799.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/legionphone2/400/300.jpg",
        category: "Gaming"
    },
    {
        id: 91,
        name: "iPad Pro 12.9\" M2",
        brand: "Apple",
        price: 1099.99,
        rating: 4.9,
        image: "https://picsum.photos/seed/ipadprom2/400/300.jpg",
        category: "Tablets"
    },
    {
        id: 92,
        name: "Surface Pro 9",
        brand: "Microsoft",
        price: 999.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/surfacepro9/400/300.jpg",
        category: "Tablets"
    },
    {
        id: 93,
        name: "Kindle Oasis",
        brand: "Amazon",
        price: 249.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/kindleoasis/400/300.jpg",
        category: "Tablets"
    },
    {
        id: 94,
        name: "Sony WH-1000XM4",
        brand: "Sony",
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/sonyxm4/400/300.jpg",
        category: "Audio",
        isSale: true
    },
    {
        id: 95,
        name: "Bose QuietComfort 45",
        brand: "Bose",
        price: 329.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/boseqc45/400/300.jpg",
        category: "Audio"
    },
    {
        id: 96,
        name: "JBL Tour Pro 2",
        brand: "JBL",
        price: 249.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/jbltourpro2/400/300.jpg",
        category: "Audio"
    },
    {
        id: 97,
        name: "AirPods Pro 2",
        brand: "Apple",
        price: 249.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/airpodspro2/400/300.jpg",
        category: "Audio"
    },
    {
        id: 98,
        name: "Dell XPS 13",
        brand: "Dell",
        price: 1199.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/dellxps13/400/300.jpg",
        category: "Laptops"
    },
    {
        id: 99,
        name: "HP Spectre x360",
        brand: "HP",
        price: 1099.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/hpspectre/400/300.jpg",
        category: "Laptops"
    },
    {
        id: 100,
        name: "LG Gram 17",
        brand: "LG",
        price: 1399.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/lggram17/400/300.jpg",
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
        image: "https://picsum.photos/seed/teslas/400/300.jpg",
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
        image: "https://picsum.photos/seed/tesla3/400/300.jpg",
        category: "Cars",
        isNew: true
    },
    {
        id: 103,
        name: "Tesla Model Y",
        brand: "Tesla",
        price: 42999.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/teslay/400/300.jpg",
        category: "Cars"
    },
    {
        id: 104,
        name: "Tesla Model X",
        brand: "Tesla",
        price: 84999.99,
        originalPrice: 94999.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/teslax/400/300.jpg",
        category: "Cars",
        isSale: true
    },
    {
        id: 105,
        name: "BMW i4",
        brand: "BMW",
        price: 51999.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/bmwi4/400/300.jpg",
        category: "Cars",
        isNew: true
    },
    {
        id: 106,
        name: "BMW iX",
        brand: "BMW",
        price: 84999.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/bmwix/400/300.jpg",
        category: "Cars"
    },
    {
        id: 107,
        name: "BMW i7",
        brand: "BMW",
        price: 94999.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/bmwi7/400/300.jpg",
        category: "Cars"
    },
    {
        id: 108,
        name: "Mercedes EQS",
        brand: "Mercedes-Benz",
        price: 95999.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/mercedeseqs/400/300.jpg",
        category: "Cars",
        isNew: true
    },
    {
        id: 109,
        name: "Mercedes EQE",
        brand: "Mercedes-Benz",
        price: 62999.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/mercedeseqe/400/300.jpg",
        category: "Cars"
    },
    {
        id: 110,
        name: "Mercedes EQC",
        brand: "Mercedes-Benz",
        price: 42999.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/mercedeseqc/400/300.jpg",
        category: "Cars"
    },
    {
        id: 111,
        name: "Audi e-tron GT",
        brand: "Audi",
        price: 102999.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/audietron/400/300.jpg",
        category: "Cars",
        isNew: true
    },
    {
        id: 112,
        name: "Audi Q4 e-tron",
        brand: "Audi",
        price: 49999.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/audiq4/400/300.jpg",
        category: "Cars"
    },
    {
        id: 113,
        name: "Audi Q8 e-tron",
        brand: "Audi",
        price: 74999.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/audiq8/400/300.jpg",
        category: "Cars"
    },
    {
        id: 114,
        name: "Porsche Taycan",
        brand: "Porsche",
        price: 82999.99,
        rating: 4.8,
        image: "https://picsum.photos/seed/porschetaycan/400/300.jpg",
        category: "Cars",
        isNew: true
    },
    {
        id: 115,
        name: "Porsche Macan EV",
        brand: "Porsche",
        price: 62999.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/porschemacan/400/300.jpg",
        category: "Cars"
    },
    {
        id: 116,
        name: "Volkswagen ID.4",
        brand: "Volkswagen",
        price: 35999.99,
        originalPrice: 39999.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/vwid4/400/300.jpg",
        category: "Cars",
        isSale: true
    },
    {
        id: 117,
        name: "Volkswagen ID.7",
        brand: "Volkswagen",
        price: 42999.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/vwid7/400/300.jpg",
        category: "Cars"
    },
    {
        id: 118,
        name: "Ford Mustang Mach-E",
        brand: "Ford",
        price: 42999.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/fordmustange/400/300.jpg",
        category: "Cars",
        isNew: true
    },
    {
        id: 119,
        name: "Ford F-150 Lightning",
        brand: "Ford",
        price: 54999.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/fordf150/400/300.jpg",
        category: "Cars"
    },
    {
        id: 120,
        name: "Hyundai Ioniq 5",
        brand: "Hyundai",
        price: 38999.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/hyundaiioniq5/400/300.jpg",
        category: "Cars"
    },
    {
        id: 121,
        name: "Kia EV6",
        brand: "Kia",
        price: 35999.99,
        originalPrice: 37999.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/kiaev6/400/300.jpg",
        category: "Cars",
        isSale: true
    },
    {
        id: 122,
        name: "Nissan Ariya",
        brand: "Nissan",
        price: 42999.99,
        rating: 4.2,
        image: "https://picsum.photos/seed/nissanariya/400/300.jpg",
        category: "Cars"
    },
    {
        id: 123,
        name: "Lucid Air",
        brand: "Lucid Motors",
        price: 77499.99,
        rating: 4.7,
        image: "https://picsum.photos/seed/lucidair/400/300.jpg",
        category: "Cars",
        isNew: true
    },
    {
        id: 124,
        name: "Rivian R1T",
        brand: "Rivian",
        price: 69999.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/rivianr1t/400/300.jpg",
        category: "Cars"
    },
    {
        id: 125,
        name: "Rivian R1S",
        brand: "Rivian",
        price: 74999.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/rivianr1s/400/300.jpg",
        category: "Cars"
    },
    {
        id: 126,
        name: "Genesis GV60",
        brand: "Genesis",
        price: 54999.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/genesisgv60/400/300.jpg",
        category: "Cars"
    },
    {
        id: 127,
        name: "Cadillac Lyriq",
        brand: "Cadillac",
        price: 61999.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/cadillacclyriq/400/300.jpg",
        category: "Cars"
    },
    {
        id: 128,
        name: "GMC Hummer EV",
        brand: "GMC",
        price: 85999.99,
        rating: 4.2,
        image: "https://picsum.photos/seed/gmchummer/400/300.jpg",
        category: "Cars"
    },
    {
        id: 129,
        name: "Chevrolet Bolt EV",
        brand: "Chevrolet",
        price: 25999.99,
        originalPrice: 27999.99,
        rating: 4.1,
        image: "https://picsum.photos/seed/chevrolt/400/300.jpg",
        category: "Cars",
        isSale: true
    },
    {
        id: 130,
        name: "Toyota bZ4X",
        brand: "Toyota",
        price: 38999.99,
        rating: 4.5,
        image: "https://picsum.photos/seed/toyotabz4x/400/300.jpg",
        category: "Cars",
        isNew: true
    },
    {
        id: 131,
        name: "Honda Prologue",
        brand: "Honda",
        price: 34999.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/hondaprologue/400/300.jpg",
        category: "Cars"
    },
    {
        id: 132,
        name: "Mazda MX-30",
        brand: "Mazda",
        price: 32999.99,
        rating: 4.2,
        image: "https://picsum.photos/seed/mazdamx30/400/300.jpg",
        category: "Cars"
    },
    {
        id: 133,
        name: "Subaru Solterra",
        brand: "Subaru",
        price: 37999.99,
        rating: 4.1,
        image: "https://picsum.photos/seed/subarusolterra/400/300.jpg",
        category: "Cars"
    },
    {
        id: 134,
        name: "Mini Cooper SE",
        brand: "Mini",
        price: 29999.99,
        rating: 4.0,
        image: "https://picsum.photos/seed/minicooperse/400/300.jpg",
        category: "Cars"
    },
    {
        id: 135,
        name: "Volvo XC40 Recharge",
        brand: "Volvo",
        price: 41999.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/volvoxc40/400/300.jpg",
        category: "Cars"
    },
    {
        id: 136,
        name: "Jaguar I-PACE",
        brand: "Jaguar",
        price: 64999.99,
        rating: 4.4,
        image: "https://picsum.photos/seed/jaguaripace/400/300.jpg",
        category: "Cars"
    },
    {
        id: 137,
        name: "Land Rover Range Rover EV",
        brand: "Land Rover",
        price: 98999.99,
        rating: 4.6,
        image: "https://picsum.photos/seed/landrover/400/300.jpg",
        category: "Cars"
    },
    {
        id: 138,
        name: "Fisker Ocean",
        brand: "Fisker",
        price: 32999.99,
        rating: 4.2,
        image: "https://picsum.photos/seed/fiskerocean/400/300.jpg",
        category: "Cars",
        isNew: true
    },
    {
        id: 139,
        name: "Polestar 2",
        brand: "Polestar",
        price: 45999.99,
        rating: 4.3,
        image: "https://picsum.photos/seed/polestar2/400/300.jpg",
        category: "Cars"
    },
    {
        id: 140,
        name: "Smart EQ Fortwo",
        brand: "Smart",
        price: 24999.99,
        rating: 3.9,
        image: "https://picsum.photos/seed/smarteq/400/300.jpg",
        category: "Cars"
    }
];

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Products API
app.get('/api/products', async (req, res) => {
    await delay(200);
    
    let filteredProducts = [...products];
    const { page = 1, limit = 10, category, brand, minPrice, maxPrice, search, sortBy = 'rating', sortOrder = 'desc' } = req.query;
    
    // Apply filters
    if (brand && brand !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower) ||
            p.brand.toLowerCase().includes(searchLower)
        );
    }
    
    // Apply sorting
    filteredProducts.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];
        
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (sortOrder === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.json({
        products: paginatedProducts,
        total: filteredProducts.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(filteredProducts.length / limit)
    });
});

app.get('/api/products/:id', async (req, res) => {
    await delay(100);
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
});

app.get('/api/products/featured', async (req, res) => {
    await delay(150);
    const { limit = 8 } = req.query;
    
    const featured = products
        .filter(p => p.rating >= 4.5)
        .slice(0, parseInt(limit));
    
    res.json({
        products: featured,
        total: featured.length
    });
});

app.get('/api/products/sale', async (req, res) => {
    await delay(150);
    const { limit = 10 } = req.query;
    
    const saleProducts = products
        .filter(p => p.isSale)
        .slice(0, parseInt(limit));
    
    res.json({
        products: saleProducts,
        total: saleProducts.length
    });
});

app.get('/api/products/new', async (req, res) => {
    await delay(150);
    const { limit = 10 } = req.query;
    
    const newProducts = products
        .filter(p => p.isNew)
        .slice(0, parseInt(limit));
    
    res.json({
        products: newProducts,
        total: newProducts.length
    });
});

app.get('/api/products/:id/related', async (req, res) => {
    await delay(100);
    const product = products.find(p => p.id === parseInt(req.params.id));
    const { limit = 4 } = req.query;
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    const related = products
        .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
        .slice(0, parseInt(limit));
    
    res.json({
        products: related,
        total: related.length
    });
});

// Categories API
app.get('/api/categories', async (req, res) => {
    await delay(100);
    const categories = [...new Set(products.map(p => p.category))];
    res.json(categories);
});

// Brand-specific endpoints
app.get('/api/brands/samsung', async (req, res) => {
    await delay(200);
    const { page = 1, limit = 10, category, minPrice, maxPrice } = req.query;
    
    let samsungProducts = products.filter(p => p.brand.toLowerCase() === 'samsung');
    
    if (category && category !== 'all') {
        samsungProducts = samsungProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    if (minPrice) {
        samsungProducts = samsungProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
        samsungProducts = samsungProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = samsungProducts.slice(startIndex, endIndex);
    
    res.json({
        products: paginatedProducts,
        total: samsungProducts.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(samsungProducts.length / limit),
        brand: 'Samsung'
    });
});

app.get('/api/brands/panasonic', async (req, res) => {
    await delay(200);
    const { page = 1, limit = 10, category, minPrice, maxPrice } = req.query;
    
    let panasonicProducts = products.filter(p => p.brand.toLowerCase() === 'panasonic');
    
    if (category && category !== 'all') {
        panasonicProducts = panasonicProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    if (minPrice) {
        panasonicProducts = panasonicProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
        panasonicProducts = panasonicProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = panasonicProducts.slice(startIndex, endIndex);
    
    res.json({
        products: paginatedProducts,
        total: panasonicProducts.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(panasonicProducts.length / limit),
        brand: 'Panasonic'
    });
});

// Brands API
app.get('/api/brands', async (req, res) => {
    await delay(100);
    const brands = [...new Set(products.map(p => p.brand))];
    res.json(brands);
});

// Search API
app.get('/api/search', async (req, res) => {
    await delay(200);
    const { q, page = 1, limit = 10, category, brand } = req.query;
    
    if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
    }
    
    let searchResults = products.filter(p => 
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase()) ||
        p.brand.toLowerCase().includes(q.toLowerCase())
    );
    
    if (category && category !== 'all') {
        searchResults = searchResults.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    if (brand && brand !== 'all') {
        searchResults = searchResults.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedResults = searchResults.slice(startIndex, endIndex);
    
    res.json({
        products: paginatedResults,
        total: searchResults.length,
        query: q,
        page: parseInt(page),
        limit: parseInt(limit)
    });
});

app.get('/api/search/suggestions', async (req, res) => {
    await delay(100);
    const { q } = req.query;
    
    if (!q) {
        return res.json([]);
    }
    
    const suggestions = products
        .filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 5)
        .map(p => p.name);
    
    res.json(suggestions);
});

app.get('/api/search/popular', async (req, res) => {
    await delay(100);
    res.json([
        'iPhone', 'Samsung', 'Laptop', 'Headphones', 'Gaming',
        'Smart Watch', 'Tablet', 'Camera', 'TV', 'Speaker'
    ]);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📦 Products endpoint: http://localhost:${PORT}/api/products`);
    console.log(`🔍 Search endpoint: http://localhost:${PORT}/api/search`);
});
