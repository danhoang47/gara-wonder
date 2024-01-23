import { Input as TextField } from '@nextui-org/react'
import { Control, useController } from 'react-hook-form'

export type InputProps = React.ComponentProps<typeof TextField> & {
    control: Control,
    name: string,
    isRequired?: boolean | string
}

const Input = ({ control, name, isRequired = false, ...props }: InputProps) => {
    const {
        field,
        fieldState: { invalid },
    } = useController({
        name,
        control,
        rules: {
            required: isRequired
        }
    })

    return (
        <TextField
            {...props}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            name={field.name}
            inputRef={field.ref}
            isInvalid={invalid}
            defaultValue=''
        />
    )
}

export default Input




