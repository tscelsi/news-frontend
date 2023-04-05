import React from 'react'
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type { ParsedUrlQuery } from 'querystring';
import ReactMarkdown from 'react-markdown'
import Highlight, { defaultProps } from "prism-react-renderer";
import classNames from 'classnames';
import { getFileContent } from '~/utils/docs'
import Navbar from '~/components/organisms/Navbar';
import { useSession } from 'next-auth/react';
import useWindowSize from '~/hooks/useWindowSize';

type Props = {
  content: string
}

export const docPages = [{
  name: "Mission",
  path: 'mission',
  disabled: true,
  // colour: 'bg-red-500',
},
{
  name: "How it works",
  path: 'how-it-works',
  disabled: false,
  // colour: 'bg-blue-500',
},
{
  name: "Roadmap",
  path: 'roadmap',
  disabled: false,
  // colour: 'bg-green-500',
}, {
  name: "Design",
  path: 'design',
  disabled: false,
}]


const DocPage = (props: Props) => {
  const router = useRouter();
  const { breakpoint } = useWindowSize();
  const { data: session } = useSession();
  return (
    <div className="font-satoshi min-h-screen flex flex-col">
      {breakpoint !== 'sm' ? <Navbar type='lg' props={{
        buttonLeftText: session?.user ? "back to feed" : "back home",
        buttonLeftRoute: session?.user ? '/feed' : '/',
        smaller: true,
      }} /> :
        <Navbar type='sm' />}
      <div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-center justify-center pt-4">
          {docPages.map(page => (
            <Link className="" href={`/docs/${page.path}`} key={page.name}>
              <div key={page.name} className="flex flex-col gap-3 items-center justify-center">
                <p className={classNames("hover:pl-1 sm:hover:pl-2 sm:hover:pt-1 hover:opacity-80 hover:text-red-500 pt-2 rounded-lg transition-all px-2 py-1 font-bold text-center", {
                  "text-red-500": router.asPath === `/docs/${page.path}`,
                })}>{page.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="lg:w-3/5 flex justify-start items-start">
          <ReactMarkdown
            className="lg:mx-16 mx-8 mt-8 max-w-3xl text-start"
            components={{
              h2: ({ children }) => <h2 className="text-5xl font-black mb-8">{children}</h2>,
              h3: ({ children }) => <h3 className="text-3xl font-bold my-6">{children}</h3>,
              h4: ({ children }) => <h4 className="text-2xl font-bold my-6">{children}</h4>,
              h5: ({ children }) => <h5 className="text-xl font-bold my-8">{children}</h5>,
              p: ({ children }) => <p className="mb-4 text-2xl tracking-normal">{children}</p>,
              a: ({ children, href }) => <a className="font-bold bg-red-500 px-1 py-1 hover:shadow-blak rounded-lg transition-all" href={href}>{children}</a>,
              // a: ({ children, href }) => <a className="font-bold bg-gradient-to-r from-[#68E3F9] via-[#F55A9B] to-[#6F6FDD] bg-clip-text text-transparent hover:opacity-70 transition-all" href={href}>{children}</a>,
              // em: ({ children }) => <em className="font-semibold uppercase text-sm text-violet-100 not-italic">{children}</em>,
              strong: ({ children }) => <strong className="text-lg font-bold">{children}</strong>,
              hr: () => <div className="h-[4px] rounded-lg mx-auto my-12 bg-black" />,
              blockquote: ({ children }) => <blockquote className="pl-8 mb-4">{children}</blockquote>,
              li: ({ children }) => <li className="mb-6 font-bold text-2xl pl-2 border-l-4 border-black rounded-sm">{children}</li>,
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
    </div>
  )
}

export function getStaticPaths() {
  return {
    paths: docPages.map(page => ({ params: { docpage: page.path } })),
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