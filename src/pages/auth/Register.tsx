import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { registerSchema } from "../../schemas/schema";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import useRegister from "./hooks/useRegister";
import { Audio, RotatingLines } from "react-loader-spinner";



type Register = {
  username: string;
  email: string;
  password: string;
  profilePicture: File | null;
};


const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState({ message: "", type: "" });

  const handleSetMessage = (message: string, type: string) => {
    setMessage({ message, type });
  };


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
    handleSubmit
  } = useFormik<Register>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      profilePicture: null,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const trimmedValues = {
        ...values,
        nickName: values.username.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
      };
      await register({
        username: trimmedValues.nickName,
        email: trimmedValues.email,
        password: trimmedValues.password,
        setLoading,
      });

      // console.log("Form submitted with values:", trimmedValues);
      // resetForm(); // Optional: Reset the form after submission
      // if (profilePictureInputRef.current) {
      //   profilePictureInputRef.current.value = ""; // Manually clear the file input
      // }
    },
  });

  const register = useRegister(handleSetMessage, resetForm, setFieldValue);



  return (
    <div className="w-full max-w-[500px] flex flex-col items-start ">
      <h1 className="mb-6 font-bold text-[32px] text-center text-gray-800">
        Sign Up
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>

        <div className="mb-4">
          <TextField
            id="username"
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#FFD700", // Yellow color
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFD700", // Yellow color for label
              },
            }}
          />
        </div>

        {/* Email Input */}
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
                  borderColor: "#FFD700", // Yellow color
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFD700", // Yellow color for label
              },
            }}
          />
        </div>

        {/* Password Input */}
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
                  borderColor: "#FFD700", // Yellow color
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFD700", // Yellow color for label
              },
            }}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="profile-picture" className="block text-gray-700 text-[17px] mb-2">
            Upload Profile Picture
          </label>
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            accept="image/*"
            ref={profilePictureInputRef} // Attach the ref here
            onChange={(event) => {
              const file = event.currentTarget.files
                ? event.currentTarget.files[0]
                : null;
              setFieldValue("profilePicture", file);
            }}
            className="w-full bg-gray-200 p-2 rounded-lg"
          />
          {touched.profilePicture && errors.profilePicture && (
            <p className="text-red-500 text-sm">{errors.profilePicture}</p>
          )}
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="text"
          className="w-full bg-yellow text-black font-medium py-2 rounded-lg text-[16px] text-center transition duration-200 ease-in-out hover:bg-darkblack hover:text-[#fff]"
        >
          Sign Up
        </Button>


      </form>
      <Audio
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
};

export default Register;
