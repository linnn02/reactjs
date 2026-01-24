//использует фрагемнт список и вычисляемое значение
function CombinedFragment() {
    //массив элементов
    const items = ["Apple", "Banana", "Cherry"];

    return (
        <>
        {/*заголовок*/}
        <h2>Fruits</h2>
        {/*список*/}
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>))}
        </ul>
        {/*отображение колва элементов*/}
        <p>Total: {items.length} items</p></>
    );
}

export default CombinedFragment;
