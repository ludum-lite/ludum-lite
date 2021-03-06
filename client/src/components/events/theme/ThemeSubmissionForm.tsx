import React from 'react'
import { gql } from '@apollo/client'
import styled from 'styled-components/macro'
import {
  ThemeSubmissionForm_EventFragment,
  useDeleteEventIdeaMutation,
  EventIdea,
  useAddEventIdeaMutation,
} from '__generated__/client-types'
import Input from 'components/common/mui/Input'
import Button from 'components/common/mui/Button'
import Typography from 'components/common/mui/Typography'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import CloseIcon from '@material-ui/icons/Close'
import { useForm } from 'react-hook-form'
import { FormHelperText } from '@material-ui/core'

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const Suggestions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }
`

const Suggestion = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) => theme.themeColors.palette.primary.main};
`

const SuggestionText = styled(Typography)`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  padding-right: ${({ theme }) => theme.spacing(1)}px;
`

interface IdeaFormProps {
  hasSuggestions: boolean
}

const IdeaForm = styled.form<IdeaFormProps>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme, hasSuggestions }) =>
    hasSuggestions && theme.spacing(2)}px;
`

const InputRow = styled.div`
  display: flex;
`

const SubmitButton = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`

const NameError = styled(FormHelperText)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

type FormInputs = {
  name: string
}

interface Props {
  event: ThemeSubmissionForm_EventFragment
}
export default function ThemeSubmissionForm({ event }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    errors,
    setError,
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
    },
  })

  const [deleteEventIdea] = useDeleteEventIdeaMutation()
  const [addEventIdea] = useAddEventIdeaMutation({
    onCompleted() {
      clearErrors()
      reset()
    },
  })

  const onSave = React.useMemo(() => {
    return handleSubmit(async (data) => {
      if (
        event.myEventIdeas &&
        event.myEventIdeas.some(
          (eventIdea) =>
            eventIdea.name.toLowerCase() === data.name.toLowerCase()
        )
      ) {
        setError('name', {
          type: 'manual',
          message: 'Suggestion already submitted',
        })

        return
      }

      addEventIdea({
        variables: {
          input: {
            eventId: event.id,
            name: data.name,
          },
        },
        update(cache, { data }) {
          if (data?.addEventIdea.__typename === 'AddEventIdeaSuccess') {
            const eventIdea = data.addEventIdea.eventIdea

            cache.modify({
              id: `Event:${event.id}`,
              fields: {
                myEventIdeas(cachedEventIdeasRef) {
                  return [...cachedEventIdeasRef, eventIdea]
                },
              },
            })
          }
        },
      })
    })
  }, [handleSubmit, event.myEventIdeas, event.id, addEventIdea, setError])

  const suggestions = React.useMemo(() => {
    if (event.myEventIdeas && event.myEventIdeas.length > 0) {
      return event.myEventIdeas.map((eventIdea) => (
        <Suggestion key={eventIdea.id}>
          <SuggestionText textColor="white">{eventIdea.name}</SuggestionText>
          <IconButton
            variant="text"
            color="white"
            onClick={() => {
              deleteEventIdea({
                variables: {
                  input: {
                    eventId: event.id,
                    eventIdeaId: eventIdea.id,
                  },
                },
                update(cache, { data }) {
                  if (
                    data?.deleteEventIdea.__typename ===
                    'DeleteEventIdeaSuccess'
                  ) {
                    cache.modify({
                      id: `Event:${data.deleteEventIdea.eventId}`,
                      fields: {
                        myEventIdeas(cachedEventIdeasRef, { readField }) {
                          return cachedEventIdeasRef.filter(
                            (cachedEventIdeaRef: EventIdea) => {
                              return (
                                readField('id', cachedEventIdeaRef) !==
                                eventIdea.id
                              )
                            }
                          )
                        },
                      },
                    })
                  }
                },
              })
            }}
          >
            <Icon icon={CloseIcon} />
          </IconButton>
        </Suggestion>
      ))
    }
  }, [deleteEventIdea, event.myEventIdeas, event.id])

  const numEventIdeas = event.myEventIdeas?.length || 0

  return (
    <Root>
      {suggestions && <Suggestions>{suggestions}</Suggestions>}
      {numEventIdeas < event.eventIdeaLimit && (
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
            <SubmitButton variant="contained" color="primary" type="submit">
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
      )}
    </Root>
  )
}

ThemeSubmissionForm.displayName = 'ThemeSubmissionForm'

gql`
  mutation AddEventIdea($input: AddEventIdeaInput!) {
    addEventIdea(input: $input) {
      ... on AddEventIdeaSuccess {
        eventIdea {
          id
          name
        }
      }
    }
  }

  mutation EditEventIdea($input: EditEventIdeaInput!) {
    editEventIdea(input: $input) {
      ... on EditEventIdeaSuccess {
        eventIdea {
          id
          name
        }
      }
    }
  }

  mutation DeleteEventIdea($input: DeleteEventIdeaInput!) {
    deleteEventIdea(input: $input) {
      ... on DeleteEventIdeaSuccess {
        eventId
      }
    }
  }

  fragment ThemeSubmissionForm_event on Event {
    id
    eventPhase
    myEventIdeas {
      id
      name
    }
    eventIdeaLimit
  }
`
