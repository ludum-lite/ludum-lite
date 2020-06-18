import React, { Fragment } from 'react'
import _ from 'lodash'
import styled, { css } from 'styled-components/macro'
import Countdown from './Countdown'
import moment from 'moment'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Popover,
} from '@material-ui/core'
import Button from 'components/common/mui/Button'
import Icon from 'components/common/mui/Icon'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import CheckCircle from '@material-ui/icons/CheckCircle'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import useLocalStorage from 'hooks/useLocalStorage'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import {
  EventPhaseToLabel,
  mapTimeline,
  getCurrentEvent,
  getEvent,
  findNextPhase,
  Event,
  EventPhase,
} from 'utils/timeline'
import { ignoreProps } from 'utils'

// const selectedTimeline = testTimeline

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const TitleButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  color: ${({ theme }) => theme.themeColors.countdown.titleColor};
`

const Title = styled(Typography)`
  font-weight: bold;
`

const Subtitle = styled(Typography)`
  color: ${({ theme }) => theme.themeColors.countdown.fadedTextColor};
`

const ExpandButton = styled(Button)`
  margin-top: 8px;
`

const EventList = styled(List)`
  color: white;
  overflow: auto;
`

const NextTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(1)}px;
  color: ${({ theme }) => theme.themeColors.countdown.titleColor};
  background: rgba(255, 255, 255, 0.54);
  border-radius: ${({ theme }) =>
    `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`};
`

const EventToggleButtons = styled.div`
  display: flex;
  margin-bottom: 8px;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`

interface EventListItemProps {
  isNext: boolean
}
// Having some typescript issues with normal wrapping, so using attrs here
const EventListItem = styled.div
  .attrs({ as: ListItem, disableGutters: true })
  .withConfig({
    shouldForwardProp: ignoreProps(['isNext']),
  })<EventListItemProps>`
  color: ${({ theme }) => theme.themeColors.countdown.titleColor};
  padding-left: ${({ theme }) => theme.spacing(2)}px;

  ${({ isNext }) =>
    isNext &&
    css`
      background: rgba(255, 255, 255, 0.36);
      border-radius: ${({ theme }) =>
        `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`};
    `}

  .MuiListItemText-secondary {
    color: ${({ theme }) => theme.themeColors.countdown.dateTextColor};
    font-size: 0.872rem;
  }
`

const CheckboxIcon = styled(ListItemIcon)`
  color: white;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  min-width: 0;
  position: relative;
`

interface Props {
  events: Event[]
  className?: string
}
export default function CountdownWidget({ events, className }: Props) {
  const [date] = React.useState(moment.utc())
  const [selectedEventNum, setSelectedEventNum] = React.useState(
    getCurrentEvent(events)?.eventNumber
  )
  const selectedEvent = selectedEventNum
    ? getEvent(events, selectedEventNum)
    : undefined
  const nextPhase = selectedEvent
    ? findNextPhase(selectedEvent.timeline, date)
    : undefined
  const isSelectedEventOver = !nextPhase
  const [countdownWidgetExpanded, setCountdownWidgetExpanded] = useLocalStorage(
    'countdownWidgetExpanded',
    false
  )
  const [preferredEventType, setPreferredEventType] = useLocalStorage<
    'compo' | 'jam'
  >('preferredEventType', 'compo')
  const forceShowJam =
    (nextPhase?.eventPhase === EventPhase.CompoEnd ||
      nextPhase?.eventPhase === EventPhase.CompoSubmissionHourEnd) &&
    preferredEventType === 'jam'

  const nextPhaseForCountdown = forceShowJam
    ? {
        eventPhase: EventPhase.JamEnd,
        date: selectedEvent?.timeline.JamEnd,
      }
    : nextPhase

  const handleChangeEvent = React.useCallback((eventNumber: number) => {
    setSelectedEventNum(eventNumber)
    setAnchorEl(null)
  }, [])

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const isEventSelectOpen = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = React.useCallback(() => {
    setAnchorEl(null)
  }, [])

  const body = React.useMemo(() => {
    if (selectedEvent) {
      if (countdownWidgetExpanded || isSelectedEventOver) {
        return (
          <Fragment>
            <EventList disablePadding dense>
              {mapTimeline(selectedEvent.timeline, (eventPhase, eventDate) => {
                const alreadyPassed = eventDate.isBefore(date)
                const isNext = eventPhase === nextPhase?.eventPhase

                return (
                  <Fragment key={eventPhase}>
                    {isNext && (
                      <NextTitle key="nextPhase">
                        <Typography variant="body1">Next Up</Typography>
                      </NextTitle>
                    )}
                    <EventListItem key={eventPhase} isNext={isNext}>
                      <CheckboxIcon>
                        <Icon
                          icon={
                            alreadyPassed
                              ? CheckCircle
                              : isNext
                              ? RadioButtonChecked
                              : RadioButtonUnchecked
                          }
                        />
                      </CheckboxIcon>
                      <ListItemText
                        primary={EventPhaseToLabel[eventPhase]}
                        secondary={eventDate
                          .clone()
                          .local()
                          .format('MMM D, YYYY @ ha')}
                      />
                    </EventListItem>
                  </Fragment>
                )
              })}
            </EventList>
            {!isSelectedEventOver && (
              <ExpandButton
                fullWidth
                onClick={() => {
                  setCountdownWidgetExpanded(false)
                }}
                endIcon={<Icon icon={ExpandLess} />}
                background="contextualNav"
              >
                <Subtitle variant="body1">Collapse</Subtitle>
              </ExpandButton>
            )}
          </Fragment>
        )
      } else if (nextPhaseForCountdown) {
        return (
          <Fragment>
            {nextPhaseForCountdown.date && (
              <Countdown targetDate={nextPhaseForCountdown.date} />
            )}
            <ExpandButton
              fullWidth
              onClick={() => {
                setCountdownWidgetExpanded(true)
              }}
              endIcon={<Icon icon={ExpandMore} />}
              background="contextualNav"
            >
              <Subtitle variant="body1">
                until {EventPhaseToLabel[nextPhaseForCountdown.eventPhase]}
              </Subtitle>
            </ExpandButton>
          </Fragment>
        )
      }
    }
  }, [
    countdownWidgetExpanded,
    setCountdownWidgetExpanded,
    selectedEvent,
    nextPhase,
    nextPhaseForCountdown,
    isSelectedEventOver,
    date,
  ])

  return (
    <Root className={className}>
      <TitleButton
        fullWidth
        endIcon={<Icon icon={ExpandMore} />}
        background="contextualNav"
        onClick={handleClick}
      >
        <Title variant="h6">Ludum Dare {selectedEvent?.eventNumber}</Title>
      </TitleButton>
      {(nextPhase?.eventPhase === EventPhase.CompoEnd ||
        nextPhase?.eventPhase === EventPhase.CompoSubmissionHourEnd) &&
        !countdownWidgetExpanded && (
          <EventToggleButtons>
            <Button
              background="contextualNav"
              variant={preferredEventType === 'compo' ? 'contained' : 'text'}
              color={preferredEventType === 'compo' ? 'secondary' : 'default'}
              fullWidth
              onClick={() => {
                setPreferredEventType('compo')
              }}
            >
              Compo
            </Button>
            <Button
              background="contextualNav"
              variant={preferredEventType === 'jam' ? 'contained' : 'text'}
              color={preferredEventType === 'jam' ? 'secondary' : 'default'}
              fullWidth
              onClick={() => {
                setPreferredEventType('jam')
              }}
            >
              Jam
            </Button>
          </EventToggleButtons>
        )}
      <Popover
        id="demo-controlled-open-select"
        open={isEventSelectOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          {events.map((event) => (
            <ListItem
              key={event.eventNumber}
              button
              onClick={() => {
                handleChangeEvent(event.eventNumber)
              }}
            >
              <ListItemText primary={`Ludum Dare ${event.eventNumber}`} />
            </ListItem>
          ))}
        </List>
      </Popover>
      {body}
    </Root>
  )
}
