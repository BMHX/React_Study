import { useState } from "react";
import { View, Text, Image, Video, Camera, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const MediaPage = () => {
  const [photoPath, setPhotoPath] = useState(""); // 存储拍摄的照片路径

  const handleTakePhoto = () => {
    // 检查相机权限
    Taro.authorize({
      scope: "scope.camera",
      success: () => {
        const camera = Taro.createCameraContext();
        camera.takePhoto({
          quality: "high",
          success: (res) => {
            console.log("拍照成功：", res.tempImagePath);
            setPhotoPath(res.tempImagePath);
            // 预览拍摄的照片
            Taro.previewImage({
              urls: [res.tempImagePath],
              current: res.tempImagePath,
            });
          },
          fail: (err) => {
            console.error("拍照失败：", err);
            Taro.showToast({
              title: "拍照失败",
              icon: "error",
            });
          },
        });
      },
      fail: () => {
        Taro.showToast({
          title: "请授权相机权限",
          icon: "none",
        });
      },
    });
  };

  const handleSaveToAlbum = () => {
    if (!photoPath) {
      Taro.showToast({
        title: "请先拍摄照片",
        icon: "none",
      });
      return;
    }

    // 检查相册权限
    Taro.authorize({
      scope: "scope.writePhotosAlbum",
      success: () => {
        Taro.saveImageToPhotosAlbum({
          filePath: photoPath,
          success: () => {
            Taro.showToast({
              title: "保存成功",
              icon: "success",
            });
          },
          fail: (err) => {
            console.error("保存失败：", err);
            Taro.showToast({
              title: "保存失败",
              icon: "error",
            });
          },
        });
      },
      fail: () => {
        Taro.showToast({
          title: "请授权相册权限",
          icon: "none",
        });
      },
    });
  };

  return (
    <View className="media-page">
      {/* 图片展示区 */}
      <View className="section">
        <Text className="section-title">图片组件</Text>
        <View className="image-container">
          <Image
            className="demo-image"
            src="https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/1.jpg"
            mode="aspectFit"
            lazyLoad
          />
          <Text className="image-desc">
            mode: aspectFit - 保持纵横比缩放图片，使图片完整显示
          </Text>
        </View>
      </View>

      {/* 视频播放器 */}
      <View className="section">
        <Text className="section-title">视频组件</Text>
        <View className="video-container">
          <Video
            className="demo-video"
            src="https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/mp4/1.mp4"
            poster="https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/1.jpg"
            initialTime={0}
            autoplay={false}
            loop={false}
            muted={false}
          />
          <Text className="video-desc">
            支持自定义播放控件、自动播放、循环播放等功能
          </Text>
        </View>
      </View>

      {/* 相机组件 */}
      <View className="section">
        <Text className="section-title">相机组件</Text>
        <View className="camera-container">
          <Camera
            className="demo-camera"
            devicePosition="back"
            flash="auto"
            resolution="medium"
          />
          <Button type="primary" onClick={handleTakePhoto}>
            拍照
          </Button>
          {photoPath && (
            <Button type="primary" onClick={handleSaveToAlbum}>
              保存到相册
            </Button>
          )}
          <Text>支持前后置摄像头切换、闪光灯控制、分辨率设置等功能</Text>
        </View>
      </View>
    </View>
  );
};

export default MediaPage;
