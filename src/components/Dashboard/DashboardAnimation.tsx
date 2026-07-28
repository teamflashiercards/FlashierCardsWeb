import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSquare, faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

/*
    Description: This is an animation for the Dashboard component.
    Last updated: 6/26/2026
*/

function DashboardAnimation() {
    const totalShapes = 25;
    const icons = [faCircle, faSquare, faStar];
    const colors = ["#004A94", "#FFD166", "#EF476F", "#06D6A0"];

    function random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const shapes = useMemo(() => {
        return Array.from({ length: totalShapes}, () => ({
            icon: icons[random(0, icons.length - 1)],
            color: colors[random(0, colors.length - 1)],
            fontSize: random(25, 45),
            x: random(-40, 40),
            rotate: random(-360, 360),
            duration: random(6, 12),
            delay: random(1, 4)
        }));
    }, []);


    return (
        <div
            style={{
                position: "fixed",
                zIndex: -1,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                pointerEvents: "none"
            }}
        >
            {
                shapes.map((shape, index) => {
                    return (
                        <motion.div
                            key={index}
                            initial={{
                                y: "50vh",
                                x: shape.x
                            }}
                            animate={{
                                y: "-100vh",
                                x: [shape.x * -1, shape.x],
                                rotate: shape.rotate,
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{
                                delay: shape.delay,
                                duration: shape.duration,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "linear"
                            }}
                            style={{
                                position: "relative",
                                fontSize: shape.fontSize,
                                color: shape.color
                            }}
                        >
                            <FontAwesomeIcon icon={shape.icon} />
                        </motion.div>
                    );
                })
            }
        </div>
    );
}

export default DashboardAnimation;