// import axios so we can send requests to the server
import axios from "axios";
// import useState to store data and useEffect to run code when the page loads
import { useState, useEffect } from "react";
// import the Movies component that shows the list of movies
import Movies from "./components/Movies";

// the Read component, used to show all the movies
function Read() {
    // state to hold the movies, starts off as an empty array
    const [data, setData] = useState([]);

    // function to get the movies from the server
    // i made it a separate function so it can be called again after a movie is deleted
    const Reload = () => {
        // print a message so i know it's reloading
        console.log("Reloading movie data...");
        // send a GET request to the server to get all the movies
        axios.get('http://localhost:4000/api/movies')
            // if it works, save the movies into state
            .then((response) => {
                setData(response.data);
            })
            // if there's an error, print it
            .catch((error) => {
                console.error("Error reloading data:", error);
            });
    };

    // useEffect runs when the component first loads
    // the empty [] means it only runs once
    useEffect(() => {
        Reload();
    }, []);

    // what gets shown on the page
    return (
        <div>
            <h2>Movie List</h2>
            {/* pass the movies and the Reload function down to the Movies component as props */}
            <Movies myMovies={data} ReloadData={Reload} />
        </div>
    );
}

// export the component so it can be used in other files
export default Read;
