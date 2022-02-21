import { Layout, Menu } from 'antd';
import { NavLink } from "react-router-dom";
import './LayoutComponent.css'

const { Header, Content, Footer } = Layout;


const headerItems = [
    {
        id:'posts',
        link:'/posts',
        name:'Posts',
    },
    {
        id:'albums',
        link:'/albums',
        name:'Albums',
    },
    {
        id:'todos',
        link:'/todos',
        name:'Todos',
    },
    {
        id:'users',
        link:'/users',
        name:'Users',
    },

]

const LayoutComponent = (props) => {
    return(
        <Layout className="layout">
            <Header>
            <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {headerItems.map(item => {
                                return (
                                    <Menu.Item key={item.id}>
                                        <NavLink to={item.link}>{item.name}</NavLink>
                                    </Menu.Item>
                                )})}
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}



export default LayoutComponent;