
import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  action 
}) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">{title}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground max-w-4xl text-balance">
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default PageHeader;
