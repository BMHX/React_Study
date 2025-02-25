const MainProductList = () => {
    const Products = ["商品01", "商品02", "商品03", "商品04", "商品05"];
    return (
        <>
        <h1>主商品列表</h1>
        <ul>
            {Products.map((product, index) => (
                <li key={index}>{product}</li>
            ))}
        </ul>
        </>
    )
}
export default MainProductList