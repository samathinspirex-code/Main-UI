'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Testimonial } from '../../data/testimonials';
import { Icon } from '../ui/Icon';
import './video-testimonials.css';

const NIDARSHANA = 'nidarshana';

export default function VideoTestimonials({ items }: { items: Testimonial[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const dragStart = useRef<number | null>(null);
  const stories = useMemo(() => [...items].sort((a, b) => a.position - b.position), [items]);
  const initial = Math.max(0, stories.findIndex((item) => item.name.toLowerCase().includes(NIDARSHANA)));
  const [active, setActive] = useState(initial);
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [playError, setPlayError] = useState(false);

  useEffect(() => setActive(initial), [initial]);
  useEffect(() => {
    if (stories.length < 2 || selected) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % stories.length);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [active, selected, stories.length]);
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

  if (!stories.length) return null;

  const move = (direction: number) => setActive((current) => (current + direction + stories.length) % stories.length);
  const close = () => { video.current?.pause(); setSelected(null); };
  const relativePosition = (itemIndex: number) => {
    let difference = itemIndex - active;
    if (difference > stories.length / 2) difference -= stories.length;
    if (difference < -stories.length / 2) difference += stories.length;
    return difference;
  };
  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
  };
  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const distance = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(distance) >= 45) move(distance < 0 ? 1 : -1);
  };

  return <section className="student-stories" aria-labelledby="student-stories-heading">
    <div className="student-stories-inner">
      <header className="student-stories-heading" style={{ textAlign: 'center' }}>
        <div>
          <span className="student-stories-eyebrow">THE INSPIRE EXPERIENCE</span>
          <h2 id="student-stories-heading">Real students. Their stories.</h2>
          <p>A closer look at learning with Inspire, from the people living it.</p>
        </div>
      </header>

      <div
        className="student-stories-stage"
        role="region"
        aria-label="Student testimonial carousel. Drag horizontally or use the arrow buttons."
        tabIndex={0}
        onPointerDown={beginDrag}
        onPointerUp={finishDrag}
        onPointerCancel={() => { dragStart.current = null; }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
      >
        {stories.map((item, itemIndex) => {
          const offset = relativePosition(itemIndex);
          const isActive = itemIndex === active;
          return <article
            className={`student-story-card${isActive ? ' is-active' : ''}${offset === -1 ? ' is-before' : ''}${offset === 1 ? ' is-after' : ''}${Math.abs(offset) > 1 ? ' is-hidden' : ''}`}
            key={item.testimonial_id}
            aria-hidden={Math.abs(offset) > 1}
          >
            <button
              type="button"
              className="student-story-poster"
              tabIndex={isActive ? 0 : -1}
              aria-label={`Watch ${item.name}'s testimonial`}
              onClick={(event) => {
                if (!isActive) { setActive(itemIndex); return; }
                trigger.current = event.currentTarget;
                setPlayError(false);
                setSelected(item);
              }}
            >
              {item.thumbnail_url.startsWith('/')
                ? <Image src={item.thumbnail_url} alt="" draggable={false} fill sizes="(max-width: 730px) calc(100vw - 170px), 560px" />
                : <img src={item.thumbnail_url} alt="" draggable={false} loading="lazy" decoding="async" />}
              <span className="student-story-label">STUDENT STORY <span>↗</span></span>
              <span className="student-story-play" aria-hidden="true">▶</span>
              <span className="student-story-watch">Watch the story <span>↗</span></span>
            </button>
            <div className="student-story-copy">
              <span>{item.programme} · Inspire College</span>
              <h3>{item.name}</h3>
              <p>{item.caption}</p>
            </div>
          </article>;
        })}
      </div>

      <div className="student-stories-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><Icon kind="arrow_left" size={20} /></button>
        <span aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => move(1)} aria-label="Next testimonial"><Icon kind="arrow_right" size={20} /></button>
      </div>
      <p className="student-stories-hint">Drag or move sideways to discover the next story.</p>
    </div>

    {selected && <dialog ref={dialog} className="student-story-dialog" aria-labelledby="student-story-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="student-story-player">
        <header><div><span>{selected.programme} · Student story</span><h3 id="student-story-title">{selected.name}</h3></div><button type="button" onClick={close} aria-label="Close video" autoFocus>✕</button></header>
        <video key={selected.video_url} ref={video} controls autoPlay playsInline preload="metadata" poster={selected.thumbnail_url} onError={() => setPlayError(true)} src={selected.video_url} />
        {playError && <p role="alert">This video could not load. <a href={selected.video_url} target="_blank" rel="noreferrer">Open video directly</a></p>}
        <p>{selected.caption}</p>
      </div>
    </dialog>}
  </section>;
}
