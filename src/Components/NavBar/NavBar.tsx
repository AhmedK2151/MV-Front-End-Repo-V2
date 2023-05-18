import { AppBar, IconButton, Switch, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ThemeModeContext } from "../../Providers/ColorModeProvider/ColorModeProvider";
import Search from "../Search/Search";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


function NavBar() {
  const colorMode = useContext(ThemeModeContext)
  const theme = useTheme()
  const navigate = useNavigate()

  return(
    <AppBar
      color={'primary'}
      position='fixed'
      style={{
        height: theme.values.navBarHeight,
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: '1fr 1fr 1fr'
      }}
    >
        <div
          style={{
            alignSelf: 'center',
            gridRow: 1,
            gridColumn: '1/2',
            paddingLeft: '8px',
          }}
        >
          <IconButton
            color='inherit'
            onClick={() => {
              navigate(`home/popularity/desc/1`)
            }}>
            <Home />
          </IconButton>
        </div>
        <div
          style={{
            alignSelf: 'center',
            gridRow: 1,
            gridColumn: '2/3'
          }}
        >
          <Search />
        </div>
        <div
          style={{
            alignSelf: 'center',
            justifySelf: 'flex-end',
            gridRow: 1,
            gridColumn: '3/4'
          }}
        >
          <Switch
            onClick={colorMode.toggleColorMode}
          />
        </div>
    </AppBar>
  )
}

export default NavBar