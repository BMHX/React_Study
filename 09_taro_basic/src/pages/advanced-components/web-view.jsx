import { useState } from 'react';
import { View, Text, WebView, Input, Button } from '@tarojs/components';
import './web-view.scss';

const WebViewPage = () => {
  const [url, setUrl] = useState('https://taro-docs.jd.com/');
  const [inputUrl, setInputUrl] = useState('https://taro-docs.jd.com/');
  const [error, setError] = useState(false);

  const handleUrlInput = (e) => {
    setInputUrl(e.detail.value);
  };

  const handleLoadUrl = () => {
    let processedUrl = inputUrl;
    
    // 简单的URL验证和处理
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }
    
    setUrl(processedUrl);
    setError(false);
  };

  const handleWebViewError = () => {
    setError(true);
  };

  const handleWebViewLoad = () => {
    console.log('WebView loaded successfully');
  };

  return (
    <View className='webview-page'>
      <View className='header'>
        <Text className='title'>WebView 组件示例</Text>
      </View>

      <View className='controls'>
        <Input
          className='url-input'
          type='text'
          value={inputUrl}
          onInput={handleUrlInput}
          placeholder='请输入网址'
        />
        <Button 
          className='load-button' 
          onClick={handleLoadUrl}
          type='primary'
        >
          加载网页
        </Button>
      </View>

      {error ? (
        <View className='error-container'>
          <Text className='error-message'>无法加载网页，请检查网址是否正确或网络连接</Text>
        </View>
      ) : (
        <WebView
          src={url}
          onError={handleWebViewError}
          onLoad={handleWebViewLoad}
          className='web-view'
        />
      )}
    </View>
  );
};

export default WebViewPage; 