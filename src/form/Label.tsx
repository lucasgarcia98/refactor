import { FormLabel, FormLabelProps } from '@chakra-ui/form-control'

interface LabelProps extends FormLabelProps {
  title: string
}

export default function Label({ title, ...rest }: LabelProps) {
  return (
    <FormLabel
      fontSize={['sm', 'sm', 'md', 'md']}
      fontWeight="normal"
      mb="-1.2rem"
      {...rest}
      isTruncated
    >
      {title}
    </FormLabel>
  )
}