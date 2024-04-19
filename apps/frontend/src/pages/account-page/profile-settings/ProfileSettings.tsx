import {
    Avatar,
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Input,
    DateInput,
} from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { FetchStatus, User } from "@/core/types";
import equal from "deep-equal";
import moment from "moment";
import { updateUser } from "@/features/user/user.slice";
import { notify } from "@/features/toasts/toasts.slice";

function ProfileSettings() {
    const user = useAppSelector((state) => state.user.value);
    const updateStatus = useAppSelector((state) => state.user.updateStatus);
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const photoInputId = useId();
    const [localUser, setLocalUser] = useState<Partial<User>>();
    const [error, setError] = useState<Partial<Record<keyof User, boolean>>>(
        {},
    );
    const hasShowEditButton = useMemo(
        () => !equal(localUser, user),
        [localUser, user],
    );
    const calendarDob = useMemo(() => {
        if (!localUser?.dob) return undefined;
        const date = moment(localUser.dob);

        return new CalendarDate(date.year(), date.month() + 1, date.date());
    }, [localUser?.dob]);

    const validate = () => {};

    const onProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const profileFormData = new FormData(e.currentTarget);

        dispatch(updateUser(profileFormData))
            .then(() => {
                dispatch(
                    notify({
                        title: "Cập nhật thông tin nhân",
                        description: "Cập nhật thông tin cá nhân thành công",
                        type: "success",
                    }),
                );
            })
    };

    const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length !== 0) {
            const url = URL.createObjectURL(files[0]);
            setLocalUser((prev) => ({ ...prev, photoURL: url }));
        }
    };

    useEffect(() => {
        if (user) {
            setLocalUser(user);
        }
    }, [user]);

    return (
        <div className="w-full max-w-[1024px] mx-auto px-10 pb-12">
            <div className="pt-12 sticky top-0 bg-white pb-6">
                <Breadcrumbs>
                    <BreadcrumbItem href="/account">Tài khoản</BreadcrumbItem>
                    <BreadcrumbItem>Thông tin cá nhân</BreadcrumbItem>
                </Breadcrumbs>
                <p className="font-bold text-[28px]">Thông tin cá nhân</p>
            </div>
            <div className="w-1/2 flex flex-col gap-6">
                <section>
                    <div className="">
                        <h1 className="font-semibold text-large">
                            Thông tin về bạn
                        </h1>
                        <p className="font-medium text-small text-default-500">
                            Thông tin của bạn sẽ được bảo mật và chỉ hiển thị
                            một số thông tin cơ bản
                        </p>
                    </div>
                    <form
                        className="flex flex-col gap-3 my-4"
                        onSubmit={onProfileSubmit}
                    >
                        <div className="w-full flex gap-2 items-center">
                            <Avatar
                                className="w-20 h-20 text-default-50"
                                src={localUser?.photoURL}
                            />
                            <div>
                                <label
                                    htmlFor={photoInputId}
                                    className="cursor-pointer border-2 p-2 rounded-small text-small"
                                >
                                    Tải ảnh đại diện
                                </label>
                                <input
                                    name="photo"
                                    id={photoInputId}
                                    type="file"
                                    accept="*.png,*.webp,*.jpg"
                                    hidden
                                    onChange={onPhotoChange}
                                />
                            </div>
                        </div>
                        <Input
                            name="displayName"
                            variant="bordered"
                            label="Tên của bạn"
                            placeholder="Nhập tên..."
                            value={localUser?.displayName}
                            onValueChange={(value) =>
                                setLocalUser((prev) => ({
                                    ...prev,
                                    displayName: value,
                                }))
                            }
                            isDisabled={updateStatus === FetchStatus.Fetching}
                            isRequired
                        />
                        <Input
                            name="email"
                            variant="bordered"
                            label="Email"
                            placeholder="example@email.com"
                            value={localUser?.email}
                            onValueChange={(value) =>
                                setLocalUser((prev) => ({
                                    ...prev,
                                    email: value,
                                }))
                            }
                            isReadOnly={localUser?.emailVerified}
                            isDisabled={updateStatus === FetchStatus.Fetching}
                        />
                        <Input
                            name="phoneNumber"
                            variant="bordered"
                            label="Số điện thoại"
                            placeholder="Nhập vào số diện thoại của bạn"
                            value={
                                localUser?.phoneNumber !== "null"
                                    ? localUser?.phoneNumber
                                    : ""
                            }
                            onValueChange={(value) => {
                                setLocalUser((prev) => ({
                                    ...prev,
                                    phoneNumber: value,
                                }));
                            }}
                            isReadOnly={!localUser?.emailVerified}
                            isDisabled={updateStatus === FetchStatus.Fetching}
                        />
                        <DateInput
                            name="dob"
                            variant="bordered"
                            label="Ngày sinh"
                            value={calendarDob}
                            isDisabled={updateStatus === FetchStatus.Fetching}
                            onChange={(date) => {
                                if (date) {
                                    setLocalUser((prev) => ({
                                        ...prev,
                                        dob: date.toString(),
                                    }));
                                }
                            }}
                        />
                        <input type="submit" hidden ref={inputRef}/>
                    </form>
                </section>
            </div>
            {hasShowEditButton && (
                <footer className="fixed left-0 bottom-0 w-full py-2 border-t bg-background shadow-md">
                    <div className="max-w-[1024px] mx-auto px-10 flex gap-2">
                        <Button
                            color="primary"
                            isLoading={updateStatus === FetchStatus.Fetching}
                            type="submit"
                            onPress={() => inputRef.current?.click()}
                        >
                            <span>Cập nhật</span>
                        </Button>
                        <Button
                            variant="light"
                            className=""
                            isDisabled={updateStatus === FetchStatus.Fetching}
                            onPress={() => {
                                setLocalUser(user);
                            }}
                        >
                            <span>Hủy bỏ</span>
                        </Button>
                    </div>
                </footer>
            )}
        </div>
    );
}

export default ProfileSettings;
