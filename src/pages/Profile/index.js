import { makeStyles, Container, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

function Profile () {
  const classes = useStyles()

  return (
    <Container maxWidth='sm' className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h2'>Домашняя страница</Typography>
          <Typography variant='body1'>
              
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile
