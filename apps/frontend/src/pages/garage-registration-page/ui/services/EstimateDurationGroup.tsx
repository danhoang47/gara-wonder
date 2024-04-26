import { Radio, RadioGroup } from "@nextui-org/react";

import { EstimateType } from "@/core/types";
import { Stepper } from "@/core/ui";
import { useMemo } from "react";

export type EstimateDurationGroupProps = {
    estimateType?: EstimateType;
    estimateDuration?: [number | null, number | null] | null;
    onChange?: (
        estimateType: EstimateType,
        estimateDuration: [number | null, number | null],
    ) => void;
    disableKeys?: EstimateType[];
};

function EstimateDurationGroup({
    disableKeys,
    estimateType = EstimateType.SameDay,
    estimateDuration,
    onChange = () => {},
}: EstimateDurationGroupProps) {
    const [from, to] = useMemo(() => {
        if (estimateDuration) {
            return [estimateDuration[0], estimateDuration[1]];
        }

        return [null, null];
    }, [estimateDuration]);

    const renderAdditionalInput = () => {
        switch (estimateType) {
            case EstimateType.Exact:
                return (
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">
                                Dịch vụ kéo dài trong bao lâu?
                            </p>
                            <span className="text-sm text-default-400">
                                Thời gian để hoàn thành dịch vụ này
                            </span>
                        </div>
                        <Stepper
                            defaultValue={3}
                            value={to || undefined}
                            onChange={(val) =>
                                onChange(estimateType, [null, val])
                            }
                        />
                    </div>
                );
            case EstimateType.InRange:
                return (
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border-b pb-4">
                            <div>
                                <p className="font-medium">Từ:</p>
                                <span className="text-sm text-default-400">
                                    Dịch vụ hoàn thành trong khoảng
                                </span>
                            </div>
                            <Stepper
                                defaultValue={1}
                                value={from || undefined}
                                onChange={(val) =>
                                    onChange(estimateType, [
                                        val,
                                        estimateDuration
                                            ? estimateDuration[1]
                                            : 3,
                                    ])
                                }
                                max={
                                    estimateDuration ?
                                    (estimateDuration[1] || undefined) : undefined
                                }
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Đến:</p>
                                <span className="text-sm text-default-400">
                                    Dịch vụ kéo dài tối đa
                                </span>
                            </div>
                            <Stepper
                                defaultValue={3}
                                value={to || undefined}
                                onChange={(val) =>
                                    onChange(estimateType, [
                                        estimateDuration
                                            ? estimateDuration[0]
                                            : 3,
                                        val,
                                    ])
                                }
                                min={
                                    estimateDuration ?
                                    (estimateDuration[0] || undefined) : undefined
                                }
                            />
                        </div>
                    </div>
                );
            default:
                return undefined;
        }
    };

    const onEstimateTypeChange = (type: EstimateType) => {
        if (type === EstimateType.Exact) {
            onChange(type, estimateDuration || [null, 3]);
        } else if (type === EstimateType.InRange) {
            onChange(type, [0, 3]);
        } else {
            onChange(type, [null, null]);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <RadioGroup
                label={
                    <p className="font-medium text-foreground">
                        Thời gian thực hiện
                    </p>
                }
                value={estimateType.toString()}
                onValueChange={(value) => {
                    onEstimateTypeChange(Number.parseInt(value))
                }}
            >
                <Radio
                    value={EstimateType.SameDay.toString()}
                    isDisabled={disableKeys?.includes(EstimateType.SameDay)}
                >
                    Cùng ngày
                </Radio>
                <Radio value={EstimateType.Exact.toString()}>Ngày xác định</Radio>
                <Radio value={EstimateType.InRange.toString()}>
                    Trong khoảng ngày
                </Radio>
                <Radio value={EstimateType.UnEstimated.toString()}>
                    Không thể ước tính trước
                </Radio>
            </RadioGroup>
            {renderAdditionalInput()}
        </div>
    );
}

export default EstimateDurationGroup;
