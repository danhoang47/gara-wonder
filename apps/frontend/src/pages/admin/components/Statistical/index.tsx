import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import "./statistical.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Statistical: React.FC = () => {
    const months = [
        {
            key: "new",
            label: "New file",
        },
        {
            key: "copy",
            label: "Copy link",
        },
        {
            key: "edit",
            label: "Edit file",
        },
        {
            key: "delete",
            label: "Delete file",
        },
    ];

    const years = [
        {
            key: "new",
            label: "New file",
        },
        {
            key: "copy",
            label: "Copy link",
        },
        {
            key: "edit",
            label: "Edit file",
        },
        {
            key: "delete",
            label: "Delete file",
        },
    ];
    return (
        <div className="statis">
            <h2 className="statis_h2">Thông số thống kê</h2>
            <div className="statis_dropdown">
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered">
                            Tháng 10 <FontAwesomeIcon icon={faChevronDown} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={months}>
                        {(months) => (
                            <DropdownItem
                                key={months.key}
                                color={
                                    months.key === "delete"
                                        ? "danger"
                                        : "default"
                                }
                                className={
                                    months.key === "delete" ? "text-danger" : ""
                                }
                            >
                                {months.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>

                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered">
                            Năm 2024 <FontAwesomeIcon icon={faChevronDown} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={years}>
                        {(years) => (
                            <DropdownItem
                                key={years.key}
                                color={
                                    years.key === "delete"
                                        ? "danger"
                                        : "default"
                                }
                                className={
                                    years.key === "delete" ? "text-danger" : ""
                                }
                            >
                                {years.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div className="statis_track">
                <div className="statis_track_box">
                    <div className="statis_child">
                        <p className="statis_child_p">
                            Doanh số tháng này{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                        </p>
                        <h2 className="statis_child_h2">550 Triệu VND</h2>
                    </div>

                    <p className="statis_child_p">
                        <span style={{ color: "green" }}>+ 15%</span> So với
                        tháng trước
                    </p>
                </div>

                <div className="statis_track_box">
                    <div className="statis_child">
                        <p className="statis_child_p">
                            Doanh số tháng này{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                        </p>
                        <h2 className="statis_child_h2">550 Triệu VND</h2>
                    </div>

                    <p className="statis_child_p">
                        <span style={{ color: "green" }}>+ 15%</span> So với
                        tháng trước
                    </p>
                </div>

                <div className="statis_track_box">
                    <div className="statis_child">
                        <p className="statis_child_p">
                            Doanh số tháng này{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                        </p>
                        <h2 className="statis_child_h2">550 Triệu VND</h2>
                    </div>

                    <p className="statis_child_p">
                        <span style={{ color: "green" }}>+ 15%</span> So với
                        tháng trước
                    </p>
                </div>

                <div className="statis_track_box">
                    <div className="statis_child">
                        <p className="statis_child_p">
                            Doanh số tháng này{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                        </p>
                        <h2 className="statis_child_h2">550 Triệu VND</h2>
                    </div>

                    <p className="statis_child_p">
                        <span style={{ color: "green" }}>+ 15%</span> So với
                        tháng trước
                    </p>
                </div>

                <div className="statis_track_box">
                    <div className="statis_child">
                        <p className="statis_child_p">
                            Doanh số tháng này{" "}
                            <FontAwesomeIcon icon={faChevronDown} />
                        </p>
                        <h2 className="statis_child_h2">550 Triệu VND</h2>
                    </div>

                    <p className="statis_child_p">
                        <span style={{ color: "green" }}>+ 15%</span> So với
                        tháng trước
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Statistical;
