import React from "react";
import { Button, User } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const Order: React.FC = () => {
    return (
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "10px" }}>
                <div
                    style={{
                        width: "240px",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                    }}
                >
                    <p>12/4/2024 - 14/4/2024</p>{" "}
                    <FontAwesomeIcon icon={faCalendarDays} />
                </div>

                <div
                    style={{
                        width: "180px",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                    }}
                >
                    <p>Trạng thái: Đã huỷ</p>
                </div>

                <div
                    style={{
                        width: "100px",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                    }}
                >
                    <p>Mới nhất</p>
                </div>
            </div>

            <div
                style={{
                    width: "480px",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                }}
            >
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <User
                        name="Jane Doe"
                        description="Product Designer"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                        }}
                    />
                    <p style={{ textTransform: "uppercase" }}>vnd 500k</p>
                </div>

                <p style={{ padding: "10px 0", fontWeight: "bold" }}>
                    Service 1
                </p>

                <p style={{ display: "flex", gap: "10px" }}>
                    <FontAwesomeIcon icon={faCalendarDays} />
                    Order date: 13/3/2024 - Return Date: 16/3/2024
                </p>

                <div
                    style={{ display: "flex", marginTop: "20px", gap: "10px" }}
                >
                    <Button
                        style={{
                            borderRadius: "20px",
                            backgroundColor: "#4361EE",
                            color: "#fff",
                        }}
                    >
                        Accepted
                    </Button>

                    <Button
                        style={{
                            borderRadius: "20px",
                            backgroundColor: "#fff",
                            color: "#000",
                            border: "1px solid #ccc",
                        }}
                    >
                        No Evaluation
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Order;
