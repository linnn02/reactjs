import { useState } from "react";

// один элемент статьи
export default function ArticleItem({ article, onClickRemove }) {
    // локальное состояние раскрытия
    const [isOpened, setIsOpened] = useState(false);

    // переключение текста
    const onClickToggle = (e) => {
        e.preventDefault();
        setIsOpened(!isOpened);
    };

    return (
        <li>
            <a href={"#" + article.id} onClick={onClickToggle}>
                {article.title}
            </a>
            <button onClick={() => onClickRemove(article.id)}>x</button>
            {isOpened && <p>{article.summary}</p>}
        </li>);
}
