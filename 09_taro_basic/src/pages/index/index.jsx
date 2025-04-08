import { View } from "@tarojs/components";
import { AtSearchBar, AtGrid, AtList, AtListItem, AtDivider } from "taro-ui";
import { useState } from "react";
import Taro from '@tarojs/taro';
import './index.scss'

export default function Index() {
  const [searchValue, setSearchValue] = useState("");

  const gridData = [
    {
      image:
        "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
      value: "特惠专区",
    },
    {
      image:
        "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
      value: "会员专享",
    },
    {
      image:
        "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
      value: "新品首发",
    },
  ];

  const recommendProducts = [
    {
      id: 1,
      title: "高端耳机",
      price: "1299.00",
      image:
        "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
      description: "高端降噪耳机，音质出众",
    },
    {
      id: 2,
      title: "智能手表",
      price: "899.00",
      image:
        "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/2036767168/1672/8017352d/59c85643N31e68303.png",
      description: "支持多种运动模式的智能手表",
    },
    {
      id: 3,
      title: "便携充电宝",
      price: "159.00",
      image:
        "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
      description: "大容量快充移动电源",
    },
  ];

  return (
    <View
      className="index"
      style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {/* 搜索栏 */}
      <View style={{ padding: "10px", backgroundColor: "#fff" }}>
        <AtSearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder="搜索商品"
          showActionButton
        />
      </View>

      {/* 功能导航 */}
      <View
        style={{ margin: "10px", backgroundColor: "#fff", borderRadius: "8px" }}
      >
        <AtGrid data={gridData} />
      </View>

      {/* 商品推荐 */}
      <View style={{ margin: "10px" }}>
        <AtDivider content="商品推荐" fontColor="#333" lineColor="#e8e8e8" />
        <AtList>
          {recommendProducts.map((product) => (
            <AtListItem
              key={product.id}
              title={product.title}
              note={product.description}
              thumb={product.image}
              extraText={`¥${product.price}`}
              arrow="right"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/product/index?id=${product.id}`,
                });
              }}
            />
          ))}
        </AtList>
      </View>
    </View>
  );
}
