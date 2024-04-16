import { RoomType } from "@/core/types";

export type AttachEntityProps = {
    roomType: RoomType;
    attachEntityId: string;
};

function AttachEntity({ roomType, attachEntityId }: AttachEntityProps) {
    return (
        <div className="flex px-4 py-3 gap-4 items-center shadow">
            <div className="h-16 w-16">
                <img
                    alt=""
                    src="https://res.cloudinary.com/leduc13/image/upload/v1713161913/mpyx3epwsmz3wtwg5vcb.png"
                    className="w-full h-full"
                />
            </div>
            <div className="grow overflow-x-hidden text-ellipsis whitespace-nowrap">
                <p className="leading-none font-medium">Sản phẩm lốp xe Michelin 2024</p>
                <span className="text-[12px]">Phù hợp cho mọi dòng xe địa hình to nhỏ</span>
            </div>
        </div>
    );
}

export default AttachEntity;
