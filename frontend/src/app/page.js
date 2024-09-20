"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AllAnimalListRequest,
  categoryListRequest,
  fetchAnimalsByCategory,
} from "../../apiRequest/apiRequest";
import Image from "next/image";

export default function Home() {
  const [category, setCategory] = useState([]);
  const [AllAnimal, setAllAnimal] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all categories on component mount
  useEffect(() => {
    (async () => {
      let res = await categoryListRequest();
      setCategory(res);
    })();
  }, []);

  // Fetch all animals initially (without filtering)
  useEffect(() => {
    (async () => {
      let res = await AllAnimalListRequest();
      setAllAnimal(res);
    })();
  }, []);

  // Fetch animals by selected category
  const handleCategoryClick = async (categoryName) => {
    let res;
    setErrorMessage(""); // Reset error message

    if (categoryName === "All" || !categoryName) {
      res = await AllAnimalListRequest();
    } else {
      res = await fetchAnimalsByCategory(categoryName);
    }

    if (res.length === 0) {
      setErrorMessage(
        `No animals found for the selected category: ${categoryName}`
      );
    } else {
      setErrorMessage(""); // Clear the error if animals are found
    }

    setAllAnimal(res);
    setActiveCategory(categoryName);
  };

  return (
    <div className="bg-black w-[90%] pt-20 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            onClick={() => handleCategoryClick("All")}
            className={`border rounded-full py-3 px-5 ${
              activeCategory === "All"
                ? "text-green-600 border-green-500"
                : "text-red-600 border-red-500"
            }`}
          >
            All
          </button>
          {category.map((item, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(item.categoryName)}
              className={`border rounded-full py-3 px-5 ${
                activeCategory === item.categoryName
                  ? "text-green-600 border-green-500"
                  : "text-red-600 border-red-500"
              }`}
            >
              {item.categoryName}
            </button>
          ))}
        </div>
        <div className="text-white space-x-4">
          <Link
            href={"/add-animal"}
            className="border-white border rounded-full py-3 px-5"
          >
            Add Animal
          </Link>
          <Link
            href={"/add-category"}
            className="border-white border rounded-full py-3 px-5"
          >
            Add Category
          </Link>
        </div>
      </div>

      {/* Display error message if no animals are found */}
      {errorMessage && (
        <div className="text-red-600 text-center mt-40">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Animal List */}
      <div className="grid grid-cols-1 mt-2 md:grid-cols-4 lg:grid-cols-6 pt-10 gap-6">
        {AllAnimal.map((item, index) => (
          <div
            key={index}
            className="border border-gray-900 bg-[rgba(20, 20, 20, 1)] flex flex-col items-center justify-center text-center py-7"
          >
            <div className="mb-4">
              <Image src={item.image} alt="image" width={100} height={100} />
            </div>
            <div>
              <p className="text-gray-300 pt-5 uppercase">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
