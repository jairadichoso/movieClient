import { Button } from "react-bootstrap";
import Swal from "sweetalert2";


export default function DeleteMovie({movie, movieTitle}) {

    const deleteMovie = (movie) =>{
        Swal.fire({
            title: `You are about to delete this movie - ${movieTitle}`,
            text: "Are you sure you want to proceed?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if(result.isConfirmed){
                executeDelete(movie)
            }
        })
    }

    const executeDelete = async (movie) => {
        try{
            const response = await fetch(`https://movie-catalog-system.onrender.com/movies/deleteMovie/${movie}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json();
            if(data.error === 'Movie not found'){
                Swal.fire({
                    title: 'Movie not found',
                    icon: 'error',
                    text: 'The movie you are trying to delete could not be found'
                })
            }
            else if(data.error === 'Error in deleting movie'){
                Swal.fire({
                    title: 'Error in deleting movie',
                    icon: 'error'
                })
            }
            else if(data.message === 'Movie deleted successfully'){
                Swal.fire({
                    title: 'Movie has been deleted',
                    icon: 'success'
                })
            }
        }
        catch(err) {
            console.log('Error in deleting movie: ', err)
            Swal.fire({
                title: 'Something went wrong',
                icon: 'error',
                text: 'Please try again'
            })
        }

    }

    return(
        <Button variant="danger" size="sm" onClick={() => deleteMovie(movie)}>
            Delete
        </Button>
    )
}