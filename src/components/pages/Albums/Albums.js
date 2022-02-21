import LayoutComponent from "../../Layout/LayoutComponent"
import { useContext, useEffect, useState } from "react";
import { getRequestData } from "../../../Request/requestData";
import { ALBUMS_ENDPOINT } from "../../../Constans/constantsUrl";
import { Table, Button } from 'antd';
import { UserContext } from "../../../UserContext/UserContext";
import { Link, useNavigate } from 'react-router-dom';


const Albums = () => {
    const [albumItem,setAlbumsItem] = useState([])
    const {users} = useContext(UserContext)
    console.log(albumItem)

    const getAlbumsItem  =  () => {
        getRequestData(ALBUMS_ENDPOINT)
            .then(res => setAlbumsItem(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAlbumsItem()
    },[])

    const columns = [
        {
          title: 'User Name',
          dataIndex: 'userId',
          key: 'userName',
          render: (userId) => {
              const userName = users.find(item => item.id === userId)?.name
              return userName 
          }
        },
        {
          title: 'Album Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Action',
          key: 'userActions',
          dataIndex: 'userId',
          render: (id) => {

            const postId = users.find(item => item.id === id)?.id
            console.log(postId)
            
            return(
                <Link to={`${window.location.pathname}/${postId}`}>
                    <Button key={albumItem.map(item => item.id)} type="primary">Show Photos</Button>
                </Link>
            )  
          }
        },
      ];
      

    return(
        <LayoutComponent>
            <Table columns={columns}  dataSource={albumItem} />
        </LayoutComponent>
        
    )
}


export default Albums;




