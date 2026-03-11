export interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    createdAt?: string;
}

export interface LoginResponse {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    token: string;
}

export interface Category {
    id: string;
    name: string;
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category_id: string;
    createdAt: string;
    banner: string;
    disabled: boolean;
    category?: Category;
}

export interface Order {
    id: string;
    table: number;
    name?: string | null;
    draft: boolean;
    status: boolean;
    createdAt: string;
    items?: Item[];
}

export interface Item {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    createdAt: string;
    product: Product;
}

export interface CreateOrderRequest {
    table: number;
    name?: string;
}

export interface AddItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
}

export interface SendOrderRequest {
    order_id: string;
}
