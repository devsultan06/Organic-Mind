// types.ts

// Common types for handling messages
export type HandleSetMessage = (message: string, type: "success" | "error") => void;

// Common type for resetting form
export type ResetForm = (values: { [key: string]: string }) => void;
export type SetFieldValue = (field: string, value: any) => void;


// Common type for RegisterParams without profilePicture (for login)
export type BaseRegisterParams = {
  email: string;
  password: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// Extended RegisterParams (includes profilePicture) for registration
export type RegisterParams = BaseRegisterParams & {
  username: string;
  profilePicture: File | null;
};

// Hook-specific params, like profilePictureInputRef for Register
export interface UseRegisterParams {
  handleSetMessage: HandleSetMessage;
  resetForm: ResetForm;
  setFieldValue: SetFieldValue;
  profilePictureInputRef: React.RefObject<HTMLInputElement>;
}

// Simplified Hook-specific params for Login (without profilePicture)
export interface UseLoginParams {
  handleSetMessage: HandleSetMessage;
  resetForm: ResetForm;
}
