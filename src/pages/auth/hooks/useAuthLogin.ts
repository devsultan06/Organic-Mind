// hooks/useAuthLogin.js
import { signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../firebase/config/firebase";
import { formatDate } from "../../../utils/dateUtils";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type HandleSetMessage = (message: string, type: "success" | "error") => void;
type ResetForm = (values: { [key: string]: string }) => void;

interface UseRegisterParams {
    handleSetMessage: HandleSetMessage;
    resetForm: ResetForm;
}
const useAuthLogin = ({ handleSetMessage, resetForm}: UseRegisterParams) => {
    const navigate = useNavigate();
    const handleOAuthLogin = async (provider: any, setLoading:React.Dispatch<React.SetStateAction<boolean>> ) => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const providerUsed = provider.providerId; 
            console.log(user);

            const currentDate = new Date();
            const formattedDate = formatDate(currentDate);

            await setDoc(doc(db, "users", user.uid), {
                username: user.displayName,
                photoURL: user.photoURL,
                provider: providerUsed,
                createdAt: formattedDate,
            });

            handleSetMessage(
                "Registration Successful. Redirecting...",
                "success",
            );

            console.log("Successful");

            resetForm({ email: "", password: "" });

            setTimeout(() => {
                navigate("/home");
            }, 3000);

        } catch (error: any) {
            handleSetMessage(error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return handleOAuthLogin;
};

export default useAuthLogin;
