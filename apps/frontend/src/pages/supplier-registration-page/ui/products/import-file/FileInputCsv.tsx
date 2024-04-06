import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import { useId } from "react";

interface IFileInputCSV {
    showLabel: string;
    setFileImport: (file: File) => void;
    fileImport?: File;
}

const FileInputCsv = ({
    showLabel,
    setFileImport,
    fileImport,
}: IFileInputCSV) => {
    const id = useId();

    return (
        <div className="">
            <label
                htmlFor={id}
                className={`bg-[#F6F7FB]  rounded-xl flex  items-center`}
            >
                <input
                    id={id}
                    hidden
                    type="file"
                    onChange={async (e) => {
                        const { files } = e.target;

                        if (!files || !files.length) return;

                        setFileImport(files[0]);
                    }}
                />
                <div className="mx-auto flex flex-col w-full  gap-2 items-center px-4 py-12 border-2 rounded-lg cursor-pointer">
                    <FontAwesomeIcon size="2x" icon={faUpload} />
                    <div className="">
                        {fileImport ? (
                            <div className="flex gap-2 items-center">
                                <p>{fileImport.name}</p>
                                <span className="text-primary">Thay Đổi</span>
                            </div>
                        ) : (
                            showLabel
                        )}
                    </div>
                </div>
            </label>
            <div className="flex justify-between items-center mt-2">
                <p className="text-sm">Định dạng hỗ trợ: CSV</p>
            </div>
        </div>
    );
};

export default FileInputCsv;
