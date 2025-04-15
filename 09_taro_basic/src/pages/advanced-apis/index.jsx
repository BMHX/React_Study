import { View, Text, Navigator } from '@tarojs/components';
import './index.scss';

const AdvancedApisPage = () => {
  // 扩展API列表
  const apisList = [
    {
      id: 'screenshot',
      name: '截屏 API',
      desc: '监听截屏事件和保存屏幕截图',
      url: '/pages/advanced-apis/screenshot'
    },
    {
      id: 'bluetooth',
      name: '蓝牙 API',
      desc: '搜索、连接和操作蓝牙设备',
      url: '/pages/advanced-apis/bluetooth'
    },
    {
      id: 'clipboard',
      name: '剪贴板 API',
      desc: '读取和写入剪贴板内容',
      url: '/pages/advanced-apis/clipboard'
    },
    {
      id: 'network',
      name: '网络 API',
      desc: '监听网络状态变化、发起网络请求和下载文件',
      url: '/pages/advanced-apis/network'
    },
    {
      id: 'scanner',
      name: '扫码 API',
      desc: '调用相机或从图片识别二维码和条形码',
      url: '/pages/advanced-apis/scanner'
    }
  ];

  return (
    <View className='advanced-apis-page'>
      <View className='header'>
        <Text className='title'>扩展 API</Text>
      </View>

      <View className='content'>
        <View className='api-list'>
          {apisList.map(api => (
            <Navigator 
              key={api.id}
              url={api.url}
              className='api-item'
            >
              <View className='api-info'>
                <Text className='api-name'>{api.name}</Text>
                <Text className='api-desc'>{api.desc}</Text>
              </View>
              <View className='api-arrow'></View>
            </Navigator>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AdvancedApisPage; 