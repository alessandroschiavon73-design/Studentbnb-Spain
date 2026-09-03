document.addEventListener('DOMContentLoaded',()=>{
  const form=document.querySelector('#publish-form');if(!form)return;
  const money=v=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(Number(v)||0);
  const heading=document.querySelector('.form-heading h1'),intro=document.querySelector('.form-heading p'),kicker=document.querySelector('.form-heading .kicker');
  if(kicker)kicker.textContent='Estancias temporales para estudiantes';
  if(heading)heading.textContent='Publica una estancia StudentBnB';
  if(intro)intro.textContent='Ofrece la vivienda para una prueba de una semana, dos semanas o un mes, con precios y condiciones claras.';
  const price=document.querySelector('#price'),priceLabel=document.querySelector('label[for="price"]');
  if(priceLabel)priceLabel.textContent='Alquiler mensual de referencia (€) *';
  const minimum=document.querySelector('#minimumStay'),minimumLabel=document.querySelector('label[for="minimumStay"]');
  if(minimumLabel)minimumLabel.textContent='Duración disponible *';
  if(minimum){minimum.placeholder='1 semana / 2 semanas / 1 mes';minimum.value=minimum.value&&minimum.value!=='6 meses'?minimum.value:'1 semana / 2 semanas / 1 mes'}
  const notice=document.querySelector('#notice');if(notice){notice.required=false;notice.closest('.field')?.classList.add('hidden')}
  if(price&&!document.querySelector('#studentbnb-pricing-panel')){
    const box=document.createElement('div');box.id='studentbnb-pricing-panel';box.style.cssText='margin:22px 0 18px;padding:18px;border:1px solid #9fd8d2;border-radius:14px;background:#f0fbf9';
    box.innerHTML='<h3>Precios StudentBnB</h3><p>Define los precios para 1 semana, 2 semanas y 1 mes. La propuesta parte del alquiler mensual de referencia con un incremento ajustable.</p><div class="form-grid three"><div class="field"><label for="studentbnb-uplift">Incremento</label><select id="studentbnb-uplift" name="studentbnbUplift"><option value="20">+20%</option><option value="25" selected>+25% recomendado</option><option value="30">+30%</option></select></div><div class="field"><label for="studentbnb-price-7">7 días (€) *</label><input id="studentbnb-price-7" name="studentbnbPrice7" type="number" min="1" required></div><div class="field"><label for="studentbnb-price-14">14 días (€) *</label><input id="studentbnb-price-14" name="studentbnbPrice14" type="number" min="1" required></div><div class="field"><label for="studentbnb-price-30">30 días (€) *</label><input id="studentbnb-price-30" name="studentbnbPrice30" type="number" min="1" required></div></div><p id="studentbnb-price-summary" class="micro-note"></p>';
    price.closest('.form-grid')?.after(box);
  }
  const box=document.querySelector('#studentbnb-pricing-panel');if(!price||!box)return;
  const uplift=box.querySelector('#studentbnb-uplift'),p7=box.querySelector('#studentbnb-price-7'),p14=box.querySelector('#studentbnb-price-14'),p30=box.querySelector('#studentbnb-price-30'),summary=box.querySelector('#studentbnb-price-summary');
  const calc=()=>{const monthly=Number(price.value)||0,pct=Number(uplift.value)||25;if(!monthly){summary.textContent='Introduce primero el alquiler mensual de referencia.';return}const v30=Math.round(monthly*(1+pct/100)),v14=Math.round(v30/2),v7=Math.round(v30/4);if(!p7.dataset.edited)p7.value=v7;if(!p14.dataset.edited)p14.value=v14;if(!p30.dataset.edited)p30.value=v30;summary.textContent=`Referencia ${money(monthly)} → StudentBnB +${pct}%: ${money(v7)} / 7 días, ${money(v14)} / 14 días, ${money(v30)} / 30 días.`};
  price.addEventListener('input',calc);uplift.addEventListener('change',()=>{[p7,p14,p30].forEach(x=>delete x.dataset.edited);calc()});[p7,p14,p30].forEach(x=>x.addEventListener('input',()=>x.dataset.edited='1'));calc();
});
