import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import App from "./App";
import SearchHistory from "./routes/search-history/SearchHistory"
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import GihpyDetails from "./features/search-giphy/GiphyDetails";
import SearchGiphy, {
  // action as searchGifyAction,
} from "./features/search-giphy/SearchGiphy";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <SearchGiphy />  },
        { path: "/history", element: <SearchHistory /> },
        { path: ":slag/", element: <SearchGiphy />  },
        { path: ":slag/:id", element: <GihpyDetails /> },

      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

const container = document.getElementById("root")!;
createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter basename={process.env.PUBLIC_URL}>
//         <Routes>
//           <Route path="/" element={<App />}>
//             <Route index element={<SearchGiphy />} />
//             <Route path=":slag/:id" element={<GihpyDetails />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

reportWebVitals();
