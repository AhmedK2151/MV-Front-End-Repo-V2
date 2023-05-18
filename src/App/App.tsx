import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from '../Screens/Root/Root'
import AccountPage from '../Screens/Account/Acccount'
import HomePage from '../Screens/HomePage/HomePage'
import MoviePage from '../Screens/Movie/MoviePage'
import { CssBaseline } from '@mui/material'
import ThemeModeProvider from '../Providers/ColorModeProvider/ColorModeProvider'
import SearchProvider from '../Providers/SearchProvider/SearchProvider'
import MovieSearchPage from '../Screens/MovieSearchPage/MovieSearchPage'


const route = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        path: '/home/:page/:order/:page_num',
        element: <HomePage />
      },
      {
        path: "/account",
        element: <AccountPage />
      },
      {
        path: "/movie/:id",
        element: <MoviePage />
      },
      {
        path: "/search/:search_value/:page_num",
        element: <MovieSearchPage />
      }
    ]
  }
])

function App() {
  return(
    <ThemeModeProvider>
      <SearchProvider>
        <CssBaseline  />
        <RouterProvider router={route} />
      </SearchProvider>
    </ThemeModeProvider>
  )
}

export default App
