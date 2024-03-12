import { useInfiniteScroll } from "@/core/hooks";
import NotificationSkeleton from "../notification-skeleton";

function NotificationsDialog() {
    const ref = useInfiniteScroll(() => {
        console.log("end");
    });

    return (
        <div className="w-full flex flex-col">
            <div className="flex py-4 px-6 justify-between items-center border-b">
                <p className="text-base font-semibold">Thông báo</p>
                <p className="hover:underline underline-offset-2 cursor-pointer text-primary">
                    Đánh dấu là đã đọc
                </p>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
                {Array.from(new Array(20)).map((_, index) => (
                    <NotificationSkeleton key={index} />
                ))}
                <div ref={ref} className="h-1"/>
            </div>
        </div>
    );
}

export default NotificationsDialog;
