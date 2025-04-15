import { useState } from 'react';
import { View, Text, Button, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './clipboard.scss';

const ClipboardPage = () => {
  const [textToCopy, setTextToCopy] = useState('这是要复制到剪贴板的文本');
  const [pastedText, setPastedText] = useState('');
  const [loading, setLoading] = useState(false);

  // 处理文本输入变化
  const handleInputChange = (e) => {
    setTextToCopy(e.detail.value);
  };

  // 复制文本到剪贴板
  const handleCopy = async () => {
    if (!textToCopy.trim()) {
      Taro.showToast({
        title: '请输入要复制的文本',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    setLoading(true);
    try {
      await Taro.setClipboardData({
        data: textToCopy
      });
      
      Taro.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      console.error('复制失败', error);
      
      Taro.showToast({
        title: '复制失败',
        icon: 'error',
        duration: 2000
      });
    } finally {
      setLoading(false);
    }
  };

  // 从剪贴板获取文本
  const handlePaste = async () => {
    setLoading(true);
    try {
      const result = await Taro.getClipboardData();
      setPastedText(result.data);
      
      Taro.showToast({
        title: '读取成功',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      console.error('读取失败', error);
      
      Taro.showToast({
        title: '读取失败',
        icon: 'error',
        duration: 2000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='clipboard-page'>
      <View className='header'>
        <Text className='title'>剪贴板 API 示例</Text>
      </View>

      <View className='content'>
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>写入剪贴板</Text>
          </View>
          
          <View className='input-area'>
            <Textarea
              className='text-input'
              value={textToCopy}
              onInput={handleInputChange}
              placeholder='请输入要复制的文本'
              maxlength={200}
            />
            <View className='character-count'>
              <Text>{textToCopy.length}/200</Text>
            </View>
          </View>
          
          <Button 
            className='action-button' 
            type='primary'
            loading={loading}
            onClick={handleCopy}
          >
            复制到剪贴板
          </Button>
        </View>

        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>读取剪贴板</Text>
          </View>
          
          <Button 
            className='action-button'
            loading={loading}
            onClick={handlePaste}
          >
            从剪贴板读取
          </Button>
          
          <View className='output-area'>
            <View className='output-label'>
              <Text>剪贴板内容:</Text>
            </View>
            <View className='output-content'>
              <Text>{pastedText || '(空)'}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClipboardPage; 