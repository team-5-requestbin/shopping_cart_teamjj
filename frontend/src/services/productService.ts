import axios from "axios";
import {
  productSchema,
  productsSchema,
  Product,
  NewProduct,
  EditedProduct,
  ProductAndItem,
  productAndItemSchema,
} from "../types";
/* 
## 1.1. GET /api/products

## 1.2. POST /api/products

## 1.3. PUT /api/products/:id

## 1.4. DELETE /api/products/:id


## 1.5. GET /api/cart

## 1.6. POST /api/checkout

## 1.7. POST /api/add-to-cart

*/

const BASE_URL = `http://localhost:5001/api`;

const getProducts = async () => {
  const { data } = await axios.get<Product[]>(`${BASE_URL}/products`);
  return productsSchema.parse(data);
};

const addProduct = async (rawProduct: NewProduct) => {
  const { data } = await axios.post<Product>(`${BASE_URL}/products`, {
    ...rawProduct,
  });
  return productSchema.parse(data);
};

const editProduct = async (editedProduct: EditedProduct) => {
  const { data } = await axios.put<Product>(
    `${BASE_URL}/products/${editedProduct._id}`,
    { ...editedProduct }
  );

  return productSchema.parse(data);
};

const deleteProduct = async (id: string) => {
  await axios.delete(`${BASE_URL}/products/${id}`);
};

const addToCart = async (productId: string) => {
  const { data } = await axios.post<ProductAndItem>(`${BASE_URL}/add-to-cart`, {
    productId,
  });
  return productAndItemSchema.parse(data);
};

const getCart = async () => {
  const { data } = await axios.get(`${BASE_URL}/`);
};
const resetCart = async () => {
  const { data } = await axios.post(`${BASE_URL}/`);
};

export default {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getCart,
  resetCart,
  addToCart,
};
