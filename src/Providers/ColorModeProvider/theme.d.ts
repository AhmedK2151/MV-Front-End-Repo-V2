declare module '@mui/material/styles' {
  interface Theme {
    values: {
      navBarHeight: number
    };
    border: {
      primaryColour: string
      radius: {
        small: string
        medium: string
        large: string
      }
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    values: {
      navBarHeight: number,
    };
    border: {
      primaryColour: string,
      radius: {
        small: string,
        medium: string,
        large: string,
      }
    }
  }
}

export{}