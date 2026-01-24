import Card from "./Card";
//список продуктов с использованием card
function ProductList() {
    //массив продуктов
    const products = [
        { id: 1, name: "Widget", price: 9.99 },
        { id: 2, name: "Gadget", price: 14.99 }
    ];

    return (
        <>
        {/*рендер карточек*/}
        {products.map(product => (
            <Card key={product.id} title={product.name}>
                <p>Price: ${product.price}</p>
            </Card>))}
        </>
    );
}

export default ProductList;


