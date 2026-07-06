import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

// Reusable MUI Tooltip styled to match the app's blue color scheme.
const BlueTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#004A94",
        fontFamily: "Imprima, sans-serif",
        fontSize: "13px",
    },
}));

export default BlueTooltip;
