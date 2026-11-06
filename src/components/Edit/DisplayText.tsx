import { motion } from "motion/react";

function DisplayText (props: any) {
    const {textIndex, text, openSidePanel, setText, setContentIndex, setShowTextTools, updateContent} = props;

    return (
        <motion.p
            key={textIndex}
            drag
            dragMomentum={false}
            style={{
                position: "fixed",
                width: text.width,
                fontFamily: "Imprima",
                fontSize: text.font_size,
                color: text.color,
                x: text.x,
                y: text.y
            }}
            whileHover={{
                cursor: "grab",
            }}
            whileDrag={{
                cursor: "grabbing"
            }}
            onDoubleClick={() => {
                openSidePanel("text");
                setText(text.value);
                setContentIndex(textIndex);
                setShowTextTools(true);                                           
            }}
            onDragStart={(_) => {
                setContentIndex(textIndex);
            }}
            onDragEnd={(_, info) => {
                updateContent("text", "x", text.x + info.offset.x);
                updateContent("text", "y", text.y + info.offset.y);
            }}
        >
            {text.value}
        </motion.p>
    );
}

export default DisplayText;