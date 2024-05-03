import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../../context/StoreContext";
import { assets } from "../../../assets/assets";
import { Table } from "antd";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useStore();

  console.log("data: ", data);
  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log("response.data.data: ", response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const columns = [
    // {
    //   title: 'Image',
    //   dataIndex: 'image',
    //   key: 'image',
    //   render: image => <img src={image} alt="" style={{ width: 50, height: 50 }} />,
    // },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <span>
          {items.map((item, index) => (
            <span key={index}>
              {index > 0 && ", "}
              {item.name} X {item.quantity}
            </span>
          ))}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}.00`,
    },
    // {
    //   title: 'Number of Items',
    //   dataIndex: 'items',
    //   key: 'numItems',
    //   render: items => items.length,
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>
          <span style={{ color: "green" }}>&#x25cf;</span> <b>{status}</b>
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <button onClick={fetchOrders}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </button>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-8 lg:max-w-7xl lg:px-1">
      <h2 className="flex justify-center text-xl items-center w-full m-auto">
        My Orders
      </h2>
      <Table columns={columns} dataSource={data} rowKey="_id" />
    </div>
  );
};

export default MyOrders;
