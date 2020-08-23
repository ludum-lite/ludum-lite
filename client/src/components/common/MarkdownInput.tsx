import React from 'react'
import styled, { css } from 'styled-components/macro'
import MultilineTextField, {
  MutlilineTextFieldProps,
} from './MultilineTextField'
import { useDropzone } from 'react-dropzone'
import { useMe } from 'hooks/useMe'
import { gql } from '@apollo/client'
import { useUploadImageMutation } from '__generated__/client-types'
import Typography from './mui/Typography'
import insertTextAtCursor from 'insert-text-at-cursor'

const Root = styled.div`
  position: relative;
  /* margin-bottom: ${({ theme }) => theme.spacing(3)}px; */
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

const StyledMultilineTextField = styled(MultilineTextField)`
  .MuiInputBase-root {
    padding-bottom: ${({ theme }) => theme.spacing(5)}px;
  }
`

const UploadImageLinkContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ theme }) => theme.spacing(4)}px;
  border-top: 1px dashed ${({ theme }) => theme.themeColors.input.dividerColor};
  display: flex;
`

const UploadImageInput = styled.input`
  display: none;
`

const UploadImageLabel = styled.label`
  cursor: pointer;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  padding: 0 12px;
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
  const inputRef = React.useRef<HTMLTextAreaElement>()

  const onDrop = React.useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        console.log('error accepting files')
      } else if (!userId) {
        console.error('no logged user id')
      } else {
        try {
          const { data } = await uploadImageMutation({
            variables: {
              file: acceptedFiles[0],
            },
          })
          console.log(data)
          if (data?.uploadImage.__typename === 'UploadImageSuccess') {
            console.log(inputRef)
            if (inputRef.current) {
              insertTextAtCursor(
                inputRef.current,
                `![${data.uploadImage.name}](///raw/${data.uploadImage.path})`
              )
            }
          }
        } catch (e) {
          console.error(e)
        }
      }
    },
    [uploadImageMutation, userId]
  )

  const onAddImage = React.useCallback(
    (event) => {
      onDrop(event.currentTarget.files)
    },
    [onDrop]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  })

  return (
    <Root {...getRootProps()} tabIndex={undefined} className={className}>
      <input {...getInputProps()} />
      <DropOverlay active={isDragActive} />
      <StyledMultilineTextField inputRef={inputRef} {...others} />
      <UploadImageLinkContainer>
        <UploadImageLabel>
          <UploadImageInput
            type="file"
            accept=".gif,.jpeg,.jpg,.png"
            onChange={onAddImage}
          />
          <Typography variant="caption">
            Attach files by dragging and dropping or clicking here.
          </Typography>
        </UploadImageLabel>
      </UploadImageLinkContainer>
    </Root>
  )
}

gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      ... on UploadImageSuccess {
        path
        name
      }
      ... on UploadImageFailure {
        message
      }
    }
  }
`
