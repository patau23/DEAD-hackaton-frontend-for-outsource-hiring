import {
  Grid,
  makeStyles,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth/index";
import axios from "axios";
import DevsEnumeration from "../components/Devs";

/*  */
const BASE_URL = "http://34.88.122.38";

const OrderButton = () => (
  <Button variant="contained" color="primary">
    Заказать Разработчиков
  </Button>
);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    padding: theme.spacing(3),
  },
  button: {
    position: "sticky",
    top: 10,
  },
}));

function Home() {
  const classes = useStyles();
  const auth = useAuth();

  const [devs, setDevs] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);

  useEffect(() => {
    //   ДЕЛАТЬ ЗАПРОС НА ВСЕ КАРТОЧКИ РАБОТНИКОВ
    axios
      .get(BASE_URL + `/specialist?${query}&page=${page}`)
      .then(({ data }) => {
        setDevs(data.items);
        setPageQty(data.nbPages);
        if (data.nbPages < page) setPage(1);
      });
  }, [query, page]);

  return (
    <Container className={classes.root}>
      {!auth.user ? (
        <Container>
          <OrderButton className={classes.button} />
          <TextField
            fullWidth
            label="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {!!pageQty && (
            <Pagination
              count={pageQty}
              page={page}
              onChange={(e, numb) => setPage(numb)}
            />
          )}
          <Container>
            <Grid container spacing={3}>
              <DevsEnumeration devs={devs} />
            </Grid>
          </Container>
        </Container>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Home;
