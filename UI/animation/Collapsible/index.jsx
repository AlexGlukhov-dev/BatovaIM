import { motion, AnimatePresence } from "framer-motion";

const Collapsible = (props) => {
	return (
		<div>
			<AnimatePresence>
				{props.isVisible && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						style={{ overflow: "hidden" }}
						transition={{ duration: 0.5 }}
					>
						{props.children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Collapsible;
