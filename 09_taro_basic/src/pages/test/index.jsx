import { View, Navigator } from '@tarojs/components';

import './index.scss';

const Test = () => {
  return (
    <View className='discover-container'>
      <Navigator url='/pages/basic/index' className='nav-item'>
        基础内容
      </Navigator>
      <Navigator url='/pages/contact/index' className='nav-item'>
        contact
      </Navigator>
      <Navigator url='/pages/container/index' className='nav-item'>
        container
      </Navigator>
      <Navigator url='/pages/device/index' className='nav-item'>
        设备
      </Navigator>
      <Navigator url='/pages/form/index' className='nav-item'>
        表单组件
      </Navigator>
      <Navigator url='/pages/location/index' className='nav-item'>
        定位
      </Navigator>
      <Navigator url='/pages/map/index' className='nav-item'>
        地图
      </Navigator>
      <Navigator url='/pages/media/index' className='nav-item'>
        媒体组件
      </Navigator>
      <Navigator url='/pages/skyline/index' className='nav-item'>
        skyline
      </Navigator>
      <Navigator url='/pages/advanced-components/index' className='nav-item special'>
        扩展组件
      </Navigator>
      <Navigator url='/pages/advanced-apis/index' className='nav-item special'>
        扩展 API
      </Navigator>
    </View>
  );
};

export default Test;