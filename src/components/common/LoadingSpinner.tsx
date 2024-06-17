

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-1/2">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-secondary-light"></div>
    </div>
  );
};

export default LoadingSpinner;
