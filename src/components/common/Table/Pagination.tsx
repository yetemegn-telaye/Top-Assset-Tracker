import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 rounded-lg ${currentPage === i ? 'bg-secondary text-white' : 'text-secondary'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center gap-2 justify-end mt-8">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="text-secondary px-4 py-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="text-secondary px-4 py-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
