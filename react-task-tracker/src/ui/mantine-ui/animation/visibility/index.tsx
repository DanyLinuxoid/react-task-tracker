import { motion } from "framer-motion"; 

export const Visible = ({ isVisible = true, children }: { isVisible: boolean, children: any}) => {
    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isVisible ? "auto" : 0, opacity: isVisible ? 1 : 0 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
        >
            {children}
        </motion.div>
    );
};
