import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function Loader() {
  return (
    <div className="flex flex-wrap justify-center overflow-scroll max-h-screen">
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <Skeleton className="mx-0.5" key={i} style={{ width: 200, height: 200 }} />
        ))}
    </div>
  );
}
