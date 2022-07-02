import { useEffect, useRef, useState } from 'react'
import { components, Select } from 'chakra-react-select'
import { FaSort } from 'react-icons/fa'
import Label from '../form/Label'
import styled from 'styled-components'
import { Divider } from '@chakra-ui/react'

interface MultiSelectProps {
  custom: {
    clearState?: boolean
    colorInput?: boolean
    debug?: boolean
    enableSearch?: boolean
    handle: (value: any) => void
    handleSelecionar?: (value: any) => void
    labelSelect: string
    name?: string
    noOptionsSelect: string
    options: any
    placeholder?: string
    showAll?: boolean
  }
}

type ActionMetaProps = {
  name?: any
  action?: any
  option?: any
  removedValue?: any
}

type OptionsProps = {
  value?: string
  label?: string
  color?: string
  colorInput?: boolean
}

export default function MultiSelectChakra(props: MultiSelectProps) {
  const {
    clearState,
    colorInput,
    debug,
    enableSearch,
    handle,
    handleSelecionar,
    labelSelect,
    name,
    noOptionsSelect,
    options,
    placeholder,
    showAll,
  } = props.custom
  const [selected, setSelected] = useState<any>()

  const selectAllOption = {
    value: '',
    label: 'Todos',
    color: colorInput ? 'Black' : '',
  }

  const [value, setValue] = useState('')
  const valueRef = useRef<any>(selected)
  valueRef.current = selected

  const isSelectAllSelected = () => {
    const valueRefCurrentLength = valueRef.current.length
    const propsOptionsLength = options.length
    const verifyValueRefUndefined = valueRef.current[0] != undefined
    const verifyPropsOptionsUndefined = options[0] != undefined

    return valueRefCurrentLength === propsOptionsLength &&
      verifyValueRefUndefined &&
      verifyPropsOptionsUndefined
      ? valueRef.current[0].value === options[0].value
      : null
  }

  const isOptionSelected = (option: OptionsProps) => {
    return (
      valueRef.current.some(
        ({ value }: OptionsProps) => value === option.value,
      ) || isSelectAllSelected()
    )
  }

  const getOptions = () =>
    showAll ? [selectAllOption, ...options] : [...options]

  const getValue = () => selected

  const onChange = (newValue: any, actionMeta: ActionMetaProps) => {
    const { action, option, removedValue } = actionMeta
    const verifySelectedAllOption =
      option && option.value === selectAllOption.value
    const selectOption = action === 'select-option'
    const deselectOption = action === 'deselect-option'
    const removeValue = action === 'remove-value'
    const actionClear = action === 'clear'

    if (selectOption && verifySelectedAllOption) {
      setSelected(options)
    } else if (
      (deselectOption && verifySelectedAllOption) ||
      (removeValue && removedValue.value === selectAllOption.value)
    ) {
      setSelected([])
    } else {
      actionClear && setValue('')
      setSelected(newValue || [])
    }

    const verifyValueSelect = removedValue || (option && option.value != '')

    const valueSelect =
      verifyValueSelect && Array.from(newValue).map((el: any) => el.value)

    handle(valueSelect)
    handleSelecionar ? handleSelecionar(valueSelect) : ''
  }

  useEffect(() => {
    onChange([], { action: 'clear' })
    setValue('')
  }, [clearState])

  useEffect(() => {
    getOptions()
  }, [options])

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaSort />
      </components.DropdownIndicator>
    )
  }

  const onInputChange = (option: string, { action }: any) => {
    if (enableSearch) {
      action == 'input-change' || action != 'set-value'
        ? setValue(option)
        : setValue('')
      handle(option)
    } else {
      setValue('')
    }
  }

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
    <form
      className="multi-select-chakra__form"
      onSubmit={(e) => e.preventDefault()}
    >
      <Label
        title={labelSelect}
        htmlFor={'select-' + name}
        fontSize={'md'}
        color={'#4B5C6B'}
        marginBottom={0}
      />
      <Select
        inputId={'select-' + name}
        isOptionSelected={isOptionSelected}
        noOptionsMessage={() => noOptionsSelect}
        options={getOptions()}
        components={{ DropdownIndicator }}
        formatOptionLabel={formatOptionLabel}
        value={getValue()}
        onChange={onChange}
        closeMenuOnSelect={false}
        placeholder={placeholder}
        classNamePrefix={'multi-select-chakra'}
        onInputChange={onInputChange}
        onMenuClose={() => setValue(value)}
        inputValue={value}
        menuIsOpen={debug}
        isMulti
      />
    </form>
  )
}
