import React, { useContext, useRef } from "react";
import './NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../context";
import copy from 'copy-to-clipboard';

const NavBar = () => {
    const { email, newEmail } = useContext(Context);

    const copyEmail = () => {
        copy(email);
    };

    return (
        <div className="navbar">
            <button className="navbar__email" onClick={copyEmail}>{email}</button>
            <FontAwesomeIcon icon={faRetweet} className="navbar__new" onClick={newEmail} />
        </div>
    );
};

export default NavBar;