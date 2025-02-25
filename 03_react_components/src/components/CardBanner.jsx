import { Carousel } from "antd";
import "./CardBanner.css";
const CardBanner = () => {
  return (
    <div className="banner-container">
      <Carousel autoplay effect="fade">
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2021/11/26/20/45/lantern-6826691_1280.jpg"
            alt="Slide 1"
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2025/01/27/21/11/mountain-9364160_1280.jpg"
            alt="Slide 2"
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2025/01/16/19/34/cortina-dampezzo-9338185_1280.jpg"
            alt="Slide 3"
          />
        </div>
      </Carousel>
    </div>
  );
};
export default CardBanner;
