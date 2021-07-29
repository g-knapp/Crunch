import { signIn, signOut, useSession } from 'next-auth/client';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import { useState, useEffect } from "react";
import Link from 'next/link';

const personalTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#75A3CD',
    }

  }
})

function SimpleMenu(handle, userEmail) {
  const [userPage, setUserPage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      const emailSplit = session.user.email.split('@');
      if (emailSplit[emailSplit.length - 1].toLowerCase() === 'middlebury.edu') {
        const getData = async () => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/users/email/${session.user.email}`);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const userData = await response.json();
          const pageString = `/user/${userData.id}`;
          setUserPage(pageString);
        }
        getData();
      }
    }
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //TODO, change user link!!
  return (
    <ThemeProvider theme={personalTheme}>
      <IconButton onClick={handleClick}>
        <PersonIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href={userPage}>
          <MenuItem onClick={handleClose}>{userEmail}</MenuItem>
        </Link>
        <MenuItem onClick={handle}>Sign Out</MenuItem>
      </Menu>
    </ThemeProvider >
  );
}

export default function LoginStatus() {
  const [session] = useSession();

  return (
    <>
      {!session && (

        <ThemeProvider theme={personalTheme}>
          Not signed in <br />
          <Button onClick={signIn}>Sign in</Button>
        </ThemeProvider>
      )}
      {session &&
        <ThemeProvider theme={personalTheme}>
          {SimpleMenu(signOut, session.user.email)}
        </ThemeProvider>
      }
    </>
  )
}