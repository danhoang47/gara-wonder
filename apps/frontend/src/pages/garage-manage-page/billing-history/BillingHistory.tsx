import { useParams } from "react-router-dom";
import BillingHistoryTable from "./BillingHistoryTable";
import BillingModal from "./BillingModal";
import { useState } from "react";
import { getBillings } from "@/api";
import useSWRImmutable from "swr/immutable";
import { WithUserBill } from "@/api/garages/getBillings";

function BillingHistory() {
    const { garageId } = useParams();
    const [isBillingModalOpen, setBillingModalOpen] = useState<boolean>(false);
    const { isLoading, data: bills } = useSWRImmutable(garageId, getBillings);
    const [selectedBill, setSelectedBill] = useState<WithUserBill>();

    return (
        <div className="h-full flex flex-col px-10">
            <div className="sticky top-0 w-full py-6 bg-background z-10">
                <h1 className="font-semibold text-2xl z-10">
                    Hóa đơn phí dịch vụ
                </h1>
                <p className="text-default-500">
                    Theo dõi lịch sử thanh toán hóa đơn phí dịch vụ hệ thống của
                    bạn
                </p>
            </div>
            <div>
                <BillingHistoryTable
                    onOpenModalPress={(bill) => {
                        setSelectedBill(bill);
                        setBillingModalOpen(true);
                    }}
                    bills={bills || []}
                    isLoading={isLoading}
                />
            </div>
            <BillingModal
                isOpen={isBillingModalOpen}
                onClose={() => setBillingModalOpen(false)}
                bill={selectedBill}
            />
        </div>
    );
}

export default BillingHistory;
