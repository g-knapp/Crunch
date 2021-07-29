import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {  ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';

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

export default function CreateGroup({ select }) {
    const [name, setName] = useState('');
    const router = useRouter();
    const [groupPurpose, setGroupPurpose] = useState("");
    

  const handleSave = async () => {
    const newGroup = { 
        "name": name, 
        "purpose": groupPurpose, 
        "owner": 1, 
        "date": new Date() 
    };

    select(newGroup);
    router.push(`/groups/${name}`);
  }
    
//     const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/groups/${router.query.name}`;
//     const response = await fetch(url,
//         {
//             method: 'POST',
//             body: JSON.stringify(newGroup),
//             headers: new Headers({ 'Content-type': 'application/json' }),
//         }
//     )

//     if (!response.ok) {
//         throw new Error(response.statusText);
//     }

//     const newGroupResponse = await response.json();
//     const newGroupData = groups.concat(newGroupResponse);
//     setGroups(newGroupData);


    return( 
        <Grid xs = {3}>
            <h2>Create Group</h2>
            <ThemeProvider theme={personalTheme}>
                <TextField 
                placeholder="Group Name" 
                data-testid="group-name"
                name="name"
                value={name}
                onChange={ (event) => { setName(event.target.value); } }
                fullWidth = {true}
                /><br/>
                <TextField 
                placeholder="Purpose of the Group" 
                data-testid="group-purpose"
                aria-label="purpose"
                value={groupPurpose}
                onChange={ (event) => { setGroupPurpose(event.target.value); } }
                fullWidth = {true}
                />
                <div>
                    <Button
                    type="button"
                    aria-label="Cancel"
                    onClick={() => router.push('/') }> 
                        Cancel 
                    </Button>


                    <Button 
                    type="button" 
                    aria-label="Save"
                    disabled={!name} 
                    onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </ThemeProvider>
        </Grid>
    );
}

CreateGroup.propTypes = {
    select: PropTypes.func.isRequired,
}