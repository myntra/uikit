import { Grid } from '@myntra/uikit'

export default function MyComp(props) {
  return (
    <Grid>
      <Grid.Column {...props} />
      <Grid.Column {...props} />
      <Grid.Column {...props} />
    </Grid>
  )
}
