interface ErrorDisplayProps{
    message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({message}) => {
    return (
        <div>
            <h1 className="text-error">Error Loading Data:
             <span className="text-error-light ml-4">
                {message}
            </span>
            </h1>
        </div>
    );
}
export default ErrorDisplay;