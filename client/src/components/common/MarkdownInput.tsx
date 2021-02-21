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
import { useSnackbar } from 'notistack'
// @ts-ignore
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'
import '@webscopeio/react-textarea-autocomplete/style.css'
import emoji from '@jukben/emoji-search'
import IconButton from './mui/IconButton'
import Icon from './mui/Icon'
import { SentimentSatisfiedAlt } from '@material-ui/icons'
import { BaseEmoji, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import { Menu } from '@material-ui/core'
import { useTheme } from 'hooks/useTheme'

// Workaround to set react input programatically
// https://github.com/facebook/react/issues/10135#issuecomment-314441175
// @ts-ignore
function setNativeValue(element, value) {
  // @ts-ignore
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set
  const prototype = Object.getPrototypeOf(element)
  // @ts-ignore
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    'value'
  ).set

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    // @ts-ignore
    prototypeValueSetter.call(element, value)
  } else {
    // @ts-ignore
    valueSetter.call(element, value)
  }
}

const Root = styled.div`
  position: relative;
  /* margin-bottom: ${({ theme }) => theme.spacing(3)}px; */

  .rta__autocomplete {
    margin-top: 33px;
  }
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
    padding-right: ${({ theme }) => theme.spacing(5)}px;
  }
`

const UploadImageLinkContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ theme }) => theme.spacing(4)}px;
  border-top: ${({ theme }) =>
    `${theme.themeColors.markdownInput.inputDividerWidth}px dashed ${theme.themeColors.input.dividerColor}`};
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

const ItemIconContainer = styled.div`
  display: inline-flex;
  min-width: 40px;
`

const ItemIcon = styled.div`
  display: flex;
  width: 32px;
  justify-content: center;
`

const Item = ({ entity: { name, char } }: any) => (
  <div>
    <ItemIconContainer>
      <ItemIcon>{char}</ItemIcon>
    </ItemIconContainer>
    {name}
  </div>
)

const EmojiSelectContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`

const EmojiSelectMenu = styled(Menu)`
  .MuiList-padding {
    padding: 0px;
  }
`

const EmojiIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.themeColors.input.emojiTextColor};
`

const LoadingComponent = () => <div>Loading</div>

interface Props {}
type MarkdownInputProps = Props & MutlilineTextFieldProps
export default function MarkdownInput({
  className,
  ...others
}: MarkdownInputProps) {
  const { themeMode } = useTheme()
  const { me } = useMe()
  const [uploadImageMutation] = useUploadImageMutation()
  const userId = me?.id
  const inputRef = React.useRef<HTMLTextAreaElement>()
  const { enqueueSnackbar } = useSnackbar()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'emoji-picker',
  })

  const onDrop = React.useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        enqueueSnackbar('Please select one file.', {
          variant: 'error',
        })
      } else if (!userId) {
        enqueueSnackbar('Please login.', {
          variant: 'error',
        })
      } else {
        try {
          const { data } = await uploadImageMutation({
            variables: {
              file: acceptedFiles[0],
            },
          })
          if (data?.uploadImage.__typename === 'UploadImageSuccess') {
            if (inputRef.current) {
              insertTextAtCursor(
                inputRef.current,
                `![${data.uploadImage.name}](///raw/${data.uploadImage.path})`
              )
            }
          } else {
            enqueueSnackbar('Error occured when processing image.', {
              variant: 'error',
            })
          }
        } catch (e) {
          console.error(e)
        }
      }
    },
    [enqueueSnackbar, uploadImageMutation, userId]
  )

  const onAddImage = React.useCallback(
    (event) => {
      onDrop(event.currentTarget.files)
    },
    [onDrop]
  )

  const onSelectEmoji = React.useCallback(
    (data: BaseEmoji) => {
      if (inputRef.current) {
        let textToInsert = data.native
        let cursorPosition = inputRef.current.selectionStart
        let textBeforeCursorPosition = inputRef.current.value.substring(
          0,
          cursorPosition
        )
        let textAfterCursorPosition = inputRef.current.value.substring(
          cursorPosition,
          inputRef.current.value.length
        )

        setNativeValue(
          inputRef.current,
          textBeforeCursorPosition + textToInsert + textAfterCursorPosition
        )
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))

        popupState.close()
        setTimeout(() => {
          inputRef.current?.focus()
          inputRef.current?.setSelectionRange(
            cursorPosition + textToInsert.length,
            cursorPosition + textToInsert.length
          )
        }, 0)
      }
    },
    [popupState]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  })

  const setInputRef = React.useCallback((ref: any) => {
    if (!inputRef.current) {
      inputRef.current = ref
    }
  }, [])

  const trigger = React.useMemo(
    () => ({
      ':': {
        dataProvider: (token: any) => {
          return emoji(token)
            .slice(0, 50)
            .map(({ name, char }: any) => ({ name, char }))
        },
        component: Item,
        output: (item: any, trigger: any) => item.char,
      },
    }),
    []
  )

  return (
    <Root {...getRootProps()} tabIndex={undefined} className={className}>
      <input {...getInputProps()} />
      <DropOverlay active={isDragActive} />
      {/* <StyledMultilineTextField ref={inputRef} {...others} /> */}
      <ReactTextareaAutocomplete
        key="textarea"
        loadingComponent={LoadingComponent}
        textAreaComponent={StyledMultilineTextField}
        innerRef={setInputRef}
        renderToBody
        {...others}
        trigger={trigger}
      />
      <EmojiSelectContainer>
        <EmojiIconButton {...bindTrigger(popupState)}>
          <Icon icon={SentimentSatisfiedAlt} />
        </EmojiIconButton>
        <EmojiSelectMenu {...bindMenu(popupState)}>
          <Picker
            native
            title=""
            emojiSize={20}
            onSelect={onSelectEmoji}
            theme={themeMode}
          />
        </EmojiSelectMenu>
      </EmojiSelectContainer>
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

MarkdownInput.displayName = 'MarkdownInput'
