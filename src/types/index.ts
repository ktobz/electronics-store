export interface Product {
    _id?: string;
    id?: number;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;
    images?: string[];
    category: string;
    isSale?: boolean;
    isNew?: boolean;
    brand: string;
    reviews: number;
    inStock?: boolean;
    featured?: boolean;
    specifications?: any;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    avatar: string;
    role: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface BlogPost {
    _id?: string;
    id?: number;
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    image: string;
    date?: string;
    publishedAt?: string;
    author: string;
    authorRole?: string;
    authorImage?: string;
    authorAvatar?: string;
    category: string;
    readTime: string | number;
    tags: string[];
    featured?: boolean;
    likes?: number;
    views?: number;
}

export interface ApiResponse<T> {
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    items?: T[];
    products?: T[];
    blogs?: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems?: number;
        totalProducts?: number;
        totalBlogs?: number;
        hasNext?: boolean;
        hasPrev?: boolean;
    };
}
