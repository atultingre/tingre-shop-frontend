import React, { useEffect, useState } from "react";
import { Table, Select } from "antd";
import { useStore } from "../../../context/StoreContext";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { assets } from "../../../assets/assets";

const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { url } = useStore();

  const fetchAllOrders = async () => {
    try {
      const response = await api("GET", "/order/list");
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const statusHandler = async (value, orderId) => {
    // Handle status change here
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const columns = [
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <>
          {items.map((item, index) => (
            <div key={index}>
              {item.name} x {item.quantity}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span>&#8377; {amount}</span>,
    },
    {
      title: "Name",
      dataIndex: ["address", 0, "firstName"],
      key: "name",
      render: (name, record) => `${name} ${record.address[0].lastName}`,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <>
          {address.map((addr, index) => (
            <div key={index}>
              {addr.street}, {addr.city}, {addr.state}, {addr.country},{" "}
              {addr.zipcode}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Phone",
      dataIndex: ["address", 0, "phone"],
      key: "phone",
    },
    // {
    //   title: "Items Count",
    //   dataIndex: "items",
    //   key: "itemsCount",
    //   render: (items) => items.length,
    // },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => statusHandler(value, record._id)}
        >
          <Option value="Food Processing">Food Processing</Option>
          <Option value="Out for delivery">Out for delivery</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-2xl px-3  sm:px-2 sm:py-8 lg:max-w-7xl lg:px-1">
      <h2 className="flex justify-center text-xl items-center w-full m-auto">
        Orders
      </h2>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default Orders;
