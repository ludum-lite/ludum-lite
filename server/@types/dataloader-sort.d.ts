declare module 'dataloader-sort' {
  export = DataLoaderSort

  function DataLoaderSort<T extends any = any>(
    keys: readonly (string | number | any)[],
    data: T[],
    prop?: string
  ): Array<T>

  namespace DataLoaderSort {}
}
