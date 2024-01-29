import { Button } from "@nextui-org/react";
import RegistrationSection from "../registration-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ServiceTemplate from "./ServiceTemplate";


export default function Services() {

    return (
        <RegistrationSection
            header={
                <div className="flex justify-between">
                    <span>Services</span>
                    <Button 
                        variant="bordered" 
                        startContent={<FontAwesomeIcon icon={faPlus}/>}
                    >
                        Add Service
                    </Button>
                </div>
            }
            description="Provide the services your garage will serves"
        >
            <ServiceTemplate />
        </RegistrationSection>
    )
}