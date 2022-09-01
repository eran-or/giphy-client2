import { getRequest, ResponseDI } from "../../base/services/urlServices";
type ImageDetails = {
  height:number;
  width:number;
  url:string;
}
export interface Image {
  images:{
    preview_webp: ImageDetails;
    original:ImageDetails;
  }
  id:string;
  title:string;
}

export const fetchGiphy = ({q, limit, offset}:{q: string, limit:number, offset:number}) => {
  return getRequest<ResponseDI<any>>(
      `https://api.giphy.com/v1/gifs/search?api_key=BPQxDk7fvxwaFbNgBX9xOdvGpBDgEysB&q=${q}&limit=${limit}&offset=${offset}`
    )
};
