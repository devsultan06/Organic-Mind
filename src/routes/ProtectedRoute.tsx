/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black06">
                <ThreeDots height="80" width="80" color="#FF0000" radius="9" />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black06 bg-opacity-50">
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#FF0000"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />{" "}
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return element;
};

export default ProtectedRoute;
