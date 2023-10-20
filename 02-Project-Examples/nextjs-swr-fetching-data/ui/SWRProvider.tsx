"use client"

import { SWRConfig } from "swr";

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>;
}
