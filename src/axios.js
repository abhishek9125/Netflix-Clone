import axios from "axios";  
// Does work of Postman
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

// Instance is a Default Function : We can have only once and we can export it by any name is other files we mention while importing
export default instance;