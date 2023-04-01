import React from 'react'
import { useSession } from 'next-auth/react'
import { type GetServerSideProps } from 'next'
import { getServerAuthSession } from '~/server/auth';
import useWindowSize from '~/hooks/useWindowSize'
import { SmHome, LgHome } from '~/components/pages/Home'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

const Home = () => {
  const { data: session } = useSession()
  const { breakpoint } = useWindowSize()
  return (
    breakpoint === 'sm' ? <SmHome /> : <LgHome session={session} />
  )
}

export default Home