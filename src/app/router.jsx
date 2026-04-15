import { createBrowserRouter } from "react-router-dom";
import {  Layout } from "./layout";
import { Home } from "../pages/home";
import { Products } from "../pages/products";
import { Cart } from "../pages/cart";
import { Orders } from "../pages/orders";
import { ProductDetail } from "../pages/Product.Detail";
import { Providers } from "./providers";
import { Auth } from "../pages/auth";


export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <Layout/>
      </Providers>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/auth",
        element: <Auth />,
      }, 
    ],
  },
]);
