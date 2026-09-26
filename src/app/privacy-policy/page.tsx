import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      introduction="At Inspire College, your privacy is a priority. This policy explains how we collect, use and protect information when you register for or access our educational services online or on campus."
      sections={[
        {
          title: 'Information we collect',
          bullets: [
            'Personal information such as your name, email, phone number, address, date of birth and NIC or passport details.',
            'Academic information including qualifications, transcripts and supporting documents.',
            'Payment information such as billing details, payment method and transaction records, handled securely by trusted payment partners.',
            'Usage information including IP address, device and browser details, access times and pages visited.',
          ],
        },
        {
          title: 'How we use your information',
          bullets: [
            'To manage course registration and academic records.',
            'To communicate about enrolment and academic progress.',
            'To improve our services and the user experience.',
            'To send marketing communications where you have provided consent.',
            'To meet legal and regulatory requirements.',
          ],
        },
        {
          title: 'Data protection',
          paragraphs: ['We use appropriate technical and organisational safeguards to protect personal data. No internet transmission or storage system, however, can be guaranteed to be completely secure.'],
        },
        {
          title: 'Third-party sharing',
          paragraphs: ['We do not sell or trade personal data. We may share necessary information with:'],
          bullets: [
            'Educational or accreditation bodies for certification purposes.',
            'Service providers that support our operations, including learning platforms and payment gateways.',
            'Government or legal authorities where required by law.',
          ],
        },
        {
          title: 'Cookies',
          paragraphs: ['Our website may use cookies to improve browsing and understand engagement. You may disable cookies in your browser, although some features may then be limited.'],
        },
        {
          title: 'Your rights',
          bullets: ['Access your personal data.', 'Request corrections to your information.', 'Withdraw consent where applicable.'],
        },
      ]}
    />
  )
}
