import { useContext } from "react";
import { UserContext } from "../../../UserContext/UserContext";
import { List } from 'antd';
import LayoutComponent from "../../Layout/LayoutComponent";
import './Users.scss'

const UserPage = () => {
    const {users} = useContext(UserContext)
    return(
        <LayoutComponent>
        <div className="users-list">
            {users.map(item => {
                const {name,id,email} = item;
                return(
                    <List
                        className="user-info"
                        key={id}
                        header={`Name: ${name}`}
                        footer={`Email: ${email}`}>
                        <List.Item>{`Id: ${id}`}</List.Item>
                    </List>
                    )
            })}
        </div>
           
        </LayoutComponent>
    )
}

export default UserPage;