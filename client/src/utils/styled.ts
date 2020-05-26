export function ignoreProps(props: string[]) {
  return (prop: any) => !props.includes(prop)
}
