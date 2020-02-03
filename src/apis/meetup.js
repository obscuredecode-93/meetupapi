import axios from 'axios';

export default axios.create({
    baseUrl: 'https://api.meetup.com'
});