import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import { MdMovie as MovieIcon } from "react-icons/md";
import {
  BsDisplay as TvIcon,
  BsHouse as HomeIcon,
  BsSearch as SearchIcon,
} from "react-icons/bs";
import useSearchContext from "../contexts/SearchContext";
import usePaginationContext from "../contexts/PaginationContext";
import useLanguageContext from "../contexts/LanguageContext";

const StyledNav = styled.nav`
  width: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  padding-top: 2vw;
  border-right: 1px solid #fafafa;
  position: fixed;
  height: -webkit-fill-available;
  z-index: 200;

  @media (max-width: 850px) {
    flex-direction: row;
    justify-content: space-evenly;
    width: 98vw;
    height: 3rem;
    position: fixed;
    border: none;
    bottom: 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  /* cursor: pointer; */
  svg {
    color: #fafafa;
    font-size: 1.7vw;
    margin-bottom: 3vw;
    @media (max-width: 850px) {
      font-size: 2rem;
      margin-bottom: 0;
    }
  }
  &.selected {
    svg {
      color: #2196f3;
    }
  }
`;

const StyledSelect = styled.select`
  background-color: black;
  color: #fafafa;
  height: 3vw;
  font-size: 1vw;
  font-family: "Roboto";
  border-radius: 3px;
  position: absolute;
  bottom: 10%;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  @media (max-width: 850px) {
    font-size: 2vw;
    position: relative;
    height: 4vw;
  }
`;

const StyledOption = styled.option`
  font-family: "Roboto";
`;

const NavLinks = () => {
  const { setLanguage } = useLanguageContext();
  const { setCurrentPage } = usePaginationContext();
  const { setMedia, setSearchResults, setQuery } = useSearchContext();

  const handleChange = (event) => setLanguage(event.target.value);

  const handleClick = () => {
    setMedia("movie");
    setQuery("");
    setCurrentPage(1);
    setSearchResults([]);
  };

  return (
    <StyledNav>
      <IconContext.Provider value={{ style: { cursor: "pointer" } }}>
        <StyledNavLink exact to="/" activeClassName="selected">
          <HomeIcon />
        </StyledNavLink>
        <StyledNavLink to="/movie" activeClassName="selected">
          <MovieIcon />
        </StyledNavLink>
        <StyledNavLink to="/tv" activeClassName="selected">
          <TvIcon />
        </StyledNavLink>
        <StyledNavLink
          to="/search"
          activeClassName="selected"
          onClick={handleClick}
        >
          <SearchIcon />
        </StyledNavLink>
        <StyledSelect onChange={handleChange}>
          <StyledOption value="eng">ENG</StyledOption>
          <StyledOption value="spa">SPA</StyledOption>
        </StyledSelect>
      </IconContext.Provider>
    </StyledNav>
  );
};

export default NavLinks;
