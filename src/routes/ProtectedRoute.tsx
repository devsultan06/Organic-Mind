/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import { ReactElement } from "react";

interface ProtectedRouteProps {
    element: ReactElement;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {

    const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.user);

    console.log(user, isAuthenticated, loading);


    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black06 bg-opacity-50">
                <Audio
                    height="100"
                    width="100"
                    color="#FFD700"
                    ariaLabel="audio-loading"
                    wrapperClass="wrapper-class"
                    visible={true}
                />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/get-started/register" replace />;
    }

    return element;
};

export default ProtectedRoute;
