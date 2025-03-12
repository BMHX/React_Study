import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = '0829b3523fe34c4ab68767bbc6fef501';
  const LOCATION_ID = '101190101'; // 南京的Location ID

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://devapi.qweather.com/v7/weather/now`,
          {
            params: {
              location: LOCATION_ID,
              key: API_KEY,
              lang: 'zh',
              unit: 'm'
            }
          }
        );
        
        if (response.data.code === '200') {
          setWeatherData(response.data.now);
        } else {
          setError('天气数据获取失败');
        }
      } catch (err) {
        setError('网络请求异常');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // 天气图标映射
  const weatherIcons = {
    '100': 'sunny',
    '101': 'cloudy',
    '103': 'partly-cloudy',
    '104': 'cloudy',
    '300': 'rainy',
    '301': 'thunderstorms'
  };

  if (loading) return <div className="loading">加载中...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>南京实时天气</h2>
        <Icon 
          icon={`bi:${weatherIcons[weatherData.icon] || 'question-circle'}`}
          width="48"
          height="48"
        />
      </div>
      
      <div className="weather-details">
        <p className="temperature">
          {weatherData.temp}℃
          <span className="feels-like">(体感{weatherData.feelsLike}℃)</span>
        </p>
        
        <div className="weather-grid">
          <div className="grid-item">
            <Icon icon="mdi:weather-windy" />
            <span>{weatherData.windDir} {weatherData.windScale}级</span>
          </div>
          <div className="grid-item">
            <Icon icon="mdi:water-percent" />
            <span>湿度 {weatherData.humidity}%</span>
          </div>
          <div className="grid-item">
            <Icon icon="mdi:weather-rainy" />
            <span>降水 {weatherData.precip}mm</span>
          </div>
          <div className="grid-item">
            <Icon icon="mdi:eye-outline" />
            <span>能见度 {weatherData.vis}km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
