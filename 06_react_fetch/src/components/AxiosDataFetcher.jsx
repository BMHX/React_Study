import { useEffect, useState } from 'react';
import axios from 'axios';

// 使用axios实现的数据获取组件
const AxiosDataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 使用axios异步获取数据
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        
        // 仅取前5条数据
        const limitedData = response.data.slice(0, 5);
        setData(limitedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 渲染状态逻辑与原有组件保持一致
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误：{error}</div>;

  return (
    <div>
      <h2>Axios获取数据（5条）：</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AxiosDataFetcher;