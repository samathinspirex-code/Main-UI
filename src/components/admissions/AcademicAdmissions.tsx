"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import { Icon } from "../ui/Icon";
import { Tag } from "../ui/Tag";
import { formatLKR, type Program, type ProgrammeNode } from "../../data/programs";
import "./academic-admissions.css";

type Props = { programs: Program[]; programmes: ProgrammeNode[]; initialProgramSlug?: string };
type Details = { full_name: string; email: string; phone: string };
type StudyMode = "full_time" | "part_time";
type Draft = Details & { programmeId: string; courseId: string; qualification: string; studyMode: StudyMode; step: number };
const STEPS = [["01","Your details","Name, email & phone"],["02","Pick your course","Programme, then course"],["03","Upload results","Optional documents"],["04","Reserve & Pay","Confirm your course fee"]];
const QUALIFICATIONS = ["After O/L","After A/L","Certificate","Diploma / HND","Bachelor’s degree","Postgraduate qualification","Other"];
const DRAFT_KEY = "inspire-admission-draft-v2";

function fileToBase64(file: File): Promise<string> { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onerror = () => reject(new Error("The selected document could not be read.")); reader.onload = () => resolve(String(reader.result).split(",",2)[1] || ""); reader.readAsDataURL(file); }); }

export default function AcademicAdmissions({ programs, programmes, initialProgramSlug = "" }: Props) {
  const router = useRouter();
  const initialCourse = programs.find(item => item.slug === initialProgramSlug);
  const [step,setStep] = useState(1);
  const [details,setDetails] = useState<Details>({full_name:"",email:"",phone:""});
  const [programmeId,setProgrammeId] = useState(String(initialCourse?.programmeId ?? ""));
  const [courseId,setCourseId] = useState(String(initialCourse?.courseId ?? ""));
  const [qualification,setQualification] = useState("After A/L");
  const [studyMode,setStudyMode] = useState(initialCourse?.studyOptions?.find(option=>option.is_enabled)?.study_mode ?? "full_time");
  const [document,setDocument] = useState<File|null>(null);
  const [saved,setSaved] = useState(false);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState("");
  const [complete,setComplete] = useState(false);
  const [submissionId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    if (initialCourse) return;
    const restore = window.setTimeout(() => {
      try {
        const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null") as Draft | null;
        if (!draft) return;
        setDetails({ full_name: draft.full_name || "", email: draft.email || "", phone: draft.phone || "" });
        setProgrammeId(draft.programmeId || ""); setCourseId(draft.courseId || "");
        setQualification(draft.qualification || "After A/L");
        setStudyMode(draft.studyMode === "part_time" ? "part_time" : "full_time");
        setStep(Math.max(1, Math.min(4, Number(draft.step) || 1)));
      } catch { /* Ignore an invalid local draft. */ }
    }, 0);
    return () => window.clearTimeout(restore);
  }, [initialCourse]);
  const programmeOptions=useMemo(()=>{const ids=new Set(programs.map(c=>c.programmeId).filter(Boolean));return programmes.filter(p=>ids.has(p.programme_id)).sort((a,b)=>a.name.localeCompare(b.name));},[programmes,programs]);
  const courseOptions=useMemo(()=>programs.filter(c=>String(c.programmeId??"")===programmeId).sort((a,b)=>a.title.localeCompare(b.title)),[programs,programmeId]);
  const selectedProgramme=programmeOptions.find(p=>String(p.programme_id)===programmeId);
  const selectedCourse=programs.find(p=>String(p.courseId)===courseId);
  const enabledStudyOptions=selectedCourse?.studyOptions?.filter(option=>option.is_enabled)??[];
  const selectedStudyOption=enabledStudyOptions.find(option=>option.study_mode===studyMode)??enabledStudyOptions[0];
  const selectedPrice=selectedStudyOption?.price??selectedCourse?.priceFrom??0;
  const selectedDuration=selectedStudyOption?.duration??selectedCourse?.duration;
  const catalogueAvailable=programmeOptions.length>0;
  const stepOneValid=details.full_name.trim().length>=2 && /\S+@\S+\.\S+/.test(details.email) && details.phone.trim().length>=5;
  const stepTwoValid=Boolean(selectedProgramme&&selectedCourse);

  function saveDraft(exit=false){localStorage.setItem(DRAFT_KEY,JSON.stringify({...details,programmeId,courseId,qualification,studyMode,step} satisfies Draft));setSaved(true);window.setTimeout(()=>setSaved(false),2500);if(exit)router.push("/");}
  function chooseCourse(value:string){setCourseId(value);const course=programs.find(item=>String(item.courseId)===value);setStudyMode(course?.studyOptions?.find(option=>option.is_enabled)?.study_mode??"full_time");}
  function chooseDocument(file?:File){setError("");if(!file){setDocument(null);return;}if(!["application/pdf","image/jpeg","image/png"].includes(file.type)){setError("Choose a PDF, JPG or PNG result document.");return;}if(file.size>10*1024*1024){setError("The result document must be 10 MB or smaller.");return;}setDocument(file);}
  async function submit(){if(!stepOneValid||!stepTwoValid)return;setBusy(true);setError("");try{const result_document=document?{filename:document.name,content_type:document.type,size_bytes:document.size,data_base64:await fileToBase64(document)}:null;const response=await fetch("/api/programme-enrolments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({submission_id:submissionId,...details,highest_qualification:qualification,programme_id:Number(programmeId),preferred_course_id:Number(courseId),result_document})});const payload=await response.json();if(!response.ok)throw new Error(payload?.error?.message||payload?.detail||"Unable to submit your application.");localStorage.removeItem(DRAFT_KEY);setComplete(true);}catch(reason){setError(reason instanceof Error?reason.message:"Unable to submit your application.");}finally{setBusy(false);}}

  if(complete)return <div><Navbar/><main className="admission-success"><div className="admission-success-mark"><Icon kind="check" size={34} color="var(--accent)"/></div><Tag accent>APPLICATION RECEIVED</Tag><h1>You’re on the list!</h1><p>Thanks {details.full_name.split(" ")[0]} — an advisor will contact you at <b>{details.email}</b> within one business day about {selectedCourse?.title}.</p><Link className="admission-button secondary" href="/">Back to home</Link></main><Footer/></div>;

  return <div><Navbar/><main className="admissions-page">
    <header className="admission-hero sx"><div><Tag accent>START YOUR APPLICATION</Tag><h1>Apply in four <span>simple steps.</span></h1></div><p>Tell us what you would like to study. Save your progress, return later, and an advisor will guide you from here.</p></header>
    <section className="admission-stepper sx" aria-label="Application progress">{STEPS.map(([number,title,subtitle],index)=>{const position=index+1;const state=position<step?"done":position===step?"current":"pending";return <button type="button" key={number} className={`admission-step ${state}`} onClick={()=>position<step&&setStep(position)} aria-current={state==="current"?"step":undefined}><span className="admission-step-number">{state==="done"?<Icon kind="check" size={18} color="#fff"/>:number}</span><b>{title}</b><small>{subtitle}</small></button>})}</section>
    <section className="admission-layout sx"><div className="admission-card">
      {step===1&&<div className="admission-panel"><PanelHead step="STEP 01" title="Your details" text="Tell us who you are so an advisor can reach you."/><div className="admission-fields"><label>Full name<input autoComplete="name" value={details.full_name} onChange={e=>setDetails({...details,full_name:e.target.value})} placeholder="Your full name"/></label><label>Email address<input type="email" autoComplete="email" value={details.email} onChange={e=>setDetails({...details,email:e.target.value})} placeholder="you@example.com"/></label><label>Phone number<input type="tel" autoComplete="tel" value={details.phone} onChange={e=>setDetails({...details,phone:e.target.value})} placeholder="+94 7X XXX XXXX"/></label></div></div>}
      {step===2&&<div className="admission-panel"><PanelHead step="STEP 02" title="Pick your course" text="Choose a programme first. We only show courses inside that programme."/><div className="admission-fields"><label>Highest qualification<select value={qualification} onChange={e=>setQualification(e.target.value)}>{QUALIFICATIONS.map(item=><option key={item}>{item}</option>)}</select></label><label>Programme<select required value={programmeId} onChange={e=>{setProgrammeId(e.target.value);setCourseId("");setStudyMode("full_time")}}><option value="">Choose a programme</option>{programmeOptions.map(item=><option value={item.programme_id} key={item.programme_id}>{item.name}</option>)}</select></label>{programmeId&&<label>Course<select required value={courseId} onChange={e=>chooseCourse(e.target.value)}><option value="">Choose a course in {selectedProgramme?.name}</option>{courseOptions.map(item=><option value={item.courseId} key={item.courseId}>{item.title} · from {formatLKR(item.priceFrom)}</option>)}</select></label>}{selectedCourse&&<><div className="admission-selection"><Icon kind="star" size={20} color="var(--accent)"/><div><b>{selectedCourse.title}</b><span>{selectedCourse.code} · {selectedDuration} · {selectedCourse.schoolName??selectedCourse.school}</span></div><strong>From {formatLKR(selectedPrice)}</strong></div>{enabledStudyOptions.length>1&&<div className="admission-study-options" role="group" aria-label="Study option">{enabledStudyOptions.map(option=><button type="button" key={option.study_mode} className={option.study_mode===(selectedStudyOption?.study_mode??studyMode)?"selected":""} onClick={()=>setStudyMode(option.study_mode)}><span>{option.study_mode==="full_time"?"Full time":"Part time"}</span><b>{formatLKR(option.price)}</b><small>{option.duration}</small></button>)}</div>}</>}</div></div>}
      {step===3&&<div className="admission-panel"><PanelHead step="STEP 03 · OPTIONAL" title="Upload your results" text="Add an O/L, A/L, diploma, degree or other result now, or provide it later."/><label className="admission-upload"><input type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={e=>chooseDocument(e.target.files?.[0])}/><span className="admission-upload-icon"><Icon kind="book" size={28} color="var(--accent)"/></span><b>{document?document.name:"Choose a result document"}</b><small>{document?`${(document.size/1024/1024).toFixed(1)} MB · Click to replace`:"PDF, JPG or PNG · maximum 10 MB"}</small></label>{document&&<button type="button" className="admission-remove-file" onClick={()=>setDocument(null)}>Remove document</button>}</div>}
      {step===4&&<div className="admission-panel"><PanelHead step="STEP 04" title="Reserve & Pay" text="Review your details and reserve your place at the current course fee."/><dl className="admission-review">{[["Name",details.full_name],["Email",details.email],["Phone",details.phone],["Programme",selectedProgramme?.name||"—"],["Course",selectedCourse?.title||"—"],["Study option",selectedStudyOption?.study_mode==="part_time"?"Part time":"Full time"],["Result document",document?.name||"Not uploaded — provide later"]].map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><div className="admission-fee"><span><small>COURSE FEE</small><b>{selectedDuration}</b></span><strong>{formatLKR(selectedPrice)}</strong></div><div className="admission-consent"><Icon kind="check" size={18} color="var(--accent)"/><span>Your place will be reserved and our admissions team will contact you with the available payment options.</span></div></div>}
      {error&&<p className="admission-error" role="alert">{error}</p>}{!catalogueAvailable&&<p className="admission-error" role="alert">The programme catalogue is temporarily unavailable. Please try again shortly.</p>}
      <nav className="admission-nav"><button type="button" className="admission-button secondary" disabled={step===1||busy} onClick={()=>setStep(v=>Math.max(1,v-1))}>← Back</button><span className="admission-save-status">{saved?"Progress saved":""}</span><button type="button" className="admission-button ghost" disabled={busy} onClick={()=>saveDraft(true)}>Save & exit</button>{step<4?<button type="button" className="admission-button primary" disabled={!catalogueAvailable||(step===1&&!stepOneValid)||(step===2&&!stepTwoValid)} onClick={()=>setStep(v=>Math.min(4,v+1))}>Continue to step {step+1} →</button>:<button type="button" className="admission-button primary" disabled={busy||!stepOneValid||!stepTwoValid} onClick={submit}>{busy?"Reserving…":"Reserve my seat →"}</button>}</nav>
    </div><aside className="admission-aside"><div className="admission-help-card"><span>PERSONAL GUIDANCE</span><h3>Need a hand?</h3><p>Our admissions advisors can help you choose the right programme and course.</p><a href="tel:+94711993331">+94 71 199 3331 →</a></div><div className="admission-benefits"><span>WHAT HAPPENS NEXT</span><ol><li>We review your application</li><li>An advisor contacts you</li><li>We confirm entry requirements</li><li>You complete enrolment</li></ol></div></aside></section>
  </main></div>;
}

function PanelHead({step,title,text}:{step:string;title:string;text:string}){return <div className="admission-panel-head"><span>{step}</span><h2>{title}</h2><p>{text}</p></div>}
