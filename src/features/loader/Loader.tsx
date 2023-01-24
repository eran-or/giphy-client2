import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

export default function LineLoader () {
  return <div className="w-screen mx-4 my-2"><Skeleton style={{display:'block', width:'-webkit-fill-available', height:20}} /></div>
}

export const PlaceHolderLoader = () => {
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

