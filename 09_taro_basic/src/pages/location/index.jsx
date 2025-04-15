import { useState, useEffect } from "react";
import { View, Map, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Location = () => {
  const [location, setLocation] = useState({
    latitude: 39.90469, // 默认北京坐标
    longitude: 116.40717,
  });
  const [markers, setMarkers] = useState([]);
  const [mapContext, setMapContext] = useState(null);

  // 初始化地图和定位
  useEffect(() => {
    initMap();
  }, []);

  // 初始化地图
  const initMap = () => {
    // 创建地图上下文
    const ctx = Taro.createMapContext("currentMap");
    setMapContext(ctx);
    // 获取当前位置
    getCurrentLocation();
  };

  // 获取当前位置
  const getCurrentLocation = () => {
    Taro.showLoading({ title: "定位中..." });

    // 先检查权限
    Taro.authorize({
      scope: "scope.userLocation",
      success: () => {
        // 获取位置信息
        Taro.getLocation({
          type: "gcj02",
          altitude: true,
          success: (res) => {
            Taro.hideLoading();
            console.log("当前位置:", res);

            setLocation({
              latitude: res.latitude,
              longitude: res.longitude,
            });

            // 设置当前位置标记
            setMarkers([
              {
                id: 1,
                latitude: res.latitude,
                longitude: res.longitude,
                title: "我的位置",
                iconPath: "/assets/icons/marker.png",
                width: 30,
                height: 30,
                callout: {
                  content: "我在这里!",
                  color: "#ffffff",
                  bgColor: "#07c160",
                  padding: 5,
                  borderRadius: 10,
                  display: "ALWAYS",
                },
              },
            ]);

            // 自动移动到当前位置
            if (mapContext) {
              mapContext.moveToLocation({
                latitude: res.latitude,
                longitude: res.longitude,
              });
            }
          },
          fail: (err) => {
            Taro.hideLoading();
            console.error("定位失败:", err);
            Taro.showToast({
              title: "定位失败，请检查权限设置",
              icon: "none",
              duration: 2000,
            });
          },
        });
      },
      fail: () => {
        Taro.hideLoading();
        // 引导用户去设置页面开启权限
        Taro.showModal({
          title: "提示",
          content: "需要获取您的地理位置，请确认授权",
          success: function (res) {
            if (res.confirm) {
              Taro.openSetting();
            }
          },
        });
      },
    });
  };

  // 刷新定位
  const refreshLocation = () => {
    getCurrentLocation();
  };

  return (
    <View className="map-page">
      <Map
        id="currentMap"
        className="map-container"
        latitude={location.latitude}
        longitude={location.longitude}
        scale={16}
        markers={markers}
        showLocation
        showCompass
        enableZoom
        enableScroll
        enableRotate
        onReady={() => setMapContext(Taro.createMapContext("currentMap"))}
      />

      <View className="control-panel">
        <Button className="control-btn" onClick={refreshLocation}>
          <Text className="icon">📍</Text> 刷新定位
        </Button>
      </View>
    </View>
  );
};

export default Location;
