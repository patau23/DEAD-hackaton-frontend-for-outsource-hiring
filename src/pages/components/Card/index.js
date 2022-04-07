import React from 'react'
import { makeStyles, Checkbox, Chip, FormControlLabel } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useAuth from '../../../hooks/useAuth'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#e5e5e5',
    fontStyle: 'bold'
  },
  title: {
    fontSize: 16
  },
  span: {
    color: 'black'
  }
})

export default function CustomCard () {
  const classes = useStyles()
  const auth = useAuth()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color='textSecondary'>
          Уровень
        </Typography>
        <Typography variant='h5' component='h2'>
          ФИО
        </Typography>
        <Typography color='textSecondary'>
          Стаж работы <span className={classes.span}>Стаж работы</span>
        </Typography>
        <Typography color='textSecondary' gutterBottom>
          Желаемая должность <span className={classes.span}>Должность</span>
        </Typography>
        <Typography variant='body2' component='p' gutterBottom>
          Бд, технологии, фреймворки, библиотеки, навыки
        </Typography>
        <Typography variant='body2' component='p'>
          {/* здесь выводить все языки фреймворки и тд */}
          <Chip label='Basic' color='primary' />
        </Typography>
      </CardContent>
      {!auth.user ? (
        <CardActions>
          <FormControlLabel
            control={<Checkbox name='checkedA' color='primary' />}
            label='Добавить разработчика в корзину'
          />
        </CardActions>
      ) : (
        <></>
      )}
    </Card>
  )
}
