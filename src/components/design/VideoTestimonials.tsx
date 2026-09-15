'use client';

import { useEffect, useRef, useState } from 'react';
import type { Testimonial } from '../../data/testimonials';
import './video-testimonials.css';

export default function VideoTestimonials({ items }: { items: Testimonial[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [playError, setPlayError] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      modal?.close();
      document.body.style.overflow = previous;
      trigger.current?.focus();
    };
  }, [selected]);

  const close = () => { video.current?.pause(); setSelected(null); };
  const move = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    const gap = Number.parseFloat(getComputedStyle(element).gap) || 0;
    element.scrollBy({ left: direction * ((element.firstElementChild as HTMLElement)?.offsetWidth + gap || element.clientWidth), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  if (!items.length) return null;
  return <section className="student-stories" aria-labelledby="student-stories-heading">
    <div className="student-stories-inner">
      <header className="student-stories-heading">
        <div><span className="student-stories-eyebrow">THE INSPIRE EXPERIENCE</span><h2 id="student-stories-heading">Real students. Their stories.</h2><p>A closer look at learning with Inspire, from the people living it.</p></div>
        {items.length > 1 && <div className="student-stories-controls"><button type="button" onClick={() => move(-1)} disabled={index === 0} aria-label="Previous testimonials">←</button><button type="button" onClick={() => move(1)} disabled={index >= items.length - 1} aria-label="Next testimonials">→</button></div>}
      </header>
      <div className="student-stories-rail" ref={rail} role="region" aria-label="Student testimonial carousel" tabIndex={0} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }} onScroll={() => {
        const element = rail.current;
        if (!element) return;
        const width = (element.firstElementChild as HTMLElement)?.offsetWidth + (Number.parseFloat(getComputedStyle(element).gap) || 0);
        setIndex(element.scrollLeft + element.clientWidth >= element.scrollWidth - 4 ? items.length - 1 : Math.round(element.scrollLeft / width));
      }}>
        {items.map((item) => <article className="student-story-card" key={item.testimonial_id}>
          <button type="button" className="student-story-poster" aria-label={`Watch ${item.name}'s testimonial`} onClick={(event) => { trigger.current = event.currentTarget; setPlayError(false); setSelected(item); }}>
            <img src={item.thumbnail_url} alt={item.name} loading="lazy" />
            <span className="student-story-label">STUDENT STORIES <span>↗</span></span>
            <span className="student-story-play" aria-hidden="true">▶</span>
            <span className="student-story-watch">Watch the story <span>↗</span></span>
          </button>
          <div className="student-story-copy"><span>{item.programme} · Inspire College</span><h3>{item.name}</h3><p>{item.caption}</p></div>
        </article>)}
      </div>
      <div className="student-stories-foot"><span>Every journey starts somewhere. Discover theirs.</span><span aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span></div>
    </div>
    {selected && <dialog ref={dialog} className="student-story-dialog" aria-labelledby="student-story-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="student-story-player"><header><div><span>{selected.programme} · Student story</span><h3 id="student-story-title">{selected.name}</h3></div><button type="button" onClick={close} aria-label="Close video" autoFocus>✕</button></header>
        <video key={selected.video_url} ref={video} controls autoPlay playsInline preload="metadata" poster={selected.thumbnail_url} onError={() => setPlayError(true)} src={selected.video_url} />
        {playError && <p role="alert">This video could not load. <a href={selected.video_url} target="_blank" rel="noreferrer">Open video directly</a></p>}
        <p>{selected.caption}</p>
      </div>
    </dialog>}
  </section>;
}
