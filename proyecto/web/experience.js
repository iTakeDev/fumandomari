(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const root = document.documentElement;
  const motion = window.SiteMotion;
  const UI = window.FumandoMariUI = { scroller: null };
  const motionButton = $('#motion-toggle');
  function updateMotionButton() {
    motionButton.textContent = window.Locale.t(motion.matches ? 'Animaciones desactivadas' : 'Animaciones activadas');
    motionButton.setAttribute('aria-pressed', String(!motion.matches));
  }
  motionButton.addEventListener('click', () => window.SiteMotion.setReduced(!motion.matches));
  motion.addEventListener('change', updateMotionButton);
  document.addEventListener('FumandoMari:language', updateMotionButton);
  updateMotionButton();
  // Deliberate defaults: every page load starts in Spanish and dark mode.
  root.dataset.theme = 'dark';
  const menuButton = $('.menu-toggle');
  const menu = $('#site-menu');
  const languageButton = $('#language-toggle');
  const languageMenu = $('#language-menu');
  $$('.menu-links a', menu).forEach((link,index) => link.style.setProperty('--menu-order', index + 1));
  let menuOpen = false;
  let languageOpen = false;
  function setMenu(open) {
    menuOpen = open;
    menu.classList.toggle('open', open); menu.inert = !open;
    menu.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', window.Locale.t(open ? 'Cerrar menú' : 'Abrir menú'));
    if (open) setLanguageMenu(false);
  }
  function setLanguageMenu(open) {
    languageOpen = open; languageMenu.classList.toggle('open', open); languageMenu.inert = !open;
    languageButton.setAttribute('aria-expanded', String(open));
  }
  menuButton.addEventListener('click', () => setMenu(!menuOpen));
  document.addEventListener('FumandoMari:close-menu', () => setMenu(false));
  languageButton.addEventListener('click', () => { setMenu(false); setLanguageMenu(!languageOpen); });
  document.addEventListener('click', event => {
    if (menuOpen && !$('.header').contains(event.target)) setMenu(false);
    if (languageOpen && !$('.language-control').contains(event.target)) setLanguageMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (languageOpen) { setLanguageMenu(false); languageButton.focus(); }
    else if (menuOpen) { setMenu(false); menuButton.focus(); }
  });
  $('.header').addEventListener('focusout', () => setTimeout(() => {
    if (!document.activeElement.closest('.header')) setMenu(false);
    if (!document.activeElement.closest('.language-control')) setLanguageMenu(false);
  }, 0));
  languageButton.addEventListener('keydown', event => { if(event.key==='ArrowDown'){event.preventDefault();setLanguageMenu(true);$('[data-language]', languageMenu).focus();} });
  $$('[data-language]').forEach((button,index,buttons) => {
    button.addEventListener('keydown', event => {
      if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
        event.preventDefault();
        const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;
        buttons[next].focus();
      }
    });
    button.addEventListener('click', () => {
      const language = button.dataset.language;
      setLanguageMenu(false); languageButton.focus();
      if (language === window.Locale.language) return;
      window.Locale.set(language);
      $('#current-flag').src=`assets/flag-${language}.svg`;
      $('#current-flag').alt=language==='es'?'Español':'English';
      $$('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));
      updateThemeLabel();
      if(!motion.matches) {
        [$('#main'),$('.footer')].forEach(el=>el.animate([{opacity:.18,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:520,easing:'cubic-bezier(.16,1,.3,1)'}));
        $('#current-flag').animate([{opacity:0,transform:'translateY(-7px) rotate(-9deg)'},{opacity:1,transform:'translateY(0) rotate(0)'}],{duration:360,easing:'cubic-bezier(.16,1,.3,1)'});
      }
    });
  });

  // Smooth wheel scrolling with native touch momentum, including Safari.
  function configureScroll() {
    UI.scroller?.destroy(); UI.scroller=null;
    if (!motion.matches && typeof window.Lenis === 'function') {
      UI.scroller=new window.Lenis({ autoRaf:true, lerp:.09, smoothWheel:true, syncTouch:false, touchMultiplier:1, wheelMultiplier:.85, anchors:false, prevent:node=>Boolean(node.closest?.('[data-lenis-prevent],.menu-inner,.language-menu,dialog,textarea,select')) });
    }
  }
  configureScroll();
  if(root.classList.contains('intro-pending')) {
    UI.scroller?.stop();
    document.addEventListener('FumandoMari:intro-ready',()=>UI.scroller?.start(),{once:true});
  }
  motion.addEventListener('change',configureScroll);
  $$('a[href^="#"]').forEach(link => link.addEventListener('click',event=>{
    const hash=link.getAttribute('href'); const target=$(hash);
    if(!target)return;
    event.preventDefault();setMenu(false);
    const offset=-($('.nav-wrap').offsetHeight+24);
    const finish=()=>{
      target.classList.remove('section-arriving');void target.offsetWidth;target.classList.add('section-arriving');
      target.classList.add('visible');
      if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
    };
    if(UI.scroller)UI.scroller.scrollTo(target,{offset,duration:1.1,easing:t=>1-Math.pow(1-t,4),onComplete:finish});
    else {window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY+offset,behavior:motion.matches?'instant':'smooth'});finish();}
    try{history.replaceState(null,'',hash);}catch{/* file:// can restrict history changes */}
  }));

  // A faint, sharply centered lavender halo follows a fine pointer only.
  const glow=$('#pointer-glow'); const finePointer=matchMedia('(pointer:fine)');
  let pointerFrame=0, pointerX=innerWidth/2,pointerY=innerHeight/2;
  window.addEventListener('pointermove',event=>{
    if(!finePointer.matches||motion.matches||event.pointerType==='touch')return;
    pointerX=event.clientX;pointerY=event.clientY;
    if(pointerFrame)return;
    pointerFrame=requestAnimationFrame(()=>{
      glow.style.setProperty('--pointer-x',`${pointerX}px`);glow.style.setProperty('--pointer-y',`${pointerY}px`);
      glow.classList.add('is-visible');pointerFrame=0;
    });
  },{passive:true});
  document.addEventListener('mouseleave',()=>glow.classList.remove('is-visible'));

  const themeButton=$('#theme-toggle');let themeBusy=false;
  function updateThemeLabel() {
    const isDark=root.dataset.theme==='dark';
    $('use',themeButton).setAttribute('href',isDark?'#i-moon':'#i-sun');
    const label=window.Locale.t(isDark?'Cambiar a tema claro':'Cambiar a tema oscuro');
    themeButton.setAttribute('aria-label',label);themeButton.title=label;
    $('meta[name="theme-color"]').content=isDark?'#0a0a0d':'#f9f9fc';
  }
  themeButton.addEventListener('click',async()=>{
    if(themeBusy)return;
    const next=root.dataset.theme==='dark'?'light':'dark';
    const rect=themeButton.getBoundingClientRect();const x=rect.left+rect.width/2,y=rect.top+rect.height/2;
    const radius=Math.ceil(Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y)))+12;
    const clip=[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`];
    const change=()=>{root.dataset.theme=next;updateThemeLabel();};
    if(motion.matches){change();return;}
    themeBusy=true;root.classList.add('theme-changing');
    UI.scroller?.stop();
    try{
      if(typeof document.startViewTransition==='function') {
        const transition=document.startViewTransition(change);
        await transition.ready;
        await root.animate({clipPath:clip},{duration:850,easing:'cubic-bezier(.65,0,.18,1)',pseudoElement:'::view-transition-new(root)'}).finished;
        await transition.finished;
      } else {
        const wipe=$('#theme-wipe');wipe.style.setProperty('--wipe-color',next==='dark'?'#0a0a0d':'#f9f9fc');wipe.style.visibility='visible';
        const expand=wipe.animate({clipPath:clip},{duration:650,easing:'cubic-bezier(.65,0,.18,1)',fill:'forwards'});
        await expand.finished;change();
        await wipe.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards'}).finished;
        wipe.getAnimations().forEach(a=>a.cancel());wipe.style.visibility='hidden';
      }
    }catch{
      change();const wipe=$('#theme-wipe');wipe.getAnimations().forEach(a=>a.cancel());wipe.style.visibility='hidden';
    }finally{
      themeBusy=false;root.classList.remove('theme-changing');if(!document.body.classList.contains('dialog-open'))UI.scroller?.start();
    }
  });
  updateThemeLabel();

  // This is an authorship credit, not a cookie consent or tracking prompt.
  const notice=$('#creator-notice');
  let accepted=false;try{accepted=sessionStorage.getItem('FumandoMari-itake-credit')==='accepted';}catch{}
  if(!accepted) {
    const showCredit=()=>setTimeout(()=>{notice.inert=false;notice.classList.add('show');},1100);
    if(root.classList.contains('intro-pending'))document.addEventListener('FumandoMari:intro-ready',showCredit,{once:true});
    else showCredit();
  }
  $('#creator-accept').addEventListener('click',()=>{
    notice.classList.remove('show');notice.inert=true;
    try{sessionStorage.setItem('FumandoMari-itake-credit','accepted');}catch{}
    $('#theme-toggle').focus({preventScroll:true});
  });
  window.Locale.apply(document.body);
})();
