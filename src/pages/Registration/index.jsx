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
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  buttonSpacing: {
    marginLeft: theme.spacing(1),
  },
}));

const BASE_URL = "http://34.88.122.38";

function Registration() {
  const [techs, setTechs] = useState([]);
  const [dbs, setDbs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + `/technology`).then(({ data }) => {
      setTechs(data);
    });
    axios.get(BASE_URL + `/database`).then(({ data }) => {
      setDbs(data);
    });
    axios.get(BASE_URL + `/skill`).then(({ data }) => {
      setSkills(data);
      console.log(data);
    });
    axios.get(BASE_URL + `/level`).then(({ data }) => {
      setLevels(data);
      console.log(data);
    });
  }, []);

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await api.auth.registration(data);
      const { data: loginData } = await api.auth.login(data);
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
    <Container maxHeight="sm" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Create new account</Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* FIRSTNAME */}
          <Grid item xs={3}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.firstName?.message)}
                  fullWidth={true}
                  label="First name"
                  variant="filled"
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>

          {/* LASTNAME */}
          <Grid item xs={3}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.lastName?.message)}
                  fullWidth={true}
                  label="Last name"
                  variant="filled"
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>

          {/* LEVEL */}
          <Grid item xs={3}>
            <Controller
              name="level"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.email?.message)}
                  fullWidth={true}
                  type="email"
                  label="Email"
                  variant="filled"
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={3}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.password?.message)}
                  type="password"
                  fullWidth={true}
                  label="Password"
                  variant="filled"
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              Registrate
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Registration;
