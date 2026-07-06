import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

/*
    Description: This is a reusable component to create blue tooltips.
    Last updated: 7/6/2026
*/

const BlueTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#004A94",
        fontFamily: "Imprima, sans-serif",
        fontSize: "14px"
    }
}));

export default BlueTooltip;