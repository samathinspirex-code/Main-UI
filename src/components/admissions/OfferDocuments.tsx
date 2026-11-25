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
type Progress = { index: number; total: number; title: string; percent: number };

const DOCUMENTS: { type: DocumentType; title: string; text: string; required: boolean }[] = [
  { type: "nic_passport", title: "NIC or Passport", text: "A clear copy of your National Identity Card or Passport.", required: true },
  { type: "qualification", title: "Highest Educational Qualification", text: "Certificate or results sheet.", required: true },
  { type: "transcript", title: "Academic Transcript", text: "If applicable.", required: false },
];
const ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
const TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_BYTES = 10 * 1024 * 1024;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The selected document could not be read."));
    reader.onload = () => resolve(String(reader.result).split(",", 2)[1] || "");
    reader.readAsDataURL(file);
  });
}

// XHR (not fetch) so the uploading screen can show real progress.
function sendDocument(token: string, body: string, onProgress: (percent: number) => void): Promise<OfferView> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/offer-documents/${encodeURIComponent(token)}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.upload.onprogress = event => { if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100)); };
    xhr.onerror = () => reject(new Error("The upload was interrupted. Check your connection and try again."));
    xhr.onload = () => {
      let payload: (OfferView & { error?: { message?: string }; detail?: string }) | null = null;
      try { payload = JSON.parse(xhr.responseText); } catch { /* handled below */ }
      if (xhr.status >= 200 && xhr.status < 300 && payload) resolve(payload);
      else reject(new Error(payload?.error?.message || payload?.detail || "Unable to upload the document. Please try again."));
    };
    xhr.send(body);
  });
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function OfferDocuments({ token }: { token: string }) {
  const [view, setView] = useState<OfferView | null>(null);
  const [selected, setSelected] = useState<Partial<Record<DocumentType, File>>>({});
  const [errors, setErrors] = useState<Partial<Record<DocumentType, string>>>({});
  const [progress, setProgress] = useState<Progress | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch(`/api/offer-documents/${encodeURIComponent(token)}`, { cache: "no-store" });
      setView(response.ok ? await response.json() : { status: "unavailable" });
    } catch {
      setView({ status: "unavailable" });
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  function choose(type: DocumentType, file?: File) {
    setErrors(current => ({ ...current, [type]: undefined }));
    setSubmitError("");
    if (!file) return;
    if (!TYPES.includes(file.type)) {
      setErrors(current => ({ ...current, [type]: "Choose a PDF, JPG or PNG file." }));
      return;
    }
    if (file.size > MAX_BYTES) {
      setErrors(current => ({ ...current, [type]: "The file must be 10 MB or smaller." }));
      return;
    }
    setSelected(current => ({ ...current, [type]: file }));
  }

  function remove(type: DocumentType) {
    setSelected(current => { const next = { ...current }; delete next[type]; return next; });
  }


  async function submit() {
    const queue = DOCUMENTS.filter(doc => selected[doc.type]);
    if (!queue.length || progress) return;
    setSubmitError("");
    for (const [index, doc] of queue.entries()) {
      const file = selected[doc.type]!;
      setProgress({ index: index + 1, total: queue.length, title: doc.title, percent: 0 });
      try {
        const body = JSON.stringify({ document_type: doc.type, filename: file.name, content_type: file.type, size_bytes: file.size, data_base64: await fileToBase64(file) });
        const next = await sendDocument(token, body, percent => setProgress(current => current && { ...current, percent }));
        setView(next);
        remove(doc.type);
      } catch (reason) {
        setProgress(null);
        setErrors(current => ({ ...current, [doc.type]: reason instanceof Error ? reason.message : "Unable to upload the document." }));
        setSubmitError(`${doc.title} could not be uploaded. Your other documents are safe; fix this one and press Submit again.`);
        return;
      }
    }
    setProgress(null);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <a className="admission-button primary" href="tel:+94760974225">Call Admissions · 076 097 4225</a>
      <Link className="admission-button ghost" href="/">Back to home</Link>
    </main><Footer /></div>;
  }

  const uploaded = view.uploaded || [];
  const latest = (type: DocumentType) => uploaded.find(item => item.document_type === type);
  const ready = (type: DocumentType) => Boolean(latest(type) || selected[type]);
  const missingRequired = DOCUMENTS.filter(doc => doc.required && !ready(doc.type));
  const selectedCount = DOCUMENTS.filter(doc => selected[doc.type]).length;
  const allRequiredUploaded = DOCUMENTS.filter(doc => doc.required).every(doc => latest(doc.type));

  if (submitted && allRequiredUploaded) {
    return <div><Navbar /><main className="admission-success">
      <div className="admission-success-mark"><Icon kind="check" size={34} color="var(--accent)" /></div>
      <Tag accent>DOCUMENTS SUBMITTED</Tag>
      <h1>Thank you, {view.first_name}!</h1>
      <p>We have received your documents for <b>{view.programme}</b>. Our Admissions Team will verify them and guide you through the final enrolment process.</p>
      <ul className="offer-docs-summary">{DOCUMENTS.map(doc => { const done = latest(doc.type); return done ? <li key={doc.type}><Icon kind="check" size={14} color="var(--accent)" /> {doc.title} · {done.file_name}</li> : null; })}</ul>
      <button type="button" className="admission-button secondary" onClick={() => setSubmitted(false)}>Add or replace a document</button>
      <Link className="admission-button ghost" href="/">Back to home</Link>
    </main><Footer /></div>;
  }

  return <div><Navbar /><main className="offer-docs-page">
    <header className="admission-hero sx offer-docs-hero">
      <Tag accent>CONDITIONAL OFFER OF ADMISSION</Tag>
      <h1>Submit your <span>documents.</span></h1>
      <p>Hi {view.first_name}, congratulations on your offer for <b>{view.programme}</b>. Choose your documents below (PDF, JPG or PNG, max 10 MB each), then press <b>Submit documents</b>.</p>
      <p className="offer-docs-expiry">Offer valid until <b>{view.expires_on}</b></p>
    </header>
    <section className="offer-docs-list sx">
      {DOCUMENTS.map(doc => {
        const done = latest(doc.type);
        const file = selected[doc.type];
        return <div className={`offer-docs-item${done && !file ? " done" : ""}`} key={doc.type}>
          <div className="offer-docs-text">
            <b>{doc.title}{doc.required ? <span className="offer-docs-required"> *</span> : <small> · optional</small>}</b>
            <span>{doc.text}</span>
            {done && <span className="offer-docs-done"><Icon kind="check" size={14} color="var(--accent)" /> Received {done.file_name} · {formatDate(done.uploaded_at)}</span>}
          </div>
          {file ? <div className="offer-docs-file">
            <Icon kind="book" size={20} color="var(--accent)" />
            <div><b>{file.name}</b><small>{formatSize(file.size)} · ready to submit</small></div>
            <button type="button" className="offer-docs-remove" onClick={() => remove(doc.type)} disabled={Boolean(progress)} aria-label={`Remove ${file.name}`}><Icon kind="x" size={16} color="currentColor" /></button>
          </div> : <label className={`admission-button ${done ? "secondary" : "primary"} offer-docs-button`}>
            <input type="file" accept={ACCEPT} disabled={Boolean(progress)} onChange={event => { choose(doc.type, event.target.files?.[0]); event.target.value = ""; }} />
            {done ? "Replace file" : "Upload"}
          </label>}
          {errors[doc.type] && <p className="admission-error">{errors[doc.type]}</p>}
        </div>;
      })}
      <div className="offer-docs-submit">
        {submitError && <p className="admission-error" role="alert">{submitError}</p>}
        {missingRequired.length > 0 && <p className="offer-docs-note">Still needed: {missingRequired.map(doc => doc.title).join(" and ")}.</p>}
        <button type="button" className="admission-button primary" disabled={selectedCount === 0 || Boolean(progress)} onClick={() => void submit()}>
          {selectedCount > 1 ? `Submit ${selectedCount} documents` : "Submit documents"}
        </button>
        <p className="offer-docs-note">Your documents are stored securely and only seen by our Admissions Team.</p>
        <p className="offer-docs-help">Need help? Call Admissions on <a href="tel:+94760974225">076 097 4225</a>.</p>
      </div>
    </section>
    {progress && <div className="offer-docs-uploading" role="alertdialog" aria-live="polite" aria-label="Uploading your documents">
      <div className="offer-docs-uploading-card">
        <div className="offer-docs-spinner" aria-hidden="true" />
        <h2>Uploading your documents…</h2>
        <p>{progress.title} · {progress.index} of {progress.total}</p>
        <div className="offer-docs-bar"><span style={{ width: `${progress.percent}%` }} /></div>
        <small>{progress.percent < 100 ? `${progress.percent}%` : "Saving securely…"} · please keep this page open</small>
      </div>
    </div>}
  </main><Footer /></div>;
}
