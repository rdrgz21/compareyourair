import React from 'react';
import styles from './Title.module.css';

const Title = () => {
    return (
        <div className={styles.container}>
            <h1>Compare your Air</h1>
            <h2>Compare the air quality between cities in the UK.</h2>
            <h2>Select cities to compare using the search tool below.</h2>
        </div>
    )
}

export default Title
