//отображает список элементов с использованием мап
function ItemList() {
    //массив элементов
    const items = [
        { id: 1, name: "Apple" },
        { id: 2, name: "Banana" },
        { id: 3, name: "Cherry" }
    ];

    return (
        <ul>
            {/*динамическое создание списка*/}
            {items.map(item => (
                <li key={item.id}>{item.name}</li>))}
        </ul>);
}

export default ItemList;
