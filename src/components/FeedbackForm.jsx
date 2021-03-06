import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
    const [text, setText] = useState('');
    const [btnDisabled, setbtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(10);
    const { addFeedback, feedbackEdit } = useContext(FeedbackContext);

    useEffect(() => {
        if (feedbackEdit.edit){
            setbtnDisabled(false);
            setText(feedbackEdit.text);
            setRating(feedbackEdit.rating);
        }
    }, [feedbackEdit]);

    const handleTextChange = (e) => {
        setText(e.target.value);

        if (text === '') {
            setbtnDisabled(true);
            setMessage(null);
        }
        else if (text !== '' && text.trim().length <= 10) {
            setbtnDisabled(true);
            setMessage('Text must be at least 10 characters');
        }
        else {
            setbtnDisabled(false);
            setMessage(null);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            };

            addFeedback(newFeedback);
            setText('');
            setRating(10);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className="input-group">
                    <input value={text} onChange={handleTextChange} type='text' placeholder="Write a review" />
                    <Button type="submit" isDisabled={btnDisabled}>
                        Send
                    </Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm;