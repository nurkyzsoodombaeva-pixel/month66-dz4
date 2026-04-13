import { createBrowserRouter } from "react-router-dom";
import { App } from "./layout";
import { Home } from "../pages/home";
import { Products } from "../pages/products";
import { Cart } from "../pages/cart";
import { Orders } from "../pages/orders";
import { ProductDetail } from "../pages/Product.Detail";

export const router = createBrowserRouter([
  {
    element: <App/>,
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
    ],
  },
]);
