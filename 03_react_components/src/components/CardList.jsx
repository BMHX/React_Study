import "./CardList.css"; // 引入自定义样式文件

const CardList = () => {
  const products = [
    {
      image:
        "https://cdn.pixabay.com/photo/2025/01/16/19/34/cortina-dampezzo-9338185_1280.jpg ",
      avatar:
        "https://cdn.pixabay.com/photo/2025/01/16/19/34/cortina-dampezzo-9338185_1280.jpg",
      title1: "标题1",
      title2: "标题1",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2025/01/27/21/11/mountain-9364160_1280.jpg",
      avatar:
        "https://cdn.pixabay.com/photo/2025/01/27/21/11/mountain-9364160_1280.jpg",
      title1: "标题2",
      title2: "标题2",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2025/01/16/19/34/cortina-dampezzo-9338185_1280.jpg",
      avatar:
        "https://cdn.pixabay.com/photo/2025/01/16/19/34/cortina-dampezzo-9338185_1280.jpg",
      title1: "标题3",
      title2: "标题3",
    },
  ];

  return (
    <div className="product-list-container">
      <div className="product-grid">
        {products.map((item, index) => (
          <div key={index} className="product-card">
            <img src={item.image} alt={item.title1} className="product-image" />
            <div className="product-bottom">
              <img
                src={item.avatar}
                alt={item.title1}
                className="product-avatar"
              />
              <div className="product-titles">
                <h3 className="product-title1">{item.title1}</h3>
                <p className="product-title2">{item.title2}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
