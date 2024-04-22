import { GarageActionButton } from "..";

import "./GarageHeader.styles.scss"

function GarageHeader({ name, address }: { name?: string; address?: string }) {
    return (
        <div className="flex garageHeader">
            <div>
                <span className="text-xs font-medium">522 Đã xem</span>
                <div className="flex gap-2 items-center">
                    <p className="font-bold text-3xl">{name}</p>
                </div>
                <span className="text-small font-medium">{address} </span>
            </div>
            <GarageActionButton />
        </div>
    );
}

export default GarageHeader;
