import React from 'react'
import {
  makeStyles,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useAuth from '../../../hooks/useAuth'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#ECECEC',
    fontStyle: 'bold',
    fontSize: 10
  },
  dominateSpan: {
    color: 'black',
    fontSize: 20
  },
  posSpan: {
    color: 'grey',
    fontSize: 14
  }
})

export default function CustomCard ({ dev }) {
  const classes = useStyles()
  const auth = useAuth()

  return (
    <Grid item xs={3}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant='h6' className={classes.dominateSpan}>
            <span style={{ color: 'darkblue' }}>
              {dev.level.name}-Разработчик
            </span>
          </Typography>
          <Typography variant='h5' component='h2'>
            <span>{dev.last_name + ' ' + dev.first_name}</span>
          </Typography>
          <Typography>
            <span className={classes.posSpan}>
              Стаж работы (г.) {dev.seniority}
            </span>
          </Typography>
          <Typography>
            <span className={classes.posSpan}>
              Желаемая должность: {dev.career_objective}
            </span>
          </Typography>
          <Typography variant='body2' component='div'>
            <span style={{ color: 'darkred' }}> Используемые технологии: </span>
            {dev.databases.map((db, i) => (
              <Chip key={i} color='primary' label={db.name} />
            ))}
            {dev.technologies.map((t, i) => (
              <Chip key={i} color='secondary' label={t.name} />
            ))}
            {dev.skills.map((s, i) => (
              <Chip key={i} color='default' label={s.name} />
            ))}
          </Typography>
        </CardContent>
        <CardActions>
          <FormControlLabel
            control={<Checkbox name='checkedA' color='primary' />}
            label='Добавить разработчика в корзину'
          />
        </CardActions>
      </Card>
    </Grid>
  )
}
