import React, { createContext, ReactNode, useState } from "react";

type SearchContextType = {
  context: string,
  setcontext: (newValue: string) => void
}

export const SearchContext = createContext<SearchContextType>({
  context: '',
  setcontext: () => undefined
})

type SearchProviderProps = {
  children?: ReactNode | ReactNode[]
}

function SearchProvider(props: SearchProviderProps) {

  const { children } = props
  const [searchValue, setSearchValue] = useState<string>('')

  return(
    <SearchContext.Provider value={{context: searchValue, setcontext: setSearchValue }}>
      {children}
    </SearchContext.Provider>
  )
}
export default SearchProvider