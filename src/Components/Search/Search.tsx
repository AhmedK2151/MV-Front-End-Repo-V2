import { SearchSharp } from "@mui/icons-material";
import { alpha, Button, IconButton, InputBase, Paper, styled } from "@mui/material";
import React, { useContext } from "react";
import { SearchContext } from "../../Providers/SearchProvider/SearchProvider";
import { useNavigate } from "react-router-dom";

const StyledSearchField = styled(InputBase)(({theme}) => ({
  color: "inherit",
  fontSize: 16,
  width: '100%',
  paddingLeft: 4,
  // backgroundColor: alpha(theme.palette.primary.main, 0.1),
  '& .MuiInputBase-input': {
  transition: theme.transitions.create('width'),
  width: '40vw',
  '&:hover': {
    width: '60vw'
  },
  '&:focus': {
    width: '60vw'
  }
  }
})) as typeof InputBase

const SearchWrapper = styled(Paper)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  paddingInline: 4,
  borderRadius: '10px',
  backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.05) : undefined,
  '&:hover': {
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: theme.border.primaryColour,
  },
})) as typeof Paper

type SearchProps = {
  style?: React.CSSProperties,
}

function Search(props: SearchProps) {
  const { style } = props

  const searchContext = useContext(SearchContext)
  const naviagte = useNavigate()

  return(
    <SearchWrapper>
      <IconButton
        type="button"
        onClick={(e) => {
          if(searchContext.context.length > 0) {
            naviagte(`/search/${searchContext.context}/1`)
          }
        }}>
        <SearchSharp style={{color: 'grey'}} />
      </IconButton>
      <StyledSearchField
        placeholder="Search"
        style={style}
        onChange={(text) => {
          searchContext.setcontext(text.target.value.toLowerCase())
        }}
        onKeyDown={(e) => {
          if(e.nativeEvent.key === 'Enter' && searchContext.context.length > 0) {
            naviagte(`/search/${searchContext.context}/1`)
          }
        }}
      />
    </SearchWrapper>
  )
}

export default Search