// import axios so we can send requests to the server
import axios from "axios";
// import the Button and Card components from react-bootstrap for styling
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// the MovieItem component, shows one movie as a card
// props has the movie info and the Reload function passed down from the parent
function MovieItem(props) {
    // this runs when the delete button is clicked
    const handleDelete = (e) => {
        // stops the page from refreshing
        e.preventDefault();
        // send a DELETE request to the server using this movie's id
        axios.delete('http://localhost:4000/api/movie/' + props.myMovie._id)
            // if it works, print a message and reload the list
            .then(() => {
                console.log("Movie Deleted");
                props.Reload(); // Refresh the movie list after deletion
            })
            // if there's an error, print it
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };

    // what gets shown on the page
    return (
        <div>
        {/* a bootstrap card to display the movie */}
        <Card>
                {/* show the movie poster image */}
                <Card.Img src={props.myMovie.poster} />
                <Card.Body>
                    {/* show the movie title */}
                    <Card.Title>{props.myMovie.title}</Card.Title>
                    {/* show the movie year */}
                    <Card.Text>
                        {props.myMovie.year}
                    </Card.Text>
                    <div>
            {/* Other movie details */}
            {/* red delete button, calls handleDelete when clicked */}
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
                </Card.Body>

            </Card>

        </div>

    );
}

// export the component 
export default MovieItem;
