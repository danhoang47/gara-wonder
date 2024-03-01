

export default function DateInput() {

    return (
        <div className="flex justify-between items-center">
            <div>
                <p className="text-sm text-default-600 after:content-['*'] after:text-danger after:ml-0.5">Date</p>
                <p className="">{new Date().toDateString()}</p>
            </div>
            <div>
                <button className="text-medium underline font-medium">
                    Edit
                </button>
            </div>
        </div>
    )
}