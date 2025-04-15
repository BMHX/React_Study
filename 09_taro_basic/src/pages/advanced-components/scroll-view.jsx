import { useState } from 'react';
import { View, ScrollView, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './scroll-view.scss';

const ScrollViewPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(Array.from({ length: 20 }).map((_, i) => `Item ${i + 1}`));

  // 处理下拉刷新
  const handleRefresh = () => {
    setRefreshing(true);
    
    // 模拟网络请求
    setTimeout(() => {
      // 重置数据
      setItems(Array.from({ length: 20 }).map((_, i) => `New Item ${i + 1}`));
      setRefreshing(false);
      Taro.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      });
    }, 1500);
  };

  // 处理上拉加载更多
  const handleLoadMore = () => {
    if (loading) return;
    
    setLoading(true);
    
    // 模拟网络请求
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }).map((_, i) => `Additional Item ${items.length + i + 1}`);
      setItems([...items, ...newItems]);
      setLoading(false);
    }, 1500);
  };

  return (
    <View className='scroll-view-page'>
      <View className='header'>
        <Text className='title'>ScrollView 下拉刷新和上拉加载</Text>
      </View>

      <ScrollView
        className='scroll-container'
        scrollY
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={handleRefresh}
        lowerThreshold={100}
        onScrollToLower={handleLoadMore}
      >
        {items.map((item, index) => (
          <View key={index} className='item'>
            <Text>{item}</Text>
          </View>
        ))}
        
        {loading && (
          <View className='loading'>
            <Text>加载中...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ScrollViewPage; 