import { Helmet } from "react-helmet";

function Markup() {
    return (
        <Helmet>
            <meta property="og:url" content={"https://garagewonder.site"} />
            <meta property="og:type" content="website" />
            <meta
                property="og:title"
                content="Tìm kiếm hàng trăm garage sửa chữa"
            />
            <meta
                property="og:description"
                content="Sửa chữa xe của bạn với dịch vụ của chúng tôi"
            />
            <meta
                property="og:image"
                content="https://strongbuildingsystems.com/wp-content/uploads/2020/09/mechanic-garage-2500-x-2000-7-1024x819.jpg"
            />
        </Helmet>
    );
}

export default Markup;
