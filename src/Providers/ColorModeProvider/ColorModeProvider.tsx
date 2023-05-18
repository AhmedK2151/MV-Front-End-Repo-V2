import { createTheme, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { createContext, ReactNode, useMemo, useState } from "react";

export const ThemeModeContext = createContext({toggleColorMode: () => {}})

function ThemeModeProvider(props: {children?: ReactNode | ReactNode[]}) {

  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }
  }),[])

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: blue
    },
    values: {
      navBarHeight: 60,
    },
    border: {
      primaryColour: mode === 'light' ? 'rgb(173, 216, 230)' : '#1976d2',
      radius: {
        small: '10px',
        medium: '20px',
        large: '20px',
      }
    }
  }), [mode])

  return(
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </ThemeModeContext.Provider>

  )
}
export default(ThemeModeProvider)