// Website events go to the dataLayer, and Google Tag Manager passes them on.
// Never put names, phone numbers, emails or message text in these parameters.
export function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const target = window as unknown as { dataLayer?: unknown[] };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({ event, ...params });
}
