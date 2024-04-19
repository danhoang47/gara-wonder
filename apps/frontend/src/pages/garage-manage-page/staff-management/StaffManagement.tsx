import { useMemo, useState } from "react";
import { Button } from "@nextui-org/react";

import { EmailOrPhonePicker, Table } from "@/core/ui";
import { columns, staffs } from "./constants";
import { Staff, User } from "@/core/types";
import { createInvitations } from "@/api";
import { useParams } from "react-router-dom";
import SentInvitations from "./SentInvitations";

function StaffManagement() {
    const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
    const shouldShowActionButtons = useMemo(
        () => selectedStaffIds.length === 1,
        [selectedStaffIds],
    );
    const [pickedEntitis, setPickedEntities] = useState<User[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isSentInvitationsModalOpen, setIsSentInvitationsModalOpen] =
        useState<boolean>(false);
    const { garageId } = useParams();

    const onStaffSelected = (staff: Staff, isSelected: boolean) => {
        if (isSelected) {
            setSelectedStaffIds((prev) => [...prev, staff._id]);
        } else {
            setSelectedStaffIds((prev) =>
                prev.filter((id) => id !== staff._id),
            );
        }
    };

    const onInvite = async () => {
        setLoading(true);
        const results = await createInvitations(
            garageId!,
            pickedEntitis.map(({ _id }) => _id),
        );
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="sticky top-0 w-full px-4 py-6 bg-background z-10">
                <h1 className="font-semibold text-2xl z-10">
                    Quản lý nhân viên
                </h1>
                <p className="text-default-500">
                    Cung cấp các quyền hạn cho nhân viên của bạn
                </p>
                <div className="flex mt-4">
                    <div className="flex gap-2">
                        <EmailOrPhonePicker
                            isLoading={isLoading}
                            pickedEntitis={pickedEntitis}
                            onValueChange={(entities) =>
                                setPickedEntities(entities)
                            }
                        />
                        <Button
                            className="bg-default-200"
                            disableRipple
                            isLoading={isLoading}
                            isDisabled={!pickedEntitis.length}
                            onPress={onInvite}
                        >
                            <span className="px-1 text-default-600 font-medium">
                                Thêm nhân viên
                            </span>
                        </Button>
                        <Button
                            className="hover:bg-background"
                            disableRipple
                            variant="light"
                            onPress={() => setIsSentInvitationsModalOpen(true)}
                        >
                            <p>Danh sách đã mời</p>
                        </Button>
                        <SentInvitations
                            isOpen={isSentInvitationsModalOpen}
                            onClose={() => setIsSentInvitationsModalOpen(false)}
                        />
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
            </div>
            <div className="relative z-0 grow overflow-hidden">
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
