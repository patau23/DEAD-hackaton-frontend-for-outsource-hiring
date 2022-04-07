import {
  Grid,
  makeStyles,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

import CustomCard from "../components/Card";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth/index";

/*  */

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function Home() {
  const classes = useStyles();
  const auth = useAuth();

  useEffect(() => {
    //   ДЕЛАТЬ ЗАПРОС НА ВСЕ КАРТОЧКИ РАБОТНИКОВ
  });

  return (
    <Container className={classes.root}>
      <Container maxWidth="sm" gutterBottom>
        <Typography variant="h3" gutterBottom>
          Название приложения
        </Typography>
        <Typography variant="body1" gutterBottom>
          Это демонстрационное приложение с логином, регистрацией разработчиков
          и взаимодействия между менеджерами и админом.
        </Typography>
        {!auth.user ? (
          <Container mx="auto">
            <Button variant="contained" color="primary">
              Заказать Разработчиков
            </Button>
          </Container>
        ) : (
          <></>
        )}
      </Container>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          {/* Здесь перечисляются все карты с помощью map (не забудь про key в item'ах) */}
          <CustomCard></CustomCard>
        </Grid>
        <Grid item xs={3}>
          {/* Здесь перечисляются все карты с помощью map (не забудь про key в item'ах) */}
          <CustomCard></CustomCard>
        </Grid>
        <Grid item xs={3}>
          {/* Здесь перечисляются все карты с помощью map (не забудь про key в item'ах) */}
          <CustomCard></CustomCard>
        </Grid>
        <Grid item xs={3}>
          {/* Здесь перечисляются все карты с помощью map (не забудь про key в item'ах) */}
          <CustomCard></CustomCard>
        </Grid>
        <Grid item xs={3}>
          {/* Здесь перечисляются все карты с помощью map (не забудь про key в item'ах) */}
          <CustomCard></CustomCard>
        </Grid>
        <Grid item xs={3}>
          {/* Здесь перечисляются все карты с помощью map (не забудь про key в item'ах) */}
          <CustomCard></CustomCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
