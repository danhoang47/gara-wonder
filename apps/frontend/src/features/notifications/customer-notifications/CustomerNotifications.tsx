import { useAppSelector, useInfiniteScroll } from "@/core/hooks";
import { selectNotifications } from "../notifications.slice";
import NotificationSkeleton from "../notification-skeleton";
import NotificationCard from "../notification-card";

export type CustomerNotificationsProps = {
    isLoading: boolean;
    isReload: boolean;
    onNext: () => void;
};

function CustomerNotifications({
    isLoading,
    isReload,
    onNext,
}: CustomerNotificationsProps) {
    const notifications = useAppSelector((state) =>
        selectNotifications(state.notifications),
    );
    const ref = useInfiniteScroll(onNext);

    const onRenderLoading = () => {
        return (
            <>
                {Array.from(new Array(10)).map((_, index) => (
                    <NotificationSkeleton key={index} />
                ))}
            </>
        );
    };

    const onRenderNotifications = () => {
        if (isReload && isLoading) {
            return <>{onRenderLoading()}</>;
        }
        if (!isLoading && notifications.length === 0) {
            return (
                <div className="flex flex-col items-center py-4 gap-4">
                    <img
                        src="https://cdn-icons-png.freepik.com/512/7486/7486744.png"
                        className="max-w-24 opacity-40"
                    />
                    <p className="text-default-400 italic">
                        Có vẻ bạn không nhận được thông báo nào!
                    </p>
                </div>
            );
        }

        return (
            <>
                {notifications?.map((notification) => (
                    <NotificationCard
                        key={notification._id}
                        notification={notification}
                    />
                ))}
                {isLoading && onRenderLoading()}
            </>
        );
    };

    return (
        <div className="max-h-[70vh] overflow-y-auto">
            <div>{onRenderNotifications()}</div>
            <div ref={ref} className="h-2" />
        </div>
    );
}

export default CustomerNotifications;
