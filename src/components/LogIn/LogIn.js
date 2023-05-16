import {React, useState} from "react";
import { Dialog, DialogTitle, Button, TextField, Grid, Avatar, Alert, AlertTitle, Checkbox} from "@mui/material";
import LockOut from "@mui/icons-material/LockOutlined";
import { FormControlLabel } from "@mui/material";


const textStyle = {
  marginBottom: 10,
}

export const LogIn = ({open, onClose, user, setUser}) => {


  const [errorMessages, setErrorMessages] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const login = (e) => {

    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    console.log(values);

    const loginRequest = async () => {
      await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          rememberMe: checked,}),
      })
        .then((res) => {
          res.status === 200 &&
            setUser({ isAuthenticated: true, userName: "", userRole: "" });
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"  &&
            typeof data.userRole !== "undefined"
          ) {
            setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole});
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            typeof data.userRole !== "undefined" &&
            setErrorMessages(data.error);
        }),
        (error) => {
          console.log(error);
        };
    };

    loginRequest();
  };

  const renderErrorMessage = () =>
  errorMessages.map((error, index) =>  (
    <Alert severity="error" key={index}>
      <AlertTitle>Ошибка!</AlertTitle>
      {error}
    </Alert>
  ));

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
              <Grid align="center" >
                <Avatar style={{backgroundColor: "green"}}>
                    <LockOut/>
                </Avatar>
                <h2 style={{margin: 0}}>Авторизация</h2>
              </Grid>
              {user.isAuthenticated ? (
                    <h4>Вход {user.userName} выполнен успешно</h4>
                ) : ( 
                <>
                <form onSubmit={login}>
                  <TextField name="email" style={textStyle} label="Email" placeholder="Введите email" fullWidth required variant="standard"/>
                  <TextField name="password" style={textStyle} label="Пароль" placeholder="Введите пароль" type="password" fullWidth required variant="standard"/>
                  <FormControlLabel 
                    control={
                    <Checkbox name="remember" checked={checked} onChange={handleChange}/>} label="Запомнить меня" />
                  {renderErrorMessage()}
                  <Button type="submit">Войти</Button>
                  <Button onClick={onClose}>Закрыть</Button>
                </form>
                </>
              )}
        </DialogTitle>
      </Dialog>
    );
};
