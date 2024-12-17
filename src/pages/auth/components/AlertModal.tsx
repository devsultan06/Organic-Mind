/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import Alert from "@mui/material/Alert";
import gsap from "gsap";


type AlertModalProps = {
  message: string;
  type: "error" | "success";
};
const AlertModal = ({ message, type }: AlertModalProps) => {
  const alertRef = useRef(null);

  useEffect(() => {
    if (alertRef.current && message) {
      gsap.fromTo(
        alertRef.current,
        { opacity: 0, y: 50 }, 
        {
          opacity: 1,
          y: 0, 
          duration: 0.5,
          ease: "power2.out", 
        },
      );
    }

  }, [message]); 



  if (!message) return null; 

  return (
    <Alert ref={alertRef} variant="filled" severity={type} className="mt-3">
      {message}
    </Alert>
  );
};

export default AlertModal;
