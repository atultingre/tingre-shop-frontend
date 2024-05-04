import { useEffect, useState } from "react";
import { Table, Select } from "antd";
import { toast } from "react-toastify";
import { getOrderList, updateOrderStatus } from "../../../config/apiRequests";
import { useStore } from "../../../context/StoreContext";
import Loading from "../../Loading/Loading";

const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { loading, setLoading } = useStore();

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrderList();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (value, orderId) => {
    try {
      const response = await updateOrderStatus(orderId, value);
      console.log("response: ", response);
      if (response.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log("error: ", error);
    }
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
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          className="min-w-[145px]"
          value={status}
          onChange={(value) => statusHandler(value, record._id)}
        >
          <Option value="Food Processing">Food Processing</Option>
          <Option value="Dispatched">Dispatched</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-2xl px-3  sm:px-2 sm:py-8 lg:max-w-7xl lg:px-1">
      <h2 className="flex justify-center text-xl items-center w-full m-auto">
        Orders
      </h2>
      {!loading ? (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="_id"
          scroll={{ x: "max-content" }}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Orders;
