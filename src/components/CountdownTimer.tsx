import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate?: Date;
  autoReset?: boolean;
  cycleDays?: number;
  className?: string;
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Fixed reference date for consistent cycles across all visitors
const REFERENCE_DATE = new Date('2025-12-07T00:00:00');

const getNextCycleEndDate = (cycleDays: number): Date => {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceReference = Math.floor((now.getTime() - REFERENCE_DATE.getTime()) / msPerDay);
  const currentCycle = Math.floor(daysSinceReference / cycleDays);
  const nextCycleEnd = new Date(REFERENCE_DATE.getTime() + ((currentCycle + 1) * cycleDays * msPerDay));
  return nextCycleEnd;
};

export const CountdownTimer = ({ 
  targetDate, 
  autoReset = false, 
  cycleDays = 7, 
  className = "", 
  compact = false 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentTargetDate, setCurrentTargetDate] = useState<Date>(() => {
    if (autoReset) {
      return getNextCycleEndDate(cycleDays);
    }
    return targetDate || new Date();
  });

  useEffect(() => {
    if (autoReset) {
      setCurrentTargetDate(getNextCycleEndDate(cycleDays));
    } else if (targetDate) {
      setCurrentTargetDate(targetDate);
    }
  }, [autoReset, cycleDays, targetDate]);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = currentTargetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        // If autoReset is enabled, calculate the next cycle
        if (autoReset) {
          const newTarget = getNextCycleEndDate(cycleDays);
          setCurrentTargetDate(newTarget);
          const newDifference = newTarget.getTime() - new Date().getTime();
          return {
            days: Math.floor(newDifference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((newDifference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((newDifference / (1000 * 60)) % 60),
            seconds: Math.floor((newDifference / 1000) % 60)
          };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [currentTargetDate, autoReset, cycleDays]);

  // Only hide if expired AND not auto-resetting
  const isExpired = !autoReset && currentTargetDate.getTime() <= new Date().getTime();
  if (isExpired) {
    return null;
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full ${className}`}>
        <Clock className="w-4 h-4" />
        <span className="text-sm font-semibold">
          {timeLeft.days > 0 && `${timeLeft.days}j `}
          {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-accent" />
        <span className="text-sm font-medium text-muted-foreground">L'offre expire dans</span>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <TimeUnit value={timeLeft.days} label="Jours" />
        <Separator />
        <TimeUnit value={timeLeft.hours} label="Heures" />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-foreground text-background w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center">
      <span className="text-xl md:text-2xl font-bold tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-xs text-muted-foreground mt-1">{label}</span>
  </div>
);

const Separator = () => (
  <span className="text-2xl font-bold text-foreground/50 -mt-5">:</span>
);

export default CountdownTimer;
