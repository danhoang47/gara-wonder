export const fields = [
    {
        key: "name",
        label: "Tên",
    },
    {
        key: "status",
        label: "Trạng thái",
    },
    {
        key: "createdAt",
        label: "Ngày khởi tạo",
    },
];
export const sorts = [
    { key: "asc", label: "Duới lên" },
    {
        key: "desc",
        label: "Trên xuống",
    },
];

export const statusList = [
    { key: 0, label: "Đợi chấp nhận" },
    { key: 1, label: "Đã chấp nhận" },
    { key: 2, label: "Từ chối" },
    { key: 3, label: "Vô hiệu hóa" },
    { key: 4, label: "Cấm" },
];

export const orderStatusList = [
    { key: "-2", label: "Bị hủy" },
    { key: "-1", label: "Đợi chấp nhận" },
    { key: "0", label: "Đang đánh giá" },
    { key: "1", label: "Đang chuẩn bị" },
    { key: "2", label: "Đang sửa chữa" },
    { key: "3", label: "Đang thanh toán" },
    { key: "4", label: "Đã thanh toán" },
];

export const getStatusLabel = (numb: number) => {
    if (numb === 0) return "Đợi chấp nhận";
    if (numb === 1) return "Đã chấp nhận";
    if (numb === 2) return "Từ chối";
    if (numb === 3) return "Vô hiệu hóa";
    if (numb === 4) return "Cấm";
};

export const years = [
    {
        key: 2024,
        label: "Năm 2024",
    },
    {
        key: 2023,
        label: "Năm 2023",
    },
    {
        key: 2022,
        label: "Năm 2022",
    },
    {
        key: 2021,
        label: "Năm 2021",
    },
    {
        key: 2020,
        label: "Năm 2020",
    },
    {
        key: 2019,
        label: "Năm 2019",
    },
    {
        key: 2018,
        label: "Năm 2018",
    },
];
