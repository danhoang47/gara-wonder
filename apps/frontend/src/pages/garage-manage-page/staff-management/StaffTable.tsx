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
    selectedStaffId?: string;
    onStaffSelect: (id: string) => void;
    isLoading: boolean;
    onSelectedStaffValueChange: (staff: Partial<Staff>) => void;
    isDisabled: boolean;
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
    selectedStaffId,
    isLoading,
    onSelectedStaffValueChange,
    isDisabled = false
}: StaffTableProps) {
    return (
        <Table
            removeWrapper
            selectionBehavior="replace"
            selectionMode="multiple"
            onSelectionChange={(keys) => {
                if (typeof keys !== "string") {
                    onStaffSelect((Array.from(keys) as string[])[0]);
                } 
            }}
            selectedKeys={selectedStaffId ? [selectedStaffId] : undefined}
        >
            <TableHeader>
                {headerTitle.map((title) => (
                    <TableColumn key={title} className="pl-4">
                        {title}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody isLoading={isLoading}>
                {staffs?.map(
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
                                <Switch
                                    isSwitch={authorities?.includes(
                                        "WITH_ORDER",
                                    )}
                                    onSwitch={(value) => {
                                        let cloned = [...authorities];
                                        if (value) {
                                            cloned.push("WITH_ORDER");
                                        } else {
                                            cloned = cloned.filter(
                                                (auth) =>
                                                    auth !== "WITH_ORDER",
                                            );
                                        }

                                        onSelectedStaffValueChange({
                                            _id,
                                            authorities: cloned,
                                        });
                                    }}
                                    isDisabled={selectedStaffId !== _id || isDisabled}
                                />
                            </TableCell>
                            <TableCell key="WITH_INCOME">
                                <Switch
                                    isSwitch={authorities?.includes(
                                        "WITH_INCOME",
                                    )}
                                    onSwitch={(value) => {
                                        let cloned = [...authorities];
                                        if (value) {
                                            cloned.push("WITH_INCOME");
                                        } else {
                                            cloned = cloned.filter(
                                                (auth) =>
                                                    auth !== "WITH_INCOME",
                                            );
                                        }

                                        onSelectedStaffValueChange({
                                            _id,
                                            authorities: cloned,
                                        });
                                    }}
                                    isDisabled={selectedStaffId !== _id || isDisabled}
                                />
                            </TableCell>
                            <TableCell key={createdAt}>
                                <div className="">
                                    <p>
                                        {moment(createdAt).format("DD/MM/YYYY")}
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
