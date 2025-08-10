import { Check, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function OfflineIndicator({ isOnline }: { isOnline: boolean }) {
  const [showNotification, setShowNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowNotification(true);
      setWasOffline(true);
    } else if (wasOffline && isOnline) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  }, [isOnline, wasOffline]);

  if (!showNotification) return null;

  return (
    <div
      className={`fixed top-16 left-4 right-4 rounded-lg shadow-lg p-3 z-50 animate-slide-down ${
        isOnline ? "bg-green-600" : "bg-orange-600"
      } text-white`}
    >
      <div className="flex items-center gap-2">
        {isOnline ? (
          <>
            <Check className="w-5 h-5" />
            <span>Back online! Syncing data...</span>
          </>
        ) : (
          <>
            <WifiOff className="w-5 h-5" />
            <span>Youre offline. Some features may be limited.</span>
          </>
        )}
      </div>
    </div>
  );
}
