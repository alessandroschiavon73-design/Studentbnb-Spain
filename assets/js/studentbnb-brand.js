document.addEventListener('DOMContentLoaded',()=>{
  const hero=document.querySelector('.home-hero .hero-copy');
  const brand=document.querySelector('.site-header .brand');if(brand)brand.setAttribute('aria-label','StudentBnB home');
  if(hero){
    document.title='StudentBnB — Alojamiento temporal para estudiantes | 1 semana, 2 semanas o 1 mes';
    const meta=document.querySelector('meta[name="description"]');if(meta)meta.setAttribute('content','Alojamiento temporal para estudiantes en residencias, pisos compartidos y casas de estudiantes. Encuentra una habitación por una semana, dos semanas o un mes para Erasmus, prácticas o estancias universitarias cortas.');
    const h=hero.querySelector('h1'),p=hero.querySelector(':scope > p');hero.querySelectorAll('.studentbnb-tagline,.studentbnb-duration-options').forEach(el=>el.remove());
    if(h){h.innerHTML='Vive por un tiempo la <span>vida universitaria.</span>';const t=document.createElement('div');t.className='studentbnb-tagline';t.textContent='Tu estancia temporal, entre estudiantes.';h.before(t);}
    if(p){p.classList.add('studentbnb-concept');p.textContent='Encuentra una habitación en una residencia, una casa compartida por estudiantes o un piso universitario para Erasmus, prácticas, cursos, exámenes o unas semanas en otra ciudad.';const d=document.createElement('div');d.className='studentbnb-duration-options';d.innerHTML='<strong>1 semana</strong><span>•</span><strong>2 semanas</strong><span>•</span><strong>1 mes</strong>';p.after(d);}
    const sh=hero.querySelector('.search-card h2');if(sh)sh.textContent='¿Dónde quieres alojarte?';
  }
  const intl=document.querySelector('.footer-international > strong');if(intl)intl.textContent='Para estancias más largas: CasaStudent';
  const copy=document.querySelector('.footer-bottom span:first-child');if(copy)copy.textContent='© 2026 StudentBnB';
  const login=document.querySelector('#login-title');if(login)login.textContent='Accede a StudentBnB';
  const f=document.querySelector('.site-footer .container')||document.querySelector('footer');if(f&&!f.querySelector('.casastudent-family')){const b=document.createElement('div');b.className='casastudent-family';b.innerHTML='StudentBnB está dedicado a estancias temporales dentro de la comunidad estudiantil. Para una vivienda más estable visita <a href="https://casastudent.es/">CasaStudent ↗</a>.';f.appendChild(b)}
});
