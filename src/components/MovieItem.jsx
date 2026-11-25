
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MovieItem(props) {
    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:4000/api/movie/' + props.myMovie._id)
            .then(() => {
                console.log("Movie Deleted");               
                props.Reload(); // Refresh the movie list after deletion
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };

    return (
        <div>
        <Card>
                <Card.Img src={props.myMovie.poster} />
                <Card.Body>
                    <Card.Title>{props.myMovie.title}</Card.Title>
                    <Card.Text>
                        {props.myMovie.year}
                    </Card.Text>
                    <div>
            {/* Other movie details */}
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
                </Card.Body>
                
            </Card>

        </div>

    );
}

export default MovieItem;