// @ts-ignore
import {
    Card,

} from "@material-tailwind/react";
import {
    Typography,
    Button,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRegisterState } from "../../store/slices/authSlice";
import CustomCard from "../../components/layout/CustomCard";
import CustomCardBody from "../../components/layout/CustomCardBody";

export const GetStarted: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        dispatch(setRegisterState(true));
        navigate("/get-started/register");
    };

    const handleLoginClick = () => {
        dispatch(setRegisterState(false));
        navigate("/get-started/login");
    };

    return (
        <Card className="w-full h-screen flex flex-col md:flex-row">
            <CustomCard />

            <CustomCardBody >
                <div className="w-full max-w-[500px] flex flex-col items-start">
                    <h1 className="mb-4 font-bold text-[40px] text-black text-left w-full">
                        Productive Mind
                    </h1>
                    <Typography color="gray" className="mb-8 font-normal text-left w-full">
                        With the only features you need, Organic Mind is customized for individuals seeking a stress-free way to stay focused on their goals, projects, and tasks.
                    </Typography>
                    <Button
                        onClick={handleRegisterClick}
                        variant="text"
                        className="w-full bg-yellow text-black font-medium py-2 rounded-lg text-[16px] text-center"
                    >
                        Get Started
                    </Button>
                </div>
                <button
                    onClick={handleLoginClick}
                    className="mt-4 underline text-black"
                >
                    Already have an account? Login
                </button>
            </CustomCardBody>

        </Card>
    );
};
