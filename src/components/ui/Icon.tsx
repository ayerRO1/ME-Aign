import {
  Barbell,
  Bell,
  CalendarBlank,
  CheckCircle,
  ClipboardText,
  Clock,
  ForkKnife,
  Gear,
  Notebook,
  Pill,
  SquaresFour
} from 'phosphor-react';
import { IconProps as PhosphorIconProps } from 'phosphor-react';

type IconName =
  | 'today'
  | 'calendar'
  | 'plan'
  | 'settings'
  | 'check'
  | 'meal'
  | 'pill'
  | 'walk'
  | 'clock'
  | 'notes'
  | 'bell';

interface IconProps extends PhosphorIconProps {
  name: IconName;
}

const map = {
  today: SquaresFour,
  calendar: CalendarBlank,
  plan: ClipboardText,
  settings: Gear,
  check: CheckCircle,
  meal: ForkKnife,
  pill: Pill,
  walk: Barbell,
  clock: Clock,
  notes: Notebook,
  bell: Bell
} as const;

export function Icon({ name, className = '', ...props }: IconProps) {
  const Component = map[name];
  if (!Component) return null;
  return <Component className={className} weight="fill" {...props} />;
}
