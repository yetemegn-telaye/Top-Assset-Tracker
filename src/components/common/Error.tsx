interface ErrorDisplayProps{
    message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({message}) => {
    return (
        <div>
            <h1 className="text-error">{message}</h1>
        </div>
    );
}
export default ErrorDisplay;