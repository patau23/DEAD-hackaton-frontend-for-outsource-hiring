import {
  Grid,
  makeStyles,
  Container,
  Button,
  TextField,
  //   FormControl,
  //   MenuItem,
  //   Select,
  //   Input,
  //   Chip,
  //   useTheme,
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
  gridFilter: {
    marginBottom: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  pagination: {
    alignItems: "center",
    justify: "center",
  },
}));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

function Home() {
  const classes = useStyles();
  const auth = useAuth();

  const [query, setQuery] = useState("");

  const [devs, setDevs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);

  const [level, setLevel] = useState();
  const [seniority, setSeniority] = useState();
  const [database_ids, setDatabase_ids] = useState();
  const [skill_ids, setSkill_ids] = useState();
  const [technology_ids, setTechnology_ids] = useState();

  //   const [techs, setTechs] = useState([]);
  //   const [dbs, setDbs] = useState([]);
  //   const [skills, setSkills] = useState([]);
  //   const [levels, setLevels] = useState([]);

  //   useEffect(() => {
  //     axios.get(BASE_URL + `/technology`).then(({ data }) => {
  //       setTechs(data);
  //     });
  //     axios.get(BASE_URL + `/database`).then(({ data }) => {
  //       setDbs(data);
  //     });
  //     axios.get(BASE_URL + `/skill`).then(({ data }) => {
  //       setSkills(data);
  //       console.log(data);
  //     });
  //     axios.get(BASE_URL + `/level`).then(({ data }) => {
  //       setLevels(data);
  //       console.log(data);
  //     });
  //   }, []);

  useEffect(() => {
    //   ДЕЛАТЬ ЗАПРОС НА ВСЕ КАРТОЧКИ РАБОТНИКОВ
    axios
      .get(BASE_URL + `/specialist?${query}&page=${page}`)
      .then(({ data }) => {
        setDevs(data.items);
        setPageQty(data._meta.pageCount);
        console.log(data);
        if (data.nbPages < page) setPage(1);
      });
  }, [query, page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(``);
  };

  //   const handleChange = (event) => {
  //     setTechnology_ids(event.target.value);
  //   };

  return (
    <Container className={classes.root}>
      {!auth.user ? (
        <Container>
          <OrderButton className={classes.button} />
          <form onSubmit={handleSubmit}>
            <Grid className="gridFilter" container spacing={1}>
              <Grid item xs={2}>
                <TextField
                  label="find by seniority"
                  type="number"
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="find by level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="find by DB"
                  value={database_ids}
                  onChange={(e) => setDatabase_ids(e.target.value)}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="find by Technology"
                  value={technology_ids}
                  onChange={(e) => setTechnology_ids(e.target.value)}
                />
                {/* <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={technology_ids}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {techs.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="find by Skill"
                  value={skill_ids}
                  onChange={(e) => setSkill_ids(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <Button>Submit</Button>
              </Grid>
            </Grid>
          </form>

          {!!pageQty && (
            <div className={classes.pagination}>
              <Pagination
                count={pageQty}
                page={page}
                onChange={(e, numb) => setPage(numb)}
              />
            </div>
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
