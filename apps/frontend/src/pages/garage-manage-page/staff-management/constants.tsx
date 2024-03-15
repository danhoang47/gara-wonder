import { Role, Staff, Status } from "@/core/types";
import { Column } from "@/core/ui/table/Table";
import { Avatar, Chip, Switch } from "@nextui-org/react";
import moment from "moment";

const staffs: Staff[] = [
    {
        role: Role.Staff,
        uid: "1", 
        email: "dathoang@gmail.com",
        emailVerified: false,
        displayName: "Dat Hoang", 
        isAnonymous: false,
        photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png", 
        phoneNumber: "0918238123",
        authorites: ["WITH_INCOME"],
        garageId: "1",
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        _id: "1",
        status: Status.Active
    },
]

const columns: Column<Staff>[] = [
    {
        key: "displayName",
        name: "Tên",
        onRender(staff) {
            return (
                <div className="flex gap-2 items-center pl-4 pr-2">
                    <Avatar 
                        src={staff.photoURL}
                    />
                    <p>{staff.displayName}</p>
                </div>
            )
        },
    },
    {
        key: "email",
        name: "Email",
        onRender({ email }) {
            return (
                <p className="pl-4">{email}</p>
            )
        }
    },
    {
        key: "phoneNumber",
        name: "Số điện thoại",
        onRender({ phoneNumber }) {
            return (
                <p className="pl-4">{phoneNumber}</p>
            )
        }
    },
    {
        key: "status",
        name: "Trạng thái",
        onRender({ status }) {
            return (
                <div className="pl-4">
                    <Chip color="primary">
                        {status === Status.Active ? "Hoạt động" : "Vắng mặt"}
                    </Chip>
                </div>
            )
        }
    },
    {
        key: "orderAuthority",
        name: "Chỉnh sửa đơn",
        onRender({ authorites }) {
            return (
                <div>
                    <Switch 
                        isSelected={authorites.includes("WITH_ORDER")}
                    />
                </div>
            )
        }
    },
    {
        key: "orderAuthority",
        name: "Xem doanh thu",
        onRender({ authorites }) {
            return (
                <div>
                    <Switch 
                        isSelected={authorites.includes("WITH_INCOME")}
                    />
                </div>
            )
        }
    },
    {
        key: "createdAt",
        name: "Ngày gia nhập",
        onRender({ createdAt }) {
            return (
                <div className="pl-4">
                    <p>{moment(createdAt).format("dd/mm/yyyy")}</p>
                </div>
            )
        }
    },
]

export {
    staffs,
    columns
};