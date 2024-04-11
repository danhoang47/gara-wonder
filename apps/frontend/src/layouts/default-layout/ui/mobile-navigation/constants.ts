import { faComment, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default [
    {
        key: "1",
        title: "Khám phá",
        icon: faMagnifyingGlass,
        path: "/garages"
    },
    {
        key: "2",
        title: "Yêu thích",
        icon: faHeart,
        path: "isFavorite=true"
    },
    {
        key: "3",
        title: "Tin nhắn",
        icon: faComment,
        path: "/chat"
    },
    {
        key: "4",
        title: "Tài khoản",
        icon: faUser,
        path: "/account/settings"
    }
]