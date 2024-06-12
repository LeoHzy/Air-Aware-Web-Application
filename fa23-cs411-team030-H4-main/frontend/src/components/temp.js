// src/components/CommentBoard.js
import React, { useState, useEffect } from 'react';
import { CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';

function CommentBoard({ locationId }) {
    const [comments, setComments] = useState([]);
    const [city, setCity] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the city name
        fetch(`http://localhost:3000/location/${locationId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching location details for location ID: ${locationId}`);
                }
                return response.json();
            })
            .then(data => {
                setCity(data.city); // Assuming the response has a city field
                // Then fetch the comments
                return fetch(`http://localhost:3000/comment/${locationId}`);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching comments for location ID: ${locationId}`);
                }
                return response.json();
            })
            .then(data => {
                setComments(data.comments);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [locationId]);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
                Comments for {city || `Location ID: ${locationId}`}
            </Typography>
            <List>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <ListItem key={comment.commentID} divider>
                            <ListItemText 
                                primary={`User ${comment.userID}`} 
                                secondary={comment.content} 
                            />
                        </ListItem>
                    ))
                ) : (
                    <Typography>No comments available for this location.</Typography>
                )}
            </List>
        </Paper>
    );
}

export default CommentBoard;
