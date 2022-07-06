import { useEffect, useState } from "react";
import { intervalToDuration, isBefore } from "date-fns";
import { number } from "yup";

export const useTicker = (deadline: Date) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [setNow]);

  const isTimeUp = isBefore(deadline, now);

  if (isTimeUp) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp };
  }

  let {
    days, hours, minutes, seconds,
  } = intervalToDuration({
    start: now,
    end: deadline,
  });

  return {
    days,
    hours,
    minutes,
    seconds,
    isTimeUp,
    now: number
  };
}