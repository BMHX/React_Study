import { useParams } from "react-router-dom";
import "../style/blog.css"

const BlogDetail = () => {
  const { blogId } = useParams();

  const blogData = {
    1: { title: "React简介", content: "React 是一个用于构建用户界面的 JavaScript 库，它基于组件化思想。" },
    2: { title: "理解 React Router", content: "React Router 允许在 React 应用中实现前端路由，使得不同页面间的导航更加高效。" },
    3: { title: "Redux 的状态管理", content: "Redux 是一种状态管理工具，它可以帮助管理 React 应用的全局状态。" },
  };

  const blog = blogData[blogId];

  if (!blog) {
    return <h2>博客未找到</h2>;
  }

  return (
    <div className="blog-detail-container">
      <h1 className="blog-detail-title">{blog.title}</h1>
      <div className="blog-detail-content">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
