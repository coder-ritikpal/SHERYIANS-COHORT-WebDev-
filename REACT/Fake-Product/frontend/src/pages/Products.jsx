import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncupdateuser } from "../store/actions/userActions";

const Products = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.userReducer.users);
    const products = useSelector((state) => state.productReducer.products);

    const AddtoCartHandler = (product) => {
        const copyuser = { ...users, cart: [...users.cart] };
        const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id);

        if (x == -1) {
            copyuser.cart.push({ product, quantity: 1 });
            
        } else {
            copyuser.cart[x] = {
                product,
                quantity: copyuser.cart[x].quantity + 1,
            };
        }
        dispatch(asyncupdateuser(copyuser.id, copyuser));
    };

    const rederproduct = products.map((product) => {
        return (
            <div className="w-[30%] p-2 mr-2 mb-3 border " key={product.id}>
                <img
                    className="w-full h-[35vh]   object-top mb-5 "
                    src={product.image}
                    alt=""
                />
                <h1 className="text-xl text-center font-semibold">{product.title}</h1>
                <small>{product.description.slice(0, 100)}..</small>
                <div className="p-3 mt-3 flex justify-between items-center font-mono">
                    <p>{product.price}</p>
                    <button onClick={() => AddtoCartHandler(product)}>
                        Add to Cart
                    </button>
                </div>
                <Link
                    className="block m-auto w-1/3"
                    to={`/product/${product.id}`}
                >
                    More Info
                </Link>
            </div>
        );
    });

    return products.length > 0 ? (
        <div className=" overflow-auto flex flex-wrap shrink">{rederproduct}</div>
    ) : (
        "Loading..."
    );
};

export default Products;