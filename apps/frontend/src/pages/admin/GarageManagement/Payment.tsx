import React from "react";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import BillingHistoryTable from "./BillingHistoryTable";
import { getBillings } from "@/api";

const Payment: React.FC = () => {
    const { garageId } = useParams();

    const { isLoading, data: bills } = useSWRImmutable(
        garageId ? "bill" : null,
        () => getBillings(garageId ?? ""),
    );

    return (
        <div className="h-[calc(100% - 104px)] overflow-hidden">
            <BillingHistoryTable
                bills={bills || []}
                isLoading={isLoading}
            />
        </div>
    );
};

export default Payment;
