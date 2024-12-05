interface TitleProps {
    title: string;
}
const Title: React.FC<TitleProps> = ({ title }) => {
    return(
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    )
}
export default Title;