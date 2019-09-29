import React from 'react'
import styled from 'styled-components'

export const Card = styled.div`
    position: relative;
    user-select: none;
    border-radius: 10px;
    height: 315px;
    width: 310px;
    padding-bottom: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
    margin: 10px;
    background: ${
        props => props.background ? props.background : '#3c3c4a'
  };

    color: white;
    transition: box-shadow 0.2s ease, background 0.3s ease;
    ${props =>
        props.static &&
        `
    cursor: pointer;
    &:hover {
        background-color: #fff;
        color: black;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2), 0 6px 8px 0 rgba(0, 0, 0, 0.2);
    }
  `}
`
export const CardTitle = styled.h1`
  margin-top 20px;
`

export const CardContent = styled.h5`
  margin-top 60px;
  font-weight: 500;
`

export const CardFooter = styled.h5`
    margin-left: 300px;
    font-weight: 300;
    position: absolute;
    bottom: 10px;
    right: 20px;
`

export const CardActions = styled.div`
    text-align: center;
    font-weight: 300;
    position: absolute;
    bottom: 10px;
`
