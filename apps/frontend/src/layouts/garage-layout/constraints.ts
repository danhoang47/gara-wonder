export type navType = {
    title: string;
    link: string;
    children?: navType[];
};

export const navList: navType[] = [
    { title: "Tổng quan", link: "" },
    { title: "Lịch", link: "calendar" },
    { title: "Đơn sửa chữa", link: "orders" },
    { title: "Tin nhắn", link: "message" },
    {
        title: "Chi tiết",
        link: "",
        children: [
            { title: "Review", link: "review" },
            { title: "Thu nhập", link: "income" },
            { title: "Nhân viên", link: "staff" },
        ],
    },
];
