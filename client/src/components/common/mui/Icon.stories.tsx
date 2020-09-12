import React from 'react'
import styled from 'styled-components/macro'
import Icon from './Icon'
import { ICON_SCALING } from 'hooks/useTheme'
import * as Icons from '@material-ui/icons'
import { toPairs } from 'lodash'

export default {
  title: 'Icon',
  component: Icon,
}
const BasicRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Basic = () => {
  // const suffixes = ['Outlined', 'Rounded', 'Sharp', 'TwoTone']
  const icons = toPairs(Icons)
  // .filter(
  //   ([name]) => !suffixes.some((suffix) => name.includes(suffix))
  // )

  console.log(icons)

  const usedIcons = icons.filter(([name1]) =>
    ICON_SCALING.some(({ name: name2 }) => name1 === name2.replace('Icon', ''))
  )

  return (
    <BasicRoot>
      {usedIcons.map(([iconName, icon]) => (
        <Icon icon={icon} />
      ))}
    </BasicRoot>
  )
}
