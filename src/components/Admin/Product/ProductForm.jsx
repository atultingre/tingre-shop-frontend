import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../../config/firebase";
import { assets } from "../../../assets/assets";
import { useStore } from "../../../context/StoreContext";
import api from "../../../config/api";

const ProductForm = ({ initialValues }) => {
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
    addProduct(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData?.name || ""}
        onChange={handleChange}
        placeholder="Name"
      />
      <textarea
        type="text"
        name="description"
        value={formData?.description || ""}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="price"
        value={formData?.price || ""}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="text"
        name="category"
        value={formData?.category || ""}
        onChange={handleChange}
        placeholder="Category"
      />
      <div className="add-img-upload flex-col">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img
            src={
              previewURL || initialValues?.image
                ? previewURL || initialValues?.image
                : assets?.upload_area
            }
            alt="image"
            name="image"
          />
        </label>
        <input
          type="file"
          id="image"
          hidden
          // {...(imageFile ? { required: true } : {})}
          onChange={handleImageUpload}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
