// компонент формы добавления статьи
export default function AddArticle({
    name,
    title,
    summary,
    onChangeTitle,
    onChangeSummary,
    onClickAdd,
}) {
    return (
        <section>
            <h1>{name}</h1>
            <input placeholder="title"
            value={title}
            onChange={onChangeTitle}
            />

            <input placeholder="summary"
            value={summary}
            onChange={onChangeSummary}
            />

            <button onClick={onClickAdd}>add</button></section>);
}
