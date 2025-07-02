import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
    const user = useSelector((state) => state.userReducer.users);

    return (
        <nav className="w-full mb-3  font-serif flex justify-center text-xl  items-center gap-x-20 p-3">
            <NavLink to="/">Home</NavLink>
            {user ? (
                <>
                    {user && user?.isAdmin && (
                        <NavLink to="/admin/create-product">
                            Create Product
                        </NavLink>
                    )}

                    <NavLink to="/admin/user-profile">Settings</NavLink>
                    <NavLink to="/cart">Cart</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                </>
            )}
        </nav>
    );
};

export default Nav;