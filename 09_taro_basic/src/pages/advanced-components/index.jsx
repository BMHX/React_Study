import { View, Text, Navigator } from '@tarojs/components';
import './index.scss';

const AdvancedComponentsPage = () => {
  // 扩展组件列表
  const componentsList = [
    {
      id: 'scrollview',
      name: 'ScrollView',
      desc: '可滚动视图区域',
      url: '/pages/advanced-components/scroll-view'
    },
    {
      id: 'movableview',
      name: 'MovableArea & MovableView',
      desc: '可移动的视图容器',
      url: '/pages/advanced-components/movable-view'
    },
    {
      id: 'webview',
      name: 'WebView',
      desc: '承载网页的容器',
      url: '/pages/advanced-components/web-view'
    }
  ];

  return (
    <View className='advanced-components-page'>
      <View className='header'>
        <Text className='title'>扩展组件</Text>
      </View>

      <View className='content'>
        <View className='component-list'>
          {componentsList.map(component => (
            <Navigator 
              key={component.id}
              url={component.url}
              className='component-item'
            >
              <View className='component-info'>
                <Text className='component-name'>{component.name}</Text>
                <Text className='component-desc'>{component.desc}</Text>
              </View>
              <View className='component-arrow'></View>
            </Navigator>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AdvancedComponentsPage; 