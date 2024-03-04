import { change_info } from "../../img";

function UpdateGarage() {
    return (
        <div className="pt-10">
            <p className="font-semibold text-lg">Changes and corrections</p>
            <div className="flex flex-col md:flex-row justify-between w-full gap-2 pt-5">
                <div className=" relative flex justify-center items-center min-h-[15rem] min-w-[30rem] rounded-xl">
                    <p className="text-white font-semibold text-2xl z-20">
                        Change garage's installation{" "}
                    </p>
                    <div className="absolute top-0 left-0 h-full w-full z-10 bg-black opacity-30 hover:opacity-60 transition-opacity pointer rounded-xl"></div>
                    <img
                        src={change_info}
                        alt=""
                        className="absolute top-0 left-0 h-full w-full z-0 rounded-xl"
                    />
                </div>

                <div className=" relative flex justify-center items-center min-h-[15rem] min-w-[30rem] rounded-xl">
                    <p className="text-white font-semibold text-2xl z-20">
                        Change garage's installation{" "}
                    </p>
                    <div className="absolute top-0 left-0 h-full w-full z-10 bg-black opacity-30 hover:opacity-60 transition-opacity pointer rounded-xl"></div>
                    <img
                        src={change_info}
                        alt=""
                        className="absolute top-0 left-0 h-full w-full z-0 rounded-xl"
                    />
                </div>

                <div className=" relative flex justify-center items-center min-h-[15rem] min-w-[30rem] rounded-xl">
                    <p className="text-white font-semibold text-2xl z-20">
                        Change garage's installation{" "}
                    </p>
                    <div className="absolute top-0 left-0 h-full w-full z-10 bg-black opacity-30 hover:opacity-60 transition-opacity pointer rounded-xl"></div>
                    <img
                        src={change_info}
                        alt=""
                        className="absolute top-0 left-0 h-full w-full z-0 rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
}
export default UpdateGarage;
