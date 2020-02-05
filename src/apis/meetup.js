import axios from 'axios';


//I'm commenting this for now as CORS behaviour is very unpredicatable...
/*var createbaseURL = (process.env.NODE_ENV ||  process.env.NODE_ENV === 'development') ?
                'https://api.meetup.com': 'https://cors-anywhere.herokuapp.com/https://api.meetup.com' */
export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.meetup.com'
});