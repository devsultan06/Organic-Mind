import React from "react";
import { useLocation } from "react-router-dom";
import logo1 from "../../assets/images/logo1.png";
import logo2 from "../../assets/images/logo2.png";

const CustomCard: React.FC = () => {
    const location = useLocation();

    const getLogo = () => {
        if (location.pathname === "/get-started") {
            return logo1;
        } else if (location.pathname === "/get-started/login" || location.pathname === "/get-started/register") {
            return logo2;
        } else {
            return logo1;
        }
    };

    return (
        <div className="relative flex-1 bg-darkblack text-[#fff] flex flex-col h-full">
            <div className="absolute top-4 left-4 text-[30px] font-bold">
                Organic Mind
            </div>

            <div className="flex-grow flex justify-center items-center">
                <img
                    src={getLogo()}
                    alt="small-logo"
                    className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] object-contain"
                />
            </div>
        </div>
    );
};

export default CustomCard;
