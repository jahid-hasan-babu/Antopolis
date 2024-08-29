"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categoryCrateRequest } from "../../../apiRequest/apiRequest";

export default function Category() {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    setCategoryData({ ...categoryData, categoryName: e.target.value });
  };

  const handleSave = async () => {
    try {
      await categoryCrateRequest(categoryData);
      toast.success("Category created successfully!");

      // Delay the navigation to allow the toast message to be seen
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (error) {
      toast.error("Failed to create category.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-2xl w-[250px] py-9 px-5 shadow-lg">
        <h1 className="text-md font-medium mb-4">Add Category</h1>
        <input
          className="w-full mb-4 py-3 px-2 rounded bg-gray-100 text-black placeholder-black"
          placeholder="Name"
          type="text"
          value={categoryData.categoryName}
          onChange={handleInputChange}
        />
        <button
          className="w-full py-3 px-2 rounded bg-black text-white hover:bg-gray-800"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
