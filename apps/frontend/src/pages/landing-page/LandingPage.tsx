import { getCategories } from "@/api";
import { Button, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import "./LandingPage.styles.scss";

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
                    <div className="h-48 bg-cover bg-center bg-norepeat grow rounded-large bg-[url('https://thefastkey.com/wp-content/uploads/2022/02/rediger-un-ordre-de-reparation-2.jpg')]">
                        <div className="w-full h-full flex items-center px-4">
                            <p className="text-xl font-medium text-background">
                                Quản lý garage
                            </p>
                        </div>
                    </div>
                    <div className="h-48 bg-cover bg-center bg-norepeat grow rounded-large bg-[url('https://thefastkey.com/wp-content/uploads/2022/02/rediger-un-ordre-de-reparation-2.jpg')]">
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
                    {categories?.map((category) => (
                        <div
                            key={category._id}
                            className="category grow basis-0 cursor-pointer"
                        >
                            <Link
                                className="block"
                                href={`/garages?category=${category._id}`}
                            >
                                <div className="h-32 bg-default-300 rounded-large"></div>
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
