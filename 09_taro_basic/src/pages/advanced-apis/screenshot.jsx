import { useState } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './screenshot.scss';

const ScreenshotPage = () => {
  const [screenshotPath, setScreenshotPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 监听屏幕截图事件
  const startScreenshotListener = () => {
    Taro.onUserCaptureScreen(() => {
      Taro.showToast({
        title: '检测到屏幕截图',
        icon: 'success',
        duration: 2000
      });
    });
    Taro.showToast({
      title: '监听已开启',
      icon: 'success',
      duration: 2000
    });
  };

  // 停止监听屏幕截图事件
  const stopScreenshotListener = () => {
    Taro.offUserCaptureScreen();
    Taro.showToast({
      title: '监听已停止',
      icon: 'success',
      duration: 2000
    });
  };

  // 保存屏幕到图片 - 使用选择图片的方式替代
  const saveScreenshot = async () => {
    try {
      setIsLoading(true);
      
      // 由于直接截图在小程序环境中有限制，我们改为从相册选择图片的方式
      const result = await Taro.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album']
      });
      
      if (result.tempFilePaths && result.tempFilePaths.length > 0) {
        setScreenshotPath(result.tempFilePaths[0]);
        
        Taro.showToast({
          title: '图片已选择',
          icon: 'success',
          duration: 2000
        });
      }
    } catch (error) {
      console.error('选择图片失败', error);
      Taro.showToast({
        title: '选择图片已取消',
        icon: 'none',
        duration: 2000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 保存图片到相册
  const saveToAlbum = async () => {
    if (!screenshotPath) {
      Taro.showToast({
        title: '请先选择图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    try {
      setIsLoading(true);
      await Taro.saveImageToPhotosAlbum({
        filePath: screenshotPath
      });
      
      setIsLoading(false);
      Taro.showToast({
        title: '已保存到相册',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      setIsLoading(false);
      console.error('保存失败', error);
      
      if (error.errMsg.includes('auth deny')) {
        Taro.showModal({
          title: '保存失败',
          content: '请授予相册权限后重试',
          showCancel: false
        });
      } else {
        Taro.showModal({
          title: '保存失败',
          content: error.errMsg || '未知错误',
          showCancel: false
        });
      }
    }
  };

  // 使用小程序自带的截屏API (仅部分平台支持)
  const captureScreen = async () => {
    try {
      setIsLoading(true);
      
      // 显示操作菜单
      await Taro.showActionSheet({
        itemList: ['使用系统截屏功能', '从相册选择图片'],
        success: async (res) => {
          if (res.tapIndex === 0) {
            // 指导用户如何使用系统截屏
            Taro.showModal({
              title: '使用系统截屏',
              content: '请按下设备的截屏按键组合进行截屏。截屏后，将会检测到截屏事件。',
              showCancel: false
            });
          } else if (res.tapIndex === 1) {
            // 从相册选择
            await saveScreenshot();
          }
        }
      });
    } catch (error) {
      console.error('操作失败', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className='screenshot-page'>
      <View className='header'>
        <Text className='title'>屏幕截图 API 示例</Text>
      </View>

      <View className='content'>
        <View className='button-group'>
          <Button 
            className='api-button' 
            type='primary'
            onClick={startScreenshotListener}
          >
            开始监听截屏事件
          </Button>
          
          <Button 
            className='api-button'
            onClick={stopScreenshotListener}
          >
            停止监听截屏事件
          </Button>
          
          <Button 
            className='api-button'
            loading={isLoading}
            onClick={captureScreen}
          >
            获取截图
          </Button>
          
          <Button 
            className='api-button'
            disabled={!screenshotPath}
            loading={isLoading}
            onClick={saveToAlbum}
          >
            保存图片到相册
          </Button>
        </View>

        <View className='screenshot-preview'>
          {screenshotPath ? (
            <Image src={screenshotPath} className='preview-image' mode='aspectFit' />
          ) : (
            <View className='preview-placeholder'>
              <Text>截图预览区域</Text>
              <Text className='preview-hint'>请先使用系统截屏功能或从相册选择图片</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ScreenshotPage; 