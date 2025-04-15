import { useState } from 'react';
import { View, Text, MovableArea, MovableView, Slider } from '@tarojs/components';
import './movable-view.scss';

const MovableViewPage = () => {
  const [scale, setScale] = useState(1);
  const [x, setX] = useState(30);
  const [y, setY] = useState(30);
  const [direction, setDirection] = useState('all');

  const handleScaleChange = (e) => {
    setScale(e.detail.value);
  };

  const handleDirectionChange = (dir) => {
    setDirection(dir);
  };

  const handleChange = (e) => {
    setX(e.detail.x);
    setY(e.detail.y);
  };

  return (
    <View className='movable-page'>
      <View className='header'>
        <Text className='title'>MovableArea 和 MovableView</Text>
      </View>

      <View className='content'>
        <View className='control-panel'>
          <View className='control-section'>
            <Text className='section-title'>方向控制:</Text>
            <View className='direction-buttons'>
              <View 
                className={`direction-btn ${direction === 'all' ? 'active' : ''}`} 
                onClick={() => handleDirectionChange('all')}
              >
                自由移动
              </View>
              <View 
                className={`direction-btn ${direction === 'horizontal' ? 'active' : ''}`} 
                onClick={() => handleDirectionChange('horizontal')}
              >
                水平移动
              </View>
              <View 
                className={`direction-btn ${direction === 'vertical' ? 'active' : ''}`} 
                onClick={() => handleDirectionChange('vertical')}
              >
                垂直移动
              </View>
            </View>
          </View>

          <View className='control-section'>
            <Text className='section-title'>缩放控制: {scale.toFixed(1)}</Text>
            <Slider 
              min={0.5} 
              max={4} 
              step={0.1} 
              value={scale} 
              onChange={handleScaleChange} 
              activeColor='#4594D5'
              blockColor='#4594D5'
            />
          </View>

          <View className='position-info'>
            <Text>当前位置: x={Math.round(x)}, y={Math.round(y)}</Text>
          </View>
        </View>

        <MovableArea className='movable-area'>
          <MovableView
            className='movable-view'
            direction={direction}
            x={x}
            y={y}
            scale
            scaleValue={scale}
            scaleMin={0.5}
            scaleMax={4}
            onChange={handleChange}
          >
            <View className='movable-content'>
              <Text>拖动我!</Text>
            </View>
          </MovableView>
        </MovableArea>
      </View>
    </View>
  );
};

export default MovableViewPage; 