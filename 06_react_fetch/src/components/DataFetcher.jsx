import { useEffect, useState } from 'react';

// 数据获取组件
const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 定义异步获取数据函数
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('网络响应异常');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 渲染不同状态
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误：{error}</div>;

  return (
    <div>
      <h2>获取到的数据：</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;