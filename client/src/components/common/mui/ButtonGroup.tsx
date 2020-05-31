import React from 'react'
import styled from 'styled-components/macro'
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

interface Props {
  direction?: 'row' | 'column'
  className?: string
}

export const ButtonGroup: React.FC<Props> = ({
  children,
  direction = 'row',
  className,
}) => {
  const component = React.useMemo(() => {
    if (direction === 'row') return Row
    else if (direction === 'column') return Column
  }, [direction])

  return (
    <Box
      className={className}
      display="flex"
      flexDirection={direction}
      component={component}
    >
      {children}
    </Box>
  )
}

export default ButtonGroup
