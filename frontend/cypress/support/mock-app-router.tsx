import React from "react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const mockRouter = {
  pathname: "/",
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  reload: () => {},
  back: () => {},
  forward: () => {},
  prefetch: () => Promise.resolve(),
  beforePopState: () => {},
  refresh: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isReady: true,
  isPreview: false,
  query: {},
  asPath: "/",
};

export function withAppRouter(children: React.ReactNode) {
  return (
    <AppRouterContext.Provider value={mockRouter}>
      {children}
    </AppRouterContext.Provider>
  );
}
