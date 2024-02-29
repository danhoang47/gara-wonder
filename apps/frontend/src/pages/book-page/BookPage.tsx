import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";


function BookPage() {
    const navigate = useNavigate()

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
                    <p className="text-lg font-medium mb-4">Your booking information</p>
                    <div className="flex flex-col gap-2">
                        <Input 
                            label="Date"
                            placeholder="Date"
                            value={new Date().toDateString()}
                            variant="flat"
                            classNames={{
                                inputWrapper: "bg-background"
                            }}
                            isReadOnly
                        />
                    </div>
                </div>
                <div className="flex-grow">

                </div>
            </div>
        </div>
    );
}

export default BookPage;