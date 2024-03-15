import { Table } from "@/core/ui";
import { columns, staffs } from "./constants";
import { Button, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";

function StaffManagement() {
    const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([])
    const shouldShowActionButton = useMemo(() => selectedStaffIds.length !== 0, [selectedStaffIds])

    return (
        <div className="h-full">
            <div className="sticky top-0 w-full px-4 py-6 bg-background flex gap-4">
                <h1 className="font-semibold text-2xl z-10">
                    Quản lý nhân viên
                </h1>
            </div>
            <div> 
                <div className="flex px-4 mb-4">   
                    <div className="flex gap-2">
                        <Input 
                            label="Tìm kiếm nhân viên"
                            placeholder="Nhập email..."
                            variant="bordered"
                            size="sm"
                            radius="lg"
                            classNames={{
                                base: "min-w-80"
                            }}
                        />
                        <Button color="primary">
                            <span className="px-2">Thêm nhân viên</span>
                        </Button>
                    </div>
                    <div className="flex ml-auto gap-2">
                        <Button variant="bordered">
                            Xóa nhân viên
                        </Button>
                        <Button variant="bordered">
                            Hủy hoạt động
                        </Button>
                    </div>
                </div>  
                <Table 
                    items={staffs}
                    columns={columns}
                    classNames={{
                        headerWrapper: "bg-default-100 pl-4 py-3",
                        headerTitle: "text-small font-medium text-default-500",
                        row: "py-4 border-b"
                    }}
                    enableCheckAction
                />
            </div>
        </div>
    )
}

export default StaffManagement;