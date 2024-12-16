// hooks/useRegister.js
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth, db } from "../../../firebase/config/firebase";
import { doc, setDoc } from "firebase/firestore";

// Define types for the parameters of the useRegister hook
type HandleSetMessage = (message: string, type: "success" | "error") => void;
type ResetForm = (values: { [key: string]: string }) => void;
type SetFieldValue = (field: string, value: any) => void;
type SetLoading = (loading: boolean) => void;

type RegisterParams = {
    username: string;
    email: string;
    password: string;
    setLoading: SetLoading;
};

const useRegister = (handleSetMessage: HandleSetMessage, resetForm: ResetForm, setFieldValue: SetFieldValue) => {
    const register = async ({ username, email, password, setLoading }: RegisterParams) => {
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;
            await updateProfile(user, { displayName: username });


            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                username: user.displayName,
                photoURL: user.photoURL || "DEFAULT_PHOTO_URL",
            });

            handleSetMessage(
                "A verification email has been sent to your email address. Please check your inbox.",
                "success",
            );
            resetForm({ nickName: "", email: "", password: "" });
        } catch (error: any) {
            let errorMessage = "An unexpected error occurred. Please try again.";
            if (error.code === "auth/email-already-in-use") {
                errorMessage =
                    "This email is already in use. Please try another email.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "The email address is not valid.";
            }
            handleSetMessage(errorMessage, "error");
            // Clear only the email field, leaving the other fields intact
            // Clear only the email field
            setFieldValue("email", "");
        } finally {
            setLoading(false);
        }
    };

    return register;
};

export default useRegister;
