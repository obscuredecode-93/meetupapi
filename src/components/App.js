//Imports
import React from 'react';
import meetup from '../apis/meetup';
import EventList from './EventList';
import { CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {events: [], rsvp: [],currentId:null,isLoading:true};
  }
  async componentDidMount(){
    //calling meetup api( Could not find greater than 12 entries so took page limit to be 12)
    await meetup.get('reactjs-dallas/events', {
      params: {
          page:12
      }
      }).then((response) => {
        this.setState({ events : response.data, isLoading: false});
      }).catch((error) => {
        window.location.href='/error';
      });;
  }
  render(){
    return (
      <React.Fragment>
        {this.state.isLoading?<CircularProgress />: <EventList events = {this.state.events} />}
      </React.Fragment>
    );
  }
}

export default App;