import { configScheduleSlot } from "@/api";
import { ScheduleType } from "@/api/garages/getScheduleSlot";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { Role } from "@/core/types";
import { notify } from "@/features/toasts/toasts.slice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { mutate } from "swr";
import SlotItem from "./SlotItem";

export type SlotManipulationProps = {
    selectedDates: Date[];
    onRemoveDate: (date: Date) => void;
    onRemoveAll: () => void;
    calendarData?: ScheduleType;
};

type SlotContentType = Record<
    string,
    {
        maximumSlot: number;
        extraFee: number;
        disabled: boolean;
    }
>;

function SlotManipulation({
    selectedDates,
    onRemoveDate,
    onRemoveAll,
    calendarData,
}: SlotManipulationProps) {
    const user = useAppSelector((state) => state.user.value);
    const disabledSaveButton = useMemo(() => {
        if (selectedDates.length === 0) return true;

        if (
            user?.role !== Role.GarageOwner &&
            !user?.authorities?.includes("WITH_SCHEDULE")
        ) {
            return true;
        }

        if (user?.role !== Role.GarageOwner) {
            return true;
        }

        return false;
    }, [user, selectedDates.length]);
    const [modifiedSlots, setModifiedSlot] = useState<SlotContentType>({});
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (calendarData) {
            selectedDates.map((date) => {
                const isDup = Object.keys(modifiedSlots).some(
                    (e) => e === String(date.getTime()),
                );
                if (!isDup) {
                    setModifiedSlot({
                        ...modifiedSlots,
                        [date.getTime()]: {
                            maximumSlot: calendarData[String(date.getTime())]
                                ?.maximumSlot as number,
                            extraFee:
                                calendarData[String(date.getTime())]
                                    ?.extraFee ?? 0,
                            disabled:
                                calendarData[String(date.getTime())]
                                    ?.disabled ?? false,
                        },
                    });
                    return;
                }
                setModifiedSlot({
                    ...modifiedSlots,
                    [date.getTime()]: modifiedSlots[date.getTime()],
                });
            });
        }
    }, [selectedDates]);

    const onSave = async () => {
        try {
            const body = selectedDates.map((date) => {
                return {
                    date: date.getTime(),
                    slot: modifiedSlots[String(date.getTime())]?.maximumSlot,
                    disabled: modifiedSlots[String(date.getTime())].disabled,
                    extraFee: modifiedSlots[String(date.getTime())].extraFee,
                };
            });
            const result = await configScheduleSlot(user?.garageId, body);
            if (result.statusCode === 200) {
                dispatch(
                    notify({
                        type: "success",
                        title: "Thay đổi lịch thành công",
                        description: "Thay đổi lịch thành công ",
                        delay: 4000,
                    }),
                );
                mutate("calendar");
                onRemoveAll();
            }
        } catch (error) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Xác nhận thất bại",
                    description: "Một số lỗi xảy ra khi xác nhận",
                    delay: 4000,
                }),
            );
        }
    };
    if (modifiedSlots)
        return (
            <div className="w-1/4 min-w-80 h-full flex flex-col relative border-l">
                <div className="px-4 py-6">
                    <p className="font-semibold text-xl">
                        Chỉnh sửa trạng thái
                    </p>
                    <span className="text-small text-default-500">
                        Chọn ngày mà bạn muốn chỉnh sửa
                    </span>
                </div>
                <div className="grow overflow-auto px-4 pb-2">
                    <Accordion
                        showDivider
                        itemClasses={{
                            trigger: "gap-2",
                        }}
                        className="px-0"
                    >
                        {selectedDates.map((selectedDate, index) => {
                            return (
                                <AccordionItem
                                    title={
                                        <div className="flex justify-between items-center">
                                            <p className="text-base font-semibold">
                                                {moment(
                                                    new Date(
                                                        Number(selectedDate),
                                                    ),
                                                ).format("DD/MM/YYYY")}
                                            </p>
                                            <Button
                                                isIconOnly
                                                className="min-w-fit w-fit h-auto p-0 bg-background"
                                                disableAnimation
                                                onPress={() =>
                                                    onRemoveDate(
                                                        new Date(
                                                            Number(
                                                                selectedDate,
                                                            ),
                                                        ),
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className="text-default-400"
                                                />
                                            </Button>
                                        </div>
                                    }
                                    key={index}
                                >
                                    <SlotItem
                                        min={Number(
                                            calendarData[
                                                String(selectedDate.getTime())
                                            ]?.actualSlot,
                                        )}
                                        disabled={
                                            modifiedSlots[
                                                String(selectedDate.getTime())
                                            ]?.disabled
                                        }
                                        slotValue={
                                            modifiedSlots[
                                                String(selectedDate.getTime())
                                            ]?.maximumSlot
                                        }
                                        extraFee={
                                            modifiedSlots[
                                                String(selectedDate.getTime())
                                            ]?.extraFee
                                        }
                                        changeFeeValue={(value) => {
                                            setModifiedSlot({
                                                ...modifiedSlots,
                                                [selectedDate.getTime()]: {
                                                    ...modifiedSlots[
                                                        selectedDate.getTime()
                                                    ],
                                                    extraFee: value,
                                                },
                                            });
                                        }}
                                        changeSlotValue={(value) => {
                                            setModifiedSlot({
                                                ...modifiedSlots,
                                                [selectedDate.getTime()]: {
                                                    ...modifiedSlots[
                                                        selectedDate.getTime()
                                                    ],
                                                    maximumSlot: value,
                                                },
                                            });
                                        }}
                                        changeDisabled={(value) => {
                                            setModifiedSlot({
                                                ...modifiedSlots,
                                                [selectedDate.getTime()]: {
                                                    ...modifiedSlots[
                                                        selectedDate.getTime()
                                                    ],
                                                    disabled: value,
                                                },
                                            });
                                        }}
                                    />
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
                <div className="sticky bottom-0">
                    <div className="flex justify-end p-4 gap-2">
                        <Button
                            variant="light"
                            radius="full"
                            isDisabled={
                                !user?.authorities?.includes("WITH_SCHEDULE")
                            }
                        >
                            Hủy
                        </Button>
                        <Button
                            color="primary"
                            radius="full"
                            isDisabled={disabledSaveButton}
                            onClick={() => onSave()}
                        >
                            <span className="font-medium">Lưu</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
}

export default SlotManipulation;
