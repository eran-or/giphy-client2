import styles from './search-giphy.module.css'

import React, { useCallback, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link, useNavigate, Form, useLocation } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { Image } from "./fetchGiphy";
import sha1 from "crypto-js/sha1";
import Loader, { PlaceHolderLoader } from "../loader/Loader";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import {
  getGiphy,
  selectSearchResult,
  selectCurrentSearch,
} from "./searchGiphySlice";
import FilterPanel from "./FilterPanel"
// export async function action({ request, params }:ActionFunctionArgs) {
//   const formData = await request.formData();
//   const updates = Object.fromEntries(formData);
//   return redirect(`/${updates.search}`);
// }

export default function SearchGiphy() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const data = useAppSelector(selectSearchResult);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(null);
  const currentSearch = useAppSelector(selectCurrentSearch);
  const initRef = useRef(true);

  useEffect(() => {
    if (initRef.current) {
      initRef.current = false;

      if (currentSearch && inputRef.current) {
        (inputRef.current as HTMLInputElement).value = currentSearch;
      }
    }
  }, [currentSearch]);

  useEffect(() => {
  const value = location.pathname.split('/')[1]
  if(value){
    if(inputRef.current && (inputRef.current as HTMLInputElement).value===""){
      (inputRef.current as HTMLInputElement).value=value
    }
  }
  dispatch(getGiphy(value));
  }, [location, dispatch]);
  
  const handleSearch = () => { 
    if (inputRef.current) {
      const value = (inputRef.current as HTMLInputElement).value;
      console.log(location.search);
      
      return navigate(`/${value}${location.search}`);
    }
  };
  const handleImageDetails = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    image: Image
  ) => {
    e.preventDefault();
    navigate(`${image.id}`, {
      state: {
        image,
        currentSearch: getValue(),
      },
    });
  };

  const getValue = useCallback(() => {
    const value = inputRef.current
      ? (inputRef.current as HTMLInputElement).value
      : "";
    return value;
  }, []);
  const handleFetchData = useCallback(() => {
    const value = getValue();
    dispatch(getGiphy(value));
  }, [dispatch, getValue]);

  
  return (
    <div className="flex flex-wrap">
      
      <div className="m-4 mt-1">
        <Form
          method="post"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <input
            ref={inputRef}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
          />
          <button type="submit">Search</button>
        </Form>
        <FilterPanel />
      </div>
      <div
        ref={containerRef}
        className={`max-w-screen-sm h-[80vh] flex flex-wrap justify-between overflow-scroll max-h-screen`}
      >
        <InfiniteScroll
          placeholder={<PlaceHolderLoader />}
          loader={<Loader />}
          container={containerRef.current}
          fetchData={handleFetchData}
          dataLength={data.length}
          value={getValue()}
        >
          {data.map((image: Image, i) => {
            const str = image.images.preview_webp.url + image.id + i;
            const key = sha1(str).toString();
            return (
              <div key={key} className="m-3">
                <Link
                  to={image.id}
                  onClick={(e) => {
                    handleImageDetails(e, image);
                  }}
                >
                  <img
                    width={image.images.preview_webp.width}
                    height={image.images.preview_webp.height}
                    src={image.images.preview_webp.url}
                    alt={image.title}
                  />
                </Link>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
