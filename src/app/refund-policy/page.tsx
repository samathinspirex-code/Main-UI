import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = { title: 'Refund Policy' }

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund & Cancellation Policy"
      introduction="Thank you for choosing Inspire College. Please read this policy carefully before making any payment for a programme delivered through our hybrid learning model."
      sections={[
        {
          title: 'Registration fees',
          paragraphs: ['Once paid, the registration fee is non-refundable under all circumstances, including when a student decides not to continue or is unable to attend.'],
        },
        {
          title: 'Course withdrawals',
          paragraphs: ['Withdrawal from a course after registration does not qualify for a full or partial refund.'],
        },
        {
          title: 'Cancellation by Inspire College',
          paragraphs: ['If Inspire College cancels a course or programme, registered students will be contacted and offered the available options, which may include:'],
          bullets: ['Deferring enrolment to a future batch.', 'Applying paid fees to another course or programme.'],
        },
        {
          title: 'Further assistance',
          paragraphs: ['Our administration team is available to support your academic journey and clarify any concerns about payments, withdrawals or cancellations.'],
        },
      ]}
    />
  )
}
