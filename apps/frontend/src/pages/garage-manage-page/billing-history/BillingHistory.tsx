import { useParams } from 'react-router-dom'
import BillingHistoryTable from './BillingHistoryTable';
import BillingModal from './BillingModal';

function BillingHistory() {
    const { garageId } = useParams();
    // const { isLoading, data: bills} = useSWR(garageId, getBills)

    return (
        <div className="h-full flex flex-col px-10">
            <div className="sticky top-0 w-full py-6 bg-background z-10">
                <h1 className="font-semibold text-2xl z-10">
                    Hóa đơn phí dịch vụ
                </h1>
                <p className="text-default-500">
                    Theo dõi lịch sử thanh toán hóa đơn phí dịch vụ hệ thống của bạn
                </p>
            </div>
            <div>
                <BillingHistoryTable />
            </div>
            <BillingModal />
        </div>
    );
}

export default BillingHistory;
