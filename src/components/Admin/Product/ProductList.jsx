// ProductList.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space } from "antd";
import { useStore } from "../../../context/StoreContext";
import api from "../../../config/api";
import AddProduct from "./AddProduct";

const ProductList = () => {
  const { fetchProducts, products, isAdmin } = useStore();
  console.log("isAdmin: ", isAdmin);
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
    setEditingProduct(product);
  };

  let columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img src={record.image} alt={record.name} style={{ width: 100 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => deleteProduct(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  if (!isAdmin) {
    columns = columns.filter((column) => column.key !== "action");
  }
  return (
    <div className="mx-auto max-w-2xl px-3  sm:px-2 sm:py-8 lg:max-w-7xl lg:px-1">
      <h2 className="flex justify-center text-xl items-center w-full m-auto">
        products
      </h2>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        scroll={{ x: "" }}
      />
      {editingProduct && <AddProduct initialValues={editingProduct} />}
    </div>
  );
};

export default ProductList;
