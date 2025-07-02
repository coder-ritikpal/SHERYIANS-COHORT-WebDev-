import { Route, Routes } from "react-router-dom";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductDetails from "../pages/admin/ProductDetails";
import UserProfile from "../pages/users/UserProfile";
import PageNotFound from "../pages/PageNotFound";
import AuthWrapper from "./AuthWrapper";
import Cart from "../pages/Cart";

const Mainroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Products />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/admin/create-product"
                element={
                    <AuthWrapper>
                        <CreateProduct />
                    </AuthWrapper>
                }
            />
            <Route
                path="/admin/user-profile"
                element={
                    <AuthWrapper>
                        <UserProfile />
                    </AuthWrapper>
                }
            />
            <Route
                path="/product/:id"
                element={
                    <AuthWrapper>
                        <ProductDetails />
                    </AuthWrapper>
                }
            />
            <Route
                path="/cart"
                element={
                    <AuthWrapper>
                        <Cart />
                    </AuthWrapper>
                }
            />

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Mainroutes;