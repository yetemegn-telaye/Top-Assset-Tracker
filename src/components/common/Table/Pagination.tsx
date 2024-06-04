import { faAngleLeft, faAngleRight, faAnglesLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

const Pagination :React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center gap-2 justify-end mt-8">
        {currentPage > 1 && (
            <>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-secondary px-4 py-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span className="text-secondary text-xs border border-secondary rounded p-1 px-2" >{currentPage-1}</span>
        </>
      )}
        <span className="text-white text-xs bg-secondary rounded p-1 px-2">{currentPage}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-secondary px-4 py-2 rounded-lg"
        >
            <FontAwesomeIcon icon={faAngleRight} className="font-light" />
        </button>
        </div>
    );
    }
export default Pagination;