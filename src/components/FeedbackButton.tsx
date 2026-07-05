import feedbackIcon from "../assets/feedbackIcon.png";
import styles from "../styles/FeedbackButton.module.css";
import Tooltip from "@mui/material/Tooltip";

function FeedbackButton() {
    return (
        <Tooltip title="Feedback">
            <a
                className={styles.btn}
                href="https://forms.gle/nReYxNJtiRcLCxKi7"
                target="_blank"
                rel="icon"
            >
                <img src={feedbackIcon} alt="feedback button" className={styles.icon} />
            </a>
        </Tooltip>
    );
}

export default FeedbackButton;
