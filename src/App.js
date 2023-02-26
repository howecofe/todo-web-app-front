import './App.css';
import Todo from "./Todo";
import React, { useEffect, useState } from "react";
import { Container, List, Paper } from "@mui/material";
import AddTodo from './AddTodo';
import { call } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);

  // useEffect(콜백 함수, 디펜던시 배열) <- 인자 2개
  // : 첫 렌더링 발생 시 콜백 함수 호출, 그 이후에는 배열 안의 오브젝트 값이 변할 때마다 콜백 함수 호출.
  useEffect(() => {
    call("/todo", "get", null)
    .then((response) => setItems(response.data));
  },[]);
  
  const editItem = (item) => {
    call("/todo", "PUT", item)
    .then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item)
    .then((response) => setItems(response.data));
  };

  const addItem = (item) => {
    call("/todo", "POST", item)
    .then((response) => setItems(response.data));
  };

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} editItem={editItem} deleteItem={deleteItem} />
        ))}
      </List>
    </Paper>
  );

  return <div className="App">
    <Container maxWidth="md">
      <AddTodo addItem={addItem} />
      <div className="TodoList">{todoItems}</div>
    </Container>
  </div>;
}

export default App;