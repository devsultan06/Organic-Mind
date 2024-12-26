import { Button as MTButton } from "@material-tailwind/react";

interface ButtonProps {
    children: React.ReactNode
}
const Button = ({ children }: ButtonProps) => {
    return (
        <MTButton
            type="submit"
            variant="text"
            className="w-full bg-yellow text-black font-medium py-2 rounded-lg text-[16px] text-center transition duration-200 ease-in-out hover:bg-darkblack hover:text-[#fff]"
        >
            {children}
        </MTButton>)
}

export default Button   