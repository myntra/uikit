import React from 'react'
import { Icon, Grid, Layout, Text } from '@myntra/uikit'
import * as ICONS from '@myntra/uikit-pro-icons'

export default function IconPreview() {
  return (
    <Grid multiline>
      {Object.entries(ICONS).map(([iconName, iconComponent]) => (
        <Grid.Column size="one-fifth" key={iconName}>
          <Layout alignment="middle">
            <Icon fontSize="medium" name={iconComponent} />
            <Text.p emphasis="disabled" style={{ textAlign: 'center' }}>
              {iconName}
            </Text.p>
          </Layout>
        </Grid.Column>
      ))}
    </Grid>
  )
}
