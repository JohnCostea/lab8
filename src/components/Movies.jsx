// import the MovieItem component so we can show each movie
import MovieItem from "./movieItem";

// the Movies component, shows the full list of movies
// props has the list of movies and the reload function from the Read component
function Movies(props) {
    // what gets shown on the page
    return (
        // empty tags (fragment) so we don't add an extra div
        <>
            {/* loop through every movie in the array and make a MovieItem for each one */}
            {props.myMovies.map((movie) => (
                <MovieItem
                    // pass the movie info down to MovieItem
                    myMovie={movie}
                    // react needs a unique key for each item in a list, so we use the movie's id
                    key={movie._id}
                    // pass the reload function down so MovieItem can refresh the list after deleting
                    Reload={props.ReloadData}
                />
            ))}
        </>
    );
}

// exporting the component 
export default Movies;
