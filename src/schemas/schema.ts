import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

// Validation schema for registration
export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      passwordRules,
      "Password must contain at least one uppercase letter, one lowercase letter, and one numeric digit",
    ),
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test(
      "fileFormat",
      "Only image files are allowed",
      (value) =>
        !value ||
        (value && ["image/jpeg", "image/png", "image/jpg"].includes((value as File).type)),
    ),
});


// Validation schema for login
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")

});
