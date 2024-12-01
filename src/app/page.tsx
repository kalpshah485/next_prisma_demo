"use client";

import { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import { Product } from "@/lib/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCreateOrUpdate = async (data: Partial<Product>) => {
    const method = selectedProduct ? "PUT" : "POST";
    const url = selectedProduct
      ? `/api/products/${selectedProduct.id}`
      : "/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setProducts(await res.json());
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Product
        </button>
      </div>
      <ProductTable
        products={products}
        onEdit={(p) => {
          setSelectedProduct(p);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        product={selectedProduct}
      />
    </div>
  );
}
