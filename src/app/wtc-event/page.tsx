import type { Metadata } from 'next'
import WtcEvent from '@/components/events/WtcEvent'

export const metadata: Metadata = {
  title: 'WTC Event Pre-Registration | 26 October 2026',
  description: 'Meet Inspire College at World Trade Center, Colombo on 26 October 2026. Explore programmes, discover event-day offers and register your interest for free.',
}

export default function WtcEventPage() {
  return <WtcEvent />
}
