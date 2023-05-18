import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { useTheme } from "@mui/material";
import { Directions } from "@mui/icons-material";

function Root() {

  const theme = useTheme()
  const navigate = useNavigate()

  function nav() {
    navigate('home/popular')
  }

  return(
    <div style={{
      display: 'flex',
      flexFlow: 'column',
    }}>
      <NavBar />
      <div style={{ height: theme.values.navBarHeight + 16}} />
      <Outlet />
    </div>
  )
}

export default Root