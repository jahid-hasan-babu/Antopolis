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

  // const handleSave = async () => {
  //   try {
  //     const res = await categoryCrateRequest(categoryData);

  //     if (res.data.status === "success") {
  //       toast.success(res.data.message);
  //       setTimeout(() => {
  //         router.push("/");
  //       }, 3000); // Delay the navigation to allow toast to show
  //     } else if (res.data.status === "fail") {
  //       toast.error(res.data.message); // Show error message for duplicate category
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSave = async () => {
    try {
      const res = await categoryCrateRequest(categoryData);

      // Check the response status and message
      if (res.status === "success") {
        toast.success(res.message);

        // Delay the navigation to allow the toast message to be seen
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else if (res.status === "fail") {
        // Handle error from backend (like duplicate category)
        toast.error(res.message);
      } else {
        // Handle unexpected response
        toast.error("Unexpected response format.");
      }
    } catch (error) {
      // Handle any network or server errors
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
