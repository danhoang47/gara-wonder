import { useAppSelector } from "@/core/hooks";
import { Role } from "@/core/types";
import { Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";

export type Region = "general" | "orders";

export type NotificationsDialogProps = {
    defaultRegion: Region;
    customerNotifications: React.ReactNode;
    garageNotifications?: React.ReactNode;
};

function NotificationsDialog({
    defaultRegion,
    customerNotifications,
    garageNotifications,
}: NotificationsDialogProps) {
    const [region, setRegion] = useState<Region>(defaultRegion);
    const user = useAppSelector((state) => state.user.value);
    const isBelongToGarage =
        user?.role === Role.GarageOwner || user?.role === Role.Staff;

    const onRenderNotifications = (): React.ReactNode => {
        switch (region) {
            case "general":
                return <>{customerNotifications}</>;
            case "orders":
                return <>{garageNotifications}</>;
            default:
                return undefined;
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div className="pt-4 px-6">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-base font-semibold">Thông báo</p>
                    <p className="hover:underline underline-offset-2 cursor-pointer text-primary">
                        Đánh dấu là đã đọc
                    </p>
                </div>
                <div className="flex">
                    <div className="-ml-2">
                        <Tabs
                            classNames={{
                                tabList: "gap-0",
                            }}
                            variant="underlined"
                            defaultSelectedKey={region}
                            onSelectionChange={(selectedRegion) => {
                                if (typeof selectedRegion === "string") {
                                    setRegion(selectedRegion as Region);
                                }
                            }}
                        >
                            <Tab key="general" title="Chung" />
                            {isBelongToGarage && (
                                <Tabs key="orders" title="Đơn hàng" />
                            )}
                        </Tabs>
                    </div>
                    <div className="ml-auto">
                        <Tabs
                            classNames={{
                                tabList: "bg-background gap-0 px-0",
                            }}
                            defaultSelectedKey="all"
                            radius="full"
                            disableAnimation
                        >
                            <Tab key="all" title="Tất cả" />
                            <Tab key="unread" title="Chưa đọc" />
                        </Tabs>
                    </div>
                </div>
            </div>
            {onRenderNotifications()}
        </div>
    );
}

export default NotificationsDialog;
