import { getGarageServices } from "@/api";
import { WithCategoryService } from "@/api/garages/getGarageServices";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import useSWRImmutable from "swr/immutable";

export type ServiceSuggestionProps = {
    garageId?: string;
    onServiceSelected: (service: WithCategoryService) => void;
};

function ServicesSuggestion({
    garageId,
    onServiceSelected,
}: ServiceSuggestionProps) {
    const { data } = useSWRImmutable(`service/${garageId}`, getGarageServices);
    const services = data?.data;

    return (
        <Popover triggerScaleOnOpen={false} placement="top-start">
            <PopoverTrigger>
                <div className="cursor-pointer">
                    <FontAwesomeIcon
                        icon={faLightbulb}
                        size="lg"
                        color="#0070f0"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="min-w-[320px]">
                <div className="w-full">
                    <div className="border-b py-2">
                        <p className="font-medium">Gợi ý dịch vụ</p>
                    </div>
                    {services?.map((service) => (
                        <div
                            className="py-2 flex gap-4 hover:opacity-60 cursor-pointer transition-opacity"
                            onClick={() => {
                                onServiceSelected(service);
                            }}
                        >
                            <div className="flex items-center">
                                <img src={service.category.icon} alt="" />
                            </div>
                            <div>
                                <p className="font-medium text-base">
                                    {service.category.name}
                                </p>
                                <p>Mercedes, BMW, etc...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ServicesSuggestion;
