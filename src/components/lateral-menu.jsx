import React from 'react';
import './../css/light-bootstrap-dashboard-react.css'

export function LateralMenuButton(props) {

    let active = (props.active ? 'active' : '')
    let navLinkClass = "nav-link " + active;

    return(
        <li className={`lateralMenuItem ${active}`}>
            <a aria-current="page" className={navLinkClass} href={props.href}>
                <i className={props.icon}></i>
                <p onClick={()=>{props.handleOnClick()}}>{props.children}</p>
            </a>
        </li>
    )
}

export function LateralMenu(props) {
    const children = props.children

    return (
        <div id="sidebar" className="sidebar">
            <div className="sidebar-background"></div>
            <div className="logo">
                <a href="https://www.creative-tim.com?ref=lbd-sidebar" className="simple-text logo-mini">
                <div className="logo-img">
                    {/*<img src="/light-bootstrap-dashboard-react/static/media/reactlogo.9b864b36.png" alt="Something" />*/}
                </div>
                </a>
                <a href="https://www.creative-tim.com?ref=lbd-sidebar" className="simple-text logo-normal">{props.siteName}</a>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    {React.Children.map(children, (child, i) => {
                        return child
                    })}
                </ul>
            </div>
        </div>
    );
}
