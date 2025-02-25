import  { useState } from 'react'; 
import { Menu } from 'antd';
import { HomeOutlined,MailOutlined,SettingOutlined } from '@ant-design/icons'
import "./Header.css";
const items = [
    {
        label: '首页',
        key: 'home',
        icon: <HomeOutlined />
    },
    {
        label: '邮件',
        key:'mail',
        icon: <MailOutlined />
    },
    {
        label: '设置',
        key: 'setting',
        icon: <SettingOutlined />
    },

]
const Header = () => {
    const [current,setCurrent] = useState('home');
    const onClick = (e) => {
        console.log('click',e);
        setCurrent(e.key);
    }
    return (
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    );

}
export default Header;