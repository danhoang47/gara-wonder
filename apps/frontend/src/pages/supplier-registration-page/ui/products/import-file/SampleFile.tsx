import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileExcel,
    faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import { getSampleCSV } from "@/api/supplier";

const SampleFile = () => {
    return (
        <div className="flex justify-between items-center bg-[#f4f4f5] rounded-md p-4 mt-4">
            <div className="">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon size="1x" icon={faFileExcel} />
                    <p className="text-sm font-bold">File Mẫu</p>
                </div>
                <p className="text-sm max-w-[85%] mt-1">
                    Bạn có thể tải xuống ví dụ đính kèm và sử dụng chúng cho tệp
                    của bạn.
                </p>
            </div>
            <Button
                isIconOnly
                radius="full"
                className="bg-white border-2"
                onPress={getSampleCSV}
            >
                <FontAwesomeIcon icon={faCloudArrowDown} />
            </Button>
        </div>
    );
};

export default SampleFile;
