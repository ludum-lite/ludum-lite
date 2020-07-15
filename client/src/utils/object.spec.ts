import { getValidValue } from './object'

describe('getValidValue', () => {
  it('works', () => {
    expect(
      getValidValue(
        {
          a: true,
        },
        'a'
      )
    ).toEqual('a')

    expect(
      getValidValue(
        {
          a: false,
        },
        'a'
      )
    ).toEqual(undefined)

    expect(
      getValidValue(
        {
          a: false,
          b: true,
        },
        'a'
      )
    ).toEqual('b')

    expect(
      getValidValue(
        {
          c: true,
          b: true,
          a: false,
        },
        'a'
      )
    ).toEqual('c')

    expect(
      getValidValue(
        {
          c: true,
          b: true,
          a: false,
        },
        false
      )
    ).toEqual('c')
  })
})
