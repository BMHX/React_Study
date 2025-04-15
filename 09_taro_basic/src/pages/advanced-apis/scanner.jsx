import { useState } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './scanner.scss';

const ScannerPage = () => {
  const [scanResult, setScanResult] = useState('');
  const [qrImagePath, setQrImagePath] = useState('');
  const [loading, setLoading] = useState(false);

  // 扫描二维码/条形码
  const handleScan = async () => {
    try {
      setLoading(true);
      const res = await Taro.scanCode({
        onlyFromCamera: false,
        scanType: ['qrCode', 'barCode'],
      });
      
      setScanResult(JSON.stringify(res.result));
      setLoading(false);
      
      Taro.showToast({
        title: '扫描成功',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      console.error('扫描失败', error);
      setLoading(false);
      
      if (error.errMsg && error.errMsg.includes('cancel')) {
        Taro.showToast({
          title: '扫描已取消',
          icon: 'none',
          duration: 2000
        });
      } else {
        Taro.showToast({
          title: '扫描失败',
          icon: 'error',
          duration: 2000
        });
      }
    }
  };

  // 选择图片进行扫描
  const handleScanFromImage = async () => {
    try {
      // 选择图片
      const imageRes = await Taro.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album']
      });
      
      const imagePath = imageRes.tempFilePaths[0];
      setQrImagePath(imagePath);
      
      // 使用小程序API扫描图片中的二维码
      setLoading(true);
      const scanRes = await Taro.scanCode({
        onlyFromCamera: false,
        scanType: ['qrCode'],
        imageData: imagePath
      });
      
      setScanResult(scanRes.result);
      setLoading(false);
      
      Taro.showToast({
        title: '识别成功',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      console.error('识别失败', error);
      setLoading(false);
      
      // 部分平台不支持从图片识别二维码
      Taro.showModal({
        title: '提示',
        content: '当前平台可能不支持从图片识别二维码，请使用相机扫描。',
        showCancel: false
      });
    }
  };

  return (
    <View className='scanner-page'>
      <View className='header'>
        <Text className='title'>扫码 API 示例</Text>
      </View>

      <View className='content'>
        <View className='button-group'>
          <Button 
            className='scan-button'
            type='primary'
            loading={loading}
            onClick={handleScan}
          >
            打开扫码界面
          </Button>
          
          <Button
            className='scan-button'
            loading={loading}
            onClick={handleScanFromImage}
          >
            从图片识别二维码
          </Button>
        </View>

        {qrImagePath && (
          <View className='qr-image-container'>
            <Image src={qrImagePath} className='qr-image' mode='aspectFit' />
          </View>
        )}

        {scanResult && (
          <View className='result-section'>
            <View className='result-header'>
              <Text className='result-title'>扫描结果:</Text>
            </View>
            <View className='result-content'>
              <Text selectable>{scanResult}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ScannerPage; 