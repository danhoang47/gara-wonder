function Description({ description }: { description?: string }) {
    return (
        <div>
            <div className="pb-4">
                <p className="text-2xl text-black font-medium">
                    Mô tả chi tiết
                </p>
            </div>

            <p className="text-justify">{description}</p>
        </div>
    );
}

export default Description;
