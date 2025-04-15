import {
  View,
  ScrollView,
  Swiper,
  SwiperItem,
  CoverView,
  Image,
} from "@tarojs/components";
import "./index.scss";

const Container = () => {
  // 准备Swiper展示的图片数据
  const swiperImages = [
    "https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/1.jpg",
    "https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/2.jpg",
    "https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/3.jpg",
  ];

  // 准备ScrollView展示的列表数据
  const listItems = Array.from({ length: 20 }, (_, i) => `列表项 ${i + 1}`);

  return (
    <View className="container">
      {/* ScrollView组件示例：可滚动视图容器 */}
      <View className="section">
        <View className="section-title">ScrollView示例</View>
        <ScrollView
          className="scroll-view"
          scrollY // 允许垂直滚动
          scrollWithAnimation // 使用动画效果
        >
          {listItems.map((item, index) => (
            <View key={index} className="scroll-item">
              {item}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Swiper组件示例：轮播图容器 */}
      <View className="section">
        <View className="section-title">Swiper示例</View>
        <Swiper
          className="swiper"
          indicatorDots // 显示面板指示点
          autoplay // 自动播放
          interval={3000} // 自动播放间隔时间（毫秒）
          circular // 循环播放
        >
          {swiperImages.map((image, index) => (
            <SwiperItem key={index}>
              <Image className="swiper-image" src={image} mode="aspectFill" />
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      {/* CoverView组件示例：可覆盖在原生组件上的文本视图 */}
      <View className="section">
        <View className="section-title">CoverView示例</View>
        <View className="cover-container">
          <Image
            className="background-image"
            src="https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/1.jpg"
            mode="aspectFill"
          />
          <CoverView className="cover-view">
            <CoverView className="cover-text">这是一个CoverView示例</CoverView>
            <CoverView className="cover-description">
              CoverView可以覆盖在原生组件上
            </CoverView>
          </CoverView>
        </View>
      </View>
    </View>
  );
};

export default Container;
