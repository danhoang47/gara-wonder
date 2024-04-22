import useSWRImmutable from "swr/immutable";

import { getUser } from "@/api";
import { Garage } from "@/core/types";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { GarageBasicInfo } from "@/api/garages/getBasicGarageInfo";
import { useModalContext } from "@/core/hooks";

function GarageOwnerAndStaffInfoPreview({
    garageOwner,
    staff,
}: {
    garageOwner?: Garage["userId"];
    staff?: GarageBasicInfo["staff"];
}) {
    const { data: ownerDetail } = useSWRImmutable(garageOwner, getUser);
    const { open } = useModalContext();

    return (
        <div className="flex gap-2 pt-5 md:pt-0">
            <div className="flex gap-3 min-w-40">
                <div
                    className="shrink-0"
                    onClick={() => open("profile", ownerDetail?.data._id)}
                >
                    <Avatar
                        isBordered
                        src={ownerDetail?.data.photoURL}
                        classNames={{
                            base: "bg-primary cursor-pointer",
                        }}
                    />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Chủ Garage</p>
                    <p className="font-medium text-black">
                        {ownerDetail?.data?.displayName}
                    </p>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="shrink-0">
                    <AvatarGroup isBordered max={3}>
                        {staff?.slice(0, 3).map((ava, index) => {
                            return (
                                <Avatar
                                    key={index}
                                    src={ava.photoURL}
                                    fallback="https://images.unsplash.com/broken"
                                    classNames={{
                                        base:
                                            index < 1
                                                ? "bg-zinc-500"
                                                : "bg-zinc-300" +
                                                  " cursor-pointer",
                                    }}
                                    onClick={() => open("profile", ava?._id)}
                                />
                            );
                        })}
                    </AvatarGroup>
                </div>
                {Boolean(staff?.length) && (
                    <div>
                        <p className="text-sm text-gray-500">Nhân viên</p>
                        <p className="font-medium text-black">
                            {staff?.slice(0, 3).map((user, index) => {
                                if (index == 0)
                                    return (
                                        <span key={index}>
                                            {user.displayName}
                                        </span>
                                    );
                                else {
                                    return (
                                        <span key={index}>
                                            , {user.displayName}
                                        </span>
                                    );
                                }
                            })}
                            {(staff?.length as number) > 3 &&
                                ` và thêm ${(staff?.length as number) - 3}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default GarageOwnerAndStaffInfoPreview;
