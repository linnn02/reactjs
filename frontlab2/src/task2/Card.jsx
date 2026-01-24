//отображение контента ввиде карточки
function Card({ title, children, className }) {
    return (
        <article className={`card ${className || ""}`}>
            {/*заголовок*/}
            <h3>{title}</h3>
            {/*основное содержимое*/}
            {children}
        </article>);
}

export default Card;
