import { Staff } from "@/core/types";
import { Switch } from "@/core/ui";
import {
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import moment from "moment";

export type StaffTableProps = {
    staffs: Staff[];
    selectedStaffIds: string[];
    onStaffSelect: (ids: string[]) => void;
    isLoading: boolean;
    selectedStaff?: Staff;
    onSelectedStaffValueChange: (staff: Staff) => void
};

const headerTitle = [
    "Tên",
    "Email",
    "Số điện thoại",
    "Trạng thái",
    "Chỉnh sửa đơn",
    "Xem doanh thu",
    "Ngày gia nhập",
];

function StaffTable({
    staffs,
    onStaffSelect,
    selectedStaffIds,
    isLoading,
    selectedStaff,
    onSelectedStaffValueChange
}: StaffTableProps) {
    return (
        <Table
            removeWrapper
            selectionBehavior="replace"
            selectionMode="multiple"
            onSelectionChange={(keys) => {
                console.log(Array.from(keys));
                if (typeof keys === "string" && keys === "all") {
                    onStaffSelect(staffs.map(({ _id }) => _id));
                } else {
                    onStaffSelect(Array.from(keys) as string[]);
                }
            }}
            selectedKeys={selectedStaffIds}
        >
            <TableHeader>
                {headerTitle.map((title) => (
                    <TableColumn key={title} className="pl-4">
                        {title}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody isLoading={isLoading}>
                {staffs.map(
                    ({
                        _id,
                        authorities,
                        createdAt,
                        displayName,
                        email,
                        isOnline,
                        phoneNumber,
                        photoURL,
                    }) => (
                        <TableRow
                            key={_id}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <TableCell key={displayName} className="pl-4">
                                <div className="flex gap-2 items-center w-full">
                                    <Avatar src={photoURL} />
                                    <p className="flex-grow text-ellipsis overflow-hidden">
                                        {displayName}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell key={email}>
                                <p className="">{email}</p>
                            </TableCell>
                            <TableCell key={phoneNumber}>
                                <p className="">
                                    {phoneNumber || "Chưa cung cấp"}
                                </p>
                            </TableCell>
                            <TableCell key={isOnline ? "primary" : "default"}>
                                <div className="">
                                    <Chip
                                        color={isOnline ? "primary" : "default"}
                                    >
                                        {isOnline ? "Hoạt động" : "Vắng mặt"}
                                    </Chip>
                                </div>
                            </TableCell>
                            <TableCell key="WITH_ORDER">
                                <div>
                                    <Switch
                                        isSwitch={authorities?.includes(
                                            "WITH_ORDER",
                                        )}
                                    />
                                </div>
                            </TableCell>
                            <TableCell key="WITH_INCOME">
                                <div>
                                    <Switch
                                        isSwitch={authorities?.includes(
                                            "WITH_INCOME",
                                        )}
                                        onSwitch={(value) => {
                                        }}
                                        isDisabled={selectedStaff?._id !== _id}
                                    />
                                </div>
                            </TableCell>
                            <TableCell key={createdAt}>
                                <div className="">
                                    <p>
                                        {moment(createdAt).format("dd/mm/yyyy")}
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ),
                )}
            </TableBody>
        </Table>
    );
}

export default StaffTable;
