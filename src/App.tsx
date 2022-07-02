import './App.css'
import SearchMultipleFilter from './component/SearchMultiFilter'
import { ChakraProvider } from '@chakra-ui/react'

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

  return (
    <ChakraProvider>
      <SearchMultipleFilter
        handle={handleSelect}
        options={optionsSelect}
        noOptionsSelect={'Todas as opções selecionadas'}
        showAll={true}
        clearState={true}
        labelSelect="Seleções"
      />
    </ChakraProvider>
  )
}

export default App
