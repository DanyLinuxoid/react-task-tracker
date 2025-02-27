export const getWindowSizes = (widthMult: number, heightMult: number): { height: number, width: number } => {
    return {
        height: window.innerHeight * heightMult,
        width: window.innerWidth * widthMult,
    }
} 