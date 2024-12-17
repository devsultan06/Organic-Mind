// hooks/useRegister.js
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth, db } from "../../../firebase/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useNavigate } from "react-router-dom";


type HandleSetMessage = (message: string, type: "success" | "error") => void;
type ResetForm = (values: { [key: string]: string }) => void;
type SetFieldValue = (field: string, value: any) => void;


type RegisterParams = {
    username: string;
    email: string;
    password: string;
    profilePicture: File | null; 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

interface UseRegisterParams {
    handleSetMessage: HandleSetMessage;
    resetForm: ResetForm;
    setFieldValue: SetFieldValue;
    profilePictureInputRef: React.RefObject<HTMLInputElement>;
}

const useRegister = ({ handleSetMessage, resetForm, setFieldValue, profilePictureInputRef }: UseRegisterParams) => {
    const navigate = useNavigate(); 
    const register = async ({ username, email, password, profilePicture, setLoading }: RegisterParams) => {
        setLoading(true);
        handleSetMessage("", "success");
        handleSetMessage("", "error");

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;
            await updateProfile(user, { displayName: username });
            let photoURL = "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"; // Default photo 

            if (profilePicture) {
                const formData = new FormData();
                formData.append("file", profilePicture);
                formData.append("upload_preset", "organic-mind"); 

                try {
                    const cloudinaryResponse = await axios.post(
                        "https://api.cloudinary.com/v1_1/dpcelz9ln/image/upload",
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    console.log("Cloudinary upload successful!");
                    console.log(cloudinaryResponse)
                    photoURL = cloudinaryResponse.data.secure_url; // Cloudinary URL of the uploaded image
                } catch (error) {
                    console.error("Cloudinary upload failed: ", error);
                    handleSetMessage("Failed to upload profile picture. Please try again.", "error");
                    return; 
                }
            }


            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                username: user.displayName,
                photoURL: photoURL,
            });

            handleSetMessage(
                "Registration Successful. Redirecting...", 
                "success",
            );

            console.log("Successful")
            resetForm({ nickName: "", email: "", password: "" });
            if (profilePictureInputRef.current) {
                profilePictureInputRef.current.value = ""; 
            }
            setTimeout(() => {
                navigate("/get-started/login"); 
            }, 3000);
        } catch (error: any) {
            let errorMessage = "An unexpected error occurred. Please try again.";
            if (error.code === "auth/email-already-in-use") {
                errorMessage =
                    "This email is already in use. Please try another email.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "The email address is not valid.";
            }
            handleSetMessage(errorMessage, "error");
            setFieldValue("email", "");
        } finally {
            setLoading(false);
        }
    };

    return register;
};

export default useRegister;
