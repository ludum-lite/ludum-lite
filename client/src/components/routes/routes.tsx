import { useParams } from 'react-router'

type EventSubPage = 'games' | 'theme' | 'stats'

export const ROUTES = {
  HOME: '/',
  EVENT: {
    LIST: '/events',
    SINGLE_BASE: '/events/:id', // Will be redirected to SINGLE
    SINGLE: '/events/:id/:subPage',
    getEventRoute: (id: string | number, subPage: EventSubPage = 'games') =>
      `/events/${id}/${subPage}`,
    useSingleParams: () => {
      const params = useParams()

      return params as {
        id: string
        subPage: EventSubPage
      }
    },
  },
}
