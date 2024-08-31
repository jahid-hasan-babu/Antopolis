"use client";
import { useEffect, useState } from "react";
import {
  categoryListRequest,
  createAnimalRequest,
} from "../../../apiRequest/apiRequest";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function Animal() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
  });
  const [category, setCategory] = useState([]);

  // Fetch all categories on component mount
  useEffect(() => {
    (async () => {
      let res = await categoryListRequest();
      setCategory(res);
    })();
  }, []);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      transformFile(file);
    }
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAnimalRequest(formData);
      toast.success("Animal created successfully!");
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (error) {
      toast.error("Failed to create animal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-2xl w-[300px] py-9 px-5 shadow-lg">
        <h1 className="text-md font-medium mb-4 text-center">Add Animal</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-4 py-3 px-2 rounded bg-gray-100 placeholder-black border border-gray-300"
            placeholder="Animal Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <div className="relative mb-4">
            <input
              className="hidden"
              id="file-upload"
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            <div className="flex items-center">
              <input
                className="w-full py-3 px-2 rounded relative bg-gray-100 placeholder-black border border-gray-300"
                placeholder="Image"
                value={fileName}
                disabled
              />
            </div>
            <label
              htmlFor="file-upload"
              className="absolute right-[10px] border top-[10px] bottom-[10px] px-2 bg-gray-300 text-sm text-black rounded-xl cursor-pointer flex items-center hover:bg-gray-400 transition"
            >
              Upload
            </label>
          </div>
          <select
            className="w-full mb-4 py-3 px-2 rounded bg-gray-100 placeholder-black border border-gray-300"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {category.map((item, i) => (
              <option key={i} value={item.categoryName}>
                {item.categoryName}
              </option>
            ))}
          </select>
          <button
            className="w-full py-3 px-2 rounded bg-black text-white hover:bg-gray-800 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Animal"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
