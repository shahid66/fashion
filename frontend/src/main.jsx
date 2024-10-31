import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import store from "./app/store";
import AdminRoute from "./components/AdminRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import "./index.css";
import About from "./pages/About";
import ProductEditPage from "./pages/admin/ProductEditPage.jsx";
import ProductListPage from "./pages/admin/ProductListPage.jsx";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Product from "./pages/Product";
import ProfilePage from "./pages/ProfilePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<OrderDetailsPage />} />
        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/productList" element={<ProductListPage />} />
          <Route path="/product/:id/edit" element={<ProductEditPage />} />
        </Route>
      </Route>

      <Route path="/product/:productId" element={<Product />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
