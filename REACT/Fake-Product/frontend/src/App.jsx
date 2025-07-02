import { useEffect } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { asynccurrentuser } from "./store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify"
import { asyncloadproducts } from "./store/actions/productActions";

const App = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.userReducer);
    const { products } = useSelector((state) => state.productReducer);


    useEffect(() => {
        !users && dispatch(asynccurrentuser());
    }, [users]);

    useEffect(() => {
        products.length == 0 && dispatch(asyncloadproducts());
    }, [products]);
    return (
        <div className="overflow-auto px-[5%] text-white font-thin w-screen h-screen bg-blue-950">
            <Nav />
            <Mainroutes />
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default App;