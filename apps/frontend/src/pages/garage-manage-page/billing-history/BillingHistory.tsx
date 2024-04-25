import { useParams } from "react-router-dom";
import BillingHistoryTable from "./BillingHistoryTable";
import BillingModal from "./BillingModal";
import { useState } from "react";
import { generatePaymentURL, getBillings } from "@/api";
import useSWRImmutable from "swr/immutable";
import { WithUserBill } from "@/api/garages/getBillings";

function BillingHistory() {
    const { garageId } = useParams();
    const [isBillingModalOpen, setBillingModalOpen] = useState<boolean>(false);
    const { isLoading, data: bills } = useSWRImmutable(garageId, getBillings);
    const [selectedBill, setSelectedBill] = useState<WithUserBill>();
    const [isGeneratePaymentURLLoading, setGeneratePaymentURLLoading] = useState<boolean>();
    

    return (
        <div className="h-full flex flex-col px-10 relative">
            <div className="sticky top-0 w-full py-6 bg-background z-10">
                <h1 className="font-semibold text-2xl z-10">
                    Hóa đơn phí dịch vụ
                </h1>
                <p className="text-default-500">
                    Theo dõi lịch sử thanh toán hóa đơn phí dịch vụ hệ thống của
                    bạn
                </p>
            </div>
            <div className="h-[calc(100% - 104px)] overflow-hidden">
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
                onSave={async (_id?: string) => {
                    setGeneratePaymentURLLoading(true)
                    const paymentURL = await generatePaymentURL(garageId!, _id!);
                    const a = document.createElement("a")
                    a.href = paymentURL.vnpUrl
                    a.click()
                }}
                isLoading={isGeneratePaymentURLLoading}
            />
        </div>
    );
}

export default BillingHistory;
