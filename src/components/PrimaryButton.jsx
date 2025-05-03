const PrimaryButton = ({ children, onClick, className = "" }) => {
    return (
      <button
        onClick={onClick}
        className={`bg-black text-white font-semibold py-2 px-4  ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default PrimaryButton;
  