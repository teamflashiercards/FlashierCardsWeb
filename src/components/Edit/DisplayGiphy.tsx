import { motion } from "motion/react";

function DisplayGiphy (props: any) {
    const {type, giphyIndex, giphy, openSidePanel, setContentIndex, setShowGiphyTools, updateContent} = props;
    return (
        <motion.img
            key={giphyIndex}
            src={giphy.url}
            alt={type}
            drag
            dragMomentum={false}
            style={{
                position: "fixed",
                width: giphy.width,
                height: giphy.height,
                objectFit: "contain",
                x: giphy.x,
                y: giphy.y
            }}
            whileHover={{
                cursor: "grab",
                boxShadow: "0px 0px 20px 5px rgba(78, 119, 162, 0.33)",
                scale: 1.05
            }}
            whileDrag={{
                cursor: "grabbing"
            }}
            onDoubleClick={() => {
                openSidePanel("gif");
                setContentIndex(giphyIndex);
                setShowGiphyTools(true);
            }}
            onDragStart={(_) => {
                setContentIndex(giphyIndex);
            }}
            onDragEnd={(_, info) => {
                updateContent(type, "x", giphy.x + info.offset.x);
                updateContent(type, "y", giphy.y + info.offset.y);
            }}
        />
    );
}

export default DisplayGiphy;