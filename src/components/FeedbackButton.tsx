import feedbackIcon from "../assets/feedbackIcon.png";
import styles from "../styles/FeedbackButton.module.css";

function FeedbackButton() {
    return (
        <a
            className={styles.btn}
            href="https://forms.gle/nWyB69visGQJQEcUA"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img src={feedbackIcon} alt="Feedback" className={styles.icon} />
            <span className={styles.tooltip}>Feedback</span>
        </a>
    );
}

export default FeedbackButton;
