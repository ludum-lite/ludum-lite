import React from 'react'
import styled, { css } from 'styled-components/macro'
import MultilineTextField, {
  MutlilineTextFieldProps,
} from './MultilineTextField'
import { useDropzone } from 'react-dropzone'
import { useMe } from 'hooks/useMe'
import { gql } from '@apollo/client'
import { useUploadImageMutation } from '__generated__/client-types'

const Root = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

interface DropOverlayProps {
  active?: boolean
}
const DropOverlay = styled.div<DropOverlayProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  pointer-events: none;

  ${({ active }) =>
    active &&
    css`
      border: 3px dashed
        ${({ theme }) => theme.themeColors.dropOverlay.borderColor};
      background: ${({ theme }) =>
        theme.themeColors.dropOverlay.backgroundColor};
    `}
`

interface Props {}
type MarkdownInputProps = Props & MutlilineTextFieldProps
export default function MarkdownInput({
  className,
  ...others
}: MarkdownInputProps) {
  const { me } = useMe()
  const [uploadImageMutation] = useUploadImageMutation()
  const userId = me?.id

  const onDrop = React.useCallback(
    async (acceptedFiles, file) => {
      console.log(acceptedFiles, file)
      if (acceptedFiles.length === 0) {
        console.log('error accepting files')
      } else if (!userId) {
        console.error('no logged user id')
      } else {
        try {
          const result = await uploadImageMutation({
            variables: {
              file: acceptedFiles[0],
            },
          })
        } catch (e) {
          console.error(e)
        }
      }
    },
    [uploadImageMutation, userId]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  })

  return (
    <Root {...getRootProps()} className={className}>
      <input {...getInputProps()} />
      <DropOverlay active={isDragActive} />
      <MultilineTextField {...others} />
    </Root>
  )
}

gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      ... on UploadImageSuccess {
        path
      }
      ... on UploadImageFailure {
        message
      }
    }
  }
`
