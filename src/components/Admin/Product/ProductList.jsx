import { Fragment, useState } from "react";
import { Table, Button, Space } from "antd";
import { useStore } from "../../../context/StoreContext";
import AddProduct from "./AddProduct";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DeleteModal from "../../Reusable/DeleteModal";
import Loading from "../../Loading/Loading";

const ProductList = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productID, setProductID] = useState("");
  const [open, setOpen] = useState(false);

  const { products, isAdmin, editingProduct, setEditingProduct, loading } =
    useStore();

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleDelete = (record) => {
    setOpenDeleteModal(true);
    setProductID(record);
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
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  if (!isAdmin) {
    columns = columns.filter((column) => column.key !== "action");
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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

          {open && (
            <Transition.Root show={open} as={Fragment}>
              <Dialog className="relative z-10" onClose={setOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                      enterTo="opacity-100 translate-y-0 md:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 md:scale-100"
                      leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    >
                      <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                        <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                          <button
                            type="button"
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                          <AddProduct editingProduct={editingProduct} />
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          )}

          {openDeleteModal && (
            <DeleteModal
              productId={productID}
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProductList;
