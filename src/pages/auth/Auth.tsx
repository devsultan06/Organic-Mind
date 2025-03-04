import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { setRegisterState } from "../../store/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect} from "react";
import {
    Card,

} from "@material-tailwind/react";
import CustomCard from "../../components/layout/CustomCard";
import CustomCardBody from "../../components/layout/CustomCardBody";
import { RootState } from "../../store/store";

const Auth: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();

    const isRegister = useSelector((state: RootState) => state.auth.register);


    useEffect(() => {
        if (location.pathname === "/get-started/register" && !isRegister) {
            dispatch(setRegisterState(true)); 
        } else if (location.pathname === "/get-started/login" && isRegister) {
            dispatch(setRegisterState(false)); 
        }
    }, [location, dispatch, isRegister]);

    const toggleAuth = () => {
        dispatch(setRegisterState(!isRegister));

        if (isRegister) {
            navigate("/get-started/login");
        } else {
            navigate("/get-started/register");
        }
    };

    useEffect(() => {
        if (isRegister) {
            document.title = "Organic Mind | Register";
        } else {
            document.title = "Organic Mind | Login";
        }

        return () => {
            document.title = "Organic Mind"
        };
    }, [isRegister]);


    return (
        <Card className="w-full h-screen flex flex-col md:flex-row">
            <CustomCard />

            <CustomCardBody >
                <div className="w-full max-w-[500px] flex flex-col items-start">
                    {isRegister ? <Register /> : <Login />}
                </div>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <button onClick={toggleAuth} className="underline">
                        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                    </button>
                </div>
            </CustomCardBody>

        </Card>

    );
};

export default Auth;
