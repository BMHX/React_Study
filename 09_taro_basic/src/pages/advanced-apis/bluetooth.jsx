import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './bluetooth.scss';

const BluetoothPage = () => {
  const [isBluetoothAvailable, setIsBluetoothAvailable] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [devicesList, setDevicesList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [log, setLog] = useState([]);

  // 初始化蓝牙
  useEffect(() => {
    initBluetooth();
    
    return () => {
      // 关闭蓝牙模块
      if (isBluetoothAvailable) {
        Taro.closeBluetoothAdapter();
        addLog('蓝牙适配器已关闭');
      }
    };
  }, []);

  // 添加日志
  const addLog = (message) => {
    setLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  // 初始化蓝牙模块
  const initBluetooth = async () => {
    setIsLoading(true);
    
    try {
      await Taro.openBluetoothAdapter();
      setIsBluetoothAvailable(true);
      addLog('蓝牙适配器初始化成功');
      
      // 监听蓝牙状态变化
      Taro.onBluetoothAdapterStateChange(res => {
        setIsBluetoothAvailable(res.available);
        setIsDiscovering(res.discovering);
        
        if (!res.available) {
          setSelectedDevice(null);
          setIsConnected(false);
          setDevicesList([]);
          addLog('蓝牙适配器不可用');
        } else {
          addLog(`蓝牙适配器状态变化: available=${res.available}, discovering=${res.discovering}`);
        }
      });
      
      // 监听发现新设备
      Taro.onBluetoothDeviceFound(res => {
        res.devices.forEach(device => {
          if (!devicesList.some(d => d.deviceId === device.deviceId)) {
            setDevicesList(prev => [...prev, device]);
            addLog(`发现新设备: ${device.name || '未知设备'} (${device.deviceId})`);
          }
        });
      });
      
    } catch (error) {
      console.error('初始化蓝牙失败', error);
      addLog(`初始化蓝牙失败: ${error.errMsg || '未知错误'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 扫描蓝牙设备
  const startDiscovery = async () => {
    if (!isBluetoothAvailable) {
      addLog('蓝牙适配器不可用，请先初始化');
      return;
    }
    
    if (isDiscovering) {
      addLog('已经在搜索设备中');
      return;
    }
    
    setIsLoading(true);
    setDevicesList([]);
    
    try {
      await Taro.startBluetoothDevicesDiscovery();
      setIsDiscovering(true);
      addLog('开始搜索蓝牙设备');
    } catch (error) {
      console.error('开始搜索失败', error);
      addLog(`开始搜索失败: ${error.errMsg || '未知错误'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 停止扫描
  const stopDiscovery = async () => {
    if (!isDiscovering) return;
    
    setIsLoading(true);
    
    try {
      await Taro.stopBluetoothDevicesDiscovery();
      setIsDiscovering(false);
      addLog('停止搜索蓝牙设备');
    } catch (error) {
      console.error('停止搜索失败', error);
      addLog(`停止搜索失败: ${error.errMsg || '未知错误'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 连接到设备
  const connectToDevice = async (device) => {
    if (isConnected) {
      await disconnectDevice();
    }
    
    setIsLoading(true);
    
    try {
      // 创建连接
      await Taro.createBLEConnection({
        deviceId: device.deviceId
      });
      
      setSelectedDevice(device);
      setIsConnected(true);
      addLog(`连接成功: ${device.name || '未知设备'} (${device.deviceId})`);
      
      // 获取服务
      const servicesRes = await Taro.getBLEDeviceServices({
        deviceId: device.deviceId
      });
      
      addLog(`设备服务数量: ${servicesRes.services.length}`);
      
    } catch (error) {
      console.error('连接设备失败', error);
      addLog(`连接设备失败: ${error.errMsg || '未知错误'}`);
      setSelectedDevice(null);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 断开连接
  const disconnectDevice = async () => {
    if (!selectedDevice || !isConnected) return;
    
    setIsLoading(true);
    
    try {
      await Taro.closeBLEConnection({
        deviceId: selectedDevice.deviceId
      });
      
      setIsConnected(false);
      addLog(`已断开连接: ${selectedDevice.name || '未知设备'}`);
    } catch (error) {
      console.error('断开连接失败', error);
      addLog(`断开连接失败: ${error.errMsg || '未知错误'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className='bluetooth-page'>
      <View className='header'>
        <Text className='title'>蓝牙 API 示例</Text>
      </View>

      <View className='content'>
        <View className='status-section'>
          <View className='status-item'>
            <Text className='status-label'>蓝牙状态:</Text>
            <Text className={`status-value ${isBluetoothAvailable ? 'online' : 'offline'}`}>
              {isBluetoothAvailable ? '可用' : '不可用'}
            </Text>
          </View>
          
          {selectedDevice && (
            <View className='status-item'>
              <Text className='status-label'>已选设备:</Text>
              <Text className='status-value'>
                {selectedDevice.name || '未知设备'} ({isConnected ? '已连接' : '未连接'})
              </Text>
            </View>
          )}
        </View>

        <View className='action-section'>
          <View className='button-group'>
            <Button 
              className='bt-button'
              type='primary'
              loading={isLoading}
              disabled={!isBluetoothAvailable}
              onClick={isDiscovering ? stopDiscovery : startDiscovery}
            >
              {isDiscovering ? '停止搜索' : '搜索设备'}
            </Button>
            
            {selectedDevice && (
              <Button 
                className='bt-button'
                loading={isLoading}
                disabled={!isBluetoothAvailable}
                onClick={isConnected ? disconnectDevice : () => connectToDevice(selectedDevice)}
              >
                {isConnected ? '断开连接' : '连接设备'}
              </Button>
            )}
          </View>
          
          {isDiscovering && (
            <View className='scanning-indicator'>
              <Text>正在搜索...</Text>
            </View>
          )}
          
          <View className='devices-list-container'>
            <View className='devices-header'>
              <Text className='devices-title'>设备列表 ({devicesList.length})</Text>
            </View>
            
            <ScrollView 
              className='devices-list' 
              scrollY
            >
              {devicesList.length > 0 ? (
                devicesList.map(device => (
                  <View 
                    key={device.deviceId} 
                    className={`device-item ${selectedDevice?.deviceId === device.deviceId ? 'selected' : ''}`}
                    onClick={() => setSelectedDevice(device)}
                  >
                    <View className='device-name'>
                      <Text>{device.name || '未知设备'}</Text>
                    </View>
                    <View className='device-id'>
                      <Text>{device.deviceId}</Text>
                    </View>
                    <View className='device-rssi'>
                      <Text>信号强度: {device.RSSI}dBm</Text>
                    </View>
                  </View>
                ))
              ) : (
                <View className='no-devices'>
                  <Text>{isDiscovering ? '正在搜索设备，请稍候...' : '没有找到设备'}</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>

        <View className='log-section'>
          <View className='log-header'>
            <Text className='log-title'>操作日志</Text>
            <View 
              className='clear-log'
              onClick={() => setLog([])}
            >
              <Text>清空</Text>
            </View>
          </View>
          
          <ScrollView 
            className='log-content' 
            scrollY
            scrollWithAnimation
          >
            {log.map((entry, index) => (
              <View key={index} className='log-entry'>
                <Text className='log-time'>[{entry.time}]</Text>
                <Text className='log-message'>{entry.message}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default BluetoothPage; 