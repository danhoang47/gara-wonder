import { getReviews } from "@/api";
import { LoadingContext } from "@/core/contexts/loading";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import { ReviewCard } from "./ui";
import "./review.styles.scss";
export default function Review() {
    const { garageId } = useParams();
    const { load, unload } = useContext(LoadingContext);
    const { isLoading, data: reviewList } = useSWRImmutable("review", () =>
        getReviews(garageId),
    );

    useEffect(() => {
        if (isLoading) load("review");
        else unload("review");
    }, [isLoading]);

    return (
        <div>
            <div className="py-4">
                <p className="text-2xl text-black font-semibold">
                    {reviewList?.length} Đánh giá
                </p>
                <div className="review-grid pt-9">
                    {reviewList?.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
}
