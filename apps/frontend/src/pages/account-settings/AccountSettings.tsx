import { useAppSelector } from "@/core/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { Card, CardBody } from "@nextui-org/react";
import { accountMenus } from "./constraint";
import { useContext, useEffect } from "react";
import { LoadingContext } from "@/core/contexts/loading";

export default function AccountSettings() {
    const userData = useAppSelector((state) => state.user);
    const { load, unload } = useContext(LoadingContext);
    useEffect(() => {
        if (!userData.value) load("account-settings");
        else unload("account-settings");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    return (
        <div className="w-full max-w-[1024px] mx-auto px-unit-0">
            <div className="py-14">
                <p className="font-bold text-3xl">Tài khoản,</p>
                <p className="text-lg">
                    <span className="font-semibold">
                        {userData.value?.displayName}
                    </span>
                    , {userData.value?.email}.{" "}
                    <span className="font-semibold underline">
                        Truy cập hồ sơ
                    </span>
                </p>
            </div>
            <div className="grid grid-cols-12 gap-3">
                {accountMenus.map((item, index) => (
                    <Card className="p-1 col-span-4 cursor-pointer" key={index}>
                        <CardBody className="text-left">
                            <FontAwesomeIcon
                                icon={icon[String(item.icon)]}
                                className="w-8 h-8 mb-6"
                            />
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm pt-3">{item.description}</p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
