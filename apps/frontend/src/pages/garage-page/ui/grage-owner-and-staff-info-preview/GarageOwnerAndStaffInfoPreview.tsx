import { Avatar, AvatarGroup } from "@nextui-org/react";

function GarageOwnerAndStaffInfoPreview() {
    return (
        <div className="flex gap-8">
            <div className="flex gap-3">
                <AvatarGroup isBordered>
                    <Avatar
                        src="https://images.unsplash.com/broken"
                        classNames={{
                            base: "bg-primary cursor-pointer",
                        }}
                    />
                </AvatarGroup>
                <div>
                    <p className="text-sm text-gray-500">Garage Owner</p>
                    <p className="font-medium text-black">
                        Mr. Lorem Ipsum Dolor
                    </p>
                </div>
            </div>
            <div className="flex gap-3">
                <AvatarGroup isBordered max={3}>
                    {Array.from(new Array(3)).map((ava, index) => {
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
                        {Array.from(new Array(3)).map((user, index) => {
                            if (index == 0)
                                return <span key={index}>Mr.A</span>;
                            else {
                                return <span key={index}>, Mr.A</span>;
                            }
                        })}{" "}
                        and 10 more
                    </p>
                </div>
            </div>
        </div>
    );
}
export default GarageOwnerAndStaffInfoPreview;
