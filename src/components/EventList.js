//Imports
//Imports
import { useContext,useState } from 'react';
import { __RouterContext } from 'react-router';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Link, Chip,Button,Box, ExpansionPanel, ExpansionPanelSummary,ExpansionPanelDetails } from '@material-ui/core';

//Writing the Hook for the styles that we are going to use
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline: {
    display: 'inline',
  },
  block: {
    display: 'block',
  },
  textLink:{
    textDecoration:'none',
    '&:hover' :{
    textDecoration:'none',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
    },
  },
  item: {
     borderBottomColor: 'red',
     borderBottomWidth: 2,
     marginBottom: 30,
     flexDirection:'column',
     '&:hover' : {
       cursor: 'pointer',
       backgroundColor: theme.palette.background.default,
     }  
  },
  rsvpComponents:{
      width:'31%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default,
      padding: '1%',
      marginBottom: '1%',
      borderRadius: '4px',
  },
  rsvpCount:{
    fontSize: '12px',
    float: 'right',
    marginLeft:'70%',
    maxWidth:'30%',
    marginBottom: '3%',
  },
  rsvpButton:{
    marginBottom: '3%',
    width: "41%",
    marginLeft: '261px',
  },
  itemHeader:{
    display:'flex',
    width:'100%'
  },
  standardMargin:{
    margin:'10px'
  }
}));


const useReactRouter = () => {
  const routerContext = useContext(__RouterContext);
  return routerContext;
}

export default function AlignItemsList(props) {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const events = props.events;
  const {history} = useReactRouter();
  return (
    <Container className={classes.root} fixed >
      <Typography variant="h3" className={classes.standardMargin}> Welcome to the Events page!</Typography>
      <Typography variant="body1" className={classes.standardMargin}>Here you can find the list of events CallEmAll is organizing, Please <Typography variant="button">CLICK</Typography> on the button to get to know who'll be attending :</Typography>
      <Divider light />
      <List>
        { 
        events.map((item,index) => (
                <ListItem  key={index}  className={classes.item}>
                  <div className={classes.itemHeader}>
                    <ListItemText className={classes.textLink}
                    style = {{
                        justifyContent  : 'center'
                    }}
                        primary= { <Link href={item.link} className={classes.block} > <ListItemText primary={item.name} /></Link>}
                        secondary={
                            <Typography  variant="body2" label= {item.group.name} >{item.group.name} - {item.venue.address_1}</Typography>
                        }
                    />
                    <Box className={classes.rsvpComponents}>
                    <Chip className={classes.rsvpCount}  label={item.yes_rsvp_count + "/" + item.rsvp_limit} style={{ fontSize: '12px' }}></Chip>
                    <Button className={classes.rsvpButton} style={{ alignItems:"center" ,justifyContent:"left"}} 
                        variant="contained" 
                        color="secondary"
                        onClick = {() => {
                            history.push({pathname:'/rsvp', state: {currentId: item.id}});
                            setCurrentId(currentId)
                        }}  
                        >
                        Go to RSVP Details
                    </Button>
                    </Box>
                    </div>
                 <ExpansionPanel>
                  <ExpansionPanelSummary 
                  expandIcon={ <ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={classes.root}>
                    <Typography variant="h6">Click here for more info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography dangerouslySetInnerHTML={{__html: item.description}}>
                      </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel> 
                </ListItem>
        ))}
        <Divider variant="inset" component="li" />
        </List>
    </Container>
  );
}