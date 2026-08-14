import "./Canvas.css";
import { useRef, useEffect, useState } from "react";

// tutorial: https://medium.com/@charliedw/react-and-html-canvas-paint-your-portfolio-in-a-good-light-b41b49dc3b1b

type Cords = {
    x: number | null,
    y: number | null
};

function Canvas() {
    const canvasRef = useRef<any>(null);
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<any>(false);
    const [previousCoords, setPreviousCoords] = useState<Cords>({x: null, y: null});

    function onMouseUp() {
        setIsDrawing(false);
        setPreviousCoords({x: null, y: null});
    }

    const onMouseDown = (event: { clientX: number; clientY: number; }) => {
        if (!canvasElement) return;
        const rect = canvasElement.getBoundingClientRect();
        const coords = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }
        setPreviousCoords(coords);
        setIsDrawing(true);
    };

    const markCanvas = (event: { clientX: number; clientY: number; }) => {
        if (!isDrawing) return;
        if (!canvasElement) return;

        // canvas boundary
        const rect = canvasElement.getBoundingClientRect();

        const coords = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }

        const canvasContext = canvasElement.getContext("2d");

        if (!canvasContext) return;
        canvasContext.beginPath();
        canvasContext.lineWidth = 2;
        canvasContext.lineCap = "round";
        canvasContext.lineJoin = "round";
        canvasContext.strokeStyle = "blue";
        
        // create a line bewteen two coords
        if (previousCoords.x && previousCoords.y) {
            canvasContext.moveTo(previousCoords.x, previousCoords.y);
            canvasContext.lineTo(coords.x, coords.y);
        }

        
        canvasContext.stroke();
        setPreviousCoords(coords);
    };

    useEffect(() => {
        const rect = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
        setCanvasElement(canvasRef.current);
    }, []);

    return (
        <div className="display">
            <canvas
                ref={canvasRef} 
                className="canvas"
                onMouseMove={markCanvas}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            />
        </div>
    );
}

export default Canvas;