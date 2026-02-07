import ArticleItem from "./ArticleItem";

// список статей
export default function ArticleList({ articles, onClickRemove }) {
    return (
        <ul>
            {articles.map((article) => (
                <ArticleItem key={article.id}
                article={article}
                onClickRemove={onClickRemove}
                />
            ))}
        </ul>);
}
