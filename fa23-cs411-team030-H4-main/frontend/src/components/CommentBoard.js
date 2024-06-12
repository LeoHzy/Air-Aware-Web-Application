import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useAAContext } from "../context/Context";
import config from "../config"; // Import the config file
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  comment: {
    // Styles for regular comments
    border: "1px solid #ddd",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  premiumComment: {
    // Styles for premium comments
    border: "2px solid gold",
    backgroundColor: "#fffbe6",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
  },
}));

function CommentBoard({ locationId }) {
  const [comments, setComments] = useState([]);
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const { user } = useAAContext();
  const classes = useStyles();

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/comment/${locationId}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [comments]);

  const postComment = () => {
    if (!user || !user.userID) {
      alert("You need to login to post a comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("New Comment cannot be Empty.");
      return;
    }

    axios
      .post(`${config.SERVER_URL}/comment/${locationId}/${user.userID}`, {
        content: newComment,
      })
      .then(() => {
        fetchComments();
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error on Comment:", error);
      });
  };

  const deleteComment = async (commentId) => {
    axios
      .delete(`${config.SERVER_URL}/comment/${commentId}/${user.userID}`)
      .then(() => {
        fetchComments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper style={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Comments
      </Typography>
      <div>
        <TextField
          label="New Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={postComment}>
          Post Comment
        </Button>
      </div>

      <List>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <ListItem
              key={index}
              divider
              className={
                comment.weight === 1 ? classes.premiumComment : classes.comment
              }
            >
              <ListItemText
                primary={comment.content}
                secondary={`${
                  comment.username || `User ID: ${comment.userID}`
                } - ${new Date(comment.commentTime).toLocaleString()}`}
              />
              {user && user.userID === comment.userID && (
                <Button onClick={() => deleteComment(comment.commentID)}>
                  Delete
                </Button>
              )}
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
