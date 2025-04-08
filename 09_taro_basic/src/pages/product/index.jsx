import React, { useState, useEffect } from "react";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtCard, AtButton } from "taro-ui";
import Taro, { useRouter } from '@tarojs/taro';

import "./index.scss";

const Product = () => {
  const router = useRouter();
  const { id } = router.params;

  // 模拟商品数据
  const [product, setProduct] = useState({
    id: 1,
    title: "商品标题",
    price: 99.99,
    description: "这是一个示例商品描述，可以包含商品的详细信息。",
    images: [
      "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
      "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
      "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
    ],
  });

  useEffect(() => {
    // 这里可以根据 id 从服务器获取商品数据
    console.log('商品ID:', id);
  }, [id]);

  const handleBuy = () => {
    console.log("购买商品：", product.id);
  };

  return (
    <View className="product">
      <Swiper
        className="product-swiper"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        {product.images.map((image, index) => (
          <SwiperItem key={index}>
            <Image className="product-image" src={image} mode="aspectFill" />
          </SwiperItem>
        ))}
      </Swiper>

      <View className="product-info">
        <View className="product-title">{product.title}</View>
        <View className="product-price">¥{product.price}</View>
      </View>

      <AtCard title="商品详情">
        <View className="product-description">{product.description}</View>
      </AtCard>

      <View className="product-action">
        <AtButton type="primary" onClick={handleBuy}>
          立即购买
        </AtButton>
      </View>
    </View>
  );
};

export default Product; 