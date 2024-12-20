import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/schema";
import useLogin from "./hooks/useLogin";
import { useState } from "react";
import AlertModal from "./components/AlertModal";
import { Audio } from "react-loader-spinner";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider, db } from "../../firebase/config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { formatDate } from "../../utils/dateUtils";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ message: string; type: "success" | "error" }>({ message: "", type: "success" });

  const handleSetMessage = (message: string, type: "success" | "error") => {
    setMessage({ message, type });
  };

  const handleOAuthLogin = async (provider: any) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const providerUsed = provider.providerId; // e.g., "google.com" or "github.com"
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

      resetForm();

      setTimeout(() => {
        navigate("/home");
      }, 3000);

    } catch (error: any) {
      setMessage({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const trimmedValues = {
        email: values.email.trim(),
        password: values.password.trim(),
      };

      await login({
        email: trimmedValues.email,
        password: trimmedValues.password,
        setLoading,
      });
    },
  });

  const login = useLogin({ handleSetMessage, resetForm });


  return (
    <div className="w-full max-w-[500px] flex flex-col items-start ">
      <h1 className="mb-6 font-bold text-[32px] text-center text-gray-800">
        Login
      </h1>

      <AlertModal
        message={message.message}
        type={message.type}
      />
      <form className="w-full mt-3" onSubmit={handleSubmit} >
        <div className="mb-4" >
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#FFD700",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFD700",
              },
            }}
          />
        </div>

        <div className="mb-6">
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#FFD700",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFD700",
              },
            }}
          />
        </div>

        <Button
          type="submit"
          variant="text"
          className="w-full bg-yellow text-black font-medium py-2 rounded-lg text-[16px] text-center transition duration-200 ease-in-out hover:bg-darkblack hover:text-[#fff]"
        >
          Login
        </Button>
      </form>

      <div className="flex items-center my-6 w-full">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="mx-4 text-gray-600 text-sm font-medium">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="w-full block md:flex md:flex-row items-center justify-between gap-9">
        <Button
          onClick={() => handleOAuthLogin(githubProvider)}
          variant="outlined"
          className=" text-black w-full bg-white2 px-[80px] py-[10px] border-gray-400 hover:bg-yellow gap-2 capitalize mb-[20px] md:mb-[0px]"
        >
          Github
        </Button>
        <Button
          onClick={() => handleOAuthLogin(googleProvider)}
          variant="outlined"
          className=" text-black w-full bg-white2 px-[80px] py-[10px] border-gray-400 hover:bg-yellow gap-2 capitalize"
        >
          Google
        </Button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <Audio
            height="100"
            width="100"
            color="#FFD700"
            ariaLabel="audio-loading"
            wrapperClass="wrapper-class"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
