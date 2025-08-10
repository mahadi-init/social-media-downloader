import { Wifi, WifiOff } from "lucide-react";

export default function StatusBar({ isOnline }: { isOnline: boolean }) {
  return (
    <div className="bg-gray-900 text-white px-4 py-1 text-xs flex justify-between items-center">
      <span>
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="w-4 h-4" />
        ) : (
          <div className="flex items-center gap-1 text-orange-400">
            <WifiOff className="w-4 h-4" />
            <span>Offline</span>
          </div>
        )}
      </div>
    </div>
  );
}
