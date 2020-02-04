import React from 'react';
import meetup from '../apis/meetup';
import EventList from './EventList';
import Header from '../shared/Header';
import { CircularProgress } from '@material-ui/core';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {events: [], rsvp: [],currentId:null,isLoading:true};
    }
    async componentDidMount(){
        await meetup.get('https://api.meetup.com/reactjs-dallas/events', {
            params: {
                page:12
            }
        }).then((response) => {
            this.setState({ events : response.data, isLoading: false});
            });
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