import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../../config/firebase";
import { assets } from "../../../assets/assets";
import { useStore } from "../../../context/StoreContext";
import api from "../../../config/api";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const AddProduct = ({ initialValues }) => {
  const { fetchProducts } = useStore();
  const [formData, setFormData] = useState(initialValues || {});
  const [imageURL, setImageURL] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
    setPreviewURL(URL.createObjectURL(e.target.files[0]));
  };

  const addProduct = async (formData) => {
    try {
      let image = imageURL;
      if (!initialValues) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(imageFile.name);
        await fileRef.put(imageFile);
        const url = await fileRef.getDownloadURL();

        const response = await api("POST", "/product/add", {
          ...formData,
          image: url,
        });
        navigate("/");
        console.log("response: ", response);
        if (response.success) {
          fetchProducts();
          setFormData("");
        }
      } else {
        // For updating existing product, check if new image was uploaded
        if (imageURL !== initialValues.image) {
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(imageFile.name);
          await fileRef.put(imageFile);
          const url = await fileRef.getDownloadURL();

          const response = await api(
            "PUT",
            `/product/update/${initialValues._id}`,
            {
              ...formData,
              image: url,
            }
          );
          navigate("/");
          console.log("response: ", response);
          if (response.success) {
            fetchProducts();
            setFormData("");
          }
        } else {
          // If no new image was uploaded, keep the existing image
          image = initialValues.image;
        }
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData: ", formData);
    addProduct(formData);
  };

  return (
    <div className="mt-5 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Product Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed as a product.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* name */}
              <div className="col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData?.name || ""}
                    onChange={handleChange}
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* price */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData?.price || ""}
                    onChange={handleChange}
                    autoComplete="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Category */}

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Category
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    value={formData?.category || ""}
                    onChange={handleChange}
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData?.description || ""}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* image */}
              <div className="col-span-full">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {previewURL || initialValues?.image ? (
                      <img
                        src={previewURL || initialValues?.image}
                        alt="image"
                        name="image"
                      />
                    ) : (
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600  justify-center">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
