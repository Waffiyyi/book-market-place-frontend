const Category = ({ title, icon, color, glowColor }) => {
  return (
    <div
      className="flex flex-col items-start justify-center p-4 rounded-md shadow-lg category-card mt-1 gap-2 mb-2"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 13px ${glowColor}`,
        width: '160px',
        height: '140px',
      }}
    >
      <div
        className="text-3xl mb-2 icon text-start"
        style={{
          color: glowColor,
          textShadow: `0 0 8px ${glowColor}`,
        }}
      >
        {icon}
      </div>
      <h3  style={{
        color: glowColor,
      }} className="text-white text-start text-lg">{title}</h3>
    </div>
  );
};

export default Category;