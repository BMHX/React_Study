import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FilmNews() {
    const [newsList, setNewsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const pageSize = 10;

    useEffect(() => {
        const fetchFilmNews = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://apis.tianapi.com/film/index', {
                    params: {
                        key: '1cb07e04321409cfe8c71e94ec41e589',
                        num: pageSize,
                        page: currentPage
                    }
                });
                setNewsList(response.data.result?.newslist || []);  // 修改这里
                console.log(response.data.result);
                setTotal(response.data.result?.newslist.length || 0);
            } catch (error) {
                console.error('获取影视资讯失败:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFilmNews();
    }, [currentPage]);


    const totalPages = Math.ceil(total / pageSize);

    return (
        <div style={{
            padding: '20px',
            maxWidth: '1200px',
            margin: '80px auto 20px',
            minHeight: 'calc(100vh - 100px)'
        }}>
            <h1 style={{
                color: 'rgba(255,255,255,0.9)',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                marginBottom: '32px'
            }}>影视资讯</h1>

            {loading && <div style={{ textAlign: 'center', padding: '20px' }}>加载中...</div>}

            <div style={{
                display: 'grid',
                gap: '24px',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
            }}>
                {newsList.map((news, index) => (
                    <div key={index} style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '20px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'transform 0.3s ease'
                    }}>
                        {/* 显示新闻封面图片 */}
                        {news.picUrl && (
                            <img
                                src={news.picUrl}
                                alt={news.title}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    marginBottom: '12px'
                                }}
                            />
                        )}

                        <h3 style={{
                            margin: '0 0 12px',
                            color: 'rgba(0, 0, 0, 0.9)',
                            fontSize: '1.2em'
                        }}>{news.title}</h3>

                        <p style={{
                            color: 'rgba(57, 133, 181, 0.7)',
                            fontSize: '0.9em',
                            lineHeight: '1.6',
                            marginBottom: '12px'
                        }}>{news.description}</p>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: '0.8em'
                            }}>{news.ctime}</span>

                            <a href={news.url} target="_blank" rel="noopener noreferrer" style={{
                                padding: '6px 12px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#1a73e8',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}>查看详情</a>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '32px',
                display: 'flex',
                justifyContent: 'center',
                gap: '8px'
            }}>
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    style={{
                        padding: '8px 16px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '8px',
                        color: 'rgba(255,255,255,0.8)',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        opacity: currentPage === 1 ? 0.5 : 1
                    }}
                >
                    上一页
                </button>
                <span style={{ color: 'rgba(255,255,255,0.8)', padding: '8px 16px' }}>
                    第 {currentPage} 页 / 共 {totalPages} 页
                </span>
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                        padding: '8px 16px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '8px',
                        color: 'rgba(255,255,255,0.8)',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        opacity: currentPage === totalPages ? 0.5 : 1
                    }}
                >
                    下一页
                </button>
            </div>
        </div>
    );
}