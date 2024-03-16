import { useMemo, useState } from "react";
import { Button, Input } from "@nextui-org/react";

import { Table } from "@/core/ui";
import { columns, staffs } from "./constants";
import { Staff } from "@/core/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function StaffManagement() {
    const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
    const shouldShowActionButtons = useMemo(
        () => selectedStaffIds.length === 1,
        [selectedStaffIds],
    );

    const onStaffSelected = (staff: Staff, isSelected: boolean) => {
        if (isSelected) {
            setSelectedStaffIds((prev) => [...prev, staff._id]);
        } else {
            setSelectedStaffIds((prev) =>
                prev.filter((id) => id !== staff._id),
            );
        }
    };

    return (
        <div className="h-full">
            <div className="sticky top-0 w-full px-4 py-6 bg-background">
                <h1 className="font-semibold text-2xl z-10">
                    Quản lý nhân viên
                </h1>
                <p className="text-default-500">
                    Cung cấp các quyền hạn cho nhân viên của bạn
                </p>
            </div>
            <div>
                <div className="flex px-4 mb-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Nhập email..."
                            variant="bordered"
                            size="sm"
                            radius="lg"
                            classNames={{
                                base: "min-w-80",
                                inputWrapper: "h-10",
                            }}
                            endContent={
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="text-default-400"
                                />
                            }
                        />
                        <Button color="primary">
                            <span className="px-2">Thêm nhân viên</span>
                        </Button>
                    </div>
                    <div className="flex ml-auto gap-2">
                        {shouldShowActionButtons && (
                            <>
                                <Button variant="bordered">
                                    Xóa nhân viên
                                </Button>
                                <Button variant="bordered">
                                    Hủy hoạt động
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <Table
                    items={staffs}
                    columns={columns}
                    classNames={{
                        headerWrapper: "bg-default-100 pl-4 py-3",
                        headerTitle: "text-small font-medium text-default-500",
                        row: "py-4 border-b hover:bg-foreground-50",
                    }}
                    enableCheckAction
                    onCheck={onStaffSelected}
                />
            </div>
        </div>
    );
}

export default StaffManagement;
