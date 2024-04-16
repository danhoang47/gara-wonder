import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { FetchStatus, User } from "@/core/types";
import {
    Avatar,
    Button,
    CircularProgress,
    Input,
    ModalBody,
} from "@nextui-org/react";
import { useEffect, useId, useMemo, useState } from "react";
import { updateUser } from "../../user.slice";

const fields: Array<keyof User> = ["displayName", "email", "phoneNumber"];

export type ProfileFormProps = {
    onClose: () => void;
};

export default function ProfileForm({ onClose }: ProfileFormProps) {
    const photoInputId = useId();
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.user.status);
    const user = useAppSelector((state) => state.user.value);
    const [localUser, setLocalUser] = useState<Partial<User>>({});
    const [isLoading, setLoading] = useState<boolean>(false);
    const isSubmitButtonDisabled = useMemo(() => {
        return fields.some((field) => !localUser[field]);
    }, [localUser]);

    const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length !== 0) {
            const url = URL.createObjectURL(files[0]);
            setLocalUser((prev) => ({ ...prev, photoURL: url }));
        }
    };

    useEffect(() => {
        return () => URL.revokeObjectURL(localUser.photoURL || "");
    }, [localUser.photoURL]);

    useEffect(() => {
        if (user) {
            setLocalUser(user);
        }
    }, [user]);

    if (status === FetchStatus.Fetching) {
        return (
            <ModalBody>
                <div className="min-h-[540px] flex items-center justify-center">
                    <CircularProgress />
                </div>
            </ModalBody>
        );
    }

    const onProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const profileFormData = new FormData(e.currentTarget);
        setLoading(true);
        dispatch(updateUser(profileFormData)).then(() => {
            setLoading(false);
            onClose();
        });
    };

    return (
        <ModalBody>
            <div className="pt-10">
                <h1 className="font-semibold text-large">
                    Cung cấp một vài thông tin về bạn
                </h1>
                <p className="font-medium text-small text-default-500">
                    Thông tin của bạn sẽ được bảo mật và chỉ hiển thị một số
                    thông tin cơ bản
                </p>
            </div>
            <form
                className="flex flex-col gap-3 my-4"
                onSubmit={onProfileSubmit}
            >
                <div className="w-full flex gap-2 items-center">
                    <Avatar
                        className="w-20 h-20 text-default-50"
                        src={localUser.photoURL}
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
                    value={user?.displayName || localUser?.displayName}
                    onValueChange={(value) =>
                        setLocalUser((prev) => ({
                            ...prev,
                            displayName: value,
                        }))
                    }
                    isReadOnly={Boolean(user?.displayName)}
                    isDisabled={isLoading}
                    isRequired
                />
                <Input
                    name="email"
                    variant="bordered"
                    label="Email"
                    placeholder="example@email.com"
                    value={user?.email || localUser?.email}
                    onValueChange={(value) =>
                        setLocalUser((prev) => ({
                            ...prev,
                            email: value,
                        }))
                    }
                    isReadOnly={Boolean(user?.email)}
                    isDisabled={isLoading}
                />
                <Input
                    name="phoneNumber"
                    variant="bordered"
                    label="Số điện thoại"
                    placeholder="0987654321"
                    value={user?.phoneNumber || localUser?.phoneNumber}
                    onValueChange={(value) =>
                        setLocalUser((prev) => ({
                            ...prev,
                            phoneNumber: value,
                        }))
                    }
                    isReadOnly={Boolean(user?.phoneNumber)}
                    isDisabled={isLoading}
                />
                <Button
                    color="primary"
                    type="submit"
                    className="mt-10"
                    isDisabled={isSubmitButtonDisabled}
                    isLoading={isLoading}
                >
                    Hoàn thành
                </Button>
            </form>
        </ModalBody>
    );
}
