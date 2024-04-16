import { Avatar, Button, Input } from "@nextui-org/react";
import { useRef } from "react";
import Nav from "./Nav";

const UserSettings = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const observerRefs = useRef<any>([]);

    return (
        <div className="max-w-[810px]  w-full mx-auto grid grid-cols-4 gap-10 mt-10 px-10">
            <div className="col-span-3 ">
                <h2 className="font-semibold text-2xl mb-4">
                    Thiết lập người dùng
                </h2>

                <div>
                    <div className="[&>*]:mb-2 mb-8" id="0">
                        <h3
                            className="font-semibold text-xl"
                            ref={(el) => (observerRefs.current[0] = el)}
                        >
                            Thiết lập tài khoản
                        </h3>

                        <div className="[&>*]:mb-2">
                            <h4 className="font-bold text-md">Ảnh đại diện</h4>
                            <div className="flex items-center gap-4">
                                <div className="">
                                    <Avatar
                                        name="Joe"
                                        src="https://images.unsplash.com/broken"
                                        size="lg"
                                        className="w-[120px] h-[120px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        onPress={() => {}}
                                        color="secondary"
                                        radius="full"
                                    >
                                        Tải ảnh lên
                                    </Button>
                                    <Button
                                        onPress={() => {}}
                                        variant="light"
                                        radius="full"
                                    >
                                        Xóa ảnh
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="[&>*]:mb-3 mt-6">
                            <h4 className="font-bold text-md">
                                Thông tin cá nhân
                            </h4>
                            <Input
                                label="Email"
                                placeholder="Nhập email..."
                                variant="bordered"
                            />
                            <Input
                                label="Số điện thoai"
                                placeholder="+84 12301293"
                                variant="bordered"
                            />
                            <Input
                                label="Họ"
                                placeholder="Hoang"
                                variant="bordered"
                            />
                            <Input
                                label="Tên"
                                placeholder="Dat"
                                variant="bordered"
                            />
                        </div>
                    </div>
                    <div className="[&>*]:mb-3 mb-8" id="1">
                        <h3
                            className="font-semibold text-xl"
                            ref={(el) => (observerRefs.current[1] = el)}
                        >
                            Thiết lập tiền tệ
                        </h3>
                        <h4 className="font-bold text-md">Thông tin cá nhân</h4>
                        <Input
                            label="Email"
                            placeholder="Nhập email..."
                            variant="bordered"
                        />
                        <Input
                            label="Email"
                            placeholder="Nhập email..."
                            variant="bordered"
                        />
                        <Input
                            label="Email"
                            placeholder="Nhập email..."
                            variant="bordered"
                        />
                    </div>
                    <div className="[&>*]:mb-3 mb-8" id="2">
                        <h3
                            className="font-semibold text-xl"
                            ref={(el) => (observerRefs.current[2] = el)}
                        >
                            Thiết lập đơn hàng
                        </h3>
                        <h4 className="font-bold text-md">Thông tin cá nhân</h4>
                        <Input
                            label="Email"
                            placeholder="Nhập email..."
                            variant="bordered"
                        />
                        <Input
                            label="Email"
                            placeholder="Nhập email..."
                            variant="bordered"
                        />
                        <Input
                            label="Email"
                            placeholder="Nhập email..."
                            variant="bordered"
                        />
                    </div>
                    <div className="[&>*]:mb-3 mb-8" id="3">
                        <h3
                            className="font-semibold text-xl"
                            ref={(el) => (observerRefs.current[3] = el)}
                        >
                            Thiết lập thông báo
                        </h3>
                        <h4 className="font-bold text-md">Thông tin cá nhân</h4>
                        <Input
                            label="Email"
                            placeholder="Nhập email..."
                            variant="bordered"
                        />
                        <Input
                            label="Email"
                            placeholder="Nhập email..."
                            variant="bordered"
                        />
                        <Input
                            label="Email"
                            placeholder="Nhập email..."
                            variant="bordered"
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <Nav observerRefs={observerRefs} />
            </div>
        </div>
    );
};

export default UserSettings;
