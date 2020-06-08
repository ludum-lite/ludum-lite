import React from 'react'
import { addDecorator } from '@storybook/react'
import StorybookProviders from '../src/providers/StorybookProviders'
import Window from './Window'

addDecorator((storyFn) => (
  <StorybookProviders>
    <Window>{storyFn()}</Window>
  </StorybookProviders>
))
