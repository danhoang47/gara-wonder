import { Radio, cn } from "@nextui-org/react";

export type UniformRadioProps = React.ComponentProps<typeof Radio> & {

}

function UniformRadio({ children, ...props }: UniformRadioProps) {

    return (
        <Radio
            {...props}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between max-w-full",
                    "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                )
            }}
        >
            {children}
        </Radio>
    )
}

export default UniformRadio;