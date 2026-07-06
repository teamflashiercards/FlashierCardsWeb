import feedbackIcon from "../assets/feedbackIcon.png";
import styles from "../styles/FeedbackButton.module.css";
import BlueTooltip from "./BlueTooltip";

function FeedbackButton() {
    return (
        <BlueTooltip title="Feedback" placement="left">
            <a
                className={styles.btn}
                href="https://forms.gle/nWyB69visGQJQEcUA"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={feedbackIcon} alt="Feedback" className={styles.icon} />
            </a>
        </BlueTooltip>
    );
}

export default FeedbackButton;
