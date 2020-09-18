import React from 'react'
import { gql } from '@apollo/client'
import styled from 'styled-components/macro'
import { ThemeSlaughterForm_EventFragment } from '__generated__/client-types'
import { sample } from 'lodash'
import Input from 'components/common/mui/Input'
import Button from 'components/common/mui/Button'
import ButtonGroup from 'components/common/mui/ButtonGroup'
import Typography from 'components/common/mui/Typography'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import CloseIcon from '@material-ui/icons/Close'
import { useForm } from 'react-hook-form'
import { FormHelperText } from '@material-ui/core'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

const ThemeTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const Suggestion = styled.div`
  display: flex;
  justify-content: center;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: white;
  align-self: stretch;
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(3)}px`};
  box-shadow: ${({ theme }) => theme.themeColors.cardBoxShadow_bottomHeavy};
`

const SuggestionActions = styled(ButtonGroup)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

// type FormInputs = {
//   name: string
// }

interface Props {
  event: ThemeSlaughterForm_EventFragment
}
export default function ThemeSlaughterForm({ event }: Props) {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   errors,
  //   setError,
  //   clearErrors,
  // } = useForm<FormInputs>({
  //   defaultValues: {
  //     name: '',
  //   },
  // })

  // const onSave = React.useMemo(() => {
  //   return handleSubmit(async (data) => {
  //     if (
  //       event.myEventIdeas &&
  //       event.myEventIdeas.some(
  //         (eventIdea) =>
  //           eventIdea.name.toLowerCase() === data.name.toLowerCase()
  //       )
  //     ) {
  //       setError('name', {
  //         type: 'manual',
  //         message: 'Suggestion already submitted',
  //       })

  //       return
  //     }

  //     addEventIdea({
  //       variables: {
  //         input: {
  //           eventId: event.id,
  //           name: data.name,
  //         },
  //       },
  //       update(cache, { data }) {
  //         if (data?.addEventIdea.__typename === 'AddEventIdeaSuccess') {
  //           const eventIdea = data.addEventIdea.eventIdea

  //           cache.modify({
  //             id: `Event:${event.id}`,
  //             fields: {
  //               myEventIdeas(cachedEventIdeasRef) {
  //                 return [...cachedEventIdeasRef, eventIdea]
  //               },
  //             },
  //           })
  //         }
  //       },
  //     })
  //   })
  // }, [handleSubmit, event.myEventIdeas, event.id, addEventIdea, setError])

  const remainingEventIdeas = React.useMemo(() => {
    return (
      event.eventIdeas?.filter((eventIdea) => eventIdea.myVote === null) || []
    )
  }, [event.eventIdeas])

  const currentEventIdea = React.useMemo(() => {
    return sample(remainingEventIdeas)
  }, [remainingEventIdeas])

  // const suggestions = React.useMemo(() => {
  //   if (remainingEventIdeas && remainingEventIdeas.length > 0) {
  //     return remainingEventIdeas.map((eventIdea) => (
  //       <Suggestion key={eventIdea.id}>
  //         <SuggestionText textColor="white">{eventIdea.name}</SuggestionText>
  //       </Suggestion>
  //     ))
  //   }
  // }, [remainingEventIdeas])

  return (
    <Root>
      <ThemeTitle variant="h5">Would this be a good Theme?</ThemeTitle>
      {currentEventIdea && (
        <Suggestion>
          <Typography variant="h4" bold>
            {currentEventIdea.name}
          </Typography>
        </Suggestion>
      )}
      <SuggestionActions>
        <Button size="large" variant="contained" customColor="success">
          <u>Y</u>es
        </Button>
        <Button size="large" variant="contained" customColor="error">
          <u>N</u>o
        </Button>
      </SuggestionActions>
      {/* {numEventIdeas < event.eventIdeaLimit && (
        <IdeaForm hasSuggestions={Boolean(suggestions)} onSubmit={onSave}>
          <InputRow>
            <Input
              placeholder="Suggest a theme..."
              inputProps={{
                maxLength: 64,
              }}
              fullWidth
              inputRef={register({ required: true })}
              name="name"
              autoComplete="randomtstring"
              autoCorrect="randomstring"
            />
            <SubmitButton
              background="white"
              variant="contained"
              color="secondary"
              type="submit"
            >
              Submit
            </SubmitButton>
          </InputRow>
          {errors.name?.type === 'required' && (
            <NameError error>An idea is required</NameError>
          )}
          {errors.name?.type === 'manual' && (
            <NameError error>{errors.name?.message}</NameError>
          )}
        </IdeaForm>
      )} */}
    </Root>
  )
}

gql`
  # mutation AddEventIdea($input: AddEventIdeaInput!) {
  #   addEventIdea(input: $input) {
  #     ... on AddEventIdeaSuccess {
  #       eventIdea {
  #         id
  #         name
  #       }
  #     }
  #   }
  # }

  # mutation EditEventIdea($input: EditEventIdeaInput!) {
  #   editEventIdea(input: $input) {
  #     ... on EditEventIdeaSuccess {
  #       eventIdea {
  #         id
  #         name
  #       }
  #     }
  #   }
  # }

  # mutation DeleteEventIdea($input: DeleteEventIdeaInput!) {
  #   deleteEventIdea(input: $input) {
  #     ... on DeleteEventIdeaSuccess {
  #       eventId
  #     }
  #   }
  # }

  fragment ThemeSlaughterForm_event on Event {
    id
    eventPhase
    eventIdeas {
      id
      name
      myVote
    }
  }
`
