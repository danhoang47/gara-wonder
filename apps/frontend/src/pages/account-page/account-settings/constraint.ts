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
];
