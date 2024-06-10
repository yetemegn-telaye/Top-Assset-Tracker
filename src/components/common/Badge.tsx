import React from 'react';


interface BadgeProps {
  color: string;
  value: string;
}


const Badge: React.FC<BadgeProps> = ({ color, value }) => {
  return <p className={`bg-${color} px-2 rounded-xl text-gray-800`}>{value}</p>;
};

export default Badge;
