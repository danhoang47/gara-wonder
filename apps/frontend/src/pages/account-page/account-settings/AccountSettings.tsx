import { useAppSelector } from "@/core/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-regular-svg-icons";
import { Card, CardBody } from "@nextui-org/react";
import { AccountMenuType, accountMenus } from "./constraint";
import { useContext, useEffect } from "react";
import { LoadingContext } from "@/core/contexts/loading";
import { Link } from "react-router-dom";
import { FetchStatus } from "@/core/types";

import "./AccountSettings.styles.scss"
import { SignOutTrigger } from "@/features/user";

export default function AccountSettings() {
    const user = useAppSelector((state) => state.user.value);
    const status = useAppSelector((state) => state.user.status);
    const { load, unload } = useContext(LoadingContext);
    useEffect(() => {
        if (status === FetchStatus.Fetching || status === FetchStatus.None) {
            load("account-settings");
        } else {
            unload("account-settings");
        }
    }, [status, load, unload]);

    return (
        <div className="w-full max-w-[1024px] mx-auto px-10 accountSettings">
            <div className="py-14">
                <p className="font-bold text-[28px]">Tài khoản,</p>
                <p className="text-lg">
                    <span className="font-semibold">{user?.displayName}</span>,{" "}
                    {user?.email}.{" "}
                    <SignOutTrigger className="inline-block font-semibold underline cursor-pointer"/>
                </p>
            </div>
            <div className="accountSettingEntranceCards">
                {accountMenus.map((item: AccountMenuType, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className="hover:opacity-60 transition-opacity"
                    >
                        <Card className="px-6 py-8">
                            <CardBody className="text-left p-0 h-full">
                                <div className="h-8 mb-6 font-bold">
                                    <FontAwesomeIcon
                                        //@ts-expect-error unmatch type string error
                                        icon={icon[`${item.icon}`]}
                                        className="h-8"
                                    />
                                </div>
                                <p className="font-semibold text-xl">
                                    {item.title}
                                </p>
                                <p className="text-sm text-default-500">
                                    {item.description}
                                </p>
                            </CardBody>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
