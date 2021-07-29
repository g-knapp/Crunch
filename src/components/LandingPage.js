/* This component creates a base landing page
*/
import Head from 'next/head';
// import { Grid } from '@material-ui/core';
import styles from '../styles/Home.module.css';
import LoginStatus from './LoginStatus';


//import PropTypes from 'prop-types';

export default function LandingPage(){

    return (
        <div className={styles.container}>
            <Head>
                <h1>Welcome to Crunch</h1>
            </Head>
        
            <main>
                <h1>Welcome to Crunch!</h1>
                <p>Crunch is a social media platform exclusive to students and faculty at Middlebury college</p>
                <h2 className="title"> Please login to view </h2>
                <a>
                    <img className={styles.img} src = {'data/landing_page.png'} alt = "preview"/>
                </a>  
                <LoginStatus />
            <footer>A CS 312 Project</footer>
            </main>
        </div>
)}
