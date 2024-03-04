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
                                How long does it take?
                            </p>
                            <span className="text-sm text-default-400">
                                Iplorem sumary esdwas
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
                                <p className="font-medium">From:</p>
                                <span className="text-sm text-default-400">
                                    Iplorem sumary esdwas
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
                                <p className="font-medium">To:</p>
                                <span className="text-sm text-default-400">
                                    Iplorem sumary esdwas
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
                        Estimate Duration
                    </p>
                }
                value={estimateType.toString()}
                onValueChange={(value) => {
                    console.log(value)
                    onEstimateTypeChange(Number.parseInt(value))
                }}
            >
                <Radio
                    value={EstimateType.SameDay.toString()}
                    isDisabled={disableKeys?.includes(EstimateType.SameDay)}
                >
                    Same day
                </Radio>
                <Radio value={EstimateType.Exact.toString()}>Exact day</Radio>
                <Radio value={EstimateType.InRange.toString()}>
                    Complete in range
                </Radio>
                <Radio value={EstimateType.UnEstimated.toString()}>
                    Can not be estimate right now
                </Radio>
            </RadioGroup>
            {renderAdditionalInput()}
        </div>
    );
}

export default EstimateDurationGroup;
