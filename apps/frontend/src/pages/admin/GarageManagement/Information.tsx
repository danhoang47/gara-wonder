import { getGarageImages, getGarageLiscense } from "@/api";
import { Chip } from "@nextui-org/react";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const Information: React.FC = () => {
    const { garageId } = useParams();
    const { isLoading: certLoading, data: CertImgs } = useSWR(
        garageId ? "cert" : null,
        () => getGarageLiscense(garageId),
    );
    const { isLoading: imgLoading, data: ImgList } = useSWR(
        garageId ? `images/${garageId}` : null,
        getGarageImages,
    );
    if (!certLoading && !imgLoading)
        return (
            <div className="h-full ">
                <h2 className="font-medium text-base">Giấy phép kinh doanh</h2>
                <div className="py-4">
                    {CertImgs?.data.license.length !== 0 ? (
                        <div className="flex gap-2 ">
                            {CertImgs?.data.license.map((img, index) => {
                                return (
                                    <img
                                        src={img.url}
                                        key={index}
                                        className="w-[10rem] h-[11rem] object-cover rounded-md"
                                    ></img>
                                );
                            })}
                        </div>
                    ) : (
                        <Chip color="danger" size="lg" className="select-none">
                            <p className="font-semibold text-white">
                                Garage chưa cung cấp giấy phép
                            </p>
                        </Chip>
                    )}
                </div>
                <h2 className="font-medium text-base">
                    Hình ảnh được cung cấp
                </h2>
                <div className="py-4">
                    {ImgList?.data.length !== 0 ? (
                        <div className="flex gap-2 flex-wrap">
                            {ImgList?.data.map((img, index) => {
                                return (
                                    <img
                                        src={img.url}
                                        key={index}
                                        className="max-w-[25rem] max-h-[20rem] object-cover rounded-md"
                                    ></img>
                                );
                            })}
                        </div>
                    ) : (
                        <Chip color="danger" size="lg" className="select-none">
                            <p className="font-semibold text-white">
                                Garage chưa cung cấp hình ảnh
                            </p>
                        </Chip>
                    )}
                </div>
            </div>
        );
};

export default Information;
