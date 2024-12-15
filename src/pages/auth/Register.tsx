import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";

const Register = () => {
  return (
    <div className="w-full max-w-[500px] flex flex-col items-start ">
      <h1 className="mb-6 font-bold text-[32px] text-center text-gray-800">
        Sign Up
      </h1>
      <form className="w-full">

        <div className="mb-4">
          <TextField
            id="nickname"
            label="Nickname"
            type="text"
            variant="outlined"
            fullWidth
            required
            placeholder="Enter your nickname"
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

        <div className="mb-6">
          <label htmlFor="profile-picture" className="block text-gray-700 text-[17px] mb-2">
            Upload Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full bg-gray-200 p-2 rounded-lg"
            id="profile-picture"
          />
        </div>

        {/* Sign In Button */}
        <Button
          variant="text"
          className="w-full bg-yellow text-black font-medium py-2 rounded-lg text-[16px] text-center transition duration-200 ease-in-out hover:bg-darkblack hover:text-[#fff]"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
