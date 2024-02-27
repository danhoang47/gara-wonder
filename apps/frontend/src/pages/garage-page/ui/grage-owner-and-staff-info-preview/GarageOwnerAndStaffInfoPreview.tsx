import useSWRImmutable from "swr/immutable";

import { getUser } from "@/api";
import { Garage } from "@/core/types";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import GarageStaff from "./garage-staff";

function GarageOwnerAndStaffInfoPreview({
    garageOwner,
    staff,
}: {
    garageOwner?: Garage["userId"];
    staff?: Garage["staff"];
}) {
    const { data: ownerDetail } = useSWRImmutable(garageOwner, getUser);

    return (
        <div className="flex gap-8">
            <div className="flex gap-3">
                <Avatar
                    isBordered
                    src={ownerDetail?.data.photoURL}
                    classNames={{
                        base: "bg-primary cursor-pointer",
                    }}
                />

                <div>
                    <p className="text-sm text-gray-500">Garage Owner</p>
                    <p className="font-medium text-black">
                        {ownerDetail?.data?.displayName}
                    </p>
                </div>
            </div>
            <GarageStaff staff={staff} />
        </div>
    );
}
export default GarageOwnerAndStaffInfoPreview;
