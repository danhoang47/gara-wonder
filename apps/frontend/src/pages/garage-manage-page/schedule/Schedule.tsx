import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { Calendar } from "@/core/ui";
import moment from "moment";

function Schedule() {
    const [month, setMonth] = useState<number>(new Date().getMonth())
    const [year, setYear] = useState<number>(new Date().getFullYear())

    return (
        <div className="flex h-full">
            <div className="grow h-full overflow-auto">
                <Calendar
                    disabledDates={[{
                        from: undefined,
                        to: moment().add(-1).toDate()
                    }]}
                    month={month}
                    year={year}
                    renderHeader={(date) => (
                        <div className="sticky top-0 w-full px-10 py-6 bg-background flex gap-4">
                            <Button
                                isIconOnly
                                radius="full"
                                disableAnimation
                                size="sm"
                                className='bg-background'
                            >
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </Button>
                            <h2 className="font-semibold text-2xl z-10">{moment(date).format("MMMM YYYY")}</h2>
                            <Button
                                isIconOnly
                                radius="full"
                                disableAnimation
                                size="sm"
                                className='bg-background'
                                onPress={() => setMonth(month + 1)}
                            >
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Button>
                        </div>
                    )}
                />
            </div>
            <div className="w-1/4 min-w-80 h-full flex flex-col relative">
                <div className="p-4">
                    <p className="font-semibold text-xl">Chỉnh sửa trạng thái</p>
                </div>
                <div className="grow overflow-auto"></div>
                <div className="sticky bottom-0">
                    <div className="flex justify-end p-4 gap-2">
                        <Button
                            variant='light'
                            radius='full'
                        >
                            Hủy
                        </Button>
                        <Button
                            color="primary"
                            radius='full'
                        >
                            <span className="font-medium">Lưu</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule;