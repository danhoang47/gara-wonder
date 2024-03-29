import { useState } from 'react'
import { Input as TextField } from '@nextui-org/react'

export type InputProps = React.ComponentProps<typeof TextField>

const Input = (props: InputProps) => {
    const [isTouched, setTouched] = useState<boolean>(false)
   
    return (
        <TextField
            {...props}
            onFocus={() => setTouched(true)}
            errorMessage={isTouched && props.errorMessage}
        />
    )
}

export default Input




