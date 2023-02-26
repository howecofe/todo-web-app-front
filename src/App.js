import './App.css';
import Todo from "./Todo";
import React, { useEffect, useState } from "react";
import { Container, List, Paper } from "@mui/material"
import AddTodo from './AddTodo';

function App() {
  const [items, setItems] = useState([]);

  // useEffect(콜백 함수, 디펜던시 배열) <- 인자 2개
  // : 첫 렌더링 발생 시 콜백 함수 호출, 그 이후에는 배열 안의 오브젝트 값이 변할 때마다 콜백 함수 호출.
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:8080/todo", requestOptions)
    .then((response) => response.json())
    .then(
      (response) => {
        setItems(response.data);
      },
      (error) => {}
      );
    },[]);
  
  const editItem = () => {
    setItems([...items]);
  };

  const deleteItem = (item) => {
    // 삭제할 아이템을 찾는다.
    const newItems = items.filter(e => e.id != item.id);
    // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다.
    setItems([...newItems]);
  };

  const addItem = (item) => {
    item.id = "ID-" + items.length; // key를 위한 id
    item.done = false; // done 초기화
    // 업데이트는 반드시 setItems로 하고 새 배열을 만들어야 한다.
    setItems([...items, item]);
    console.log("items : ", items);
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