import { faCircleExclamation, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import TagSelect from "./TagSelect";
import { Review } from "@/core/types";

export type ReviewModalProps = {
    onClose: () => void;
    onSave: (review: Partial<Review>) => void;
    isOpen: boolean;
    entityId: string;
    entityName: string;
    isLoading: boolean;
};

function ReviewModal({
    isOpen,
    onClose,
    onSave,
    entityId,
    entityName,
    isLoading,
}: ReviewModalProps) {
    const [review, setReview] = useState<Partial<Review>>({
        entityId,
        content: "Trải nghiệm tuyệt vời",
        ratingPoint: 0,
    });
    const [startIndex, setStarIndex] = useState<number>(0);
    const onRatingHover = (event: React.MouseEvent<HTMLButtonElement>) => {
        const targetElement = event.currentTarget;
        const index = targetElement.getAttribute("data-index");

        if (index) {
            setStarIndex(Number.parseInt(index));
        }
    };

    const onRatingMouseLeave = () => {
        setStarIndex(0);
    };

    const onReviewValueChange = <K extends keyof Review>(
        k: K,
        v: Review[K],
    ) => {
        setReview((prev) => ({
            ...prev,
            [k]: v,
        }));
    };

    const getStartClsx = (index: number): string => {
        if (
            startIndex &&
            review.ratingPoint &&
            startIndex + 1 > review.ratingPoint &&
            index <= startIndex
        ) {
            return "text-yellow-400";
        }

        if (review.ratingPoint && index < review.ratingPoint) {
            return "text-yellow-400";
        }
        if (startIndex && index <= startIndex) {
            return "text-yellow-400";
        }

        return "text-default-200";
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            classNames={{
                closeButton:
                    "z-10 bg-transparent hover:bg-transparent hover:text-foreground",
            }}
        >
            <ModalContent>
                <ModalBody className="py-6 flex flex-col gap-4 relative">
                    <div className="bg-primary-50 flex gap-4 p-4 rounded-medium">
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            size="xl"
                            className="text-primary-400"
                        />
                        <p className="text-small font-medium">
                            Đánh giá để xây dựng cộng đồng mua bán chất lượng
                            hơn
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">
                            Trải nghiệm của bạn với {entityName} thế nào?
                        </p>
                        <div
                            className="flex justify-center gap-2 py-4 w-fit mx-auto"
                            onMouseLeave={onRatingMouseLeave}
                        >
                            {Array.from(new Array(5)).map((_, index) => (
                                <button
                                    key={index}
                                    data-index={index}
                                    onMouseEnter={onRatingHover}
                                    onClick={() =>
                                        onReviewValueChange(
                                            "ratingPoint",
                                            index + 1,
                                        )
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        size={"2x"}
                                        className={getStartClsx(index)}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <TagSelect
                        selectedTags={review?.tags?.split(",")}
                        onTagSelect={(tag) => {
                            const tagAsArray = review?.tags
                                ? review.tags?.split(",")
                                : [];
                            const tagIndex = tagAsArray.indexOf(tag);

                            if (tagIndex !== -1) {
                                tagAsArray.splice(tagIndex, 1);
                            } else {
                                tagAsArray?.push(tag);
                            }

                            onReviewValueChange(
                                "tags",
                                tagAsArray?.join(",") || "",
                            );
                        }}
                    />
                    <div>
                        <Textarea
                            variant="bordered"
                            minRows={10}
                            classNames={{
                                inputWrapper: "border",
                            }}
                            placeholder="Chia sẻ vài cảm nghĩ của bạn về dịch vụ..."
                            description="Tối thiểu 10 từ"
                            readOnly={isLoading}
                            value={review.content}
                            onValueChange={(content) =>
                                onReviewValueChange("content", content)
                            }
                        />
                    </div>
                    {isLoading && (
                        <div className="absolute inset-0 bg-background opacity-60" />
                    )}
                </ModalBody>
                <ModalFooter className="py-6">
                    <Button
                        color="primary"
                        onPress={() => onSave(review)}
                        className="w-full"
                        isLoading={isLoading}
                    >
                        <span className="font-semibold text-large">
                            Đánh giá
                        </span>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ReviewModal;
