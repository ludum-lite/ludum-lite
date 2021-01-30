import React from 'react'

/**
 * Wrap svg icons with this component to add a data attribute we can use to
 * modify the scale of individual icons on a global level. This is desirable because
 * some fonts don't fill their area much but some icons fill the entire area,
 * making fonts of the same font size look very different. See the global
 * styles for examples of overriding the scale
 */

interface Props {
  icon: React.FunctionComponent
}
export default function Icon({ icon, ...others }: Props) {
  const Component = icon

  return <Component data-icon={Component.displayName} {...others} />
}

Icon.displayName = 'Icon'
