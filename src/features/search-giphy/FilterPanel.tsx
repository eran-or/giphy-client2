import React, { useState } from "react";
import { Form, useSearchParams } from "react-router-dom";

export default function FilterPanel() {
  enum Filter {
    None = "None",
    Rating = "Rating",
    Size = "Size",
    Animate = "Animate",
  }
  const [activeId, setActiveId] = useState(Filter.None);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleActiveFilter = (id: Filter) => {
    if (id === activeId) {
      setActiveId(Filter.None);
      setSearchParams(``);
    } else {
      setActiveId(id);
      setSearchParams(`?${new URLSearchParams({ filter: id })}`);
    }
  };
  return (
    <div className="flex flex-wrap">
      <div>Filter By: </div>
      <div className="px-5 flex items-center justify-center">
      
        <div
          className="inline-flex hover:shadow-lg focus:shadow-lg"
          role="group"
        >
          <Form>
            <button
              onClick={() => handleActiveFilter(Filter.Rating)}
              type="button"
              className={`rounded-l inline-block px-6 py-2.5 ${
                activeId === Filter.Rating
                  ? "bg-blue-800"
                  : "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700"
              } text-white font-medium text-xs leading-tight uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
            >
              Rating
            </button>
            <button
              onClick={() => handleActiveFilter(Filter.Size)}
              type="button"
              className={`inline-block px-6 py-2.5 ${
                activeId === Filter.Size
                  ? "bg-blue-800"
                  : "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700"
              } text-white font-medium text-xs leading-tight uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
            >
              Size
            </button>
            <button
              onClick={() => handleActiveFilter(Filter.Animate)}
              type="button"
              className={`rounded-r inline-block px-6 py-2.5 ${
                activeId === Filter.Animate
                  ? "bg-blue-800"
                  : "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700"
              } text-white font-medium text-xs leading-tight uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
            >
              Animate
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
