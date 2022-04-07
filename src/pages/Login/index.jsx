import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Grid,
  makeStyles,
  Container,
  Button,
  Typography,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  buttonSpacing: {
    marginLeft: theme.spacing(1),
  },
}));

const CONFIG = {
  cache: "no-cache",
  mode: "no-cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default function LoginScreen() {
  const auth = useAuth();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("adminadmin");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [error, setError] = useState();

  const singIn = async () => {
    try {
      setIsLoading(true);
      const { data: loginData } = await api.auth.login({
        username: username,
        password: password,
      });
      auth.setToken(loginData.token);
      auth.setUser(loginData.user);
    } catch (e) {
      if (e.response.status === 422) {
        Object.keys(e.response.data.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: e.response.data.errors[key],
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <p>Введите свои данные для входа</p>
      <TextField onChange={(login) => setUsername(login)} />
      <br />
      <TextField onChange={(password) => setPassword(password)} />
      {error ? <TextField>{error}</TextField> : <></>}
      <Button
        disabled={isLoading}
        onClick={() => {
          singIn();
        }}
      >
        login
      </Button>
    </form>
  );
}
