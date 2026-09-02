document.addEventListener('DOMContentLoaded',()=>{
  const base='https://studentbnb.es/';

  const removeHeaderFaqAndContacts=()=>{
    document.querySelectorAll('.main-nav a').forEach(link=>{
      const href=(link.getAttribute('href')||'').toLowerCase();
      const label=(link.textContent||'').trim().toLowerCase();
      if(/#(?:faq|contacto|contact|contacts)$/.test(href)||['faq','contacto','contact'].includes(label)) link.remove();
    });
  };

  const replaceBrand=()=>{
    const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
    while((n=w.nextNode())) if(!n.parentElement?.closest('.dual-portal-footer')) n.nodeValue=n.nodeValue.replaceAll('CasaStudent','StudentBnB');
    document.querySelectorAll('[aria-label]').forEach(e=>{if(!e.closest('.dual-portal-footer'))e.setAttribute('aria-label',e.getAttribute('aria-label').replaceAll('CasaStudent','StudentBnB'))});
    document.querySelectorAll('.brand').forEach(b=>{
      const labels=[...b.children].filter(e=>e.tagName==='SPAN'&&!e.classList.contains('brand-icon'));
      const l=labels[labels.length-1];if(l)l.innerHTML='Student<strong>BnB</strong><small>Prueba antes de elegir</small>';
    });
  };

  const adaptRequestPage=()=>{
    const form=document.querySelector('#student-request-form');if(!form)return;
    const budget=document.querySelector('label[for="request-budget"]');if(budget)budget.textContent='Presupuesto máximo para la estancia (€) *';
    const durationLabel=document.querySelector('label[for="request-duration"]');if(durationLabel)durationLabel.textContent='Duración de la estancia *';
    const duration=document.querySelector('#request-duration');if(duration)duration.innerHTML='<option value="1 semana">1 semana</option><option value="2 semanas">2 semanas</option><option value="1 mes">1 mes</option>';
    const heading=document.querySelector('.form-heading h1');if(heading)heading.textContent='Encuentra casa y compañeros para tu estancia de prueba';
    const intro=document.querySelector('.form-heading p');if(intro)intro.textContent='Indica dónde quieres vivir, tu presupuesto y si quieres quedarte una semana, dos semanas o un mes.';
  };

  const money=value=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value||0);

  const adaptPublishPage=()=>{
    const form=document.querySelector('#publish-form');if(!form)return;
    const heading=document.querySelector('.form-heading h1');if(heading)heading.textContent='Publica una estancia StudentBnB';
    const intro=document.querySelector('.form-heading p');if(intro)intro.textContent='Ofrece la vivienda para una estancia de prueba de una semana, dos semanas o un mes, con precios y reglas claras.';
    const priceLabel=document.querySelector('label[for="price"]');if(priceLabel)priceLabel.textContent='Alquiler mensual de referencia (€) *';

    const price=document.querySelector('#price');
    const costSection=price?.closest('.form-section.card');
    if(costSection&&!document.querySelector('#studentbnb-pricing-panel')){
      const box=document.createElement('div');
      box.id='studentbnb-pricing-panel';
      box.className='studentbnb-crosspublish';
      box.style.cssText='margin:22px 0 18px;padding:18px;border:1px solid #9fd8d2;border-radius:14px;background:#f0fbf9';
      box.innerHTML='<h3 style="margin-top:0">Precios StudentBnB</h3><p>Define el precio para 1 semana, 2 semanas y 1 mes. Partimos del alquiler mensual de referencia y aplicamos una mayoración modificable.</p><div class="form-grid three"><div class="field"><label for="studentbnb-uplift">Mayoración</label><select id="studentbnb-uplift"><option value="20">+20%</option><option value="25" selected>+25% recomendado</option><option value="30">+30%</option></select></div><div class="field"><label for="studentbnb-price-7">7 días (€) *</label><input id="studentbnb-price-7" name="studentbnbPrice7" type="number" min="1" required></div><div class="field"><label for="studentbnb-price-14">14 días (€) *</label><input id="studentbnb-price-14" name="studentbnbPrice14" type="number" min="1" required></div><div class="field"><label for="studentbnb-price-30">30 días (€) *</label><input id="studentbnb-price-30" name="studentbnbPrice30" type="number" min="1" required></div></div><p id="studentbnb-price-summary" class="micro-note" style="margin-top:8px"></p>';
      const grid=price.closest('.form-grid');
      grid?.after(box);

      const uplift=box.querySelector('#studentbnb-uplift'),p7=box.querySelector('#studentbnb-price-7'),p14=box.querySelector('#studentbnb-price-14'),p30=box.querySelector('#studentbnb-price-30'),summary=box.querySelector('#studentbnb-price-summary');
      const calc=()=>{
        const monthly=Number(price.value||0),pct=Number(uplift.value||25);
        if(!monthly){summary.textContent='Introduce primero el alquiler mensual de referencia.';return;}
        const month=Math.round(monthly*(1+pct/100)),v7=Math.round(month/4),v14=Math.round(month/2);
        if(!p7.dataset.edited)p7.value=v7;if(!p14.dataset.edited)p14.value=v14;if(!p30.dataset.edited)p30.value=month;
        summary.textContent=`Referencia ${money(monthly)} → StudentBnB +${pct}%: ${money(v7)} / 7 días, ${money(v14)} / 14 días, ${money(month)} / 30 días.`;
      };
      price.addEventListener('input',calc);uplift.addEventListener('change',()=>{[p7,p14,p30].forEach(x=>delete x.dataset.edited);calc()});[p7,p14,p30].forEach(x=>x.addEventListener('input',()=>x.dataset.edited='1'));calc();
    }

    const contractLabel=document.querySelector('label[for="contract"]');if(contractLabel)contractLabel.textContent='Acuerdo / modalidad *';
    const contract=document.querySelector('#contract');if(contract)contract.placeholder='Ej. alojamiento temporal / estancia corta';
    const minLabel=document.querySelector('label[for="minimumStay"]');if(minLabel)minLabel.textContent='Duración disponible *';
    const minimum=document.querySelector('#minimumStay');if(minimum){minimum.placeholder='1 semana / 2 semanas / 1 mes';minimum.value=minimum.value||'1 semana / 2 semanas / 1 mes';}
    const noticeLabel=document.querySelector('label[for="notice"]');if(noticeLabel)noticeLabel.textContent='Reglas de cambio o cancelación *';
    const notice=document.querySelector('#notice');if(notice)notice.placeholder='Ej. a acordar antes de la estancia';
    const section=contract?.closest('.form-section.card');if(section){const h2=section.querySelector('h2'),p=section.querySelector(':scope > p');if(h2)h2.textContent='3. Duración, salida y servicios';if(p)p.textContent='Define condiciones sencillas y comprensibles para la estancia de prueba.';}
  };

  const adaptSolidarityPage=()=>{
    if(!/casa-solidaria\.html$/i.test(location.pathname))return;
    const heading=document.querySelector('main h1');if(heading)heading.textContent='Convivencia solidaria temporal';
    const p=[...document.querySelectorAll('main p')].find(x=>/persona mayor|personas mayores|alojamiento/i.test(x.textContent||''));
    if(p)p.textContent='StudentBnB conecta a personas con una habitación disponible y estudiantes interesados en una convivencia temporal, clara y respetuosa. El precio reducido y cualquier pequeña ayuda se acuerdan de antemano con límites precisos.';
  };

  replaceBrand();removeHeaderFaqAndContacts();adaptRequestPage();adaptPublishPage();adaptSolidarityPage();

  const hero=document.querySelector('.home-hero .hero-copy');if(hero){
    document.title='StudentBnB — Prueba antes de elegir';
    const m=document.querySelector('meta[name="description"]');if(m)m.content='Encuentra casa y compañeros, vive una semana, dos semanas o un mes y decide después si quieres quedarte.';
    const h=hero.querySelector('h1'),p=hero.querySelector(':scope > p');hero.querySelectorAll('.studentbnb-tagline,.studentbnb-duration-options').forEach(el=>el.remove());
    if(h)h.innerHTML='Primero las personas,<br><span>después la habitación.</span>';
    if(p){p.classList.add('studentbnb-concept');p.textContent='Una semana, dos semanas o un mes para conocer la casa y a las personas antes de decidir.';}
  }

  let c=document.querySelector('link[rel="canonical"]');if(!c){c=document.createElement('link');c.rel='canonical';document.head.appendChild(c)}c.href=base+(location.pathname==='/'?'':location.pathname.replace(/^\//,''))+location.search;
  const schema=document.querySelector('#studentbnb-website-schema');if(schema)schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:'StudentBnB',url:base,inLanguage:'es-ES'});
  const og=document.querySelector('meta[property="og:site_name"]');if(og)og.content='StudentBnB — Prueba antes de elegir';
  const links=document.querySelector('.footer-international .footer-country-links');if(links)links.innerHTML='<a href="https://studentbnb.it/">🇮🇹 Italia</a><a href="https://studentbnb.es/" aria-current="page">🇪🇸 España</a><a href="https://studentbnb.fr/">🇫🇷 France</a><a href="https://student-bnb.de/">🇩🇪 Deutschland</a><a href="https://studentbnb.pl/">🇵🇱 Polska</a><a href="https://studentbnb.pt/">🇵🇹 Portugal</a>';
  const intl=document.querySelector('.footer-international > strong');if(intl)intl.textContent='Para estancias más largas: CasaStudent';
  const copy=document.querySelector('.footer-bottom span:first-child');if(copy)copy.textContent='© 2026 StudentBnB';
  const login=document.querySelector('#login-title');if(login)login.textContent='Acceder a StudentBnB';
  const f=document.querySelector('.site-footer .container')||document.querySelector('footer');if(f&&!f.querySelector('.casastudent-family')){const b=document.createElement('div');b.className='casastudent-family';b.innerHTML='StudentBnB está pensado para estancias temporales dentro de la comunidad estudiantil. Para una solución más estable visita <a href="https://casastudent.es/">CasaStudent ↗</a>.';f.appendChild(b)}
});

(function(){
  const apply=()=>{
    const canonical=document.querySelector('link[rel="canonical"]')?.href||location.href;
    const description=document.querySelector('meta[name="description"]')?.content||'';
    let schema=document.querySelector('#studentbnb-webpage-schema');
    if(!schema){schema=document.createElement('script');schema.id='studentbnb-webpage-schema';schema.type='application/ld+json';document.head.appendChild(schema);}
    schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:document.title,url:canonical,description,inLanguage:document.documentElement.lang||'es-ES'});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0));else setTimeout(apply,0);
})();
