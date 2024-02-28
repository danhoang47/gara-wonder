import useSWRImmutable from "swr/immutable";

import { getUser } from "@/api";
import { Garage } from "@/core/types";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { GarageBasicInfo } from "@/api/garages/getBasicGarageInfo";

function GarageOwnerAndStaffInfoPreview({
    garageOwner,
    staff,
}: {
    garageOwner?: Garage["userId"];
    staff?: GarageBasicInfo["staff"];
}) {
    const { data: ownerDetail } = useSWRImmutable(garageOwner, getUser);

    return (
        <div className="flex gap-8">
            <div className="flex gap-3">
                <div className="shrink-0">
                    <Avatar
                        isBordered
                        src={ownerDetail?.data.photoURL}
                        classNames={{
                            base: "bg-primary cursor-pointer",
                        }}
                    />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Garage Owner</p>
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
                                />
                            );
                        })}
                    </AvatarGroup>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Garage Staff</p>
                    <p className="font-medium text-black">
                        {staff?.slice(0, 3).map((user, index) => {
                            if (index == 0)
                                return (
                                    <span key={index}>{user.displayName}</span>
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
                            ` and ${(staff?.length as number) - 3} more`}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default GarageOwnerAndStaffInfoPreview;
