import { useState, useEffect, useContext } from 'react';
import { Card, Col, Row, Avatar, Button, Modal, Comment } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LayoutComponent from '../../Layout/LayoutComponent';
import { UserContext } from '../../../UserContext/UserContext';
import { POSTS_ENDPOINT, COMMENTS_ENDPOINT } from '../../../Constans/constantsUrl';
import { getRequestData } from '../../../Request/requestData';
import './Posts.scss'

const PostsComponent = () => {

const {users} = useContext(UserContext)
const [posts,setPosts] = useState([])
const [comments,setComments] = useState([])
const [isModalVisible, setIsModalVisible] = useState(false);
const [previewPostId,setPreviewPostId] = useState(null)
const [previewPostUserId,setPreviewPostUserId] =useState(null)


const getPosts = () => {

    getRequestData(POSTS_ENDPOINT)
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))

}

const getComments = () => {

    getRequestData(COMMENTS_ENDPOINT)
        .then(res => setComments(res.data))
        .catch(err => console.log(err))

}

const showModal = (userId,id) => {

    setIsModalVisible(true);
    setPreviewPostId(id)
    setPreviewPostUserId(userId)

  };

const handleOk = () => {
    setIsModalVisible(false);
};

const handleCancel = () => {
    setIsModalVisible(false);
  };

useEffect(() => {

    getPosts()
    getComments()

},[])

    return(
        <LayoutComponent>
            <div className="site-card-wrapper">
                {posts.map(item => {
                    const {id,userId,title,body} = item;
                    return(
                        <Card  
                            key={id}
                            className='post-card'
                            hoverable 
                                title={users.map(item => {
                                    return item.id === userId && item.name
                                })} 
                                bordered={true}>
                                <Avatar icon={<UserOutlined />} />
                                <p>{title}</p>
                                <p>{body}</p>
                                <Button 
                                    type="primary" 
                                    onClick={() => showModal(userId,id)}>Show comments</Button>
                            </Card>                      
                    )
                })}  
            </div>
            <Modal 
                title="Comments" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}>
                <div>
                    <Card 
                        key={posts.find(item => item.id === previewPostId)?.id}  

                        title={users.map((user) => {
                            if (user.id === posts.find(item => item.userId === previewPostUserId)?.userId) {
                                return  user.name
                            }})} 

                        hoverable 
                        bordered={true}>
                        <Avatar icon={<UserOutlined />} />
                        <p>{posts.find(item => item.id === previewPostId)?.title}</p>
                        <p>{posts.find(item => item.id === previewPostId)?.body}</p>
                    </Card>
                </div>
                <div>
                    {comments.map(item => {
                        const {postId,id,email,body} = item;

                        if(postId === previewPostId) {
                            return(
                                <Comment
                                    key={id}
                                    author={email}
                                    avatar={<Avatar icon={<UserOutlined />} />}
                                    content={body}
                                >
                                </Comment>
                            )
                        }
                    })}
                </div>
            </Modal>
        </LayoutComponent>
    )
}
  

export default PostsComponent;

