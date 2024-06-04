import React from 'react';


interface BadgeProps {
  color: string;
  value: string;
}


const Badge: React.FC<BadgeProps> = ({ color, value }) => {
  return <span className={`bg-${color} px-2 rounded-xl text-gray-800`}>{value}</span>;
};

export default Badge;
