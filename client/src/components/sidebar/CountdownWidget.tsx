import React, { Fragment } from 'react'
import styled, { css } from 'styled-components/macro'
import Countdown from './Countdown'
import moment from 'moment'
import {
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
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import CheckCircle from '@material-ui/icons/CheckCircle'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import useUserLocalStorage from 'hooks/useUserLocalStorage'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import {
  EventPhaseToLabel,
  mapTimeline,
  findNextPhase,
  Event,
  EventPhase,
} from 'utils/timeline'
import { ignoreProps } from 'utils'
import Typography from 'components/common/mui/Typography'
import WidgetContainer from 'components/widgets/WidgetContainer'

// const selectedTimeline = testTimeline

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
`

const TitleButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  white-space: nowrap;
  padding: 6px 6px;
`

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.themeColors.backgrounds.level3};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(1)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  text-align: center;
`

const Subtitle = styled(Typography)``

const StyledCountdown = styled(Countdown)`
  margin: ${({ theme }) => `0 ${theme.spacing(2)}px`};
`

const ExpandButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  white-space: nowrap;
  padding: 6px 6px;
`

const EventList = styled(List)`
  overflow: auto;
`

const NextTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(1)}px;
  background: ${({ theme }) => theme.themeColors.backgrounds.level3};
  border-radius: ${({ theme }) =>
    `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`};
  border: 3px solid
    ${({ theme }) => theme.themeColors.countdown.nextUpOutlineColor};
  border-bottom: none;
`

const EventToggleButtons = styled.div`
  display: flex;
  margin-bottom: 8px;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};

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
  padding-left: ${({ theme }) => theme.spacing(1)}px;

  ${({ isNext }) =>
    isNext &&
    css`
      border-radius: ${({ theme }) =>
        `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`};
      border: 3px solid
        ${({ theme }) => theme.themeColors.countdown.nextUpOutlineColor};
      border-top: none;
    `}

  .MuiListItemText-secondary {
    font-size: 0.872rem;
  }
`

const CheckboxIcon = styled(ListItemIcon)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  min-width: 0;
  position: relative;
`

interface Props {
  events: Event[]
  selectedEvent?: Event
  onChangeSelectedEventNum: (num: number) => void
  className?: string
  theme?: string
}
export default function CountdownWidget({
  events,
  selectedEvent,
  onChangeSelectedEventNum,
  className,
  theme,
}: Props) {
  const [date] = React.useState(moment.utc())

  const nextPhase = selectedEvent
    ? findNextPhase(selectedEvent.timeline, date)
    : undefined

  const isSelectedEventOver = !nextPhase

  const [
    countdownWidgetExpanded,
    setCountdownWidgetExpanded,
  ] = useUserLocalStorage('countdownWidgetExpanded', false)

  const [preferredEventType, setPreferredEventType] = useUserLocalStorage<
    'compo' | 'jam'
  >('countDownPreferredEventType', 'compo')

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

  const handleChangeEvent = React.useCallback(
    (eventNumber: number) => {
      onChangeSelectedEventNum(eventNumber)
      setAnchorEl(null)
    },
    [onChangeSelectedEventNum]
  )

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
                onClick={() => {
                  setCountdownWidgetExpanded(false)
                }}
                endIcon={<Icon icon={ExpandLess} />}
                variant="contained"
                color="primary"
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
              <StyledCountdown targetDate={nextPhaseForCountdown.date} />
            )}
            <ExpandButton
              onClick={() => {
                setCountdownWidgetExpanded(true)
              }}
              endIcon={<Icon icon={ExpandMore} />}
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
    <WidgetContainer>
      <Root className={className}>
        <TitleButton
          endIcon={<Icon icon={UnfoldMoreIcon} />}
          onClick={handleClick}
        >
          <Typography variant="h4" bold>
            Ludum Dare {selectedEvent?.eventNumber}
          </Typography>
        </TitleButton>
        {theme && (
          <ThemeContainer>
            Theme:
            <Typography variant="h4">{theme}</Typography>
          </ThemeContainer>
        )}
        {(nextPhase?.eventPhase === EventPhase.CompoEnd ||
          nextPhase?.eventPhase === EventPhase.CompoSubmissionHourEnd) &&
          !countdownWidgetExpanded && (
            <EventToggleButtons>
              <Button
                fullWidth
                variant={
                  preferredEventType === 'compo' ? 'contained' : 'outlined'
                }
                color="primary"
                onClick={() => {
                  setPreferredEventType('compo')
                }}
              >
                Compo
              </Button>
              <Button
                fullWidth
                variant={
                  preferredEventType === 'jam' ? 'contained' : 'outlined'
                }
                color="primary"
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
    </WidgetContainer>
  )
}

CountdownWidget.displayName = 'CountdownWidget'
