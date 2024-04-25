import React from "react";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import StaffTable from "./staff-table";
import { getStaffs } from "@/api";

const StaffPage: React.FC = () => {
    const { garageId } = useParams();

    const { isLoading: isStaffsLoading, data: staffs } = useSWRImmutable(
        garageId ? "staff" : null,
        () => getStaffs(garageId ?? ""),
    );

    return (
        <div className="relative z-0 grow overflow-hidden">
            <StaffTable
                staffs={staffs || []}
                isLoading={isStaffsLoading}
                isDisabled={true}
            />
        </div>
    );
};

export default StaffPage;
