import React, { useEffect } from "react";

export default function InfinitScroll({
  children,
  loader,
  dataLength,
  value,
  container,
  fetchData,
}: {
  children: React.ReactNode;
  loader: React.ReactElement;
  dataLength: number;
  value: string;
  container: HTMLDivElement | null;
  fetchData: () => void;
}) {
  useEffect(() => {

    container?.addEventListener(
      "scroll",
      function (e) {
        const { scrollTop, scrollHeight, clientHeight } =
          e.target as HTMLElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          fetchData();
        }
      },
      false
    );
    let pulled = false;
    container?.addEventListener("wheel", function (event) {
      if (event.deltaY > 0) {
        //scrolling down
        const { scrollTop, scrollHeight, clientHeight } =
          event.target as HTMLElement;

        if (
          value &&
          !pulled &&
          scrollTop === 0 &&
          scrollHeight === clientHeight
        ) {
          pulled = true;
          fetchData();
        }
      }
    });
    container?.scrollTo({
        top:0
    })
  }, [container, fetchData, value]);


  return (
    <>
      {children}
      {dataLength === 0 && loader}
    </>
  );
}
