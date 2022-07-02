import { Divider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import MultiSelectChakra from './MultiSelectChakra'

interface SearchMultipleFilterProps {
  handle: (value: any) => void
  placeholder?: string
  options: Array<object>
  name?: string
  labelSelect: string
  showAll?: boolean
  noOptionsSelect: string
  enableSearch?: boolean
  handleSelecionar?: (value: any) => void
  colorInput?: boolean
  clearState: boolean
  debug?: boolean
}

export default function SearchMultipleFilter(props: SearchMultipleFilterProps) {
  interface OptionsProps {
    label: string
    color?: string
    colorInput: boolean
  }

  const [selected, setSelected] = useState([])

  const formatOptionLabel = ({ label, color }: OptionsProps) => {
    const Section = styled.section`
      display: flex;
      align-items: center;
    `

    return (
      <Section>
        <Divider
          display={color ? 'block' : 'none'}
          width={'10px'}
          height={'10px'}
          backgroundColor={color}
          borderRadius={'50%'}
          marginRight={'5px'}
          opacity={'1'}
        />
        <label>{label}</label>
      </Section>
    )
  }

  return (
    <>
      <MultiSelectChakra
        options={props.options}
        value={selected}
        onChange={setSelected}
        formatOptionLabel={formatOptionLabel}
        noOptionsSelect={props.noOptionsSelect}
        handle={props.handle}
        clearState={props.clearState}
        placeholder={props.placeholder}
        name={props.name}
        label={props.labelSelect}
        showAll={props.showAll}
        enableSearch={props.enableSearch}
        handleSelecionar={props.handleSelecionar}
        colorInput={props.colorInput}
        debug={props.debug}
      />
    </>
  )
}
