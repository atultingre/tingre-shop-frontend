// ProductList.js
import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import api from "../../config/api";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space } from 'antd';

const ProductList = () => {
  const { fetchProducts, products } = useStore();
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const deleteProduct = async (productId) => {
    try {
      const response = await api("POST", `/product/remove`, {
        id: productId,
      });
      if (response.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product); // Set the product to be edited
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img src={record.image} alt={record.name} style={{ width: 100 }} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => deleteProduct(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => navigate("/add")}>Add Product</Button>
      <Table columns={columns} dataSource={products} rowKey="_id" />
      {editingProduct && <ProductForm initialValues={editingProduct} />}
    </div>
  );
};

export default ProductList;
