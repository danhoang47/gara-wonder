import { Order } from "@/core/types";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

function BookPage() {
    const navigate = useNavigate();
    const { state }: { state: Order } = useLocation();

    return (
        <div className="w-3/4 max-w-5xl md:w-full py-8 md:px-10 mx-auto">
            <div className="flex items-center gap-2 mb-8">
                {/* <Button variant="light" isIconOnly radius="full" onPress={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </Button> */}
                <h1 className="text-2xl font-semibold">Confirm Booking</h1>
            </div>
            <div className="flex gap-4">
                <div className="flex-grow">
                    <p className="text-lg font-medium mb-4">
                        Your booking information
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-default-600">Date</p>
                                <p className="">{new Date().toDateString()}</p>
                            </div>
                            <div>
                                <p className="text-medium underline font-medium">
                                    Edit
                                </p>
                            </div>
                        </div>
                        <Select
                            variant="underlined"
                            label="Services"
                            placeholder="Services"
                            classNames={{
                                trigger: "!px-0 py-0",
                                label: ""
                            }}
                            selectedKeys={["hello"]}
                        >
                            <SelectItem key="hello">
                                <p>Category 1</p>
                            </SelectItem>
                        </Select>
                    </div>
                </div>
                <div className="flex-grow"></div>
            </div>
        </div>
    );
}

export default BookPage;
