import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/schema";
import useLogin from "./hooks/useLogin";
import { useState } from "react";
import AlertModal from "./components/AlertModal";
import { Audio } from "react-loader-spinner";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ message: string; type: "success" | "error" }>({ message: "", type: "success" });

  const handleSetMessage = (message: string, type: "success" | "error") => {
    setMessage({ message, type });
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

  const login= useLogin({ handleSetMessage, resetForm });


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
                color: "#FFD700",               },
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
