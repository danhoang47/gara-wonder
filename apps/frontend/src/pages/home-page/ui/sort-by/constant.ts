import { faArrowDownWideShort, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";

const sortByOptions = [
    {
        key: "latest",
        title: "Mới nhất",
        icon: faArrowUpWideShort
    },
    {
        key: "oldest",
        title: "Cũ nhất",
        icon: faArrowDownWideShort
    },
    {
        key: "desc",
        title: "Giá giảm dần",
        icon: faArrowUpWideShort
    },
    {
        key: "asc",
        title: "Giá tăng dần",
        icon: faArrowDownWideShort
    },
]

export default sortByOptions