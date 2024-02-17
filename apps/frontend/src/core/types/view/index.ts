
export type StylableProps = {
    className?: string
}

export type ContainerProps = {
    children?: React.ReactNode
}

export type Toast = {
    id: string,
    type: "success" | "failure" | "warning",
    title: string,
    description?: string,
    delay?: number
}