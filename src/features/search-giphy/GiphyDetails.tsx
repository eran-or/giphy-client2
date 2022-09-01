import React from "react";
import { Image } from "./fetchGiphy";
import { useLocation } from "react-router-dom";

export default function SearchGiphy() {
  const location = useLocation()
  const state = location.state as {image:Image, currentSearch:string}
  const image = state.image
  const original = image.images.original
  
  return (
    <div className="flex flex-col	items-center">
      <h3>{image.title}</h3>  
      <img width={original.width} height={original.height} src={original.url} alt={image.title} />
      <div>{original.width} x {original.height}</div>
    </div>
  );
}
