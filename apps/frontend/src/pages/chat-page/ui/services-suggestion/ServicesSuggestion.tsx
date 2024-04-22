import { getGarageServices } from "@/api";
import { WithCategoryService } from "@/api/garages/getGarageServices";
import { getCategoryIcon } from "@/utils";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import clsx from "clsx";
import useSWRImmutable from "swr/immutable";

export type ServiceSuggestionProps = {
    garageId?: string;
    onServiceSelected: (service: WithCategoryService) => void;
    selectedServices: WithCategoryService[];
};

function ServicesSuggestion({
    garageId,
    onServiceSelected,
    selectedServices,
}: ServiceSuggestionProps) {
    const { data } = useSWRImmutable(`service/${garageId}`, getGarageServices);
    const services = data?.data;

    return (
        <Popover triggerScaleOnOpen={false} placement="top-start">
            <PopoverTrigger>
                <div className="cursor-pointer min-w-4 text-center text-default-300 hover:text-primary">
                    <FontAwesomeIcon
                        icon={faLightbulb}
                        size="lg"
                        className="transition-colors"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="min-w-[320px] p-0">
                <div className="w-full flex flex-col gap-2 pt-2 pb-4">
                    <div className="py-2 px-4">
                        <p className="font-bold text-[18px]">Gợi ý dịch vụ</p>
                    </div>
                    <div className="flex flex-col gap-2 px-4">
                        {services?.map((service) => (
                            <div
                                className={clsx(
                                    "py-1 flex items-center gap-4 hover:opacity-60 cursor-pointer transition-opacity relative",
                                    selectedServices.some(
                                        ({ _id }) => _id === service._id,
                                    ) && "border-primary",
                                )}
                                onClick={() => {
                                    onServiceSelected(service);
                                }}
                            >
                                <div className="flex items-center min-w-8 justify-center">
                                    <img
                                        src={getCategoryIcon(
                                            service.category.type,
                                        )}
                                        alt=""
                                    />
                                </div>
                                <div className="border-b flex-grow pb-1">
                                    <p className="font-medium text-small text-default-500">
                                        {service.category.name}
                                    </p>
                                    <p className="text-default-500 text-[12px]">
                                        Mercedes, BMW, etc...
                                    </p>
                                </div>
                                <span
                                    className={clsx(
                                        "ml-auto rounded-full border inline-flex absolute right-0",
                                        selectedServices.some(
                                            ({ _id }) => _id === service._id,
                                        ) && "border-primary",
                                    )}
                                >
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className={clsx(
                                            "text-[8px] p-1",
                                            selectedServices.some(
                                                ({ _id }) =>
                                                    _id === service._id,
                                            )
                                                ? "text-primary"
                                                : "text-white",
                                        )}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ServicesSuggestion;
