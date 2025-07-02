import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    asyncdeleteuser,
    asynclogoutuser,
    asyncupdateuser,
} from "../../store/actions/userActions";

const UserProfile = () => {
    const { users } = useSelector((state) => state.userReducer);

    const { register, reset, handleSubmit } = useForm({
        defaultValues: {
            username: users?.username,
            email: users?.email,
            password: users?.password,
        },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const UpdateUserHandler = (user) => {
        dispatch(asyncupdateuser(users.id, user));
    };

    const LogoutUserHandler = () => {
        dispatch(asynclogoutuser());
        navigate("/login");
    };

    const DeleteHandler = () => {
        dispatch(asyncdeleteuser(users.id));
        navigate("/login");
    };

    return users ? (
        <div>
            <div className="flex items-center gap-10 justify-start">
                <h1 className="font-thin text-3xl text-gray-600">
                    {users.username}
                </h1>
                <h1 className="font-thin text-xl text-gray-600">{users.email}</h1>
                <hr className="my-5" />
            </div>

            <form
                onSubmit={handleSubmit(UpdateUserHandler)}
                className="w-full flex flex-col justify-start items-start"
            >
                <input
                    {...register("username")}
                    className="mb-3 outline-0 border-b p-2 text-2xl"
                    type="text"
                    placeholder="John-Doe"
                />
                <input
                    {...register("email")}
                    className="mb-3 outline-0 border-b p-2 text-2xl"
                    type="email"
                    placeholder="john@doe.com"
                />
                <input
                    {...register("password")}
                    className="mb-3 outline-0 border-b p-2 text-2xl"
                    type="password"
                    placeholder="********"
                />

               <div className="flex gap-10"> 
                <button className="mt-5 px-4 py-2 bg-purple-900 rounded">
                    Update User
                </button>

                  <button
                    type="button"
                    onClick={DeleteHandler}
                    className="mt-5 px-4 py-2 bg-red-600 rounded"
                >
                    Delete User
                </button>

                </div>

                <button
                    type="button"
                    onClick={LogoutUserHandler}
                    className="mt-5 px-4 py-2 bg-cyan-700 rounded"
                >
                    Logout User
                </button>

              
            </form>
        </div>
    ) : (
        "Loading..."
    );
};

export default UserProfile;