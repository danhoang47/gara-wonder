import { useState } from "react";

import { Chip } from "@nextui-org/react";

import { GarageActionButton } from "..";

function GarageHeader({ name, address }: { name?: string; address?: string }) {
    const [hasCoupon, setHasCoupon] = useState<boolean>(true);

    return (
        <div className="flex justify-between items-center ">
            <div>
                <span className="text-xs font-medium">522 Đã xem</span>
                <div className="flex gap-2 items-center">
                    <p className="font-semibold text-2xl">{name}</p>
                    {hasCoupon && (
                        <Chip color="primary" radius="sm" size="sm">
                            Coupon
                        </Chip>
                    )}
                </div>
                <span className="text-xs font-medium">{address} </span>
            </div>
            <GarageActionButton />
        </div>
    );
}

export default GarageHeader;
