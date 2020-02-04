//Imports
import './RvspList.css';
import React from 'react';
import meetup from '../apis/meetup';
import { withRouter } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { List,ListItem,ListItemText, Divider, Typography, ListItemAvatar, Avatar,Button,CircularProgress } from '@material-ui/core';
import { __RouterContext } from 'react-router';

class RsvpList extends React.Component{
  constructor(props){
    super(props);
    this.state = {id: null , rsvp:[],isLoading:true}
  }
  async componentDidMount(){
    if(!this.props.history.location.state.eventName)  
    {
      this.props.history.push("/")
      return null;
    };
    const currentId = this.props.history.location.state.currentId
    this.setState({ id: currentId, numberonElements:7 });
    //get call to meetup api
    await meetup.get(`https://api.meetup.com/reactjs-dallas/events/${currentId}/rsvps`,{
      params: {
        sign:'true',
        photo_host:'public'
      }
    }).then((response) => {
      this.setState({rsvp: response.data,isLoading: false})
    }).catch((error) => {
      console.log(error);
      this.props.history.push("/error");
    });
  }

  render(){
    if(!this.state.rsvp){
      return null;
    }
    const eventName = this.props.history.location.state.eventName;
    return(
      <React.Fragment>
        <List className="root">
          <ListItem>
            <Button
            variant="contained"
            color="secondary" 
            onClick = { () => {
            this.props.history.push('/') //redirects back to old page
            }}><ArrowBackIosIcon/>Back to home</Button>
          </ListItem>
          <ListItem>
            { this.state.isLoading? <CircularProgress /> : null}
          <Typography variant="h4">RSVP List for {eventName} </Typography>
          </ListItem>
          { 
            this.state.rsvp.map((element,index) =>{ 
            const memberName = element.member.name;
            const thumb_link = element.member.photo?element.member.photo.thumb_link:null;
            const eventResponse = element.response;
            const attendEvent = eventResponse === "yes";
            return (
              <ListItem key={ index}>
                <ListItemAvatar>
                  <Avatar alt={memberName} src={thumb_link} />
                </ListItemAvatar> 
                <ListItemText 
                  primary={<Typography variant="h5">{memberName}</Typography>} 
                  secondary={attendEvent?<Typography variant="body1" style={{ color: "#00BFA5"}}>
                                            going
                                          </Typography>:
                                          <Typography variant="body1" style={{ color: "#E53935"}}>
                                            waitlist
                                          </Typography>} 
                />
                <Divider />
              </ListItem>
            )
          }
        )
      }
      </List>
    </React.Fragment>
    )
  }
}

export default withRouter(RsvpList);