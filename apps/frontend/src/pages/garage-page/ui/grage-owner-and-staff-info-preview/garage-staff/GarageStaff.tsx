import { getUser } from "@/api";
import { Garage, User } from "@/core/types";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { useMemo } from "react";

function GarageStaff({ staff }: { staff?: Garage["staff"] }) {
    const staffDetails = useMemo<User[]>(() => {
        return staff?.map((staff: string) => {
            return getUser(staff).then((resp) => resp.data) as User | unknown;
        });
    }, [staff]);
    console.log(staffDetails);

    return (
        <div className="flex gap-3">
            <AvatarGroup isBordered max={3}>
                {staff?.map((ava, index) => {
                    return (
                        <Avatar
                            key={index}
                            src="https://images.unsplash.com/broken"
                            classNames={{
                                base:
                                    index < 1
                                        ? "bg-zinc-500"
                                        : "bg-zinc-300" + " cursor-pointer",
                            }}
                        />
                    );
                })}
            </AvatarGroup>
            <div>
                <p className="text-sm text-gray-500">Garage Staff</p>
                <p className="font-medium text-black">
                    {staff?.map((user, index) => {
                        if (index == 0) return <span key={index}>Mr.A</span>;
                        else {
                            return <span key={index}>, Mr.A</span>;
                        }
                    })}{" "}
                    and 10 more
                </p>
            </div>
        </div>
    );
}
export default GarageStaff;
