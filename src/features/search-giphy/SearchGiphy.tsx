import React, { useCallback, useEffect, useRef } from "react";
import { debounce } from "debounce";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "./fetchGiphy";
import sha1 from "crypto-js/sha1";
import Loader from "../loader/Loader";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";

import {
  getGiphy,
  selectSearchResult,
  selectCurrentSearch,
} from "./searchGiphySlice";

export default function SearchGiphy() {
  const navigate = useNavigate();
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

  // useEffect(() => {
  //   if(initRef.current){
  //     initRef.current = false
  //     if(currentSearch && inputRef.current){
  //       (inputRef.current as HTMLInputElement).value = currentSearch
  //     }
  //   }
  //   containerRef.current?.addEventListener(
  //     "scroll",
  //     function (e) {
  //       const { scrollTop, scrollHeight, clientHeight } =
  //         e.target as HTMLElement;
  //       if (scrollTop + clientHeight >= scrollHeight - 5) {
  //         const value = inputRef.current?(inputRef.current as HTMLInputElement).value:''
  //           dispatch(getGiphy(value));
  //       }
  //     },
  //     false
  //   );
  //   let pulled = false
  //   containerRef.current?.addEventListener("wheel", function (event) {
  //     const value = inputRef.current?(inputRef.current as HTMLInputElement).value:''
  //     if (event.deltaY > 0) {
  //       //scrolling down
  //       const { scrollTop, scrollHeight, clientHeight } = event.target as HTMLElement;

  //       if(value && !pulled && scrollTop === 0 && scrollHeight === clientHeight){
  //         pulled = true
  //         dispatch(getGiphy(value));
  //       }
  //     }
  //   });
  // }, [dispatch, currentSearch]);

  const handleSearch = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      dispatch(getGiphy(value));
    },
    1000
  );

  const handleImageDetails = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    image: Image
  ) => {
    e.preventDefault();
    const path = encodeURIComponent(getValue()).replace(/%20/g, '-')
    navigate(`${path}/${image.id}`, { state: {
      image,
      currentSearch: getValue()
    } });
  };
  
  const getValue = useCallback(()=>{
    const  value = inputRef.current? (inputRef.current as HTMLInputElement).value: "";
    return value
  },[])
  const handleFetchData = useCallback(() => {
    const value = getValue()
    dispatch(getGiphy(value))
  },[dispatch, getValue])


  return (
    <div className="flex">
      <div className="w-2/5 mx-1.5 min-w-[350px]">
        <input
          ref={inputRef}
          onChange={handleSearch}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search for anything..."
          type="text"
          name="search"
        />
      </div>
      <div
        ref={containerRef}
        className="max-w-screen-sm h-[80vh] flex flex-wrap justify-center overflow-scroll max-h-screen"
      >
        <InfiniteScroll
          loader={<Loader />}
          container={containerRef.current}
          fetchData={handleFetchData}
          dataLength={data.length}
          value={getValue()}
        >
          {data.map((image: Image, i) => {
            console.log(`${getValue()}/${image.id}`);
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
