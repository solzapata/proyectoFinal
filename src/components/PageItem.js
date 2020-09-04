import React from 'react'
import styled from "styled-components"

const Button = styled.button `
    height: 20px;
    margin: 0 10px;
    color: white;
    background-color: black;
    border: none;
    font-size: 1.2vw;
    width: 2vw;
    font-family: roboto;
    transition: 0.2s;
    &:hover {
        cursor: pointer;
        color: #2296F3;        
        transition: 0.2s;
    }   
    &:focus {
        outline: none;    
    }
    &.isSelected {
        background-color: yellow;
    }
   
 
`

const PageItem = ({ value, content, setPage, currentPage }) => {
 
    return (
        <Button
        onClick={() => setPage(value)}
        value={value}
        page={currentPage}
        className={currentPage === value ? "isSelected" : ""}
        >         
            {content}         
        </Button>
    )
}

export default PageItem