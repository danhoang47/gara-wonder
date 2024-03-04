import { faEnvelopeOpen, faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

function GeneralInfo() {
    return (
        <div className="flex flex-col md:flex-row justify-between w-full gap-5 pt-5 ">
            <Card className="relative min-w-full md:min-w-[30rem] p-7">
                <CardHeader className="z-0">
                    <p className="font-bold text-2xl ">Staff onsite</p>
                </CardHeader>
                <CardBody>
                    <p className="text-6xl font-semibold">
                        26{" "}
                        <span className="text-3xl text-default-500">/30</span>
                    </p>
                </CardBody>
                <CardFooter>
                    <FontAwesomeIcon
                        icon={faUserGroup}
                        size="5x"
                        className="absolute right-8 bottom-8 text-default-600"
                    />
                </CardFooter>
            </Card>
            <Card className="relative min-w-full md:min-w-[30rem] p-7">
                <CardHeader className="z-0">
                    <p className="font-bold text-2xl">Slot available</p>
                </CardHeader>
                <CardBody>
                    <p className="text-6xl font-semibold">4</p>
                </CardBody>
                <CardFooter>
                    <FontAwesomeIcon
                        icon={faFileAlt}
                        size="5x"
                        className="absolute right-8 bottom-8 text-default-600"
                    />
                </CardFooter>
            </Card>
            <Card className="relative min-w-full md:min-w-[30rem] p-7">
                <CardHeader className="z-0">
                    <p className="font-bold text-2xl">Unread Messages</p>
                </CardHeader>
                <CardBody>
                    <p className="text-6xl font-semibold">26</p>
                </CardBody>
                <CardFooter>
                    <FontAwesomeIcon
                        icon={faEnvelopeOpen}
                        size="5x"
                        className="absolute right-8 bottom-8 text-default-600"
                    />
                </CardFooter>
            </Card>
        </div>
    );
}

export default GeneralInfo;
