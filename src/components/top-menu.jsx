import React, { useState } from 'react'
import './../css/light-bootstrap-dashboard-react.css'

function TopMenuDropdown(props) {
    const children = props.children
    const [className, setClassName] = useState("dropdown")
    let handleClick = () => {
        if (className === "dropdown") {
            setClassName("dropdown open")
        } else {
            setClassName("dropdown")
        }
    };

    return (
        <li onClick={handleClick} className={className}>
            <a id="basic-nav-dropdown-right" role="button" className="dropdown-toggle" aria-haspopup="true" aria-expanded={className ? true : false} href="#">
                {props.title}
                <span className="caret"></span>
            </a>
            <ul role="menu" className="dropdown-menu" aria-labelledby="basic-nav-dropdown-right">
                {React.Children.map(children, (child, i) => {
                    return child
                })}
            </ul>
        </li>
    )
}

function TopMenuItem(props) {
    return (
        <li role="presentation" className={props.className}>
            <a role="menuitem" tabIndex="-1" href={props.href}>
                {props.children}
            </a>
        </li>
    )
}

export function TopMenu(props) {

    const [className, setClassName] = useState("navbar-toggle collapsed")
    let navOpen = ""
    let handleClick = () => {
        if (className === "navbar-toggle collapsed") {
            setClassName("navbar-toggle collapsed in")
            //document.getElementsByClassName('wrapper-right')[0].style.width = 'calc(100% - 250px)'
            document.querySelector('html').classList.toggle("nav-open")
            navOpen = "nav-open"
        } else {
            setClassName("navbar-toggle collapsed")

            document.querySelector('html').classList.toggle("nav-open")
            navOpen = ""
        }
    };

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a href="#pablo" className="navbar-brand">{props.title}</a>
                    <button type="button" onClick={handleClick} className={className}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className="navbar-collapse collapse">
                    <div>
                        <ul className="nav navbar-nav">
                            <li role="presentation" className="">
                                <a href="#" role="button">
                                    <i className="fa fa-dashboard"></i>
                                    <p className="hidden-lg hidden-md">Dashboard</p>
                                </a>
                            </li>
                            <li role="presentation" className="">
                                <a href="#" role="button">
                                    <i className="fa fa-search"></i>
                                    <p className="hidden-lg hidden-md">Search</p>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <TopMenuDropdown title="Dropdown">
                                <TopMenuItem href="#">Opção 4</TopMenuItem>
                                <TopMenuItem href="#">Opção 5</TopMenuItem>
                                <TopMenuItem href="#">Opção 6</TopMenuItem>
                                <TopMenuItem href="#">Opção 7</TopMenuItem>
                            </TopMenuDropdown>
                            <TopMenuItem href="#">Opção 1</TopMenuItem>
                            <TopMenuItem href="#">Opção 2</TopMenuItem>
                            <TopMenuItem href="#">Opção 3</TopMenuItem>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}