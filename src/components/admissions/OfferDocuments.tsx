"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import { Icon } from "../ui/Icon";
import { Tag } from "../ui/Tag";
import "./academic-admissions.css";
import "./offer-documents.css";

type DocumentType = "nic_passport" | "qualification" | "transcript";
type Upload = { document_type: DocumentType; file_name: string; uploaded_at: string };
type OfferView = { status: "active" | "expired" | "not_found" | "unavailable"; first_name?: string; programme?: string; expires_on?: string; uploaded?: Upload[] };

const DOCUMENTS: { type: DocumentType; title: string; text: string; required: boolean }[] = [
  { type: "nic_passport", title: "NIC or Passport", text: "A clear copy of your National Identity Card or Passport.", required: true },
  { type: "qualification", title: "Highest Educational Qualification", text: "Certificate or results sheet.", required: true },
  { type: "transcript", title: "Academic Transcript", text: "If applicable.", required: false },
];
const ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
const MAX_BYTES = 10 * 1024 * 1024;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The selected document could not be read."));
    reader.onload = () => resolve(String(reader.result).split(",", 2)[1] || "");
    reader.readAsDataURL(file);
  });
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function OfferDocuments({ token }: { token: string }) {
  const [view, setView] = useState<OfferView | null>(null);
  const [busy, setBusy] = useState<DocumentType | null>(null);
  const [errors, setErrors] = useState<Partial<Record<DocumentType, string>>>({});

  const load = useCallback(async () => {
    try {
      const response = await fetch(`/api/offer-documents/${encodeURIComponent(token)}`, { cache: "no-store" });
      setView(response.ok ? await response.json() : { status: "unavailable" });
    } catch {
      setView({ status: "unavailable" });
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  async function upload(type: DocumentType, file?: File) {
    setErrors(current => ({ ...current, [type]: undefined }));
    if (!file) return;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      setErrors(current => ({ ...current, [type]: "Choose a PDF, JPG or PNG file." }));
      return;
    }
    if (file.size > MAX_BYTES) {
      setErrors(current => ({ ...current, [type]: "The file must be 10 MB or smaller." }));
      return;
    }
    setBusy(type);
    try {
      const response = await fetch(`/api/offer-documents/${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_type: type, filename: file.name, content_type: file.type, size_bytes: file.size, data_base64: await fileToBase64(file) }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error?.message || payload?.detail || "Unable to upload the document. Please try again.");
      setView(payload);
    } catch (reason) {
      setErrors(current => ({ ...current, [type]: reason instanceof Error ? reason.message : "Unable to upload the document." }));
    } finally {
      setBusy(null);
    }
  }

  if (!view) {
    return <div><Navbar /><main className="offer-docs-page"><p className="offer-docs-loading">Loading your offer…</p></main><Footer /></div>;
  }

  if (view.status !== "active") {
    const expired = view.status === "expired";
    return <div><Navbar /><main className="admission-success">
      <div className="admission-success-mark"><Icon kind={expired ? "x" : "mail"} size={30} color="var(--accent)" /></div>
      <Tag accent>{expired ? "OFFER EXPIRED" : "LINK NOT AVAILABLE"}</Tag>
      <h1>{expired ? "This offer has expired" : "We couldn’t open this link"}</h1>
      <p>{expired
        ? `Your offer was valid until ${view.expires_on}. Please contact our Admissions Team and we will help you with the next steps.`
        : view.status === "unavailable"
          ? "The page is temporarily unavailable. Please try again in a few minutes."
          : "Please check that you opened the full link from your offer email, or contact our Admissions Team."}</p>
      <a className="admission-button primary" href="tel:+94711993331">Call Admissions · 071 199 3331</a>
      <Link className="admission-button ghost" href="/">Back to home</Link>
    </main><Footer /></div>;
  }

  const uploaded = view.uploaded || [];
  const latest = (type: DocumentType) => uploaded.find(item => item.document_type === type);
  const requiredDone = DOCUMENTS.filter(doc => doc.required).every(doc => latest(doc.type));

  return <div><Navbar /><main className="offer-docs-page">
    <header className="admission-hero sx offer-docs-hero">
      <Tag accent>CONDITIONAL OFFER OF ADMISSION</Tag>
      <h1>Submit your <span>documents.</span></h1>
      <p>Hi {view.first_name}, congratulations on your offer for <b>{view.programme}</b>. Upload the documents below to fulfil the conditions of your offer.</p>
      <p className="offer-docs-expiry">Offer valid until <b>{view.expires_on}</b></p>
    </header>
    <section className="offer-docs-list sx">
      {DOCUMENTS.map(doc => {
        const done = latest(doc.type);
        const loading = busy === doc.type;
        return <div className={`offer-docs-item${done ? " done" : ""}`} key={doc.type}>
          <div className="offer-docs-text">
            <b>{doc.title}{!doc.required && <small> · optional</small>}</b>
            <span>{doc.text}</span>
            {done && <span className="offer-docs-done"><Icon kind="check" size={14} color="var(--accent)" /> Uploaded {done.file_name} · {formatDate(done.uploaded_at)}</span>}
            {errors[doc.type] && <p className="admission-error">{errors[doc.type]}</p>}
          </div>
          <label className={`admission-button ${done ? "secondary" : "primary"} offer-docs-button${loading ? " busy" : ""}`}>
            <input type="file" accept={ACCEPT} disabled={busy !== null} onChange={event => { upload(doc.type, event.target.files?.[0]); event.target.value = ""; }} />
            {loading ? "Uploading…" : done ? "Replace" : "Upload"}
          </label>
        </div>;
      })}
      <p className="offer-docs-note">PDF, JPG or PNG · maximum 10 MB each. Your documents are stored securely and only seen by our Admissions Team.</p>
      {requiredDone && <div className="offer-docs-complete"><Icon kind="check" size={20} color="var(--accent)" /><span>Thank you! We have received your documents. Our Admissions Team will verify them and guide you through the final enrolment process.</span></div>}
      <p className="offer-docs-help">Need help? Call Admissions on <a href="tel:+94711993331">071 199 3331</a>.</p>
    </section>
  </main><Footer /></div>;
}
