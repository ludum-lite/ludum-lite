import React from 'react'
import { Tooltip } from '@material-ui/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import Button, { ButtonProps } from './mui/Button'

interface Props {
  text: string
}
export default function ClickToCopyButton({
  text,
  onMouseLeave,
  ...others
}: Props & ButtonProps) {
  const [hasCopied, setHasCopied] = React.useState<boolean>(false)

  return (
    <CopyToClipboard text={text} onCopy={() => setHasCopied(true)}>
      <Tooltip
        title={hasCopied ? 'Copied!' : 'Copy'}
        arrow
        placement="top"
        enterDelay={0}
      >
        <Button
          {...others}
          onMouseLeave={(e) => {
            setHasCopied(false)
            if (onMouseLeave) {
              onMouseLeave(e)
            }
          }}
        />
      </Tooltip>
    </CopyToClipboard>
  )
}
