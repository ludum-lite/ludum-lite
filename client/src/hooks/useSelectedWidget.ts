import useUserLocalStorage from './useUserLocalStorage'

type SelectableWidgets = 'countdown' | 'game' | 'team'

export default function useSelectedWidget() {
  const [selectedWidget, setSelectedWidget] = useUserLocalStorage<
    SelectableWidgets
  >('selectedWidget', 'countdown')

  return [selectedWidget, setSelectedWidget] as const
}
