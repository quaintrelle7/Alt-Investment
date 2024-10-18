// AnimatedComponent.jsx
import { motion } from 'framer-motion';

const AnimatedComponent = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;
