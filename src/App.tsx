import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import MultiSelectChakra from './component/MultiSelectChakra'

function App() {
  const handleSelect = (valueOption: string) => {}

  const optionsSelect = [
    {
      value: '1',
      label: 'Opção 1',
    },
    {
      value: '2',
      label: 'Opção 2',
    },
    {
      value: '3',
      label: 'Opção 3',
    },
  ]

  const selectMulti = {
    handle: handleSelect,
    options: optionsSelect,
    noOptionsSelect: 'Todas as opções selecionadas',
    showAll: true,
    clearState: true,
    labelSelect: 'Seleções',
  }

  return (
    <ChakraProvider>
      <MultiSelectChakra custom={selectMulti} />
    </ChakraProvider>
  )
}

export default App
