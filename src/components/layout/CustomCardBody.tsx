import {
    CardBody,
} from "@material-tailwind/react";


interface CustomCardBodyProps {
    children: React.ReactNode
}

const CustomCardBody = ({ children }: CustomCardBodyProps) => {
    return (
        <CardBody className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
            {children}

        </CardBody>)
}

export default CustomCardBody