import React, { useRef, useEffect } from 'react';
import styles from './Contanner.module.css';
import Card from '../Card/card';

export default function Contanner({ filtro, busca }) {
  const scrollRef = useRef(null);
  const speed = 1;

  // =============================
  //  NOVOS VÍDEOS (VIDEOCLIPES)
  // =============================
  const categorias = [
    {
      titulo: 'Pop',
      chave: 'pop',
      videos: [
        { id: 'fHI8X4OXluQ', title: 'The Weeknd - Blinding Lights' },
        { id: 'JGwWNGJdvx8', title: 'Ed Sheeran - Shape of You' },
        { id: '0yW7w8F2TVA', title: 'Ariana Grande - 7 Rings' },
        { id: 'hT_nvWreIhg', title: 'OneRepublic - Counting Stars' },
        { id: 'pXRviuL6vMY', title: 'Twenty One Pilots - Stressed Out' },
        { id: 'K5KAc5CoCuk', title: 'Katy Perry - Roar' },
        { id: 'ktvTqknDobU', title: 'Imagine Dragons - Radioactive' },
        { id: '2Vv-BfVoq4g', title: 'Ed Sheeran - Perfect' },
      ],
    },
    {
      titulo: 'Rock',
      chave: 'rock',
      videos: [
        { id: 'eVTXPUF4Oz4', title: 'Linkin Park - In The End' },
        { id: 'hTWKbfoikeg', title: 'Nirvana - Smells Like Teen Spirit' },
        { id: 'kXYiU_JCYtU', title: 'Linkin Park - Numb' },
        { id: '8SbUC-UaAxE', title: 'Guns N’ Roses - November Rain' },
        { id: 'FJfFZqTlWrQ', title: 'Bon Jovi - Livin’ On A Prayer' },
        { id: 'Zi_XLOBDo_Y', title: 'Queen - Bohemian Rhapsody' },
        { id: 'YQHsXMglC9A', title: 'Adele - Hello (pop/rock)' },
        { id: 'ktvTqknDobU', title: 'Imagine Dragons - Radioactive' },
      ],
    },
    {
      titulo: 'Hip-Hop / Rap',
      chave: 'rap',
      videos: [
        { id: 'uelHwf8o7_U', title: 'Eminem - Love The Way You Lie' },
        { id: 'ty62YzGryU4', title: 'Post Malone - Rockstar' },
        { id: 'C-u5WLJ9Yk4', title: 'Eminem - Without Me' },
        { id: '3AtDnEC4zak', title: 'Charlie Puth - See You Again (feat. Wiz Khalifa)' },
        { id: 'YVkUvmDQ3HY', title: 'Eminem - Lose Yourself' },
        { id: 'E6I-KG0o9s8', title: 'Drake - Hotline Bling' },
        { id: 'Dor96qMTFnE', title: 'Kendrick Lamar - HUMBLE.' },
        { id: 'kt0g4dWxEJE', title: 'Travis Scott - SICKO MODE' },
      ],
    },
  ];

  // =============================
  //  CARROSSEL AUTOMÁTICO
  // =============================
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId;
    let paused = false;

    const step = () => {
      if (!paused) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    el.addEventListener('mouseenter', () => (paused = true));
    el.addEventListener('mouseleave', () => (paused = false));

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <main className={styles.main}>
      {categorias
        .filter(cat => !filtro || cat.chave === filtro)
        .map(cat => {
          const listaFiltrada = cat.videos.filter(v =>
            !busca || v.title.toLowerCase().includes(busca.toLowerCase())
          );

          if (listaFiltrada.length === 0) return null;

          return (
            <section key={cat.chave} className={styles.section}>
              <div className="container">
                <h2 className={styles.sectionTitle}>{cat.titulo}</h2>

                <div className={styles.carouselWrap}>
                  <div className={styles.carousel} ref={scrollRef}>
                    {listaFiltrada.map(video => (
                      <Card key={video.id} youtubeId={video.id} title={video.title} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

      <section className={styles.storySection}>
        <div className="container">
          <h3 className={styles.storyTitle}>A história do Senacflix</h3>
          <p className={styles.storyText}>
            O Senacflix agora apresenta uma seleção musical incrível, com clipes famosos de Pop, Rock e Rap.
          </p>
        </div>
      </section>
    </main>
  );
}
