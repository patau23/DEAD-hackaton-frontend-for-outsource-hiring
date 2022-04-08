import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/Routes'
import useAuth from './hooks/useAuth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  rightToolbar: {
    flexGrow: 1
  },
  title: {
    marginRight: theme.spacing(2)
  }
}))

function App () {
  const classes = useStyles()
  const auth = useAuth()
  const navigate = useNavigate()

  const onLogOut = () => {
    auth.logOut()
    navigate('/')
  }

  return (
    <div className={classes.root}>
      {/* Это Топ Менюшка */}
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Hackaton App
          </Typography>
          <div className={classes.rightToolbar}>
            <Button color='inherit' component={Link} to='/profile'>
              Home
            </Button>
            <Button color='inherit' component={Link} to='/'>
              Работники
            </Button>
          </div>
          {auth.isLoaded &&
            (auth.user ? (
              <>
                <Button color='inherit' component={Link} to='/registration'>
                  Зарегистрировать работника
                </Button>
                <Button color='inherit' onClick={onLogOut}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button color='inherit' component={Link} to='/login'>
                  Вход для администратора
                </Button>
              </>
            ))}
        </Toolbar>
      </AppBar>

      {/* Это то что будет показываться в зависимости от типа пользователя */}
      <AppRoutes />
    </div>
  )
}

export default App
