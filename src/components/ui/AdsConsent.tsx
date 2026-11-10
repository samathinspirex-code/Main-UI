"use client";

// Stays hidden until compliance approves the wording and NEXT_PUBLIC_ADS_CONSENT_ENABLED is set to "true".
export const ADS_CONSENT_ENABLED = process.env.NEXT_PUBLIC_ADS_CONSENT_ENABLED === "true";

function cookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.split("; ").find((item) => item.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

// Extra form fields, sent only when the person ticked the box.
export function adsConsentFields(consented: boolean): { ads_consent?: true; fbc?: string; fbp?: string } {
  if (!ADS_CONSENT_ENABLED || !consented) return {};
  return { ads_consent: true, fbc: cookie("_fbc"), fbp: cookie("_fbp") };
}

export function AdsConsent({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  if (!ADS_CONSENT_ENABLED) return null;
  return (
    <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, lineHeight: 1.45 }}>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} style={{ marginTop: 3, flex: "none" }} />
      <span>
        Optional: I agree that Inspire College may share a hashed copy of my phone number and email with Meta to measure and improve its advertising. I can withdraw this at any time by emailing enrol@inspire.college. See the <a href="/privacy-policy" style={{ textDecoration: "underline" }}>privacy policy</a>.
      </span>
    </label>
  );
}
