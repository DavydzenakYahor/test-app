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
          key: `userName${albumItem.map(item => item.id)}`,
          render: (userId) => {
              const userName = users.find(item => item.id === userId)?.name
              return userName 
          }
        },
        {
          title: 'Album Title',
          dataIndex: 'title',
          key: `title${albumItem.map(item => item.id)}`,
        },
        {
          title: 'Action',
          key: `userActions${albumItem.map(item => item.id)}`,
          dataIndex: 'userId',
          render: (id) => {

            const postId = users.find(item => item.id === id)?.id
    
            return(
                <Link to={`${window.location.pathname}/${postId}`}>
                    <Button  type="primary">Show Photos</Button>
                </Link>
            )  
          }
        },
      ];
      
      console.log(albumItem.map(item => item.id))
    return(
        <LayoutComponent>
            <Table columns={columns}  dataSource={albumItem} />
        </LayoutComponent>
        
    )
}


export default Albums;




