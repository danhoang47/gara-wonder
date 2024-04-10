
import { Button } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import FilterSection from "./FilterSection";
import { setFilterValue } from "@/features/garage-filter/filter.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RATINGS: number[] = [
    1, 2, 3, 4, 5
]

export default function RatingFilterSection() {
    const ratings = useAppSelector((state) => state.filter.ratings)
    const dispatch = useAppDispatch();

    return (
        <FilterSection
            title="Đánh giá"
            description="Lựa chọn những garage có điểm số bạn mong muốn"
            classNames={{
                contentWrapper: "gap-1"
            }}
        >
            {RATINGS.map((rating) => (
                <Button
                    key={rating}
                    endContent={
                        <FontAwesomeIcon icon={faStar} />
                    }
                    variant={
                        ratings?.includes(rating)
                            ? "solid"
                            : "bordered"
                    }
                    radius="full"
                    className="border"
                    disableAnimation
                    onPress={() => {
                        if (
                            ratings &&
                            ratings.includes(rating)
                        ) {
                            dispatch(setFilterValue({
                                key: "ratings",
                                value: ratings.filter(
                                    (r) => r !== rating,
                                ),
                            }));
                            return;
                        }

                        dispatch(setFilterValue({
                            key: "ratings",
                            value: [
                                ...(ratings || []),
                                rating,
                            ],
                        }));
                    }}
                >
                    <span>{rating}</span>
                </Button>
            ))}
        </FilterSection>
    )
}