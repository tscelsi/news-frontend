import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import SessionAvatar from "~/components/SessionAvatar";
import { ToastContextProvider } from "~/context/ToastContext";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContextProvider>
        <Component {...pageProps} />
        <SessionAvatar />
      </ToastContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
