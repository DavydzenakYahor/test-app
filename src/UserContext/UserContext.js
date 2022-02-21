
import { useEffect,useState,createContext } from "react";
import { USERS_ENDPOINT } from "../Constans/constantsUrl";
import { getRequestData } from "../Request/requestData";


export const UserContext = createContext({
    users:[]
})

const UserContextProvider = (props) => {
    const [users,setUsers] = useState([]);
    useEffect(() => {
        getRequestData(USERS_ENDPOINT)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    },[setUsers])

    return(
        <UserContext.Provider value={{users}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;