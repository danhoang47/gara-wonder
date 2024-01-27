import { useState } from 'react'
import { Input as TextField } from '@nextui-org/react'

export type InputProps = React.ComponentProps<typeof TextField>

// TODO: change name of this component to work with form
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




