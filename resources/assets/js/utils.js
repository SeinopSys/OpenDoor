import { differenceInSeconds } from 'date-fns';

export function sessionCountdown(date) {
  const now = new Date();
  let seconds = differenceInSeconds(date, now);
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  let hours = Math.floor(minutes / 60);
  minutes -= hours * 60;
  if (seconds < 10)
    seconds = `0${seconds}`;

  let output = `${minutes}:${seconds}`;
  if (hours > 0){
    output = `${hours}:${minutes < 10 ? '0':''}${output}`;
  }
  return output;
}
