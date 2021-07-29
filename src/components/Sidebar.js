import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState} from 'react';
import GroupSearch from './GroupSearch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      width: 200
    },
    lister: {
        overflow: 'auto',
    },
  }));

export default function Sidebar({ groupings }) {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const term = searchTerm.toLowerCase();
    const filteredGroups = groupings.filter((group) => {
        const title = group.name.toLowerCase();
        return title.includes(term)
    });

    const groupList = filteredGroups.map((group) => (
        <ListItemLink data-testid={`group:${group.name}`} key = {group.name} href = {`/groups/${group.name}`}>
            <ListItemText data-testid="group-sidebar" primary = {group.name}/>
        </ListItemLink>
    ));

    return (
        <div className = {classes.root}>
            <h3>Groups</h3>
            <GroupSearch searchTerm={searchTerm} setTerm={setSearchTerm} />
            <List dense = {true} component = "nav" aria-label = "group list">
                {groupList}
            </List>
            <a href="/CreateGroup">Create a Group</a>
        </div>
    );
}

Sidebar.propTypes = {
    groupings: PropTypes.array,
}