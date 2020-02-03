import './RvspList.css';
import React from 'react';
import meetup from '../apis/meetup';
import { withRouter,Redirect } from 'react-router-dom';
import { List,ListItem,ListItemText, Divider, Typography, ListItemAvatar, Avatar,Button } from '@material-ui/core';
import { __RouterContext } from 'react-router';
class RsvpList extends React.Component{
  constructor(props){
    super(props);
    this.state = {id: null , rsvp:[]}
  }
  async componentDidMount(){
    const currentId = this.props.history.location.state.currentId
    this.setState({ id: currentId, numberonElements:7 });
    
    if(!currentId) return <Redirect to="/"/>;
    await meetup.get(`https://api.meetup.com/reactjs-dallas/events/${currentId}/rsvps`,{
      params: {
        sign:'true',
        photo_host:'public'
      }
    }).then((response) => {
      this.setState({rsvp: response.data})
      console.log(this.state.rsvp)
    })
  }

  render(){
    if(!this.state.rsvp){
      return null;
    }
    return(
      <React.Fragment>
        <List className="root">
          <ListItem>
          <Button
          variant="contained"
          color="secondary" 
          onClick = { () => {
            this.props.history.push('/')
            }}>Back to home</Button>
          </ListItem>
        { 
          this.state.rsvp.map((element,index) =>{ 
          const memberName = element.member.name;
          const thumb_link = element.member.photo?element.member.photo.thumb_link:null;
          const eventResponse = element.response;
          return (
              <ListItem key={ index}>
                <ListItemAvatar>
                  {<Avatar alt={memberName} src={thumb_link} />}
                </ListItemAvatar> 
                <ListItemText 
                  primary={<Typography variant="h5">{memberName}</Typography>} 
                  secondary={<Typography variant="body1">{eventResponse === "yes"? "going":"waitlist"}</Typography>} 
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