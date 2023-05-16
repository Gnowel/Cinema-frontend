import {React , useState} from "react";
import { Dialog, DialogTitle, Button, TextField, Grid, Avatar} from "@mui/material";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const textForm = {
  marginBottom: 10,
}

export const Register = (props) => {
    const { open, onClose, user, setUser} = props;

    const [errorMessages, setErrorMessages] = useState([]);

    const onSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const values = Object.fromEntries(formData.entries());

      console.log(values);

      const register = async () => {
        await fetch("/api/account/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((response) => {

            response.status === 200 &&
            setUser({isAuthenticated: true, userName: formData.get("email"), userRole: "user"});
            return response.json();

          })
          .then((data) => {
            if (typeof data !== 'undefined' && typeof data.userName !== 'undefined' && typeof data.userRole !== 'undefined') 
            {
                setUser({isAuthenticated: true, userName: data.userName, userRole: "user"});
                onClose();
            }

            typeof data !== 'undefined' &&
            typeof data.error !== 'undefined' &&
            setErrorMessages(data.error);
                
          },(error) =>{
            console.log(error);
          },);
      };

      register();
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
                      <AddCircleOutlineOutlined/>
                  </Avatar>
                  <h3 style={{margin: 0}}>Регистрация</h3>
                </Grid>
                {user.isAuthenticated ? (
                    <h4>Регистарция прошла успешно!</h4>
                ) : ( 
                <>
                  <form onSubmit={onSubmit}>
                    <TextField name="email" style={textForm} label="Email" placeholder="Введите email" fullWidth required variant="standard"/>
                    <TextField name="password" style={textForm} label="Пароль" placeholder="Введите пароль" type="password" fullWidth required variant="standard"/>
                    <TextField name="passwordConfirm" style={textForm} label="Повторите пароль" placeholder="Повторите пароль" type="password" fullWidth required variant="standard"/>
                    {renderErrorMessage()}
                    <Button type="submit">Зарегистрироваться</Button>
                    <Button onClick={onClose}>Закрыть</Button>
                  </form> 
                </>
                )}
          </DialogTitle>
        </Dialog>
      );
};
