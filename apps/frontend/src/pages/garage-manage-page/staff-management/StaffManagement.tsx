import { useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/react";

import { EmailOrPhonePicker } from "@/core/ui";
import { FetchStatus, Role, Staff, User } from "@/core/types";
import {
    createInvitations,
    getStaffs,
    removeStaffs,
    updateStaffs,
} from "@/api";
import SentInvitations from "./SentInvitations";
import useSWR from "swr";
import StaffTable from "./StaffTable";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";

function StaffManagement() {
    const [selectedStaffId, setSelectedStaffId] = useState<string>();
    const shouldShowActionButtons = useMemo(
        () => selectedStaffId,
        [selectedStaffId],
    );
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.value);
    const [pickedEntities, setPickedEntities] = useState<User[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isSentInvitationsModalOpen, setIsSentInvitationsModalOpen] =
        useState<boolean>(false);
    const garageId = useAppSelector((state) => state.user.value?.garageId);
    const {
        isLoading: isStaffsLoading,
        data: staffs,
        mutate,
    } = useSWR(user?.garageId ? garageId : undefined, getStaffs, {
        refreshInterval: 30000,
        revalidateOnFocus: true,
    });
    const [localStaffs, setLocalStaffs] = useState<Staff[]>([]);
    const [updateState, setUpdateStatus] = useState<FetchStatus>(
        FetchStatus.None,
    );
    const isAllowToEdit = useMemo(() => {
        return user?.role === Role.GarageOwner || user?.authorities?.includes("WITH_ORDER")
    }, [user])

    const onInvite = async () => {
        setLoading(true);
        await createInvitations(
            garageId!,
            pickedEntities.map(({ _id }) => _id),
        );
        setLoading(false);
    };

    useEffect(() => {
        if (staffs) {
            setLocalStaffs(staffs);
        }
    }, [staffs, selectedStaffId]);

    const onSelectedStaffValueChange = (staff: Partial<Staff>) => {
        setLocalStaffs((prev) => {
            return prev.map((s) => {
                if (s._id === staff._id) {
                    return { ...s, ...staff };
                }

                return s;
            });
        });
    };

    const onUpdateStaffAuthorities = async () => {
        const { _id, authorities, garageId } = localStaffs.find(
            ({ _id }) => _id === selectedStaffId,
        )!;
        setUpdateStatus(FetchStatus.Fetching);
        await updateStaffs(garageId, _id, authorities);
        setUpdateStatus(FetchStatus.Fulfilled);
        dispatch(
            notify({
                title: "Cập nhật nhân viên",
                type: "success",
                description: "Cập nhật nhân viên thành công",
            }),
        );
        mutate();
    };

    const onRemoveStaff = async () => {
        const { _id, garageId } = localStaffs.find(
            ({ _id }) => _id === selectedStaffId,
        )!;
        setUpdateStatus(FetchStatus.Fetching);
        await removeStaffs(garageId, _id);
        setUpdateStatus(FetchStatus.Fulfilled);
        dispatch(
            notify({
                title: "Xóa nhân viên",
                type: "success",
                description: "Xóa nhân viên thành công",
            }),
        );
        mutate();
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
                            pickedEntitis={pickedEntities}
                            onValueChange={(entities) =>
                                setPickedEntities(entities)
                            }
                        />
                        <Button
                            className="bg-default-200"
                            disableRipple
                            isLoading={isLoading}
                            isDisabled={!pickedEntities.length || !isAllowToEdit}
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
                            isDisabled={!isAllowToEdit}
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
                                <Button
                                    variant="bordered"
                                    onPress={onUpdateStaffAuthorities}
                                    isDisabled={!isAllowToEdit}
                                >
                                    Cập nhật quyền
                                </Button>
                                <Button
                                    variant="bordered"
                                    onPress={onRemoveStaff}
                                    isDisabled={!isAllowToEdit}
                                >
                                    Xóa nhân viên
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="relative z-0 grow overflow-hidden">
                <StaffTable
                    staffs={localStaffs || []}
                    isLoading={
                        isStaffsLoading || updateState === FetchStatus.Fetching
                    }
                    selectedStaffId={selectedStaffId}
                    onStaffSelect={(id) => {
                        setSelectedStaffId(id);
                    }}
                    onSelectedStaffValueChange={onSelectedStaffValueChange}
                    isDisabled={updateState === FetchStatus.Fetching}
                />
            </div>
        </div>
    );
}

export default StaffManagement;
