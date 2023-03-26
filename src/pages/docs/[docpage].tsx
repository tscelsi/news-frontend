import React from 'react'
import type { GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import ReactMarkdown from 'react-markdown'
import Highlight, { defaultProps } from "prism-react-renderer";
import { getFileContent } from '~/utils/docs'

type Props = {
  content: string
}

const docSections = [
  {
    name: 'Docs',
    paths: [{
      name: "Mission",
      path: 'mission',
      disabled: true,
    },
    {
      name: "How it works",
      path: 'how-it-works',
      disabled: false,
    }],
  }
]

const TAILWIND_LG_BREAKPOINT = 1024

const DocPage = (props: Props) => {
  return (
    <div className="font-satoshi min-h-screen flex flex-col">
      <div className="w-full">
        <ReactMarkdown
          className="lg:mx-16 mx-8 mt-8 max-w-3xl text-start"
          components={{
            h2: ({ children }) => <h2 className="text-4xl font-bold mb-8">{children}</h2>,
            h3: ({ children }) => <h3 className="text-3xl font-bold my-6">{children}</h3>,
            h4: ({ children }) => <h4 className="text-2xl font-bold my-6">{children}</h4>,
            h5: ({ children }) => <h5 className="text-xl font-bold my-8">{children}</h5>,
            p: ({ children }) => <p className="mb-4 font-light">{children}</p>,
            a: ({ children, href }) => <a className="bg-gradient-to-r from-[#68E3F9] via-[#F55A9B] to-[#6F6FDD] bg-clip-text text-transparent hover:opacity-70" href={href}>{children}</a>,
            em: ({ children }) => <em className="font-semibold uppercase text-sm text-violet-100 not-italic">{children}</em>,
            strong: ({ children }) => <strong className="text-sm font-bold">{children}</strong>,
            hr: () => <div className="h-px mx-auto my-12 bg-gradient-to-r from-[#68E3F9] via-[#F55A9B] to-[#6F6FDD]" />,
            blockquote: ({ children }) => <blockquote className="pl-8 mb-4">{children}</blockquote>,
            code: ({ children }) => {
              let codeBlock = children[0] as string
              codeBlock = codeBlock.trim()
              return (<div>
                <Highlight {...defaultProps} code={codeBlock} language="json">
                  {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre className="overflow-auto p-4 rounded-lg mb-4" style={style}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>)
            },
          }}
        >{props.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export function getStaticPaths() {
  return {
    paths: docSections.map(section => section.paths.map(pathObj => ({ params: { docpage: pathObj.path } }))).flat(),
    fallback: false, // can also be true or 'blocking'
  }
}

interface IParams extends ParsedUrlQuery {
  docpage: string
}

export const getStaticProps: GetStaticProps = (context) => {
  const { docpage } = context.params as IParams
  const content = getFileContent(docpage)
  return {
    props: {
      content,
    },
  }
}

export default DocPage