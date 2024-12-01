'use client';

import { Product } from "@/lib/types";

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">ID</th>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Description</th>
          <th className="border border-gray-300 p-2">Price</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.id}>
            <td className="border border-gray-300 p-2">{product.id}</td>
            <td className="border border-gray-300 p-2">{product.name}</td>
            <td className="border border-gray-300 p-2">{product.description}</td>
            <td className="border border-gray-300 p-2">${product.price}</td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => onEdit(product)}
                className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
