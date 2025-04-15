import { useState, useEffect } from 'react';
import { View, Text, Button, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './network.scss';

const NetworkPage = () => {
  const [networkType, setNetworkType] = useState('');
  const [isNetworkOn, setIsNetworkOn] = useState(true);
  const [url, setUrl] = useState('https://api.github.com/');
  const [responseData, setResponseData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // 初始化时获取网络状态
  useEffect(() => {
    getNetworkType();
    
    // 监听网络状态变化
    Taro.onNetworkStatusChange(res => {
      setNetworkType(res.networkType);
      setIsNetworkOn(res.isConnected);
      
      if (!res.isConnected) {
        Taro.showToast({
          title: '网络已断开',
          icon: 'none',
          duration: 2000
        });
      } else {
        Taro.showToast({
          title: `已连接到${res.networkType}网络`,
          icon: 'success',
          duration: 2000
        });
      }
    });
    
    return () => {
      // 取消监听网络状态变化
      Taro.offNetworkStatusChange();
    };
  }, []);

  // 获取网络类型
  const getNetworkType = async () => {
    try {
      const res = await Taro.getNetworkType();
      setNetworkType(res.networkType);
      setIsNetworkOn(res.networkType !== 'none');
    } catch (error) {
      console.error('获取网络状态失败', error);
    }
  };

  // 处理URL输入变化
  const handleUrlChange = (e) => {
    setUrl(e.detail.value);
  };

  // 发起请求
  const handleRequest = async () => {
    if (!url.trim() || !isNetworkOn) {
      Taro.showToast({
        title: !url.trim() ? '请输入有效的URL' : '网络未连接',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    setIsLoading(true);
    setResponseData('');
    
    try {
      const response = await Taro.request({
        url,
        method: 'GET',
        timeout: 10000
      });
      
      setResponseData(JSON.stringify(response.data, null, 2));
      
      Taro.showToast({
        title: '请求成功',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      console.error('请求失败', error);
      
      setResponseData(`请求失败: ${error.errMsg || '未知错误'}`);
      
      Taro.showToast({
        title: '请求失败',
        icon: 'error',
        duration: 2000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 下载文件
  const handleDownload = async () => {
    if (!url.trim() || !isNetworkOn) {
      Taro.showToast({
        title: !url.trim() ? '请输入有效的URL' : '网络未连接',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    setIsLoading(true);
    setDownloadProgress(0);
    
    try {
      const downloadTask = Taro.downloadFile({
        url,
        success: (res) => {
          setResponseData(`文件下载成功: ${res.tempFilePath}`);
          
          Taro.showToast({
            title: '文件下载成功',
            icon: 'success',
            duration: 2000
          });
        },
        fail: (error) => {
          console.error('下载失败', error);
          setResponseData(`下载失败: ${error.errMsg || '未知错误'}`);
          
          Taro.showToast({
            title: '下载失败',
            icon: 'error',
            duration: 2000
          });
        },
        complete: () => {
          setIsLoading(false);
        }
      });
      
      // 监听下载进度
      downloadTask.onProgressUpdate((res) => {
        setDownloadProgress(res.progress);
      });
    } catch (error) {
      console.error('下载任务创建失败', error);
      setResponseData(`下载任务创建失败: ${error.errMsg || '未知错误'}`);
      setIsLoading(false);
      
      Taro.showToast({
        title: '下载任务创建失败',
        icon: 'error',
        duration: 2000
      });
    }
  };

  return (
    <View className='network-page'>
      <View className='header'>
        <Text className='title'>网络 API 示例</Text>
      </View>

      <View className='content'>
        <View className='status-section'>
          <View className='status-item'>
            <Text className='status-label'>网络状态:</Text>
            <Text className={`status-value ${isNetworkOn ? 'online' : 'offline'}`}>
              {isNetworkOn ? `已连接 (${networkType})` : '未连接'}
            </Text>
          </View>
          
          <Button 
            className='refresh-button'
            size='mini'
            onClick={getNetworkType}
          >
            刷新
          </Button>
        </View>

        <View className='action-section'>
          <View className='url-input-container'>
            <Input
              className='url-input'
              value={url}
              onInput={handleUrlChange}
              placeholder='请输入URL'
            />
          </View>
          
          <View className='action-buttons'>
            <Button 
              className='action-button'
              type='primary' 
              loading={isLoading}
              disabled={!isNetworkOn}
              onClick={handleRequest}
            >
              发起请求
            </Button>
            
            <Button 
              className='action-button'
              loading={isLoading}
              disabled={!isNetworkOn}
              onClick={handleDownload}
            >
              下载文件
            </Button>
          </View>
          
          {downloadProgress > 0 && downloadProgress < 100 && (
            <View className='progress-container'>
              <View className='progress-track'>
                <View 
                  className='progress-bar' 
                  style={{ width: `${downloadProgress}%` }}
                ></View>
              </View>
              <Text className='progress-text'>{`${downloadProgress}%`}</Text>
            </View>
          )}
        </View>

        {responseData && (
          <View className='response-section'>
            <View className='response-header'>
              <Text className='response-title'>响应结果:</Text>
            </View>
            <View className='response-content'>
              <Text selectable>{responseData}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default NetworkPage; 