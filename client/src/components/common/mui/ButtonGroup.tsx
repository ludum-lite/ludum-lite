import React from 'react'
import styled from 'styled-components/macro'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'

const Row = styled.div`
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`
const Column = styled.div`
  & > *:not(:first-child) {
    margin-top: 8px;
  }
`

type Props = {
  direction?: 'row' | 'column'
}

export const ButtonGroup: React.FC<Props> = ({
  children,
  direction = 'row',
}) => {
  const component = React.useMemo(() => {
    if (direction === 'row') return Row
    else if (direction === 'column') return Column
  }, [direction])

  return (
    <Box display="flex" flexDirection={direction} component={component}>
      {children}
    </Box>
  )
}

export default ButtonGroup
