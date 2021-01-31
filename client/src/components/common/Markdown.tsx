import React from 'react'
import styled, { useTheme } from 'styled-components/macro'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import { getStaticUrl } from 'utils'
import { Typography } from '@material-ui/core'
import Zoom from 'react-medium-image-zoom'

const imageSizeRegex = /_33B2BF251EFD_([0-9]+x|x[0-9]+|[0-9]+x[0-9]+)$/
const imagePreprocessor = (source: string) =>
  source.replace(
    /(!\[[^\]]*\]\([^)\s]+) =([0-9]+x|x[0-9]+|[0-9]+x[0-9]+)\)/g,
    '$1_33B2BF251EFD_$2)'
  )

const Root = styled.div`
  margin: 1em 0;

  code {
    padding: 0.25em 0.25em 0.125em;
    border-radius: 0.25em;
    background-color: ${({ theme }) =>
      theme.themeColors.markdown.codeBackground};
  }
`

const ImageZoomContainer = styled(Zoom).attrs({
  wrapElement: 'span',
})`
  max-width: 100%;
  display: block;

  &:not(:first-child) {
    margin-top: 1em;
  }

  &:not(:last-child) {
    margin-bottom: 1em;
  }
`

const Image = styled.img`
  border-radius: 4px;
  max-width: 100%;
  /* // border: '1px solid rgba(0, 0, 0, 0.23)', */
`

const LinkContainer = styled.p`
  display: flex;
  margin-top: 1em;
  margin-bottom: 1em;
`

interface Props extends ReactMarkdownProps {
  source: string
  removeHrefs?: boolean
  className?: string
}

export default function Markdown({ source, removeHrefs, ...props }: Props) {
  const renderers: { [index: string]: React.ElementType<any> } = {}
  const theme = useTheme()

  const rootRenderer = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return <Root {...props} />
  }

  const imageRenderer = ({ src, ...props }: { src: string }) => {
    const match = imageSizeRegex.exec(src)

    if (!match) {
      return (
        <ImageZoomContainer
          overlayBgColorStart={theme.themeColors.imageZoom.overlayBgColorStart}
          overlayBgColorEnd={theme.themeColors.imageZoom.overlayBgColorEnd}
          zoomMargin={40}
        >
          <Image src={src} alt="" {...props} />
        </ImageZoomContainer>
      )
    }

    const [width, height] = match[1]
      .split('x')
      .map((s) => (s === '' ? undefined : Number(s)))
    return (
      <ImageZoomContainer
        overlayBgColorStart={theme.themeColors.imageZoom.overlayBgColorStart}
        overlayBgColorEnd={theme.themeColors.imageZoom.overlayBgColorEnd}
        zoomMargin={40}
      >
        <Image
          src={src.replace(imageSizeRegex, '')}
          alt=""
          width={width}
          height={height}
          {...props}
        />
      </ImageZoomContainer>
    )
  }

  const processedSource = imagePreprocessor(source)

  const linkRenderer = (
    props: React.AnchorHTMLAttributes<HTMLAnchorElement>
  ) => {
    // @ts-ignore
    const element = props.children?.[0]

    // @ts-ignore
    if (element?.props?.src && removeHrefs) {
      return props.children || null
    }

    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        {...props}
        target="_blank"
        rel="noreferrer noopener"
        onClick={(e) => {
          // e.preventDefault()
          e.stopPropagation()
        }}
      />
    )
  }

  // @ts-ignore
  const paragraphRenderer = ({ children, ...props }) => {
    const element = props?.children?.[0]
    return element?.props?.href ? (
      <LinkContainer>{element}</LinkContainer>
    ) : (
      <p {...props}>{props.children || ''}</p>
    )
  }

  // @ts-ignore
  const textRenderer = ({ nodeKey, ...props }) => {
    return <span {...props} />
  }

  renderers.root = rootRenderer
  renderers.image = imageRenderer
  // @ts-ignore
  renderers.link = linkRenderer
  renderers.paragraph = paragraphRenderer
  renderers.text = textRenderer

  return (
    <Typography variant="body2" component="div">
      <ReactMarkdown
        source={processedSource}
        renderers={renderers}
        transformImageUri={(
          uri: string
          // children?: React.ReactNode,
          // title?: string | undefined,
          // alt?: string | undefined
        ) => getStaticUrl(uri)}
        {...props}
      />
    </Typography>
  )
}

Markdown.displayName = 'Markdown'
