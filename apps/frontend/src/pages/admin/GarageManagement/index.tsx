import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Information from "./Information";
import Order from "./Order";
import Payment from "./Payment";

const GarageManagement: React.FC = () => {
    return (
        <>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <h2 style={{ fontSize: 25 }}>Garage Wonder 29</h2>
                <div
                    style={{
                        width: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#534FFD",
                        borderRadius: "20px",
                    }}
                >
                    <p style={{ color: "#fff" }}>Hoạt động</p>
                </div>
            </div>

            <div className="flex w-full flex-col">
                <Tabs
                    aria-label="Dynamic tabs"
                    variant="underlined"
                    classNames={{
                        tab: "",
                    }}
                >
                    <Tab title="Thông tin chung">
                        <Card>
                            <CardBody>
                                <Information />
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab title="Đơn hàng">
                        <Card>
                            <CardBody>
                                <Order />
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab title="Thanh toán">
                        <Card>
                            <CardBody>
                                <Payment />
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab title="Nhân viên">
                        <Card>
                            <CardBody>
                                <Information />
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
};

export default GarageManagement;
