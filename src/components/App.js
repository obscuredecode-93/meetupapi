import React from 'react';
import meetup from '../apis/meetup';
import EventList from './EventList';
import Header from '../shared/Header';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {events: [], rsvp: [],currentId:null};
    }
    //tempArray = [1,2,3];
    async componentDidMount(){
        await meetup.get('https://api.meetup.com/reactjs-dallas/events', {
            params: {
                page:12
            }
        }).then((response) => {
            this.setState({ events : response.data});
            });
    }
    render(){
        return (
            <React.Fragment>
                <EventList events = {this.state.events} />
            </React.Fragment>
        );
    }
}

export default App;