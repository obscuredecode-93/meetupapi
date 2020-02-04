import React from 'react'
import { Typography, ListItem,List,Link,Button } from '@material-ui/core'
import  DoneOutlineIcon  from '@material-ui/icons/DoneOutline';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
        button:{
            margin: '10px'
        }
    })
)
export default function Error(props){
    const classes = useStyles();
    return (
        <React.Fragment>
            <Button
            className={classes.button}
            variant="contained"
            color="secondary" 
            onClick = { () => <Redirect to="/" />}>
                <ArrowBackIosIcon/>Back to home</Button>
            <Typography variant="h4">We're sorry, looks like something went wrong.</Typography>
            <Typography variant="h6">In the meantime have a look at these great libraries and frameworks that I've used to create this:</Typography>
            <List>
                <ListItem>
                    <Link href="https://reactjs.org/"><DoneOutlineIcon /> React </Link>
                    <Link href="https://material-ui.com/"><DoneOutlineIcon /> Material UI</Link>
                </ListItem>
            </List>
        </React.Fragment>
    );
}