/* OneToken Website — Core JS */
(function(){
'use strict';

// roundRect polyfill
if(!CanvasRenderingContext2D.prototype.roundRect){
  CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){
    if(typeof r==='number') r=[r,r,r,r];
    if(!Array.isArray(r)) r=[0,0,0,0];
    const [tl,tr,br,bl]=[r[0]||0,r[1]||r[0]||0,r[2]||r[0]||0,r[3]||r[0]||0];
    this.moveTo(x+tl,y);
    this.lineTo(x+w-tr,y); this.quadraticCurveTo(x+w,y,x+w,y+tr);
    this.lineTo(x+w,y+h-br); this.quadraticCurveTo(x+w,y+h,x+w-br,y+h);
    this.lineTo(x+bl,y+h); this.quadraticCurveTo(x,y+h,x,y+h-bl);
    this.lineTo(x,y+tl); this.quadraticCurveTo(x,y,x+tl,y);
    this.closePath(); return this;
  };
}

// ========== PAGE NAV ==========
window.showPage = function(id){
  // Close mobile menu if open
  var nav = document.getElementById('mainNav');
  if(nav) nav.classList.remove('mobile-open');

  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const t = document.getElementById('page-'+id);
  if(t){ t.classList.add('active'); }

  // Highlight active nav. For swap-demo/market-demo highlight 'trade'
  var highlightPage = id;
  if(id === 'swap-demo' || id === 'market-demo') highlightPage = 'trade';

  document.querySelectorAll('.header-nav > li > a[data-page]').forEach(a=>{
    a.classList.toggle('active', a.dataset.page===highlightPage);
  });
  window.scrollTo({top:0,behavior:'smooth'});

  if(id==='wallet' && !t.innerHTML.trim()) renderWalletPage();
  if(id==='upay' && !t.innerHTML.trim()) renderUpayPage();
  // No more renderSwapPage — swap overview page is removed
  if(id==='help' && !t.innerHTML.trim()) renderHelpPage();
  if(id==='download' && !t.innerHTML.trim()) renderDownloadPage();
  if(id==='swap-demo') renderSwapDemoPage();
  if(id==='market-demo') renderMarketDemoPage();
  setTimeout(initReveal, 100);
};

// ========== MOBILE MENU ==========
window.toggleMobileMenu = function(){
  var nav = document.getElementById('mainNav');
  if(nav) nav.classList.toggle('mobile-open');
};

// ========== HEADER SCROLL ==========
window.addEventListener('scroll',function(){
  document.getElementById('siteHeader').classList.toggle('scrolled', window.scrollY>40);
});

// ========== SCROLL REVEAL ==========
function initReveal(){
  const obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); }});
  },{threshold:0.15});
  document.querySelectorAll('.reveal:not(.visible)').forEach(function(el){ obs.observe(el); });
}

// ========== UPAY TABS ==========
window.switchUpayTab = function(idx){
  document.querySelectorAll('.upay-tab').forEach(function(t,i){ t.classList.toggle('active',i===idx); });
  document.querySelectorAll('.upay-panel').forEach(function(p,i){ p.classList.toggle('active',i===idx); });
};

// ========== CAPABILITY MATRIX HOVER ==========
window.setCapMatrixActive = function(cap) {
  const isMobile = window.innerWidth <= 1024;
  if(isMobile) return; // ignore hover on mobile

  // Update center visual layer
  document.querySelectorAll('.matrix-visual-layer').forEach(l => l.classList.remove('active'));
  const activeLayer = document.querySelector('.mv-' + cap);
  if(activeLayer) activeLayer.classList.add('active');

  // Add subtle dim to non-hovered cards
  const grid = document.getElementById('capMatrix');
  if(!grid) return;
  grid.classList.add('is-hovering');
  document.querySelectorAll('.cap-card').forEach(c => {
    if(c.dataset.cap === cap) {
      c.classList.remove('dimmed');
    } else {
      c.classList.add('dimmed');
    }
  });
};

function initCapMatrix() {
  const grid = document.getElementById('capMatrix');
  if(!grid) return;
  const cards = grid.querySelectorAll('.cap-card');
  const isMobile = window.innerWidth <= 1024;
  
  if(isMobile) {
    cards.forEach(c => {
      c.addEventListener('click', function(e) {
        if(!c.classList.contains('active')) {
          e.preventDefault();
          e.stopPropagation();
          cards.forEach(x => x.classList.remove('active'));
          c.classList.add('active');
          
          // Switch visual on mobile
          const cap = c.dataset.cap;
          document.querySelectorAll('.matrix-visual-layer').forEach(l => l.classList.remove('active'));
          const actLayer = document.querySelector('.mv-' + cap);
          if(actLayer) actLayer.classList.add('active');
        }
      });
    });
  } else {
    grid.addEventListener('mouseleave', function() {
      grid.classList.remove('is-hovering');
      cards.forEach(c => c.classList.remove('dimmed'));
      // Revert to wallet as default visual
      document.querySelectorAll('.matrix-visual-layer').forEach(l => l.classList.remove('active'));
      const activeLayer = document.querySelector('.mv-wallet');
      if(activeLayer) activeLayer.classList.add('active');
    });
  }
}

// ========== BRAND CARDS ==========
window.toggleBrandCard = function(card){
  const wasFlipped = card.classList.contains('flipped');
  document.querySelectorAll('.brand-card').forEach(c=>{
    c.classList.remove('flipped','dimmed');
  });
  if(!wasFlipped){
    card.classList.add('flipped');
    document.querySelectorAll('.brand-card').forEach(c=>{
      if(c!==card) c.classList.add('dimmed');
    });
  }
};
window.closeBrandCard = function(btn){
  const card = btn.closest('.brand-card');
  card.classList.remove('flipped');
  document.querySelectorAll('.brand-card').forEach(c=>c.classList.remove('dimmed'));
};

// ========== HOME SCROLL STORY ==========
function initHomeStory(){
  const wrapper = document.getElementById('homeStoryWrapper');
  if(!wrapper) return;
  
  const screens = wrapper.querySelectorAll('.story-screen');
  const glows = wrapper.querySelectorAll('.story-glow');
  const giantTexts = wrapper.querySelectorAll('.story-giant-text');
  const indicators = wrapper.querySelectorAll('.indicator-item');
  const phone = document.getElementById('storyPhone');
  
  if(!screens.length) return;
  
  window.addEventListener('scroll', () => {
    const rect = wrapper.getBoundingClientRect();
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
    let progress = (headerH - rect.top) / (rect.height - window.innerHeight);
    
    if(progress < 0) progress = 0;
    if(progress > 1) progress = 1;
    
    const numSteps = 4;
    let currentStep = Math.floor(progress * numSteps);
    if(currentStep >= numSteps) currentStep = numSteps - 1;
    
    // Screens
    screens.forEach((el, i) => {
      el.classList.toggle('active', i === currentStep);
    });
    
    // Giant Texts
    giantTexts.forEach((el, i) => {
      el.classList.toggle('active', i === currentStep);
    });
    
    // Step Indicators
    indicators.forEach((el, i) => {
      el.classList.toggle('active', i === currentStep);
    });

    // Floating Info Cards (matched by .sc-step-X)
    const floatInfos = wrapper.querySelectorAll('.story-float-info');
    floatInfos.forEach(el => {
      el.classList.remove('active');
    });
    wrapper.querySelectorAll(`.story-float-info.sc-step-${currentStep}`).forEach(el => {
      el.classList.add('active');
    });
    
    // Background Glows
    glows.forEach((el, i) => {
      el.style.opacity = (i === currentStep) ? '1' : '0';
    });
    
    // Background Layers (the full colored gradients)
    wrapper.querySelectorAll('.story-bg-layer').forEach((el, i) => {
      el.classList.toggle('active', i === currentStep);
    });
    
    // Notice: phone is already getting mousemove 3D transform globally from initPseudo3D().
    // We shouldn't aggressively overwrite style.transform during scroll because it will conflict with mousemove.
    // If the user wants phone translate during scroll, we should do it cautiously or omit it so it doesn't break mouse 3D.
    // The user instruction said: "手机本体可加轻微 translateY / rotateX / rotateY... 否则 transform 会把手机从中心顶出去".
    // I put perspective on .story-phone-stage in CSS and initPseudo3D applies perspective+rot to .story-phone. Let's not interfere here.
  });
}

// ========== WALLET CANVAS ==========
function initWalletCanvas(){
  const canvas = document.getElementById('walletCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  let tick=0, wPhase=0;
  const coins=[
    {sym:'USDT',color:'#26A17B',amount:'6,180.00',change:'+0.01%'},
    {sym:'ETH',color:'#627EEA',amount:'2.45',change:'+3.28%'},
    {sym:'BTC',color:'#F7931A',amount:'0.128',change:'-1.05%'},
    {sym:'SOL',color:'#E84142',amount:'12.5',change:'+5.22%'}
  ];
  function draw(){
    tick++;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0F172A'; ctx.beginPath(); ctx.roundRect(0,0,W,H,8); ctx.fill();
    // Status bar area
    ctx.fillStyle='#0F172A';
    ctx.beginPath(); ctx.roundRect(W/2-40,4,80,16,8); ctx.fill();
    // Content
    const sx=16, sy=32;
    ctx.fillStyle='#94A3B8'; ctx.font='11px Inter,sans-serif';
    ctx.fillText('总资产 (USD)',sx,sy+12);
    // Animated total
    const baseVal = 18542;
    const animVal = baseVal + Math.floor(Math.sin(tick*0.02)*50);
    ctx.fillStyle='#fff'; ctx.font='bold 26px Inter,sans-serif';
    ctx.fillText('$'+animVal.toLocaleString(),sx,sy+42);
    ctx.fillStyle='#10B981'; ctx.font='12px Inter,sans-serif';
    ctx.fillText('+$'+(245+Math.floor(Math.sin(tick*0.01)*10))+'.80 (24h)',sx,sy+60);
    // Action buttons
    const btnY=sy+78;
    const btns=['转账','收款','闪兑'];
    const btnColors=['rgba(59,130,246,0.2)','rgba(16,185,129,0.2)','rgba(139,92,246,0.2)'];
    const bw=(W-sx*2-16)/3;
    btns.forEach((b,i)=>{
      ctx.fillStyle=btnColors[i];
      ctx.beginPath(); ctx.roundRect(sx+i*(bw+8),btnY,bw,36,10); ctx.fill();
      ctx.fillStyle='#94A3B8'; ctx.font='11px Inter,sans-serif';
      ctx.fillText(b,sx+i*(bw+8)+bw/2-11,btnY+22);
    });
    // Coin list with phase cycling
    wPhase = Math.floor(tick/240)%2;
    const startIdx = wPhase*2;
    const listY = btnY+52;
    ctx.fillStyle='rgba(255,255,255,0.04)';
    ctx.beginPath(); ctx.roundRect(sx,listY,W-sx*2,H-listY-16,12); ctx.fill();
    for(let i=0;i<Math.min(coins.length,4);i++){
      const c=coins[(startIdx+i)%coins.length];
      const iy=listY+14+i*52;
      const fadeIn = Math.min(1, ((tick%240)-i*10)/30);
      ctx.globalAlpha = Math.max(0.3, fadeIn);
      // Icon
      ctx.fillStyle=c.color;
      ctx.beginPath(); ctx.arc(sx+20,iy+12,12,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#fff'; ctx.font='bold 9px Inter,sans-serif';
      ctx.fillText(c.sym[0],sx+15,iy+16);
      // Name
      ctx.fillStyle='#fff'; ctx.font='bold 13px Inter,sans-serif';
      ctx.fillText(c.sym,sx+40,iy+10);
      // Amount
      ctx.fillStyle='#fff'; ctx.font='13px Inter,sans-serif';
      ctx.fillText(c.amount,W-sx-20-ctx.measureText(c.amount).width,iy+10);
      // Change
      ctx.fillStyle=c.change.startsWith('+')?'#10B981':'#EF4444';
      ctx.font='11px Inter,sans-serif';
      ctx.fillText(c.change,W-sx-20-ctx.measureText(c.change).width,iy+28);
      ctx.globalAlpha=1;
    }
    // Bottom nav
    const navY=H-40;
    ctx.fillStyle='rgba(255,255,255,0.05)';
    ctx.fillRect(0,navY,W,40);
    ['钱包','UPAY','闪兑','行情'].forEach((n,i)=>{
      ctx.fillStyle = i===0?'#3B82F6':'#64748B'; ctx.font='10px Inter,sans-serif';
      ctx.fillText(n,24+i*68,navY+24);
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ========== SWAP SHOWCASE PAGE (5 screens) ==========
window.renderSwapDemoPage = function(){
  const el = document.getElementById('page-swap-demo');
  const PHONE_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`;

  el.innerHTML = `
  <!-- Screen 1: Hero -->
  <section class="hero section" style="min-height:90vh;">
    <div class="hero-bg"></div>
    <div class="hero-glow" style="left:10%;top:30%;"></div>
    <div class="hero-content">
      <div class="hero-text reveal">
        <span class="section-label">闪兑体验</span>
        <h1 class="hero-title">在 OneToken App 中<br>体验更顺畅的闪兑</h1>
        <p class="hero-subtitle">不再繁琐跳出，将自然连贯的资产转换合入你的日常使用体验中。</p>
        <div class="btn-group">
          <a class="btn btn-primary" onclick="showPage('download')">在 App 中体验闪兑</a>
        </div>
      </div>
      <div class="hero-visual reveal reveal-delay-2">
        <div class="swap-hero-device">
          <div class="swap-hero-device-inner">
            <div style="width:100px;height:24px;background:#0F172A;border-radius:0 0 16px 16px;position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:10;"></div>
            <div style="padding:40px 20px 20px;color:#fff;display:flex;flex-direction:column;flex:1;">
              <div style="text-align:center;font-weight:700;margin-bottom:24px;">闪兑</div>
              <div style="background:rgba(255,255,255,0.04);border-radius:16px;padding:16px;margin-bottom:8px;">
                <div style="font-size:12px;color:#94A3B8;margin-bottom:8px;">转出</div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:24px;font-weight:700;font-family:monospace;">1,000</span>
                  <span style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.1);padding:4px 10px;border-radius:8px;font-size:12px;font-weight:700;"><span style="width:16px;height:16px;background:#26A17B;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:8px;">₮</span> USDT</span>
                </div>
              </div>
              <div style="text-align:center;color:#10B981;margin:-4px 0;position:relative;z-index:2;">
                <div style="width:32px;height:32px;background:#0F172A;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.05);animation:stageSpin 4s infinite alternate;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></div>
              </div>
              <div style="background:rgba(255,255,255,0.04);border-radius:16px;padding:16px;margin-top:8px;">
                <div style="font-size:12px;color:#94A3B8;margin-bottom:8px;">接收</div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:24px;font-weight:700;font-family:monospace;color:#10B981;">999.80</span>
                  <span style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.1);padding:4px 10px;border-radius:8px;font-size:12px;font-weight:700;"><span style="width:16px;height:16px;background:#2775CA;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:8px;">$</span> USDC</span>
                </div>
              </div>
              <div style="margin-top:20px;background:linear-gradient(135deg,rgba(16,185,129,0.2),rgba(5,150,105,0.2));border-radius:12px;padding:12px;text-align:center;font-weight:700;font-size:14px;color:#10B981;">预览闪兑结果</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 2: Scroll Features -->
  <section class="section-alt" style="padding:100px 0;">
    <div class="section" style="padding-top:0;padding-bottom:100px;">
      <div style="text-align:center;margin-bottom:80px;" class="reveal">
        <span class="section-label">核心优势</span>
        <h2 class="section-title">为什么 OneToken 的闪兑体验更自然</h2>
        <p class="section-desc">不是更复杂的功能堆叠，而是更清晰、更集中、更连贯的资产转换体验。</p>
      </div>
      <div class="swap-features-layout" style="display:flex;gap:60px;align-items:flex-start;">
        <!-- Left Sticky Visuals -->
        <div style="flex:1;position:sticky;top:120px;height:540px;background:var(--bg-card);border-radius:32px;box-shadow:var(--shadow-xl);border:1px solid var(--border);overflow:hidden;" class="reveal">
           <div class="sf-scene active" id="sf-scene-0" style="position:absolute;inset:0;opacity:1;transition:opacity 0.6s;display:flex;flex-direction:column;background:var(--bg-secondary);">
             <div style="padding:24px;border-bottom:1px solid var(--border);font-weight:700;">确认兑换详情</div>
             <div style="flex:1;padding:24px;">
               <div style="background:var(--bg-card);border-radius:16px;padding:16px;border:1px solid var(--border);margin-bottom:16px;">
                 <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:14px;"><span style="color:var(--text-secondary);">路径</span><div style="display:flex;align-items:center;gap:4px;font-weight:600;"><span style="width:16px;height:16px;background:#26A17B;border-radius:50%;display:inline-block;"></span> USDT <span style="color:var(--text-muted);font-weight:400;">→</span> <span style="width:16px;height:16px;background:#2775CA;border-radius:50%;display:inline-block;"></span> USDC</div></div>
                 <div style="display:flex;justify-content:space-between;font-size:14px;"><span style="color:var(--text-secondary);">网络费预估</span><span style="font-weight:600;">~$0.54</span></div>
               </div>
               <div style="background:var(--bg-card);border-radius:16px;padding:16px;border:1px solid var(--border);">
                 <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:700;"><span>预估收到</span><span style="color:#10B981;">999.80 USDC</span></div>
               </div>
             </div>
           </div>
           <div class="sf-scene" id="sf-scene-1" style="position:absolute;inset:0;opacity:0;transition:opacity 0.6s;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#ECFDF5,#D1FAE5);">
             <div style="text-align:center;color:#0D9488;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
                <div style="font-size:24px;font-weight:700;margin-top:20px;">与核心能力无缝连接</div>
             </div>
           </div>
           <div class="sf-scene" id="sf-scene-2" style="position:absolute;inset:0;opacity:0;transition:opacity 0.6s;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F8FAFC,#F1F5F9);">
             <div style="width:280px;display:flex;flex-direction:column;gap:12px;">
                <div style="background:#fff;padding:16px;border-radius:12px;display:flex;align-items:center;box-shadow:var(--shadow-sm);"><span style="width:24px;height:24px;background:#627EEA;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;margin-right:12px;">Ξ</span> <span style="font-weight:700;flex:1;">ETH</span></div>
                <div style="background:#fff;padding:16px;border-radius:12px;display:flex;align-items:center;box-shadow:var(--shadow-sm);"><span style="width:24px;height:24px;background:#F5A524;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;margin-right:12px;">B</span> <span style="font-weight:700;flex:1;">BNB</span></div>
                <div style="background:#fff;padding:16px;border-radius:12px;display:flex;align-items:center;box-shadow:var(--shadow-sm);"><span style="width:24px;height:24px;background:#8B5CF6;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;margin-right:12px;">S</span> <span style="font-weight:700;flex:1;">SOL</span></div>
                <div style="background:#fff;padding:16px;border-radius:12px;display:flex;align-items:center;box-shadow:var(--shadow-sm);"><span style="width:24px;height:24px;background:#3B82F6;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;margin-right:12px;">A</span> <span style="font-weight:700;flex:1;">ARB</span></div>
             </div>
           </div>
           <div class="sf-scene" id="sf-scene-3" style="position:absolute;inset:0;opacity:0;transition:opacity 0.6s;display:flex;align-items:center;justify-content:center;background:var(--bg-secondary);">
             <div style="width:300px;background:#fff;border-radius:16px;padding:20px;box-shadow:var(--shadow);border:2px solid #10B981;position:relative;">
                <div style="position:absolute;top:-12px;right:-12px;background:#10B981;color:#fff;padding:4px 10px;border-radius:12px;font-size:12px;font-weight:700;box-shadow:0 4px 12px rgba(16,185,129,0.3);">最佳报价</div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                  <span style="font-weight:700;">1inch Aggregator</span>
                </div>
                <div style="font-size:24px;font-weight:800;">1,002.50 USDC</div>
                <div style="font-size:12px;color:var(--text-secondary);margin-top:8px;">比均价节省 ~$2.50</div>
             </div>
           </div>
        </div>
        <!-- Right Scrolling Items -->
        <div style="flex:1;padding-bottom:120px;">
           <div class="swap-feature-item" data-sf="0" style="min-height:360px;display:flex;flex-direction:column;justify-content:center;opacity:1;transition:opacity 0.3s;">
             <h3 style="font-size:28px;margin-bottom:16px;">路径更清晰</h3>
             <p style="font-size:16px;color:var(--text-secondary);line-height:1.6;">在兑换前即可看到更完整的结果信息与费用预估，拒绝隐藏费用与盲目交易。</p>
           </div>
           <div class="swap-feature-item" data-sf="1" style="min-height:360px;display:flex;flex-direction:column;justify-content:center;opacity:0.3;transition:opacity 0.3s;">
             <h3 style="font-size:28px;margin-bottom:16px;">体验更连贯</h3>
             <p style="font-size:16px;color:var(--text-secondary);line-height:1.6;">与钱包、行情能力自然衔接，从追踪价格到完成兑换，一切顺理成章。</p>
           </div>
           <div class="swap-feature-item" data-sf="2" style="min-height:360px;display:flex;flex-direction:column;justify-content:center;opacity:0.3;transition:opacity 0.3s;">
             <h3 style="font-size:28px;margin-bottom:16px;">数千种代币</h3>
             <p style="font-size:16px;color:var(--text-secondary);line-height:1.6;">跨多家交易所进行交易，一站式访问海量资产，寻找更多可能。</p>
           </div>
           <div class="swap-feature-item" data-sf="3" style="min-height:360px;display:flex;flex-direction:column;justify-content:center;opacity:0.3;transition:opacity 0.3s;">
             <h3 style="font-size:28px;margin-bottom:16px;">选择最佳报价</h3>
             <p style="font-size:16px;color:var(--text-secondary);line-height:1.6;">我们从领先的去中心化交易所和做市商那里获取报价，您只需选择最好的一个。</p>
           </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 3: Cinematic Dynamic Stage -->
  <section class="section">
    <div style="text-align:center;max-width:800px;margin:0 auto 64px;padding:0 48px;" class="reveal">
      <span class="section-label">体验演示</span>
      <h2 class="section-title">流畅连贯的每一步</h2>
      <p class="section-desc">输入、切换、预览。让资产转换过程更直观。</p>
    </div>
    <div class="swap-stage reveal reveal-delay-1" id="swapStage">
      <div class="swap-stage-bg"></div>
      <div class="swap-stage-content">
        <!-- Scene 1: Input -->
        <div class="swap-scene active" id="scene-0">
          <div class="swap-stage-card anim-pop">
            <h3 style="margin-bottom:20px;font-size:18px;font-weight:700;">闪兑</h3>
            <div class="swap-stage-input-area" style="box-shadow:0 0 0 2px #10B981;">
              <div style="color:#64748B;font-size:13px;font-weight:600;">卖出</div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="swap-stage-val" style="color:#10B981;">1,000</span>
                <span class="swap-stage-coin-btn"><span style="width:20px;height:20px;background:#26A17B;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;">₮</span> USDT <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></span>
              </div>
            </div>
            <div class="swap-stage-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></div>
            <div class="swap-stage-input-area" style="opacity:0.5;">
              <div style="color:#64748B;font-size:13px;font-weight:600;">买入</div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="swap-stage-val" style="color:#94A3B8;">0.00</span>
                <span class="swap-stage-coin-btn">选择币种 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></span>
              </div>
            </div>
          </div>
        </div>
        <!-- Scene 2: Selecting Coin -->
        <div class="swap-scene" id="scene-1">
          <div class="swap-stage-card">
            <h3 style="margin-bottom:20px;font-size:18px;font-weight:700;">选择代币</h3>
            <div class="swap-stage-input-area" style="padding:12px 16px;flex-direction:row;align-items:center;margin-bottom:16px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span style="color:#94A3B8;font-size:14px;margin-left:8px;">搜索名称或合约地址</span>
            </div>
            <div>
              <div style="display:flex;align-items:center;padding:12px 0;border-bottom:1px solid #E2E8F0;">
                <span style="width:32px;height:32px;background:#627EEA;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;margin-right:12px;">Ξ</span>
                <div style="flex:1;">
                  <div style="font-weight:700;font-size:15px;">ETH</div><div style="font-size:12px;color:#64748B;">Ethereum</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;padding:12px 0;background:#F0FDF4;border-radius:12px;margin:4px -8px;padding-left:8px;padding-right:8px;box-shadow:inset 0 0 0 1px #86EFAC;">
                <span style="width:32px;height:32px;background:#2775CA;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;margin-right:12px;">$</span>
                <div style="flex:1;">
                  <div style="font-weight:700;font-size:15px;color:#166534;">USDC</div><div style="font-size:12px;color:#15803D;">USD Coin</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Scene 3: Quoting / Switching -->
        <div class="swap-scene" id="scene-2">
          <div class="swap-stage-card anim-pop">
            <h3 style="margin-bottom:20px;font-size:18px;font-weight:700;">闪兑</h3>
            <div class="swap-stage-input-area">
              <div style="color:#64748B;font-size:13px;font-weight:600;">卖出</div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="swap-stage-val">1,000</span>
                <span class="swap-stage-coin-btn"><span style="width:20px;height:20px;background:#26A17B;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;">₮</span> USDT</span>
              </div>
            </div>
            <div class="swap-stage-arrow anim-spin-half" style="color:#10B981;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></div>
            <div class="swap-stage-input-area">
              <div style="color:#64748B;font-size:13px;font-weight:600;">买入 <span style="color:#10B981;font-weight:400;margin-left:4px;font-size:11px;">获取最优报价中...</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="swap-stage-val" style="color:#94A3B8;animation:pulse 1.5s infinite;">---</span>
                <span class="swap-stage-coin-btn"><span style="width:20px;height:20px;background:#2775CA;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;">$</span> USDC</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Scene 4: Preview Result -->
        <div class="swap-scene" id="scene-3">
          <div class="swap-stage-card anim-pop" style="padding-bottom:12px;">
            <h3 style="margin-bottom:16px;font-size:18px;font-weight:700;">闪兑预览</h3>
            <div style="text-align:center;padding:12px 0;">
              <div style="font-size:14px;color:#64748B;margin-bottom:8px;">你将收到约</div>
              <div style="font-size:36px;font-weight:800;color:#10B981;">999.80 USDC</div>
            </div>
            <div class="swap-stage-detail-box anim-slide-up">
              <div class="swap-stage-detail-row">
                <span>1 USDT =</span>
                <span style="font-weight:600;color:#0F172A;">0.9998 USDC</span>
              </div>
              <div class="swap-stage-detail-row">
                <span>网络费预估</span>
                <span style="font-weight:600;color:#0F172A;">~$0.54</span>
              </div>
              <div class="swap-stage-detail-row">
                <span>滑点保护</span>
                <span style="font-weight:600;color:#0F172A;">0.50%</span>
              </div>
            </div>
            <div style="margin-top:20px;background:rgba(255,255,255,0.05);color:var(--text-secondary);border-radius:12px;padding:16px;text-align:center;font-size:14px;">
              结果预览已准备完成 · APP 内完成最终确认
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 4: CTA -->
  <section class="cta-section">
    <div class="reveal">
      <h2 class="section-title">准备好在 OneToken 中体验闪兑了吗？</h2>
      <p class="section-desc" style="margin:0 auto;">下载 App，体验更清晰、更高级的数字资产转换方式。</p>
      <div class="btn-group">
        <a class="btn btn-primary" onclick="showPage('download')">下载 App</a>
        <a class="btn btn-secondary" onclick="showPage('market-demo')">查看行情</a>
      </div>
    </div>
  </section>
  `;

  // Init intersection reveals
  setTimeout(function(){
    var els = document.getElementById('page-swap-demo').querySelectorAll('.reveal:not(.visible)');
    els.forEach(function(el){
      new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); });
      },{threshold:0.15}).observe(el);
    });
  }, 100);

  // Auto-rotating stage logic
  setTimeout(function(){
    var stage = document.getElementById('swapStage');
    if(!stage) return;
    var scenes = stage.querySelectorAll('.swap-scene');
    var current = 0;
    var interval = setInterval(function(){
      if(!document.getElementById('swapStage')){ clearInterval(interval); return; }
      scenes[current].classList.remove('active');
      current = (current + 1) % scenes.length;
      scenes[current].classList.add('active');
      // Retrigger animations
      var animEls = scenes[current].querySelectorAll('.anim-pop, .anim-slide-up, .anim-spin-half');
      animEls.forEach(function(el) {
        el.style.animation = 'none';
        el.offsetHeight; // force reflow
        el.style.animation = null; 
      });
    }, 3500);
  }, 500);

  // Scroll spy logic for feature items
  setTimeout(function(){
    var sfItems = document.getElementById('page-swap-demo').querySelectorAll('.swap-feature-item');
    var sfScenes = document.getElementById('page-swap-demo').querySelectorAll('.sf-scene');
    if(sfItems.length) {
      window._swapFeatureObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting && e.intersectionRatio > 0.4) {
            var idx = e.target.getAttribute('data-sf');
            sfItems.forEach(i => i.style.opacity = '0.3');
            e.target.style.opacity = '1';
            sfScenes.forEach(function(s, i) { s.style.opacity = (i == idx ? '1' : '0'); });
          }
        });
      }, {threshold: 0.5});
      sfItems.forEach(function(i){ window._swapFeatureObserver.observe(i); });
    }
  }, 500);
};

// ========== MARKET DEMO PAGE ==========
window.renderMarketDemoPage = function(){
  const el = document.getElementById('page-market-demo');
  const marketData=[
    {sym:'BTC',name:'Bitcoin',price:'87,423',change:'+2.34%',color:'#F7931A',icon:'₿',cap:'$1.73T',vol:'$42.8B'},
    {sym:'ETH',name:'Ethereum',price:'3,892',change:'+3.28%',color:'#627EEA',icon:'Ξ',cap:'$468B',vol:'$18.2B'},
    {sym:'SOL',name:'Solana',price:'186.50',change:'-1.05%',color:'#E84142',icon:'S',cap:'$82B',vol:'$3.1B'},
    {sym:'BNB',name:'BNB',price:'612.30',change:'+1.22%',color:'#F3BA2F',icon:'B',cap:'$92B',vol:'$1.8B'},
    {sym:'USDT',name:'Tether',price:'1.0002',change:'+0.01%',color:'#26A17B',icon:'₮',cap:'$142B',vol:'$68B'},
    {sym:'USDC',name:'USD Coin',price:'1.0001',change:'+0.00%',color:'#2775CA',icon:'$',cap:'$52B',vol:'$8.2B'},
    {sym:'XRP',name:'Ripple',price:'2.18',change:'+4.56%',color:'#00AAE4',icon:'X',cap:'$125B',vol:'$5.6B'},
    {sym:'ADA',name:'Cardano',price:'0.782',change:'-2.10%',color:'#0033AD',icon:'A',cap:'$28B',vol:'$1.2B'}
  ];
  let activeTab='hot';
  function render(){
    const filtered = activeTab==='up'?marketData.filter(d=>d.change.startsWith('+')):activeTab==='down'?marketData.filter(d=>d.change.startsWith('-')):marketData;
    el.innerHTML=`
    <div class="demo-page-header"><button class="demo-back-btn" onclick="showPage('home')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> 返回首页</button><h1 class="demo-page-title">行情</h1></div>
    <div class="market-demo-container">
      <div style="position:relative;margin-bottom:24px;"><svg style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--text-muted);" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input type="text" class="market-search" placeholder="搜索币种名称或代号..."></div>
      <div class="market-tabs">
        <button class="market-tab ${activeTab==='hot'?'active':''}" onclick="window._mktTab('hot')">热门</button>
        <button class="market-tab ${activeTab==='up'?'active':''}" onclick="window._mktTab('up')">涨幅榜</button>
        <button class="market-tab ${activeTab==='down'?'active':''}" onclick="window._mktTab('down')">跌幅榜</button>
        <button class="market-tab ${activeTab==='fav'?'active':''}" onclick="window._mktTab('fav')">自选</button>
      </div>
      <div class="market-list">
        <div class="market-list-header"><span>币种</span><span>价格</span><span>24h涨跌</span><span>走势</span></div>
        ${filtered.map(d=>{
          const isUp=d.change.startsWith('+');
          const bars=Array.from({length:12},(_,i)=>{
            const h=8+Math.random()*22;
            return `<div class="bar" style="height:${h}px;background:${isUp?'#10B981':'#EF4444'};opacity:${0.3+Math.random()*0.4}"></div>`;
          }).join('');
          return `<div class="market-list-row" onclick="window._showCoinDetail('${d.sym}')">
            <div class="market-coin-cell"><div class="market-coin-icon" style="background:${d.color}">${d.icon}</div><div><div style="font-weight:700;">${d.sym}</div><div style="font-size:12px;color:var(--text-muted);">${d.name}</div></div></div>
            <div style="font-weight:700;">$${d.price}</div>
            <div style="font-weight:600;color:${isUp?'#10B981':'#EF4444'};">${d.change}</div>
            <div class="market-sparkline">${bars}</div>
          </div>`;
        }).join('')}
      </div>
      ${activeTab==='fav'?'<div style="text-align:center;padding:60px 0;color:var(--text-muted);font-size:15px;">暂无自选币种，点击列表中的币种查看详情</div>':''}
    </div>
    <div class="coin-detail-modal" id="coinModal"><div class="coin-detail-content" id="coinModalContent"></div></div>`;
  }
  window._mktTab=function(t){ activeTab=t; render(); };
  window._showCoinDetail=function(sym){
    const d=marketData.find(x=>x.sym===sym); if(!d) return;
    const modal=document.getElementById('coinModal');
    const isUp=d.change.startsWith('+');
    const bars=Array.from({length:30},(_,i)=>`<div style="width:6px;background:${isUp?'linear-gradient(180deg,#10B981,#059669)':'linear-gradient(180deg,#EF4444,#DC2626)'};border-radius:3px;height:${15+Math.random()*60}px;opacity:${0.4+Math.random()*0.3}"></div>`).join('');
    document.getElementById('coinModalContent').innerHTML=`
      <button class="coin-detail-close" onclick="document.getElementById('coinModal').classList.remove('active')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;">
        <div class="market-coin-icon" style="background:${d.color};width:48px;height:48px;font-size:18px;">${d.icon}</div>
        <div><div style="font-size:22px;font-weight:800;">${d.name}</div><div style="color:var(--text-muted);">${d.sym}</div></div>
      </div>
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:8px;">
        <span style="font-size:32px;font-weight:800;">$${d.price}</span>
        <span style="font-size:16px;font-weight:600;color:${isUp?'#10B981':'#EF4444'};">${d.change}</span>
      </div>
      <div style="display:flex;align-items:flex-end;gap:3px;height:80px;background:var(--bg-secondary);border-radius:12px;padding:12px;margin:20px 0;">${bars}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px;">
        <div style="background:var(--bg-secondary);border-radius:12px;padding:14px;"><div style="font-size:12px;color:var(--text-muted);">市值</div><div style="font-weight:700;margin-top:4px;">${d.cap}</div></div>
        <div style="background:var(--bg-secondary);border-radius:12px;padding:14px;"><div style="font-size:12px;color:var(--text-muted);">24h成交量</div><div style="font-weight:700;margin-top:4px;">${d.vol}</div></div>
      </div>
      <button class="btn-swap" style="margin-top:20px;border-radius:14px;" onclick="document.getElementById('coinModal').classList.remove('active');showPage('swap-demo')">在 App 中体验闪兑</button>`;
    modal.classList.add('active');
  };
  render();
};

function initPseudo3D() {
  document.addEventListener('mousemove', function(e) {
    if (window.innerWidth <= 1024) return;
    
    const rx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ry = (e.clientY / window.innerHeight - 0.5) * 2;
    
    const storyPhone = document.getElementById('storyPhone');
    if (storyPhone) {
      storyPhone.style.transform = `perspective(1000px) rotateY(${rx * 8}deg) rotateX(${-ry * 8}deg)`;
    }
    
    // For capMatrixCenter we only apply when we are hovering over the matrix itself, or globally lightly?
    // Let's do it globally lightly, but only if visible
    const capCenter = document.getElementById('capMatrixCenter');
    if(capCenter && capCenter.getBoundingClientRect().top < window.innerHeight && capCenter.getBoundingClientRect().bottom > 0){
      capCenter.style.transform = `perspective(1000px) translateY(-5px) rotateY(${rx * 6}deg) rotateX(${-ry * 6}deg)`;
    }
  });

  // Reset transforms when leaving window
  document.addEventListener('mouseleave', function() {
    const storyPhone = document.getElementById('storyPhone');
    if(storyPhone) storyPhone.style.transform = '';
    const capCenter = document.getElementById('capMatrixCenter');
    if(capCenter) capCenter.style.transform = '';
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded',function(){
  initReveal();
  initCapMatrix();
  initHomeStory();
  initWalletCanvas();
  initPseudo3D();
  new IntersectionObserver(function(e){ e.forEach(function(entry){ if(entry.isIntersecting){} }); },{threshold:0.5}).observe(document.querySelector('.hero-visual')||document.body);
});
})();
