//объединение без дива
function Section({ title, children }) {
    return (
        <>
        {/*заголовок*/}
            <h2>{title}</h2>
            {/*вложенные компоненты*/}
            {children}
        </>
    );
}

export default Section;
