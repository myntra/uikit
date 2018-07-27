import { Grid, GridColumn } from '@myntra/uikit'

export default function MyComp(props) {
  return (
    <Grid>
      <GridColumn {...props} />
      <GridColumn {...props} />
      <Grid.Column {...props} />
    </Grid>
  )
}
