// hooks/useLogin.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/config/firebase.js";


type HandleSetMessage = (message: string, type: "success" | "error") => void;
type ResetForm = (values: { [key: string]: string }) => void;

type RegisterParams = {
    email: string;
    password: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

interface UseRegisterParams {
    handleSetMessage: HandleSetMessage;
    resetForm: ResetForm;
}
const useLogin = ({ handleSetMessage, resetForm }: UseRegisterParams) => {
    const navigate = useNavigate();
    const login = async ({ email, password, setLoading }: RegisterParams) => {
        setLoading(true);
        handleSetMessage("", "success");
        handleSetMessage("", "error");
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            handleSetMessage("Logged in successfully. Redirecting...", "success");
            resetForm({ email: "", password: "" });

            setTimeout(() => {
                navigate("/home");
            }, 3000);

        } catch (error: any) {
            let errorMessage = "An unexpected error occurred. Please try again.";
            if (error.code === "auth/invalid-credential") {
                errorMessage = "Invalid credentials";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password. Please try again.";
            }
            handleSetMessage(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    return login;
};

export default useLogin;
