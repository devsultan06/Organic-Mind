import Today from "../today/Today";
import Tomorrow from "./Tomorrow";
import Week from "./Week";

const UpComing = () => {
    return (
        <div className="mb-[50px] max-900:mt-[80px]">
            <div className="flex items-center justify-start gap-9 mb-[25px]">
                <div className="title">
                    <h1 className="text-[35px] font-semibold">Upcoming</h1>
                </div>
                <div className="number border border-white2 w-[40px] h-[40px] flex items-center justify-center">
                    <p className="text-[25px] leading-none">12</p>
                </div>

            </div>
            <div className="today border border-white2 p-5 rounded-[10px]">
                <Today />

            </div>

            <div className="flex justify-between gap-8 mt-[30px] max-900:block">
                <Tomorrow />
                <Week />
            </div>
        </div>
    );
};

export default UpComing;
