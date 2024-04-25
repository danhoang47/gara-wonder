import { Avatar } from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Role, User } from "@/core/types";
import { useDebouncedValue } from "@/core/hooks";
import useSWRImmutable from "swr/immutable";
import { getUsers } from "@/api";
import moment from "moment";

export type EmailOrPhonePickerProps = {
    pickedEntitis: User[];
    onValueChange: (entities: User[]) => void;
    isLoading: boolean
};

function EmailOrPhonePicker({
    onValueChange,
    pickedEntitis,
    isLoading
}: EmailOrPhonePickerProps) {
    const [searchText, setSearchText] = useState<string>("");
    const debounced = useDebouncedValue(searchText, 1000);
    const { data: entities } = useSWRImmutable(debounced, async (text) => {
        if (text.startsWith("+")) {
            text = text.slice(1)
        }
        if (text.startsWith("0")) {
            text = "84" + text.slice(1)
        }
        return await getUsers(text, Role.User)
    });
    const [hasFocused, setFocused] = useState<boolean>(false);

    return (
        <div className="rounded-small border px-2 flex gap-1 relative min-w-80">
            <div className="flex gap-1 items-center">
                {pickedEntitis.map((entity, index) => (
                    <div
                        key={entity._id}
                        className="h-[calc(100%-8px)] flex items-center px-2 gap-2 rounded-md bg-default-100"
                    >
                        <Avatar
                            src={entity.photoURL}
                            size="sm"
                            classNames={{
                                icon: "text-default-50",
                                base: "w-6 h-6",
                            }}
                        />
                        <p className="whitespace-nowrap text-small font-medium">
                            {entity.displayName ||
                                entity.email ||
                                entity.phoneNumber}
                        </p>
                        <button
                            onClick={() => {
                                const cloned = [...pickedEntitis];
                                cloned.splice(index, 1);
                                onValueChange(cloned);
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} size="sm" />
                        </button>
                    </div>
                ))}
            </div>
            <input
                onFocus={() => setFocused(true)}
                placeholder="Nhập email hoặc số điện thoại..."
                className="text-small h-full py-2 outline-none w-full"
                onKeyDown={(event) => {
                    if (event.key === "Backspace" && !searchText) {
                        const cloned = [...pickedEntitis];
                        cloned.pop();
                        onValueChange(cloned);
                    }
                }}
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                disabled={isLoading}
            />
            {Boolean(entities?.length) && hasFocused && (
                <div className="absolute top-10 w-full left-0 bg-background z-20 py-4 flex flex-col gap-2 max-h-80 shadow rounded-b-medium">
                    {entities?.map((entity) => (
                        <div
                            key={entity._id}
                            className="p-2 flex gap-2 items-center cursor-pointer hover:bg-default-100"
                            onClick={() => {
                                onValueChange([...pickedEntitis, entity]);
                                setSearchText("");
                            }}
                        >
                            <Avatar src={entity?.photoURL} />
                            <div>
                                <p className="leading-none">
                                    {entity.displayName ||
                                        entity.email ||
                                        entity.phoneNumber}
                                </p>
                                <span className="text-[12px] text-default-500">
                                    Tham gia vào{" "}
                                    {moment(entity.createdAt).format(
                                        "DD/MM/YYYY",
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EmailOrPhonePicker;
