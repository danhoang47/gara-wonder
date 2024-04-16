import { useAppSelector, useInfiniteScroll } from "@/core/hooks";
import { selectNotifications } from "../garage-notifications.slice";
import NotificationSkeleton from "../notification-skeleton";
import NotificationCard from "../notification-card";

export type GarageNotificationsProps = {
    isLoading: boolean;
    isReload: boolean;
    onNext: () => void;
};

function GarageNotifications({
    isLoading,
    isReload,
    onNext,
}: GarageNotificationsProps) {
    const notifications = useAppSelector((state) =>
        selectNotifications(state.garageNotifications),
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
                <div className="flex flex-col items-center py-4 gap-4 h-[60vh] justify-center">
                    <img
                        alt="empty notification image"
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

export default GarageNotifications;
