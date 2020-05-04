import React from 'react'
import styled from 'styled-components/macro'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import { getStaticUrl } from 'utils'

const imageSizeRegex = /_33B2BF251EFD_([0-9]+x|x[0-9]+|[0-9]+x[0-9]+)$/
const imagePreprocessor = (source: string) =>
  source.replace(
    /(!\[[^\]]*\]\([^)\s]+) =([0-9]+x|x[0-9]+|[0-9]+x[0-9]+)\)/g,
    '$1_33B2BF251EFD_$2)'
  )

const Image = styled.img`
  max-width: 400px;
  border-radius: 4px;
  /* // border: '1px solid rgba(0, 0, 0, 0.23)', */
  display: block;
  margin-bottom: 1em;

  &:not(:first-child) {
    margin-top: 1em;
  }
`

interface Props extends ReactMarkdownProps {
  source: string
}

export const Markdown: React.FC<Props> = ({ source, ...props }) => {
  const renderers: { [index: string]: React.ElementType<any> } = {}

  const imageRenderer = ({ src, ...props }: { src: string }) => {
    const match = imageSizeRegex.exec(src)

    if (!match) {
      return <Image src={src} alt="" {...props} />
    }

    const [width, height] = match[1]
      .split('x')
      .map((s) => (s === '' ? undefined : Number(s)))
    return (
      <Image
        src={src.replace(imageSizeRegex, '')}
        alt=""
        width={width}
        height={height}
        {...props}
      />
    )
  }

  const processedSource = imagePreprocessor(source)

  renderers.image = imageRenderer

  return (
    <ReactMarkdown
      source={processedSource}
      renderers={renderers}
      transformImageUri={(
        uri: string,
        children?: React.ReactNode,
        title?: string | undefined,
        alt?: string | undefined
      ) => getStaticUrl(uri)}
      {...props}
    />
  )
}

export default Markdown
