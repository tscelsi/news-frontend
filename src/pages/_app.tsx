import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import SessionAvatar from "~/components/molecules/SessionAvatar";
import { MobileMenuProvider } from "~/context/MobileMenuContext";
import { api } from "~/utils/api";
import useWindowSize from "~/hooks/useWindowSize";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { breakpoint } = useWindowSize();
  return (
    <SessionProvider session={session}>
      <MobileMenuProvider >
        <Component {...pageProps} />
        {breakpoint !== 'sm' && <SessionAvatar />}
      </MobileMenuProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
