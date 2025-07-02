import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { asyncloginuser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Login = () => {
    const { register, reset, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const LoginHandler = (user) => {
        dispatch(asyncloginuser(user));
        toast.success("Login Succesful")
        navigate("/");
    };
    return (
        <form
            onSubmit={handleSubmit(LoginHandler)}
            className="flex flex-col w-1/2 justify-start items-start"
        >
            <input
                {...register("email")}
                className="mb-3 outline-0 border-b p-2 text-4xl"
                type="email"
                placeholder="john@doe.com"
            />
            <input
                {...register("password")}
                className="mb-3 outline-0 border-b p-2 text-4xl"
                type="password"
                placeholder="********"
            />
            <button className="mt-5 px-4 py-2 bg-blue-400 rounded">
                Login User
            </button>
            <p className="mt-5">
                Don't have an account?
                <Link className="text-blue-400" to="/register">
                    Register
                </Link>
            </p>
        </form>
    );
};

export default Login;