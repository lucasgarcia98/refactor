import React, { useEffect, useRef, useState } from 'react'
import { components, Select } from 'chakra-react-select'
import { FaSort } from 'react-icons/fa'
import Label from '../form/Label'

type ActionMetaProps = {
  name?: any
  action?: any
  option?: any
  removedValue?: any
}

type optionProps = {
  value: string
  label: string
}

export default function MultiSelectChakra(props: any) {
  console.log(props)
  const selectAllOption = {
    value: '',
    label: 'Todos',
    color: props.colorInput ? 'Black' : '',
  }

  const [value, setValue] = useState('')
  const valueRef = useRef(props.value)
  valueRef.current = props.value

  const isSelectAllSelectedTest = () => {
    const valueRefCurrentLength = valueRef.current.length
    const propsOptionsLength = props.options.length
    const verifyValueRefUndefined = valueRef.current[0] != undefined
    const verifyPropsOptionsUndefined = props.options[0] != undefined

    return valueRefCurrentLength === propsOptionsLength &&
      verifyValueRefUndefined &&
      verifyPropsOptionsUndefined
      ? valueRef.current[0].value === props.options[0].value
      : null
  }

  const isOptionSelected = (option: optionProps) => {
    return (
      valueRef.current.some(
        ({ value }: optionProps) => value === option.value,
      ) || isSelectAllSelectedTest()
    )
  }

  const getOptions = () =>
    props.showAll ? [selectAllOption, ...props.options] : [...props.options]

  const getValue = () => props.value

  const onChange = (newValue: any, actionMeta: ActionMetaProps) => {
    const { action, option, removedValue } = actionMeta
    if (action === 'select-option' && option.value === selectAllOption.value) {
      props.onChange(props.options, actionMeta)
    } else if (
      (action === 'deselect-option' &&
        option.value === selectAllOption.value) ||
      (action === 'remove-value' &&
        removedValue.value === selectAllOption.value)
    ) {
      props.onChange([], actionMeta)
    } else if (action === 'deselect-option' && isSelectAllSelectedTest()) {
      props.onChange(
        props.options.filter(({ value }: any) => value !== option.value),
        actionMeta,
      )
    } else {
      action === 'clear' ? setValue('') : ''
      props.onChange(newValue || [], actionMeta)
    }

    let valueSelect =
      removedValue || (option && option.value != '')
        ? Array.from(newValue).map((el: any) => el.value)
        : ''
    props.handle(valueSelect)
    props.handleSelecionar ? props.handleSelecionar(valueSelect) : ''
  }

  useEffect(() => {
    onChange([], { action: 'clear' })
    setValue('')
  }, [props.clearState])

  useEffect(() => {
    getOptions()
  }, [props.options])

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaSort />
      </components.DropdownIndicator>
    )
  }

  const onInputChange = (option: string, { action }: any) => {
    if (props.enableSearch) {
      action == 'input-change' || action != 'set-value'
        ? setValue(option)
        : setValue('')
      props.handle(option)
    } else {
      setValue('')
    }
  }

  return (
    <form
      className="multi-select-chakra__form"
      onSubmit={(e) => e.preventDefault()}
    >
      <Label
        title={props.label}
        htmlFor={'select-' + props.name}
        fontSize={'md'}
        color={'#4B5C6B'}
        marginBottom={0}
      />
      <Select
        inputId={'select-' + props.name}
        isOptionSelected={isOptionSelected}
        noOptionsMessage={() => props.noOptionsSelect}
        options={getOptions()}
        components={{ DropdownIndicator }}
        formatOptionLabel={props.formatOptionLabel}
        value={getValue()}
        onChange={onChange}
        closeMenuOnSelect={false}
        placeholder={props.placeholder}
        classNamePrefix={'multi-select-chakra'}
        onInputChange={onInputChange}
        onMenuClose={() => setValue(value)}
        inputValue={value}
        menuIsOpen={props.debug}
        isMulti
      />
    </form>
  )
}
