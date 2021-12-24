import React from 'react';
import styleClasses from './styles.module.css';

const InfoButton = (props) => {
    return (
        <div className={styleClasses.info} onClick={props.clicked}>
            <span>?</span>
        </div>
    );
};

export default InfoButton;
