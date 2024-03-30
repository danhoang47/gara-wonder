export type AccountMenuType = {
    title: string;
    description: string;
    icon: string;
    to: string;
};
export const accountMenus: AccountMenuType[] = [
    {
        title: "Thông tin cá nhân",
        description:
            "Cung cấp thông tin cá nhân và cách chúng tôi có thể liên hệ với bạn",
        icon: "faAddressCard",
        to: "",
    },
    {
        title: "Đăng nhập và bảo mật",
        description: "Cập nhật mật khẩu và bảo mật tài khoản của bạn",
        icon: "faShieldHalved",
        to: "",
    },

    {
        title: "Thanh toán và chi trả",
        description:
            "Xem lại các khoản thanh toán, chi trả, phiếu giảm giá và thẻ quà tặng",
        icon: "faMoneyBills",
        to: "",
    },
    {
        title: "Thuế",
        description: "Quản lý thông tin người nộp thuế và chứng từ thuế",
        icon: "faFile",
        to: "",
    },
    {
        title: "Thông báo",
        description: "Chọn tùy chọn thông báo và cách bạn muốn được liên hệ",
        icon: "faBell",
        to: "",
    },
    {
        title: "Quyền riêng tư và chia sẻ",
        description:
            "Quản lý dữ liệu cá nhân, các dịch vụ được kết nối và chế độ cài đặt chia sẻ dữ liệu của bạn",
        icon: "faEye",
        to: "",
    },
    {
        title: "Lựa chọn chung",
        description: "Đặt ngôn ngữ, loại tiền tệ và múi giờ mặc định của bạn",
        icon: "faToggleOn",
        to: "",
    },
    {
        title: "Các công cụ đón tiếp khách chuyên nghiệp",
        description:
            "Nhận các công cụ chuyên nghiệp nếu bạn quản lý một số chỗ ở trên Airbnb",
        icon: "faChartSimple",
        to: "",
    },
    {
        title: "Tiền tích lũy và phiếu giảm giá từ việc giới thiệu",
        description:
            "Bạn có $0 tiền tích lũy và phiếu giảm giá từ việc giới thiệu. Tìm hiểu thêm.",
        icon: "faGift",
        to: "",
    },
];
