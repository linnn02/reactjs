import { useState } from "react";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";

// главный компонент управления статьями
export default function ArticleManager() {
    // список статей
    const [articles, setArticles] = useState([
        { id: 1, title: "first article", summary: "summary text" },
    ]);

    // поля формы
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");

    // добавление статьи
    const onClickAdd = () => {
        if (!title.trim() || !summary.trim()) return;

        const newArticle = {
            id: Date.now(),
            title,
            summary,
        };

        setArticles([newArticle, ...articles]);
        setTitle("");
        setSummary("");
    };

    // удаление статьи
    const onClickRemove = (id) => {
        setArticles(articles.filter((a) => a.id !== id));
    };

    return (
        <div>
            <AddArticle 
            name="articles"
            title={title}
            summary={summary}
            onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeSummary={(e) => setSummary(e.target.value)}
    onClickAdd={onClickAdd}
/>

<ArticleList  articles={articles} onClickRemove={onClickRemove} />
</div>);
}
