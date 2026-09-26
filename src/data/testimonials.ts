export interface Testimonial {
  testimonial_id: number;
  name: string;
  programme: string;
  caption: string;
  thumbnail_url: string;
  video_url: string;
  position: number;
}

const bundledTestimonials: Testimonial[] = [
  { testimonial_id: -1, name: 'Gimhani Edirisinghe', programme: 'HND', caption: 'An HND journey, in Gimhani’s own words.', thumbnail_url: '/testimonials/gimhani-edirisinghe-branded.png', video_url: '/testimonials/gimhani-edirisinghe.mp4', position: 1 },
  { testimonial_id: -2, name: 'Akram Razik', programme: 'Foundation + HND', caption: 'From Foundation to HND — hear Akram’s experience.', thumbnail_url: '/testimonials/akram-razik-branded.png', video_url: '/testimonials/akram-razik.mp4', position: 2 },
  { testimonial_id: -3, name: 'Nidarshana Premkumar', programme: 'HND', caption: 'Get to know Nidarshana’s HND experience at Inspire.', thumbnail_url: '/testimonials/nidarshana-premkumar-branded.jpg', video_url: '/testimonials/nidarshana-premkumar.mp4', position: 3 },
  { testimonial_id: -4, name: 'Keneth Joel', programme: 'Level 4', caption: 'Keneth shares his Level 4 learning experience at Inspire.', thumbnail_url: '/testimonials/keneth-joel-branded.png', video_url: '/testimonials/keneth-joel.mp4', position: 4 },
  { testimonial_id: -5, name: 'Yara Benjamin', programme: 'Foundation', caption: 'Starting with Foundation — Yara shares her story.', thumbnail_url: '/testimonials/yara-benjamin-branded.png', video_url: '/testimonials/yara-benjamin.mp4', position: 5 },
];

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const base = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');
  try {
    const response = await fetch(`${base}/api/v1/public/testimonials`, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`Testimonials API: ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload.data)) throw new Error('Testimonials API returned an invalid payload');
    return (payload.data as Testimonial[]).sort((a, b) => a.position - b.position);
  } catch (error) {
    console.error('Could not load testimonials', error);
    return bundledTestimonials;
  }
}
