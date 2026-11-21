'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import type { Organization } from '@/lib/microcms';

interface Props {
  lang: string;
  organizations: Organization[];
}

export default function UniversityMap({ lang, organizations }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selected, setSelected] = useState<Organization | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    if (!mapRef.current) return;
    let fadeTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowHint(true);
          fadeTimer = setTimeout(() => {
            setHintVisible(false);
            hideTimer = setTimeout(() => setShowHint(false), 500);
          }, 10000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(mapRef.current);

    return () => {
      observer.disconnect();
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const closeHint = () => {
    setHintVisible(false);
    setTimeout(() => setShowHint(false), 500);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center: [38.5, 137.0],
      zoom: 5,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: false,
      zoomSnap: 0,
      zoomDelta: 0.5,
    });

    mapRef.current.addEventListener('wheel', (e: WheelEvent) => {
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault();
        const newZoom = Math.max(1, Math.min(18, map.getZoom() + (-e.deltaY * 0.010)));
        map.setZoom(newZoom, { animate: false });
      }
    }, { passive: false });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    organizations.forEach((uni) => {
      const icon = L.divIcon({
        html: `<div style="width:12px;height:12px;background:#0f172a;border-radius:50%;border:2.5px solid white;box-shadow:0 1px 6px rgba(0,0,0,0.35);cursor:pointer;"></div>`,
        className: '',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        tooltipAnchor: [0, -10],
      });

      const marker = L.marker([uni.lat, uni.lng], { icon }).addTo(map);

      marker.bindTooltip(lang === 'ja' ? uni.name_ja : uni.name_en, {
        permanent: false,
        direction: 'top',
        className: 'psma-map-tooltip',
        offset: [0, -4],
      });

      marker.on('click', () => setSelected(uni));
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lang]);

  return (
    <>
      <style>{`
        .psma-map-tooltip {
          background: #0f172a !important;
          color: white !important;
          border: none !important;
          border-radius: 0 !important;
          font-size: 11px !important;
          letter-spacing: 0.08em !important;
          padding: 5px 10px !important;
          font-weight: 500 !important;
          white-space: nowrap !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        }
        .psma-map-tooltip::before {
          border-top-color: #0f172a !important;
        }
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(255,255,255,0.7) !important;
        }
        .leaflet-control-zoom a {
          border-radius: 0 !important;
          border-color: #e2e8f0 !important;
          color: #475569 !important;
        }
      `}</style>

      <div className="relative">
        <div ref={mapRef} style={{ height: '480px', width: '100%' }} className="bg-slate-100" />
        {showHint && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none"
            style={{ opacity: hintVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
          >
            <div className="flex items-center gap-3 bg-white/85 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-md pointer-events-auto">
              <span className="text-[12px] text-slate-600 font-medium whitespace-nowrap">
                Ctrl / ⌘ + スクロールで地図を拡大・縮小できます
              </span>
              <button
                onClick={closeHint}
                className="text-slate-400 hover:text-slate-600 transition-colors text-base leading-none shrink-0"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white max-w-md w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
              {selected.photo?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={selected.photo.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-slate-300 text-[10px] tracking-[0.25em] uppercase font-medium">Photo</span>
              )}
            </div>

            <div className="p-8">
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-2">
                {lang === 'ja' ? selected.name_ja : selected.name_en}
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {lang === 'ja' ? selected.organization_ja : selected.organization_en}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {lang === 'ja' ? selected.description_ja : selected.description_en}
              </p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
