import React from 'react'
import MuiDialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle'
import Typography from './Typography'

interface Props extends DialogTitleProps {
  children: React.ReactNode
}
export default function DialogTitle({ children }: Props) {
  return (
    <MuiDialogTitle disableTypography>
      <Typography variant="h5">{children}</Typography>
    </MuiDialogTitle>
  )
}

DialogTitle.displayName = 'DialogTitle'
