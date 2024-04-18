import { OrderDetailType, ServiceOrderType } from "@/api/order/getOrderById";
import { EvaluationContext } from "@/pages/garage-manage-page/contexts/EvaluationContext";
import { formatCurrency } from "@/utils";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";

export const ServiceInput = ({
    serviceState,
    service,
    setServicePrice,
}: {
    serviceState?: number;
    service: ServiceOrderType;
    setServicePrice: (price: number) => void;
}) => {
    const [servicePrice, setPrice] = useState<number>(serviceState || 0);
    const [isValid, setIsValid] = useState<boolean>(true);
    useEffect(() => {
        if (servicePrice < 0) {
            setPrice(0);
            setServicePrice(0);
        }
        if (
            servicePrice > Number(service?.highestPrice) ||
            (servicePrice < Number(service?.lowestPrice) && servicePrice !== 0)
        ) {
            setIsValid(false);
            return;
        }
        setIsValid(true);
    }, [servicePrice]);

    return (
        <div className="flex justify-between">
            <div>
                <p className="text-lg">{service.category.name} </p>
                <p className="font-medium">
                    ( min: {formatCurrency(service.lowestPrice as number)} -
                    max: {formatCurrency(service.highestPrice as number)})
                </p>
                {!isValid && (
                    <p className="text-red-600">
                        Xin vui lòng nhập đúng số giá
                    </p>
                )}
            </div>

            <div className="flex items-center gap-2">
                <div
                    className="border-3 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer text-default-400 border-default-400 transition-colors hover:text-default-700 hover:border-default-700"
                    onClick={() => {
                        setServicePrice(servicePrice - 1000);
                        setPrice(servicePrice - 1000);
                    }}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </div>

                <Input
                    type="number"
                    variant={"bordered"}
                    value={String(servicePrice)}
                    min={0}
                    size="md"
                    isInvalid={!isValid}
                    className="w-[10rem] text-center"
                    classNames={{
                        input: "text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                        inputWrapper: "p-0 h-5",
                        innerWrapper: "h-5",
                    }}
                    max={service.highestPrice}
                    onChange={(e) => {
                        setPrice(Number(e.target.value));
                        setServicePrice(Number(e.target.value));
                    }}
                />

                <div
                    className="border-3 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer text-default-400 border-default-400 transition-colors hover:text-default-700 hover:border-default-700"
                    onClick={() => {
                        setServicePrice(servicePrice + 1000);
                        setPrice(servicePrice + 1000);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
        </div>
    );
};

export default function ConfirmModal({
    services,
}: {
    services?: OrderDetailType["services"];
}) {
    const { evaluation, setEvaluationValue } = useContext(EvaluationContext);
    return (
        <>
            <p className="text-5xl font-semibold text-center">
                {formatCurrency(
                    (evaluation?.services?.reduce(
                        (prev, next) => prev + next.price,
                        0,
                    ) as number) || 0,
                    "compact",
                )}
            </p>
            <ul>
                {services?.map((service, index) => (
                    <li key={index} className="">
                        <ServiceInput
                            service={service}
                            serviceState={
                                evaluation?.services?.filter(
                                    (e) => e.serviceId === service._id,
                                )[0]?.price
                            }
                            setServicePrice={(price: number) => {
                                setEvaluationValue(
                                    "services",
                                    evaluation?.services
                                        ? [
                                              ...evaluation["services"].filter(
                                                  (e) =>
                                                      e.serviceId !==
                                                      service._id,
                                              ),
                                              {
                                                  serviceId: String(
                                                      service._id,
                                                  ),
                                                  price: price,
                                              },
                                          ]
                                        : [
                                              {
                                                  serviceId: String(
                                                      service._id,
                                                  ),
                                                  price: price,
                                              },
                                          ],
                                );
                            }}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
