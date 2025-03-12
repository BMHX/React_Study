import { Link } from "react-router-dom";
import "../style/blog.css"

const BlogList = () => {
  const blogs = [
    { id: 1, title: "React简介", summary: "学习React.js的基础知识" },
    { id: 2, title: "理解React Router", summary: "React Router和路由导航的详细讲解" },
    { id: 3, title: "Redux的状态管理", summary: "Redux：管理React应用状态的解决方案" },
  ];

  return (
    <div className="blog-list-container">
      <h1>博客列表</h1>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-summary">{blog.summary}</p>
          <Link to={`/blog/${blog.id}`} className="blog-link">阅读全文</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
