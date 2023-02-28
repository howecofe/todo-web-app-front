import './App.css';
import Todo from "./Todo";
import React, { useEffect, useState } from "react";
import { AppBar, Container, List, Paper, Toolbar, Typography, Grid, Button } from "@mui/material";
import AddTodo from './AddTodo';
import { call, signout } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(콜백 함수, 디펜던시 배열) <- 인자 2개
  // : 첫 렌더링 발생 시 콜백 함수 호출, 그 이후에는 배열 안의 오브젝트 값이 변할 때마다 콜백 함수 호출.
  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  },[]);
  
  const editItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };

  const addItem = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data));
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

  // navigationBar 추가
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할 일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  /* 로딩중이 아닐 때 렌더링할 부분 */
  let todoListPage = (
    <div>
      {navigationBar} {/* 네비게이션 바 렌더링 */}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  /* 로딩중일때 렌더링할 부분 */
  let loadingPage = <h1> 로딩 중.. </h1>;
  let content = loadingPage;

  if (!loading) {
    /* 로딩중이 아니면 todoListPage를 선택 */
    content = todoListPage;
  }

  /* 선택한 content 렌더링 */
  return <div className="App">{content}</div>;
}

export default App;