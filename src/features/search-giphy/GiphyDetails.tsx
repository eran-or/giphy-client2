import React from "react";
import { Image } from "./fetchGiphy";
import { useLocation } from "react-router-dom";

export default function SearchGiphy() {
  const location = useLocation()
  const image = location.state as Image
  return (
    <div>
      <h3>{image.title}</h3>  
      <img src={image.images.original.url} alt={image.title} />
      <div>{image.images.original.width} x {image.images.original.height}</div>
    </div>
  );
}
