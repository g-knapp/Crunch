/* This component creates a base layout template. 
props: content, the middle portion of the page to be rendered
*/
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import { PageContext } from '../pages/_app.js';
//import groups from '../../public/data/groups.json';

import PropTypes from 'prop-types';

export default function Layout( { children } ){
    const { groups } = useContext(PageContext);

    return (
        <div className={styles.container}>
            <Head>
                <title>Crunch</title>
                <link rel="icon" href="/CrunchIcon.ico" />
            </Head>
  
            <main>
                <h1 className="title">Crunch</h1>
                <Grid container>
                    <Grid item xs={2}>
                        <div className = {styles.sidebar}>
                            <Sidebar groupings = {groups}/>
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <div className = {styles.content}>
                            {children} 
                        </div>
                    </Grid>
                </Grid>
            </main>
            <footer>A CS 312 Project</footer>
      </div>
    )
}
Layout.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
};
