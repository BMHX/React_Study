import { useState } from "react";
import { View, Map } from "@tarojs/components";
import "./index.scss";

const MapPage = () => {
  // 南京的经纬度坐标
  const nanjingLocation = {
    latitude: 32.060255, // 南京纬度
    longitude: 118.796877, // 南京经度
  };

  // 地图标记点
  const [markers] = useState([
    {
      id: 1,
      latitude: 32.060965,
      longitude: 118.795214,
      title: "鸡鸣寺",
      iconPath: "/assets/icons/marker.png",
      width: 30,
      height: 30,
    },
    {
      id: 2,
      latitude: 32.020711,
      longitude: 118.78883,
      title: "夫子庙",
      iconPath: "/assets/icons/marker.png",
      width: 30,
      height: 30,
    },
    {
      id: 3,
      latitude: 32.056521,
      longitude: 118.857,
      title: "中山陵",
      iconPath: "/assets/icons/marker.png",
      width: 30,
      height: 30,
    },
  ]);

  // 地图事件处理函数
  const handleTap = (e) => {
    console.log("地图被点击", e);
  };

  const handleMarkerTap = (e) => {
    console.log("标记点被点击", e);
  };

  return (
    <View className="map-page">
      <Map
        id="nanjingMap"
        className="map-container"
        latitude={nanjingLocation.latitude}
        longitude={nanjingLocation.longitude}
        scale={14} // 缩放级别，14是比较适中的城市级别
        showLocation // 显示定位点
        markers={markers} // 添加标记点
        showCompass // 显示指南针
        enableZoom // 允许缩放
        enableScroll // 允许拖动
        enableRotate // 允许旋转
        onTap={handleTap} // 点击地图事件
        onMarkerTap={handleMarkerTap} // 点击标记点事件
      />
    </View>
  );
};

export default MapPage;
