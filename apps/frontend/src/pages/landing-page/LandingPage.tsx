import { getCategories } from "@/api";
import { Button, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import "./LandingPage.styles.scss";

const categoryImages = [
    "https://i.pinimg.com/564x/f5/6e/a7/f56ea7fb99747e652ed6879aa6cbc844.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR09kGBpZgNRuuL5a0PzE9IMZch2L2Ew9aBlRqSnLyY9jIaXwKudRhr4lCs_aem_ATmVFIKbo9vVeSIGNdx-GL11AHESz3jweECjwhnxc_9Jnq_Tnd1Z7uTlyy2udfZgErBbT2OFu6jMRi9KPJEXQcXj",
    "https://i.pinimg.com/564x/70/15/fa/7015faf16205cda473ca455915c8f294.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR3NgkzqazR1wDJBIShHorGMbpyfitpfhMQ5gLGunRM6mqek2aBVWRQrEGM_aem_ATm4o9TMh3RzJG_PSi_y9twfdbbaxxyiRS1-bhihZGhXdXWW0uxdLS0eJH1yV51vWVnvofKSD5WcjXB8bfcBbYRc",
    "https://i.pinimg.com/564x/a6/c8/bd/a6c8bd3e03534e46411d3317ba9c7764.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR1BA-tzMEYYHp4urs-hGm3xNjtOwgcV-UjjksHkfClwnjpPJAfg1WuT0jw_aem_ATmQ5SBlEa3H27nsiJUPPGWjRphdSE9lrZh5q6jb3wRuplgBiEsTBaUqKE6FEdxzdG5kg_DC26bsm3FF4sOJApPC",
    "https://i.pinimg.com/564x/d5/9e/4e/d59e4ec0ce4d493440a472f09933d5eb.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR0JcQ7tsO1z9lSe-Cwwhaf5dFeBdOpGAOD7a2Zu5gFrLF7B0e19pZANeXQ_aem_ATlJ_QFz81xkOI1QlDLssrOMj_05ytASM3DFcE92sU4DnnwjRYtKbFdSnFZP_4oDaRQ7atNXdYWu-FHprxRLXobI",
    "https://i.pinimg.com/564x/0d/fc/14/0dfc14150532e4d47f579096bba79c8c.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR1wGujCGqghEd9m6RgirUeT9YWWBT53kF6d7JpLuclNwVWXLEd3GXfyXxA_aem_ATlcuDKeP8FOxGnIVtCKhMUiIkiPSnkeA5M6ul6dFZI36PrZfu1joMMg7jBSWyPm2Gk4Jr8UfWbm3rQDcpQGDStw",
    "https://i.pinimg.com/564x/44/dc/9e/44dc9ed4b89fc69dea1e2df290bf3e1d.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR1wGujCGqghEd9m6RgirUeT9YWWBT53kF6d7JpLuclNwVWXLEd3GXfyXxA_aem_ATlcuDKeP8FOxGnIVtCKhMUiIkiPSnkeA5M6ul6dFZI36PrZfu1joMMg7jBSWyPm2Gk4Jr8UfWbm3rQDcpQGDStw",
    "https://i.pinimg.com/564x/52/90/c8/5290c84098c422aad49bfa02ebcaed8a.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR3gi9vYM50Z0q1tMr1fhiubVTz8h7j40A-cHcyxHO6oJ8OdJBIYkqd5pfQ_aem_ATmxSSh1JowvdLQRsjWfMbvzDt7_yKyBAt-O_b0uwQqNPDZuBW3Boztz9F10kLeKp8MntdjKPfYxWAenKnuE2N5E"
]

function LandingPage() {
    const navigate = useNavigate();
    const { data: categories } = useSWRImmutable("categories", getCategories);

    return (
        <div id="landing" className="pb-10 overflow-auto">
            <div className="h-[60vh] flex gap-4">
                <div className="flex flex-col grow basis-0 justify-center h-full ml-10">
                    <h1 className="text-3xl font-semibold">
                        Trở thành Nhà cung cấp của hệ thống chuỗi garage lớn nhất tại Việt Nam
                    </h1>
                    <p className="text-defaul text-default-500">
                        Cung cấp những dịch vụ và trải nghiệm tốt nhất
                    </p>
                    <Button
                        color="primary"
                        // variant="bordered"
                        className="max-w-fit mt-2"
                        onPress={() => navigate("/garages")}
                        size="lg"
                    >
                        <span className="text-large font-medium">
                            Khám phá ngay!
                        </span>
                    </Button>
                </div>
                <div className="h-full flex items-center grow basis-0">
                    <div className="h-4/5 w-full bg-default-300">
                        <img
                            alt="banner"
                            src="https://strongbuildingsystems.com/wp-content/uploads/2020/09/mechanic-garage-2500-x-2000-7-1024x819.jpg"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-6 px-10">
                <div className="mb-4">
                    <h2 className="font-semibold text-2xl">
                        Những dịch vụ được cung cấp
                    </h2>
                    <p className="text-xl text-default-500">
                        Cung cấp những dịch vụ và trải nghiệm tốt nhất
                    </p>
                </div>
                <div className="flex gap-2 wrap">
                    <div className="h-48 bg-cover bg-center bg-norepeat rounded-large grow bg-[url('https://thefastkey.com/wp-content/uploads/2022/02/rediger-un-ordre-de-reparation-2.jpg')]">
                        <div className="w-full h-full flex items-center px-4">
                            <p className="text-xl font-medium text-background">
                                Đặt lịch sửa chữa
                            </p>
                        </div>
                    </div>
                    <div className="h-48 bg-cover bg-center bg-norepeat grow rounded-large bg-[url('https://media.istockphoto.com/id/1349390515/photo/paperless-workplace-idea-e-signing-electronic-signature-document-management-businessman-signs.jpg?s=612x612&w=0&k=20&c=EyQl13diegNV5DVLnb0krcAcRDhL7NiSA7IEVImZs6Q=')]">
                        <div className="w-full h-full flex items-center px-4">
                            <p className="text-xl font-medium text-background">
                                Quản lý garage
                            </p>
                        </div>
                    </div>
                    <div className="h-48 bg-cover bg-center bg-norepeat grow rounded-large bg-[url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/148f4aa1-d5bf-461a-9af9-54f616b04873/dea76d6-455bafa5-9c65-4e81-ac5f-61cffdfc846b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE0OGY0YWExLWQ1YmYtNDYxYS05YWY5LTU0ZjYxNmIwNDg3M1wvZGVhNzZkNi00NTViYWZhNS05YzY1LTRlODEtYWM1Zi02MWNmZmRmYzg0NmIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qG4Rq9IwTse7DKW-l48uD1MtpsXtctGLM9tqcUHH1T8')]">
                        <div className="w-full h-full flex items-center px-4">
                            <p className="text-xl font-medium text-background">
                                Buôn bán, trao đổi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 px-10">
                <div className="mb-4">
                    <h2 className="font-semibold text-2xl">Dịch vụ về xe</h2>
                </div>
                <div className="categories">
                    {categories?.map((category, index) => (
                        <div
                            key={category._id}
                            className="category grow basis-0 cursor-pointer"
                        >
                            <Link
                                className="block"
                                href={`/garages?category=${category._id}`}
                            >
                                <div className="h-32 bg-default-300 rounded-large overflow-hidden">
                                    <img alt="" src={categoryImages[index]} className="w-full h-full object-cover object-center"/>
                                </div>
                                <p className="text-large font-medium text-default-foreground">
                                    {category.name}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
