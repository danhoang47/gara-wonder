import { ContainerProps } from "@/core/types"

export type OverlayProps = ContainerProps 

const Overlay = ({ children }: OverlayProps) => {

    return (
        <div className="absolute inset-0 bg-overlay z-10 bg-overlay/50 backdrop-opacity-disabled">
            {children}
        </div>
    )
}

export default Overlay




