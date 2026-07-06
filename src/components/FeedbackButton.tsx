import feedbackIcon from "../assets/feedbackIcon.png";
import styles from "../styles/FeedbackButton.module.css";
import BlueTooltip from "./BlueTooltip";

function FeedbackButton() {
    return (
        <BlueTooltip title="Feedback" placement="left">
            <a
                className={styles.btn}
                href="https://forms.gle/nReYxNJtiRcLCxKi7"
                target="_blank"
                rel="icon"
            >
                <img src={feedbackIcon} alt="feedback button" className={styles.icon} />
            </a>
        </BlueTooltip>
    );
}

export default FeedbackButton;