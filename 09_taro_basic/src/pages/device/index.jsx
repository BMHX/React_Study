import { useState, useEffect } from 'react'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const Device = () => {
  const [deviceInfo, setDeviceInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  // 获取设备信息
  const getDeviceInfo = async () => {
    setLoading(true)
    try {
      const info = await Taro.getDeviceInfo()
      console.log('设备信息:', info)
      setDeviceInfo(info)
      Taro.showToast({
        title: '获取成功',
        icon: 'success'
      })
    } catch (err) {
      console.error('获取设备信息失败:', err)
      Taro.showToast({
        title: '获取失败: ' + (err.errMsg || err.message),
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  // 组件加载时自动获取一次
  useEffect(() => {
    getDeviceInfo()
  }, [])

  // 渲染设备信息项
  const renderInfoItem = (label, value) => {
    if (value === undefined || value === null) return null

    return (
      <View className="info-item">
        <Text className="info-label">{label}:</Text>
        <Text className="info-value">{value.toString()}</Text>
      </View>
    )
  }

  return (
    <View className="device-page">
      <Text className="title">设备信息</Text>

      <ScrollView scrollY className="info-container">
        {deviceInfo ? (
          <View className="info-card">
            {renderInfoItem('品牌', deviceInfo.brand)}
            {renderInfoItem('型号', deviceInfo.model)}
            {renderInfoItem('系统版本', deviceInfo.system)}
            {renderInfoItem('平台', deviceInfo.platform)}
          </View>
        ) : (
          <Text className="loading-text">
            {loading ? '获取中...' : '点击下方按钮获取设备信息'}
          </Text>
        )}
      </ScrollView>

      <Button
        className="refresh-btn"
        onClick={getDeviceInfo}
        loading={loading}
        disabled={loading}
      >
        {loading ? '获取中...' : '刷新设备信息'}
      </Button>

      <View className="tips">
        <Text className="tip-title">提示：</Text>
        <Text className="tip-text">• 不同设备返回的信息可能有所不同</Text>
        <Text className="tip-text">• 部分安卓设备可能缺少某些字段</Text>
        <Text className="tip-text">• 开发者工具显示的信息可能与真机不同</Text>
      </View>
    </View>
  )
}

export default Device
