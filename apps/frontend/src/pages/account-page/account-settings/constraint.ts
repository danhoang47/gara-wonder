export type AccountMenuType = {
    title: string;
    description: string;
    icon: string;
    to: string;
};
export const accountMenus: AccountMenuType[] = [
    {
        title: "Cài đặt thông tin cá nhân",
        description:
            "Chỉnh sửa thông tin cá nhân của bạn như email, số điện thoại liên hệ",
        icon: "faUser",
        to: "profile",
    },
    {
        title: "Thông tin thẻ căn cước",
        description: "Cập nhật hình ảnh thẻ căn cước công dân cá nhân",
        icon: "faIdCard",
        to: "",
    },

    {
        title: "Tra cứu đơn đặt hàng",
        description: "Xem lại các đơn đặt sửa chữa xe gần đây",
        icon: "faChartBar",
        to: "orders",
    },
    {
        title: "Xe của bạn",
        description: "Xem và lưu trữ các thông tin về xe của bạn",
        icon: "faFutbol",
        to: "cars",
    },
    {
        title: "Quản lý kinh doanh",
        description:
            "Xem các đơn vị kinh doanh bạn đang quản lý hoặc các đơn mời làm việc",
        icon: "faCompass",
        to: "business",
    },
];
