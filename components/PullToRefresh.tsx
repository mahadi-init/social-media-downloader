import { useState } from "react";

export default function PullToRefresh({
  onRefresh,
  children,
}: {
  onRefresh: any;
  children: React.ReactNode;
}) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: any) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: any) => {
    if (startY === 0) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 0 && window.scrollY === 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance, 100));
      setIsPulling(distance > 60);
    }
  };

  const handleTouchEnd = () => {
    if (isPulling && pullDistance > 60) {
      onRefresh();
    }
    setStartY(0);
    setPullDistance(0);
    setIsPulling(false);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden"
    >
      {pullDistance > 0 && (
        <div
          className="absolute top-0 left-0 right-0 bg-blue-50 flex justify-center items-center transition-all"
          style={{ height: `${pullDistance}px` }}
        >
          <div className={`text-blue-600 ${isPulling ? "animate-spin" : ""}`}>
            ↻ {isPulling ? "Release to refresh" : "Pull to refresh"}
          </div>
        </div>
      )}
      <div style={{ transform: `translateY(${pullDistance}px)` }}>
        {children}
      </div>
    </div>
  );
}
