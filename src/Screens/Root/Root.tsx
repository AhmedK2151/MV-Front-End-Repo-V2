import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { useTheme } from "@mui/material";
import { Directions } from "@mui/icons-material";
import { useEffect } from "react";

function Root() {

  const theme = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/home/popularity/desc/1')
  }, [])

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