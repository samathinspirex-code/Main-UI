export interface Testimonial {
  testimonial_id: number;
  name: string;
  programme: string;
  caption: string;
  thumbnail_url: string;
  video_url: string;
  position: number;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const base = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');
  try {
    const response = await fetch(`${base}/api/v1/public/testimonials`, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`Testimonials API: ${response.status}`);
    const payload = await response.json();
    return Array.isArray(payload.data) ? payload.data : [];
  } catch (error) {
    console.error('Could not load testimonials', error);
    return [];
  }
}
