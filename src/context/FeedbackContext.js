import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState(
        [
            {
                id: 1,
                rating: 10,
                text: 'Lorem ipsum alias sit amet.',
                edit: false
            },
            {
                id: 2,
                rating: 9,
                text: 'Lorem sit amet ipsum alias.',
                edit: false
            },
            {
                id: 3,
                rating: 8,
                text: 'Alias amet lorem ipsum.',
                edit: false
            }
        ]
    );

    const [feedbackEdit, setFeedbackEdit] = useState({});

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    };

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    const editFeedback = (item) => {
        item.edit = true;
        setFeedbackEdit(item);
    }

    return <FeedbackContext.Provider value={{ feedback, deleteFeedback, addFeedback, editFeedback, feedbackEdit }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;