/* eslint-disable */
import '../styles/globals.css';
import { useState, createContext, useEffect } from "react";
import { Provider } from 'next-auth/client';

export const PageContext = createContext();

function MyApp({ Component, pageProps }) {
  const [page, setPage] = useState([0, 9]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/groups`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const groupData = await response.json();

    setGroups(groupData);
    };
    getGroups();
  }, []);

  return (
    <Provider session={pageProps.session} >
      <PageContext.Provider value={{page, setPage, groups, setGroups}}>
        <Component {...pageProps} />
      </PageContext.Provider>
    </Provider>
  );
}

export default MyApp;
