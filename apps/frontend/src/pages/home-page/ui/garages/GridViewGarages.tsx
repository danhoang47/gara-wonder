import {
    useAppDispatch,
    useAppSelector,
    useInfiniteScroll,
    useModalContext,
} from "@/core/hooks";
import { ViewModeGaragesProps } from "./Garages";
import GarageSkeletonCard from "../garage-skeleton-card";
import GarageCard from "../garage-card";
import { WithOwnerGarage } from "@/api/garages/getGarages";
import { addGarageToFavorites } from "@/api";
import { notify } from "@/features/toasts/toasts.slice";

export default function GridViewGarages({
    isLoading,
    isReload,
    garages,
    onNext,
    onUpdateGarage,
}: ViewModeGaragesProps) {
    const token = useAppSelector((state) => state.user.token);
    const dispatch = useAppDispatch()
    const { open } = useModalContext();
    const ref = useInfiniteScroll(onNext);

    const renderLoadingGarages = () => {
        return (
            <>
                {Array.from(new Array(10)).map((_, index) => (
                    <GarageSkeletonCard key={index} />
                ))}
            </>
        );
    };

    const onFavoriteButtonPress = (garage: WithOwnerGarage) => {
        if (!token) {
            open("signIn");
            return;
        }

        addGarageToFavorites(garage._id, token)
        onUpdateGarage({
            ...garage,
            isFavorite: !garage.isFavorite,
        });
        const title = !garage.isFavorite ? "Thêm vào danh sách yêu thích" : "Xóa khỏi danh sách yêu thích"
        const description = !garage.isFavorite ? "Thêm vào danh sách yêu thích thành công" : "Xóa khỏi danh sách yêu thích thành công"
        dispatch(notify({ title, description, type: "success", delay: 2000 }))
    };

    return (
        <div className="gridViewGaragesWrapper">
            <div className="gridViewGarages">
                {isReload && renderLoadingGarages()}
                {garages?.map((garage) => (
                    <GarageCard
                        key={garage._id}
                        garage={garage}
                        onFavoriteButtonPress={onFavoriteButtonPress}
                    />
                ))}
                {isLoading && renderLoadingGarages()}
            </div>
            <div ref={ref} className="h-10" />
        </div>
    );
}
