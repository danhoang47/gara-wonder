import { Input, Slider } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import FilterSection from "./FilterSection";
import { setFilterValue } from "@/features/garage-filter/filter.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { isNumber } from "@/utils";
import { useMemo } from "react";

const DEFAULT_FROM = 100000;
const DEFAULT_TO = 100000000;

export default function PriceRangeFilterSection() {
    const priceRange = useAppSelector((state) => state.filter.priceRange);
    const dispatch = useAppDispatch();
    const { from, to } = useMemo(() => {
        if (!priceRange) {
            return { from: DEFAULT_FROM, to: DEFAULT_TO };
        } else {
            const { from, to } = priceRange;
            return {
                from: from || DEFAULT_FROM,
                to: to || DEFAULT_TO,
            };
        }
    }, [priceRange]);

    return (
        <FilterSection
            title="Khoảng giá"
            description="Không bao gồm các loại phí dịch vụ khác"
            classNames={{
                contentWrapper: "flex flex-col gap-8",
            }}
        >
            <Slider
                step={100000}
                minValue={100000}
                maxValue={100000000}
                value={[from, to]}
                formatOptions={{
                    style: "currency",
                    currency: "VND",
                }}
                className="max-w px-12"
                classNames={{
                    filler: "bg-black",
                    track: "h-1",
                    thumb: "w-8 h-8 bg-white after:hidden",
                }}
                onChangeEnd={(values) => {
                    if (Array.isArray(values)) {
                        dispatch(
                            setFilterValue({
                                key: "priceRange",
                                value: {
                                    from: values[0],
                                    to: values[1],
                                },
                            }),
                        );
                    }
                }}
                aria-label="Price range slider"
            />
            <div className="px-12 flex gap-8 items-center">
                <Input
                    variant="bordered"
                    size="sm"
                    label="Giá thấp nhất"
                    placeholder="Nhập giá thấp nhất..."
                    value={String(from)}
                    endContent={<span>VND</span>}
                    onValueChange={(value) => {
                        if (!isNumber(value)) return;

                        const insertedFrom = Number.parseInt(value);

                        if (insertedFrom < DEFAULT_FROM || insertedFrom > to)
                            return;

                        dispatch(
                            setFilterValue({
                                key: "priceRange",
                                value: {
                                    from: insertedFrom,
                                    to,
                                },
                            }),
                        );
                    }}
                />
                <div>
                    <FontAwesomeIcon icon={faMinus} />
                </div>
                <Input
                    variant="bordered"
                    size="sm"
                    label="Giá cao nhất"
                    placeholder="Nhập giá cao nhất..."
                    value={String(to)}
                    onValueChange={(value) => {
                        if (!isNumber(value)) return;

                        const insertedTo = Number.parseInt(value);

                        if (insertedTo > DEFAULT_TO || insertedTo < from)
                            return;

                        dispatch(
                            setFilterValue({
                                key: "priceRange",
                                value: {
                                    from,
                                    to: insertedTo,
                                },
                            }),
                        );
                    }}
                    endContent={<span>VND</span>}
                />
            </div>
        </FilterSection>
    );
}
