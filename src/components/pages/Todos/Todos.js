import { useContext, useEffect, useState } from "react";
import LayoutComponent from "../../Layout/LayoutComponent"
import {Space, Input, Select, Button, Card, Checkbox, Col, Row, Popover  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UserContext } from "../../../UserContext/UserContext";
import { getRequestData } from "../../../Request/requestData";
import { updateRequestData } from "../../../Request/requestData";
import { TODOS_ENDPOINT } from "../../../Constans/constantsUrl";


const Todos = () => {

    const {users} = useContext(UserContext);
    const [todos,setTodos] = useState([]);
    const [nameInputValue, setNameInputValue] = useState('');
    const [titleInputValue, setTitleInputValue] = useState('');
    const [selectValue, setSelectValue] = useState(null);
    const [cloneTodos,setCloneTodos] = useState([])
    const [checkboxValue,setCheckboxValue] = useState(false)
    const { Option } = Select;
    console.log(cloneTodos)

    const getTodos = () => {
        getRequestData(TODOS_ENDPOINT)
            .then(res => setTodos(res.data))
            .catch(err => console.log(err))
    }
    const getCloneTodos = () => {
        getRequestData(TODOS_ENDPOINT)
            .then(res => setCloneTodos(res.data))
            .catch(err => console.log(err))
    }
   
    useEffect(() => {
        const items = todos.map((item) => ({...item, userName: `${users.find((user) => user.id === item.userId)?.name}`}))
        setTodos(items);
        setCloneTodos(items);
      }, [users.length]);

    useEffect(() => {
        getTodos()
        getCloneTodos()
        
    },[])

   
   const onSearch = () => {
    const renderSerchItems = cloneTodos.filter(todo => {
        if(selectValue) {
            return (
                (todo.title.includes(titleInputValue.toLowerCase()) && todo.completed) &&
                (todo.userName.toLowerCase().includes(nameInputValue.toLowerCase()) && todo.completed)
            )
        } else if(!selectValue) {
            return(
                (todo.title.includes(titleInputValue.toLowerCase()) && !todo.completed) &&
                (todo.userName.toLowerCase().includes(nameInputValue.toLowerCase()) && !todo.completed)
            )
        }
    }
    ); 
    
      setTodos(renderSerchItems);
   }
    function handleChange(value) {
        setSelectValue(value === 'completed' ? true : false)
      }
   
    
      function onChange(e) {
        setCheckboxValue(e.target.checked)
        updateRequestData(`${TODOS_ENDPOINT}/${e.target.id}`, {
            completed: !checkboxValue
        })
            .then(res => cloneTodos.map(item => {
                if(item.id === res.data.id) {
                    item.completed = res.data.completed
                        return item
                    }
                }) 
            )
            .catch(err => console.log(err))
      }

    return(
        <LayoutComponent>
            <Space>
                <Input type='text' onChange={(e) => setNameInputValue(e.target.value)} value={nameInputValue} placeholder="User Name" />
                <Input type='text' onChange={(e) => setTitleInputValue(e.target.value)} value={titleInputValue} placeholder="Title" />
                <Select defaultValue="status" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="completed">Completed</Option>
                    <Option value="inProcess">In procces</Option>
                </Select>
                <Button onClick={onSearch} shape="circle" icon={<SearchOutlined />} />
            </Space>
            <div className="todos-field">
                <Row gutter={16}>
                {todos.map(item => {
                    const {userId,id,title,completed} = item;
                    return(
                        <Col key={id}  span={6}>
                            <Card title={users.map(item => {
                                const {name, email, phone, address} = item;
                                const {street, suite, city} = address;
                                const content = (
                                    <div>
                                        <p>Name:{name}</p>
                                        <p>Email:{email}</p>
                                        <p>Phone:{phone}</p>
                                        <p>Street:{street}</p>
                                        <p>Suite:{suite}</p>
                                        <p>City:{city}</p>
                                    </div>
                                ); 

                                if(userId === item.id) {
                                    return(
                                        <Popover key={id} content={content} title='User Info'>
                                            {name}
                                        </Popover>
                                    )
                                }
                            })}>
                                <p>{title}</p>
                                <Checkbox id={id} onChange={onChange} defaultChecked={completed}></Checkbox>
                            </Card>
                        </Col>
                    )
                })}
                </Row>
            </div>
        </LayoutComponent>
    )
}


export default Todos;