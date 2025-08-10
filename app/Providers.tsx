"use client";
import OfflineIndicator from "@/components/OfflineIndicator";
import StatusBar from "@/components/StatusBar";
import useOnlineStatus from "@/hooks/useOnlineStatus";

export default function Providers({ children }: { children: React.ReactNode }) {
  const isOnline = useOnlineStatus();

  return (
    <>
      <StatusBar isOnline={isOnline} />
      <OfflineIndicator isOnline={isOnline} />
      {children}
    </>
  );
}
