import { getUser } from "@/api";
import { Review } from "@/core/types";
import { faStar as starNormal } from "@fortawesome/free-regular-svg-icons";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import useSWRImmutable from "swr/immutable";

export default function ReviewCard({
    review,
}: {
    review: Review & { userId: string };
}) {
    const { data: user } = useSWRImmutable(review.userId, getUser);
    const renderStar = (rating: number) => {
        return (
            <div className="flex gap-1">
                {Array.from(new Array(rating as number)).map((_, index) => (
                    <FontAwesomeIcon icon={starSolid} key={index} size="xs" />
                ))}
                {Array.from(new Array((5 - rating) as number)).map(
                    (_, index) => (
                        <FontAwesomeIcon
                            icon={starNormal}
                            key={index}
                            size="xs"
                        />
                    ),
                )}
            </div>
        );
    };
    return (
        <div className="max-h-[15rem]">
            <div className="flex gap-4">
                <img
                    src={user?.data.photoURL}
                    alt=""
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="font-medium">{user?.data.displayName}</p>
                    <p className="font-light text-sm">{user?.data.email}</p>
                </div>
            </div>
            <div className="pt-3 flex gap-2 items-center">
                <div>{renderStar(review.ratingPoint)}</div>
                <span> · </span>
                <p>{moment(review.createdAt).format("LL")}</p>
            </div>

            <p className="pt-3 text-ellipsis line-height-3 max-h-[6rem]">
                {review.content}
            </p>
        </div>
    );
}
