import { useAppSelector } from "@/core/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-regular-svg-icons";
import { Card, CardBody } from "@nextui-org/react";
import { AccountMenuType, accountMenus } from "./constraint";
import { useContext, useEffect } from "react";
import { LoadingContext } from "@/core/contexts/loading";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
    const userData = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const { load, unload } = useContext(LoadingContext);
    useEffect(() => {
        if (!userData.value) load("account-settings");
        else unload("account-settings");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    return (
        <div className="w-full max-w-[1024px] mx-auto px-10">
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
                {accountMenus.map((item: AccountMenuType, index) => (
                    <Card
                        className="px-6 py-8 col-span-4 cursor-pointer"
                        key={index}
                    >
                        <CardBody
                            className="text-left p-0 "
                            onClick={() => navigate(`/account/${item.to}`)}
                        >
                            <div className="h-8 mb-6 font-bold">
                                <FontAwesomeIcon
                                    //@ts-expect-error unmatch type string error
                                    icon={icon[`${item.icon}`]}
                                    className="h-8"
                                />
                            </div>

                            <p className="font-semibold text-xl">{item.title}</p>
                            <p className="text-sm text-default-500">
                                {item.description}
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
