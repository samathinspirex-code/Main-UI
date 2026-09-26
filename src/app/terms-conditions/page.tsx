import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default function TermsConditionsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      introduction="By enrolling in an Inspire College programme or using our website, you agree to these terms and conditions. Please read them carefully."
      sections={[
        {
          title: '1. Programme delivery',
          paragraphs: ['Inspire College follows a hybrid learning model consisting of 70% online learning through our LMS and virtual platforms, and 30% live scheduled sessions, workshops and assessments. Students are responsible for attending both components according to their course schedule.'],
        },
        {
          title: '2. Enrolment and payments',
          bullets: [
            'Admission is confirmed only after the registration fee has been paid in full.',
            'Registration fees are non-refundable.',
            'Programme fees must be paid by the deadlines stated in the offer letter or invoice.',
          ],
        },
        {
          title: '3. Student conduct',
          paragraphs: ['Students must attend online and in-person classes regularly, submit assignments and assessments on time, and communicate respectfully and professionally. Breaches of academic or conduct policies may result in disciplinary action or dismissal.'],
        },
        {
          title: '4. Intellectual property',
          paragraphs: ['Course materials, videos, notes and other learning content belong to Inspire College and may not be reproduced, shared or sold without written permission.'],
        },
        {
          title: '5. Limitation of liability',
          paragraphs: ['Inspire College is not responsible for damage or loss caused by technical issues, third-party tools or force majeure events outside our control.'],
        },
        {
          title: '6. Amendments',
          paragraphs: ['We may update these terms periodically. Students will be informed when significant changes are made.'],
        },
      ]}
    />
  )
}
