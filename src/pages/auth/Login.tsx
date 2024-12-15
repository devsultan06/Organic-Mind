import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";

const Login = () => {
  return (
    <div className="w-full max-w-[500px] flex flex-col items-start ">
      <h1 className="mb-6 font-bold text-[32px] text-center text-gray-800">
        Login
      </h1>
      <form className="w-full">
        {/* Email Input */}
        <div className="mb-4" >
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            placeholder="Enter your email"
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
            required
            placeholder="Enter your password"
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

        {/* Sign In Button */}
        <Button
          variant="text"
          className="w-full bg-yellow text-black font-medium py-2 rounded-lg text-[16px] text-center transition duration-200 ease-in-out hover:bg-darkblack hover:text-[#fff]"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
