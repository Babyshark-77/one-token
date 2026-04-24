/* OneToken — Wallet & UPAY Page Renderers V2 */
(function(){
'use strict';
const CHK=`<span class="check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>`;

// ========== SHARED: Horizontal Scroll Lock Logic ==========
var _hscrollHandlers = window._hscrollHandlers || {};

function initHScroll(sectionId){
  var section = document.getElementById(sectionId);
  if(!section) return;
  // On mobile, skip scroll lock
  if(!window.matchMedia("(min-width: 1025px)").matches) {
    section.style.height = 'auto';
    var cArea = section.querySelector('.hscroll-cards-area');
    if(cArea) {
      cArea.style.transform = 'none';
      cArea.style.overflowX = 'auto';
      cArea.style.display = 'flex';
    }
    return;
  }
  
  var cardsArea = section.querySelector('.hscroll-cards-area');
  var titleArea = section.querySelector('.hscroll-title-area');
  if(!cardsArea||!titleArea) return;
  
  if(_hscrollHandlers[sectionId]) {
    _hscrollHandlers[sectionId].cleanup();
  }
  
  var headerStr = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
  var headerH = parseInt(headerStr) || 72;
  
  // Set explicit height to fill viewport below header
  section.style.height = 'calc(100vh - var(--header-h, 72px))';
  
  var currentX = 0;
  
  var getLayout = function() {
    var visibleWidth = section.offsetWidth - 48 - titleArea.offsetWidth - 32 - 48;
    return Math.max(0, cardsArea.scrollWidth - visibleWidth);
  };
  
  var handleInput = function(delta, e) {
    if(Math.abs(delta) < 1) return;
    var totalScroll = getLayout();
    if(totalScroll <= 0) return;

    var rect = section.getBoundingClientRect();
    var atTop = Math.abs(rect.top - headerH) <= 15;
    
    var isMovingRight = delta > 0;
    var isMovingLeft = delta < 0;
    var shouldLock = false;
    
    if (atTop) {
      if (isMovingRight && currentX < totalScroll) shouldLock = true;
      if (isMovingLeft && currentX > 0) shouldLock = true;
    } else {
      if (isMovingRight && currentX === 0 && rect.top < headerH && rect.bottom > headerH + 100) {
        shouldLock = true;
      } else if (isMovingLeft && currentX === totalScroll && rect.top > headerH - 50 && rect.top < headerH) {
        shouldLock = true;
      }
    }
    
    if (shouldLock) {
      if (e && e.cancelable !== false) {
        e.preventDefault();
      }
      if (Math.abs(rect.top - headerH) > 0) {
        window.scrollBy(0, rect.top - headerH);
      }
      
      var speedMod = e.type === 'wheel' ? 0.6 : 1.0; 
      currentX += delta * speedMod;
      if (currentX < 0) currentX = 0;
      if (currentX > totalScroll) currentX = totalScroll;
      
      cardsArea.style.transform = 'translateX(-' + currentX + 'px)';
    }
  };

  var onWheel = function(e){
    var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    handleInput(delta, e);
  };

  var touchY = 0, touchX = 0;
  var onTouchStart = function(e){
    touchY = e.touches[0].clientY;
    touchX = e.touches[0].clientX;
  };
  var onTouchMove = function(e){
    var dy = touchY - e.touches[0].clientY;
    var dx = touchX - e.touches[0].clientX;
    var delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    handleInput(delta, e);
    touchY = e.touches[0].clientY;
    touchX = e.touches[0].clientX;
  };
  
  var onResize = function() {
    var totalScroll = getLayout();
    if(currentX > totalScroll) {
      currentX = totalScroll;
      cardsArea.style.transform = 'translateX(-' + currentX + 'px)';
    }
    headerStr = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
    headerH = parseInt(headerStr) || 72;
  };

  window.addEventListener('wheel', onWheel, {passive: false});
  window.addEventListener('touchstart', onTouchStart, {passive: true});
  window.addEventListener('touchmove', onTouchMove, {passive: false});
  window.addEventListener('resize', onResize, {passive: true});
  
  _hscrollHandlers[sectionId] = {
    cleanup: function(){
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
    }
  };
}

// ========== SHARED: Reveal observer ==========
function initReveals(root){
  setTimeout(function(){
    var els = (root||document).querySelectorAll('.reveal:not(.visible)');
    els.forEach(function(el){
      new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); });
      },{threshold:0.15}).observe(el);
    });
  }, 100);
}

// ========== WALLET PAGE (6 screens) ==========
window.renderWalletPage = function(){
  var el = document.getElementById('page-wallet');

  function sparkline(color, count){
    var bars = '';
    for(var i=0;i<(count||10);i++){
      var h = 4 + Math.floor(Math.random()*18);
      bars += '<div class="bar" style="height:'+h+'px;background:'+color+';opacity:'+(0.4+Math.random()*0.4)+'"></div>';
    }
    return '<div class="wlt-sparkline">'+bars+'</div>';
  }

  el.innerHTML = `
  <!-- Screen 1: Hero -->
  <section class="hero section" style="min-height:90vh;">
    <div class="hero-bg"></div>
    <div class="hero-glow" style="right:10%;top:20%;"></div>
    <div class="hero-content">
      <div class="hero-text reveal">
        <span class="section-label">钱包</span>
        <h1 class="hero-title">更清晰、更流畅的<br>数字资产管理体验</h1>
        <p class="hero-subtitle">统一查看余额与持仓，流畅完成收发操作，在一个产品内保持更完整的钱包使用体验。</p>
        <div class="btn-group">
          <a class="btn btn-primary" onclick="showPage('download')">下载 App</a>
          <a class="btn btn-secondary" onclick="showPage('swap-demo')">进入交易 →</a>
        </div>
      </div>
      <div class="hero-visual reveal reveal-delay-2">
        <div class="wlt-hero-device" id="wltDevice">
          <div class="wlt-screen">
            <div style="width:100px;height:24px;background:#0F172A;border-radius:0 0 16px 16px;position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:10;"></div>
            <div style="padding:40px 20px 20px;color:#fff;">
              <div style="font-size:11px;color:#94A3B8;">总资产 (USD)</div>
              <div style="font-size:30px;font-weight:800;margin:6px 0;" id="wltTotalAnim">$18,542.00</div>
              <div style="font-size:12px;color:#10B981;margin-bottom:16px;">↑ +$245.80 (24h)</div>
              <div style="display:flex;gap:8px;margin-bottom:20px;">
                <div style="flex:1;background:rgba(59,130,246,0.2);border-radius:10px;padding:10px;text-align:center;"><div style="font-size:16px;">↗</div><div style="font-size:10px;color:#94A3B8;margin-top:2px;">转账</div></div>
                <div style="flex:1;background:rgba(16,185,129,0.2);border-radius:10px;padding:10px;text-align:center;"><div style="font-size:16px;">↙</div><div style="font-size:10px;color:#94A3B8;margin-top:2px;">收款</div></div>
                <div style="flex:1;background:rgba(139,92,246,0.2);border-radius:10px;padding:10px;text-align:center;animation:breathe 3s ease-in-out infinite;"><div style="font-size:16px;">⇄</div><div style="font-size:10px;color:#94A3B8;margin-top:2px;">闪兑</div></div>
              </div>
              <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:12px;">
                <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06);"><span style="display:flex;align-items:center;gap:6px;"><span style="width:20px;height:20px;background:#26A17B;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;">₮</span><span style="font-size:12px;">USDT</span></span><span style="font-size:12px;font-weight:600;">6,180.00</span></div>
                <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06);"><span style="display:flex;align-items:center;gap:6px;"><span style="width:20px;height:20px;background:#627EEA;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;">Ξ</span><span style="font-size:12px;">ETH</span></span><span style="font-size:12px;font-weight:600;">2.45</span></div>
                <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;"><span style="display:flex;align-items:center;gap:6px;"><span style="width:20px;height:20px;background:#F7931A;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;">₿</span><span style="font-size:12px;">BTC</span></span><span style="font-size:12px;font-weight:600;">0.128</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <style>@keyframes breathe{0%,100%{box-shadow:none;}50%{box-shadow:0 0 12px rgba(139,92,246,0.3);}}</style>

  <!-- Screen 2: Asset Storage (Immersive Dark) -->
  <section class="section-dark" style="padding:120px 48px; background:#0F172A;">
    <div class="section-inner feature-row reveal">
      <div class="feature-visual">
         <div class="wlt-asset-panel reveal reveal-delay-2" style="margin: 0 auto; background:linear-gradient(135deg,#1E293B,#0F172A); border:1px solid rgba(255,255,255,0.1); color:#fff; box-shadow:0 32px 80px rgba(0,0,0,0.5);">
             <div style="font-size:11px;color:#94A3B8;">总资产 (USD)</div>
             <div class="wlt-asset-total" style="background:linear-gradient(135deg,#fff,#3B82F6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">$18,542.00</div>
             <div style="font-size:13px;color:#10B981;margin-top:4px;">↑ +$245.80 (1.34%)</div>
             <div class="wlt-chain-tags">
               <span class="wlt-chain-tag">TRON</span>
               <span class="wlt-chain-tag">ETH</span>
               <span class="wlt-chain-tag">BSC</span>
             </div>
             <div style="margin-top:20px;">
               <div class="wlt-coin-row" style="border-color:rgba(255,255,255,0.05);">
                 <div class="wlt-coin-left"><div class="wlt-coin-icon" style="background:#26A17B;">₮</div><div><div style="font-weight:700;font-size:14px;">USDT</div><div style="font-size:11px;color:#94A3B8;">Tether</div></div></div>
                 <div style="text-align:right;display:flex;align-items:center;gap:12px;">${sparkline('#10B981')}<div><div style="font-weight:700;">6,180.00</div><div style="font-size:11px;color:#10B981;">+0.01%</div></div></div>
               </div>
               <div class="wlt-coin-row" style="border-color:rgba(255,255,255,0.05);">
                 <div class="wlt-coin-left"><div class="wlt-coin-icon" style="background:#627EEA;">Ξ</div><div><div style="font-weight:700;font-size:14px;">ETH</div><div style="font-size:11px;color:#94A3B8;">Ethereum</div></div></div>
                 <div style="text-align:right;display:flex;align-items:center;gap:12px;">${sparkline('#10B981')}<div><div style="font-weight:700;">2.45</div><div style="font-size:11px;color:#10B981;">+3.28%</div></div></div>
               </div>
               <div class="wlt-coin-row" style="border-color:rgba(255,255,255,0.05);">
                 <div class="wlt-coin-left"><div class="wlt-coin-icon" style="background:#F7931A;">₿</div><div><div style="font-weight:700;font-size:14px;">BTC</div><div style="font-size:11px;color:#94A3B8;">Bitcoin</div></div></div>
                 <div style="text-align:right;display:flex;align-items:center;gap:12px;">${sparkline('#10B981')}<div><div style="font-weight:700;">0.128</div><div style="font-size:11px;color:#10B981;">+2.34%</div></div></div>
               </div>
             </div>
         </div>
      </div>
      <div class="feature-text">
        <h2 class="section-title">资产存储</h2>
        <p class="section-desc">在 OneToken Wallet 中统一存储多链数字资产，覆盖主流代币与常用资产类型。<br><br>支持更清晰的地址管理、余额查看与本地控制能力，让资产存储更稳定、更安心。</p>
      </div>
    </div>
  </section>

  <!-- Screen 3: Token Swap (Immersive Dark) -->
  <section class="section-dark" style="padding:120px 48px; background:#0B1120;">
    <div class="section-inner feature-row reverse reveal">
      <div class="feature-visual" style="text-align:center;">
         <div style="background:linear-gradient(135deg,#0F172A,#1E293B); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:40px; box-shadow:0 32px 80px rgba(0,0,0,0.5); display:inline-block; margin:0 auto; text-align:left;">
            <div style="display:flex;align-items:center;gap:16px;justify-content:center;">
              <div class="swap-coin-badge" style="background:rgba(255,255,255,0.05); color:#fff; border-color:rgba(255,255,255,0.1);"><span class="coin-dot" style="background:#26A17B;">₮</span> USDT</div>
              <div class="swap-flow-arrow"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg></div>
              <div class="swap-coin-badge" style="background:rgba(255,255,255,0.05); color:#fff; border-color:rgba(255,255,255,0.1);"><span class="coin-dot" style="background:#627EEA;">Ξ</span> ETH</div>
            </div>
            <div style="text-align:center;margin-top:32px;">
               <div style="font-size:24px;font-weight:800;color:#fff;">1,000.00 <span style="font-size:16px;color:#94A3B8;">USDT</span></div>
               <div style="font-size:14px;color:#10B981;margin-top:8px;">≈ 0.395 ETH</div>
            </div>
            <div style="margin-top:32px;">
              <div style="background:rgba(255,255,255,0.05); border-radius:12px; padding:16px;">
                 <div style="display:flex;justify-content:space-between;font-size:13px;color:#94A3B8;margin-bottom:8px;">
                   <span>最优路径</span>
                   <span style="color:#06B6D4">1Inch Router</span>
                 </div>
                 <div style="display:flex;justify-content:space-between;font-size:13px;color:#94A3B8;">
                   <span>网络费</span>
                   <span>~$2.45</span>
                 </div>
              </div>
            </div>
         </div>
      </div>
      <div class="feature-text">
        <h2 class="section-title">代币兑换</h2>
        <p class="section-desc">在钱包内直接完成资产兑换，减少跳转带来的割裂感。<br><br>支持更自然的币种切换、报价查看与结果预览，让兑换体验更顺畅。</p>
      </div>
    </div>
  </section>

  <!-- Screen 4: Market (Immersive Dark) -->
  <section class="section-dark" style="padding:120px 48px; background:#0F172A;">
    <div class="section-inner feature-row reveal">
      <div class="feature-visual">
         <div style="background:#1E293B; border-radius:32px; padding:32px; border:1px solid rgba(255,255,255,0.05); text-align:left; position:relative; overflow:hidden; max-width:400px; margin:0 auto; box-shadow:0 32px 80px rgba(0,0,0,0.5);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
               <div style="font-size:20px;font-weight:700;color:#fff;">热门币种</div>
               <div style="font-size:13px;color:#3B82F6;cursor:pointer;">查看全部行情 &rarr;</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:16px;">
               <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:rgba(255,255,255,0.03);border-radius:16px;border:1px solid rgba(255,255,255,0.05);">
                 <div style="display:flex;align-items:center;gap:12px;">
                   <div style="width:36px;height:36px;background:#F7931A;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">₿</div>
                   <div><div style="font-weight:700;color:#fff;font-size:15px;">BTC</div><div style="font-size:12px;color:#94A3B8;">Bitcoin</div></div>
                 </div>
                 <div style="text-align:right;">
                   <div style="font-weight:700;color:#fff;">$87,423.00</div><div style="color:#10B981;font-size:12px;font-weight:600;">+2.34%</div>
                 </div>
               </div>
               <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:rgba(255,255,255,0.03);border-radius:16px;border:1px solid rgba(255,255,255,0.05);">
                 <div style="display:flex;align-items:center;gap:12px;">
                   <div style="width:36px;height:36px;background:#627EEA;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">Ξ</div>
                   <div><div style="font-weight:700;color:#fff;font-size:15px;">ETH</div><div style="font-size:12px;color:#94A3B8;">Ethereum</div></div>
                 </div>
                 <div style="text-align:right;">
                   <div style="font-weight:700;color:#fff;">$3,892.50</div><div style="color:#10B981;font-size:12px;font-weight:600;">+3.28%</div>
                 </div>
               </div>
               <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:rgba(255,255,255,0.03);border-radius:16px;border:1px solid rgba(255,255,255,0.05);">
                 <div style="display:flex;align-items:center;gap:12px;">
                   <div style="width:36px;height:36px;background:#E84142;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">S</div>
                   <div><div style="font-weight:700;color:#fff;font-size:15px;">SOL</div><div style="font-size:12px;color:#94A3B8;">Solana</div></div>
                 </div>
                 <div style="text-align:right;">
                   <div style="font-weight:700;color:#fff;">$186.50</div><div style="color:#EF4444;font-size:12px;font-weight:600;">-1.05%</div>
                 </div>
               </div>
            </div>
         </div>
      </div>
      <div class="feature-text">
        <h2 class="section-title">行情发现</h2>
        <p class="section-desc">在 OneToken 中更及时地追踪市场变化，查看热门币种、涨跌表现与价格趋势。<br><br>让钱包不止是资产存储入口，更成为您日常的市场观察与发现入口。</p>
      </div>
    </div>
  </section>

  <!-- Screen 5: Security Capabilities (Horizontal Scroll Cards) -->
  <section class="section-alt hscroll-section" id="wltHScroll" style="padding:0; background:var(--bg-secondary);">
    <div class="hscroll-sticky">
      <div class="hscroll-inner">
        <div class="hscroll-title-area">
          <span class="section-label">安全能力</span>
          <h2 class="section-title">安全是钱包体验的根基</h2>
          <p class="section-desc">资产可用很重要，但资产安全更重要。OneToken 钱包围绕私钥、签名、授权、风险识别与恢复能力，构建完整的安全体验。</p>
        </div>
        <div class="hscroll-cards-area">
          <div class="wlt-detail-card" style="width:340px;">
            <div class="wlt-detail-card-visual" style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(52,211,153,0.05));">
              <div style="color:#10B981;position:relative;z-index:1;padding:24px;background:#fff;border-radius:50%;box-shadow:0 12px 32px rgba(16,185,129,0.15);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>
            <div class="wlt-detail-card-body">
              <h4>本地生成并存储</h4>
              <p>私钥 / 助记词仅在本地生成与保存，不上传服务器，用户始终掌握核心资产控制权。</p>
            </div>
          </div>
          <div class="wlt-detail-card" style="width:340px;">
            <div class="wlt-detail-card-visual" style="background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(96,165,250,0.05));">
              <div style="color:#3B82F6;position:relative;z-index:1;padding:24px;background:#fff;border-radius:50%;box-shadow:0 12px 32px rgba(59,130,246,0.15);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
            </div>
            <div class="wlt-detail-card-body">
              <h4>多重确认机制</h4>
              <p>转账、授权、签名等关键操作提供多层确认，降低误操作和高风险交互带来的损失。</p>
            </div>
          </div>
          <div class="wlt-detail-card" style="width:340px;">
            <div class="wlt-detail-card-visual" style="background:linear-gradient(135deg,rgba(139,92,246,0.1),rgba(167,139,250,0.05));">
              <div style="color:#8B5CF6;position:relative;z-index:1;padding:24px;background:#fff;border-radius:50%;box-shadow:0 12px 32px rgba(139,92,246,0.15);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              </div>
            </div>
            <div class="wlt-detail-card-body">
              <h4>硬件钱包接入</h4>
              <p>支持更高等级的资产隔离方案，让大额资产管理更安心。</p>
            </div>
          </div>
          <div class="wlt-detail-card" style="width:340px;">
            <div class="wlt-detail-card-visual" style="background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(251,191,36,0.05));">
              <div style="color:#F59E0B;position:relative;z-index:1;padding:24px;background:#fff;border-radius:50%;box-shadow:0 12px 32px rgba(245,158,11,0.15);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
            </div>
            <div class="wlt-detail-card-body">
              <h4>授权风险识别</h4>
              <p>对高风险授权、可疑交互、权限过大的签名请求进行重点提示，帮助用户做出更谨慎判断。</p>
            </div>
          </div>
          <div class="wlt-detail-card" style="width:340px;">
            <div class="wlt-detail-card-visual" style="background:linear-gradient(135deg,rgba(6,182,212,0.1),rgba(34,211,238,0.05));">
              <div style="color:#06B6D4;position:relative;z-index:1;padding:24px;background:#fff;border-radius:50%;box-shadow:0 12px 32px rgba(6,182,212,0.15);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
            </div>
            <div class="wlt-detail-card-body">
              <h4>备份与恢复能力</h4>
              <p>支持助记词备份、导入与恢复，降低因设备更换或丢失带来的使用中断风险。</p>
            </div>
          </div>
          <div class="wlt-detail-card" style="width:340px;">
            <div class="wlt-detail-card-visual" style="background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(244,114,182,0.05));">
              <div style="color:#EC4899;position:relative;z-index:1;padding:24px;background:#fff;border-radius:50%;box-shadow:0 12px 32px rgba(236,72,153,0.15);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
            </div>
            <div class="wlt-detail-card-body">
              <h4>多链统一安全管理</h4>
              <p>在一个钱包中统一管理多链资产，同时保持一致的签名、校验与风险提示体验。</p>
            </div>
          </div>
          <div class="wlt-detail-card" style="width:340px;">
            <div class="wlt-detail-card-visual" style="background:linear-gradient(135deg,rgba(15,23,42,0.1),rgba(71,85,105,0.05));">
              <div style="color:#0F172A;position:relative;z-index:1;padding:24px;background:#fff;border-radius:50%;box-shadow:0 12px 32px rgba(15,23,42,0.15);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
            </div>
            <div class="wlt-detail-card-body">
              <h4>地址与签名校验</h4>
              <p>关键交易前提供更明确的地址、网络、授权对象与签名摘要信息，减少钓鱼风险。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 6: CTA -->
  <section class="cta-section">
    <div class="reveal">
      <h2 class="section-title">开始使用 OneToken 钱包</h2>
      <p class="section-desc" style="margin:0 auto;">下载 App，体验更清晰的数字资产管理方式。</p>
      <div class="btn-group">
        <a class="btn btn-primary" onclick="showPage('download')">下载 App</a>
        <a class="btn btn-secondary" onclick="showPage('help')">查看帮助中心</a>
      </div>
    </div>
  </section>`;

  initReveals(el);
  setTimeout(function(){ initHScroll('wltHScroll'); }, 300);

  // Parallax on mouse move for hero device
  var device = document.getElementById('wltDevice');
  if(device){
    document.addEventListener('mousemove', function(e){
      var cx = window.innerWidth/2, cy = window.innerHeight/2;
      var dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
      device.style.transform = 'translateY(0) perspective(800px) rotateY('+(dx*-6)+'deg) rotateX('+(dy*4)+'deg)';
    });
  }
};

// ========== ONEPAY PAGE (2 screens) ==========
window.renderOnepayPage = function(){
  var el = document.getElementById('page-onepay');
  if(!el) {
    el = document.createElement('div');
    el.className = 'page';
    el.id = 'page-onepay';
    document.body.appendChild(el);
  }

  el.innerHTML = `
  <!-- Screen 1: Immersive Dark Hero -->
  <section class="upay-v2-hero">
    <div class="upay-v2-hero-bg"></div>
    <div class="upay-v2-hero-glow"></div>
    <div class="upay-v2-hero-content reveal">
      <span class="section-label" style="color:#A78BFA;">ONEPAY</span>
      <h1 class="hero-title" style="font-size:52px;">ONEPAY，把数字资产<br>带向更真实的使用场景</h1>
      <p class="hero-subtitle" style="max-width:560px;">连接账户与卡片，延展更真实的支付、计划与奖励体验。</p>
      <div class="btn-group" style="justify-content:center;">
        <a class="btn btn-primary" onclick="showPage('download')">下载 App</a>
      </div>
      <div class="upay-v2-cards-float reveal reveal-delay-2">
        <div class="upay-v2-float-card virtual">
          <div style="position:relative;z-index:1;">
            <div style="font-size:11px;opacity:0.8;">VISA Virtual</div>
            <div style="font-size:18px;font-weight:700;margin:8px 0;letter-spacing:2px;">**** **** **** 9999</div>
            <div style="display:flex;justify-content:space-between;font-size:11px;"><span>12/29</span><span>$1,250.80</span></div>
          </div>
        </div>
        <div class="upay-v2-float-card physical">
          <div style="position:relative;z-index:1;">
            <div style="font-size:11px;opacity:0.7;">MASTER Physical</div>
            <div style="font-size:18px;font-weight:700;margin:8px 0;letter-spacing:2px;">**** **** **** 6666</div>
            <div style="display:flex;justify-content:space-between;font-size:11px;"><span>06/28</span><span>$4,200.00</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 2: Product Matrix (Inline Expandable) -->
  <section class="section-dark" style="padding:120px 48px; background:#0F172A; min-height:80vh; display:flex; align-items:center;" id="onepayMatrixSection">
    <div class="section-inner pm-layout" style="width:100%; display:flex; flex-wrap:wrap; gap:40px; align-items:center;">
      <div class="pm-text reveal" style="flex:1; min-width:300px; z-index:2;">
        <span class="section-label" style="color:#A78BFA;">产品矩阵</span>
        <h2 class="section-title" style="color:#fff;" id="inlinePmTitle">卡片产品矩阵</h2>
        <p class="section-desc" style="color:#94A3B8;" id="inlinePmDesc">覆盖从日常消费到长期持有的完整生命周期。点击右侧卡片查看详情。</p>
        <ul id="inlinePmHighlights" style="margin:24px 0; padding-left:20px; color:#E2E8F0; font-size:14px; line-height:1.8;">
          <li>随时充值与消费</li>
          <li>灵活的资产管理</li>
          <li>多场景全覆盖</li>
        </ul>
      </div>
      <div class="pm-visual reveal reveal-delay-1" style="flex:1.5; min-width:400px; position:relative; min-height:500px;">
        <div class="pm-constellation" id="inlinePmConstellation" style="transform:scale(0.9); transform-origin:center left;">
          <!-- Connection Lines SVG -->
          <svg class="pm-connection-lines" viewBox="0 0 560 480" fill="none">
            <line x1="280" y1="200" x2="100" y2="60" stroke="url(#pmLine1)" stroke-width="1" opacity="0.3" stroke-dasharray="4 3"/>
            <line x1="280" y1="200" x2="460" y2="60" stroke="url(#pmLine2)" stroke-width="1" opacity="0.3" stroke-dasharray="4 3"/>
            <line x1="280" y1="200" x2="70" y2="380" stroke="url(#pmLine3)" stroke-width="1" opacity="0.3" stroke-dasharray="4 3"/>
            <line x1="280" y1="200" x2="490" y2="380" stroke="url(#pmLine4)" stroke-width="1" opacity="0.3" stroke-dasharray="4 3"/>
            <defs>
              <linearGradient id="pmLine1" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#3B82F6" offset="0"/><stop stop-color="transparent" offset="1"/></linearGradient>
              <linearGradient id="pmLine2" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#06B6D4" offset="0"/><stop stop-color="transparent" offset="1"/></linearGradient>
              <linearGradient id="pmLine3" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#8B5CF6" offset="0"/><stop stop-color="transparent" offset="1"/></linearGradient>
              <linearGradient id="pmLine4" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#F59E0B" offset="0"/><stop stop-color="transparent" offset="1"/></linearGradient>
            </defs>
          </svg>

          <!-- Main Card: U卡 -->
          <div class="pm-card pm-card-main pm-active" data-pm="ucard" onclick="inlinePmExpand('ucard')" onmouseenter="pmHover('ucard')" onmouseleave="pmLeave()">
            <div class="pm-card-inner pm-card-ucard">
              <div class="pm-card-chip"></div>
              <div class="pm-card-brand">OneToken</div>
              <div class="pm-card-number">•••• •••• •••• 8888</div>
            </div>
            <div class="pm-card-info">
              <div class="pm-card-name">U 卡</div>
              <div class="pm-card-desc">连接充值、消费、奖励与计划管理，是 OneToken 资产流转的核心入口。</div>
              <span class="pm-card-tag pm-tag-blue">账户主枢纽</span>
            </div>
          </div>

          <!-- Satellite: 虚拟卡 -->
          <div class="pm-card pm-card-sat pm-sat-1" data-pm="virtual" onclick="inlinePmExpand('virtual')" onmouseenter="pmHover('virtual')" onmouseleave="pmLeave()">
            <div class="pm-card-inner pm-card-virtual">
              <div class="pm-card-chip-sm"></div>
              <div class="pm-card-brand-sm">VIRTUAL</div>
            </div>
            <div class="pm-card-info">
              <div class="pm-card-name">虚拟卡</div>
              <div class="pm-card-desc">即开即用，适合线上支付、订阅服务与全球电商消费。</div>
              <span class="pm-card-tag pm-tag-cyan">线上即用</span>
            </div>
          </div>

          <!-- Satellite: 实体卡 -->
          <div class="pm-card pm-card-sat pm-sat-2" data-pm="physical" onclick="inlinePmExpand('physical')" onmouseenter="pmHover('physical')" onmouseleave="pmLeave()">
            <div class="pm-card-inner pm-card-physical">
              <div class="pm-card-chip-sm"></div>
              <div class="pm-card-brand-sm">PHYSICAL</div>
              <div class="pm-card-stripe"></div>
            </div>
            <div class="pm-card-info">
              <div class="pm-card-name">实体卡</div>
              <div class="pm-card-desc">把数字资产带到线下刷卡与全球取现，延展更真实的日常消费场景。</div>
              <span class="pm-card-tag pm-tag-slate">线下延展</span>
            </div>
          </div>

          <!-- Satellite: NFC卡 -->
          <div class="pm-card pm-card-sat pm-sat-3" data-pm="nfc" onclick="inlinePmExpand('nfc')" onmouseenter="pmHover('nfc')" onmouseleave="pmLeave()">
            <div class="pm-card-badge">Coming Soon</div>
            <div class="pm-card-inner pm-card-nfc">
              <div class="pm-nfc-waves">
                <div class="pm-nfc-arc"></div>
                <div class="pm-nfc-arc"></div>
                <div class="pm-nfc-arc"></div>
              </div>
              <div class="pm-card-brand-sm">NFC</div>
            </div>
            <div class="pm-card-info">
              <div class="pm-card-name">NFC 卡</div>
              <div class="pm-card-desc">轻触设备即可完成识别与安全交互，用更便携的卡片形态承载高频使用。</div>
              <span class="pm-card-tag pm-tag-purple">轻触交互</span>
            </div>
          </div>

          <!-- Satellite: 硬件钱包 -->
          <div class="pm-card pm-card-sat pm-sat-4" data-pm="hwwallet" onclick="inlinePmExpand('hwwallet')" onmouseenter="pmHover('hwwallet')" onmouseleave="pmLeave()">
            <div class="pm-card-badge">Coming Soon</div>
            <div class="pm-card-inner pm-card-hw">
              <div class="pm-hw-body">
                <div class="pm-hw-screen"></div>
                <div class="pm-hw-buttons">
                  <div class="pm-hw-btn"></div>
                  <div class="pm-hw-btn"></div>
                </div>
              </div>
            </div>
            <div class="pm-card-info">
              <div class="pm-card-name">硬件钱包</div>
              <div class="pm-card-desc">为更高价值资产提供独立硬件级防护，让长期持有与关键签名更安心。</div>
              <span class="pm-card-tag pm-tag-amber">高阶自托管</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 3: Flow (Account → Usage) -->
  <section class="section" style="text-align:center;padding:100px 48px;">
    <div class="reveal">
      <span class="section-label">使用场景</span>
      <h2 class="section-title">从账户承接，到更真实的使用场景</h2>
      <p class="section-desc" style="margin:0 auto 60px;">资产进入 ONEPAY 后，自然连接卡片、提现与互转。</p>
    </div>
    <div class="upay-v2-flow reveal reveal-delay-1" id="upayFlow">
      <div class="upay-v2-flow-node active" style="background:rgba(59,130,246,0.08);">
        <div class="upay-v2-flow-node-icon" style="background:rgba(59,130,246,0.15);color:#3B82F6;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg></div>
        <h4>进入 ONEPAY</h4>
        <p>充值到 ONEPAY 账户</p>
      </div>
      <div class="upay-v2-flow-line active"></div>
      <div class="upay-v2-flow-node" style="background:rgba(139,92,246,0.08);">
        <div class="upay-v2-flow-node-icon" style="background:rgba(139,92,246,0.15);color:#8B5CF6;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>
        <h4>卡片使用</h4>
        <p>充值至虚拟卡或实体卡</p>
      </div>
      <div class="upay-v2-flow-line"></div>
      <div class="upay-v2-flow-node" style="background:rgba(245,158,11,0.08);">
        <div class="upay-v2-flow-node-icon" style="background:rgba(245,158,11,0.15);color:#F59E0B;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>
        <h4>提现</h4>
        <p>提现至外部钱包</p>
      </div>
      <div class="upay-v2-flow-line"></div>
      <div class="upay-v2-flow-node" style="background:rgba(6,182,212,0.08);">
        <div class="upay-v2-flow-node-icon" style="background:rgba(6,182,212,0.15);color:#06B6D4;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/></svg></div>
        <h4>内部互转</h4>
        <p>ONEPAY 账户间互转</p>
      </div>
    </div>
  </section>

  <!-- Screen 4: Plans & Rewards (Delayed Reveal) -->
  <section class="upay-v2-reveal-scene" id="upayReveal">
    <div class="upay-v2-reveal-bg"></div>
    <div class="upay-v2-reveal-content">
      <div class="upay-v2-reveal-item" data-delay="0">
        <span class="section-label">计划与奖励</span>
        <h2 class="section-title">灵活计划<br>让资产保持流动性与日常收益平衡</h2>
      </div>
      <div class="upay-v2-reveal-item" data-delay="600">
        <p class="section-desc" style="margin:16px auto 0;">灵活计划支持随存随取，奖励每日发放，更适合日常资金管理与灵活使用。</p>
      </div>
      <div class="upay-v2-plan-badges">
        <div class="upay-v2-plan-badge" data-delay="1200" style="border-left:3px solid #10B981;">
          <div style="font-size:13px;color:#10B981;margin-bottom:4px;">灵活计划</div>
          <div style="font-size:20px;font-weight:800;">APY 4.5%</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">随存随取，灵活奖励每日发放</div>
        </div>
        <div class="upay-v2-plan-badge" data-delay="1600" style="border-left:3px solid #8B5CF6;">
          <div style="font-size:13px;color:#8B5CF6;margin-bottom:4px;">灵活机制</div>
          <div style="font-size:20px;font-weight:800;">自动复投</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">奖励可自动回投灵活计划</div>
        </div>
        <div class="upay-v2-plan-badge" data-delay="2000" style="border-left:3px solid #F59E0B;">
          <div style="font-size:13px;color:#F59E0B;margin-bottom:4px;">累计奖励</div>
          <div style="font-size:20px;font-weight:800;">$1,286.50</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">奖励可转入灵活计划继续增长</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 5: Value Cards (Horizontal Scroll Dark) -->
  <section class="section-dark upay-v2-hscroll hscroll-section" id="upayHScroll" style="padding:0;">
    <div class="hscroll-sticky">
      <div class="hscroll-inner">
        <div class="hscroll-title-area">
          <span class="section-label">旗舰能力</span>
          <h2 class="section-title" style="color:#fff;">为什么 ONEPAY 会成为 OneToken 的旗舰能力</h2>
          <p class="section-desc">不只是支付工具，而是连接数字资产与真实使用的完整体验。</p>
        </div>
        <div class="hscroll-cards-area">
          <div class="upay-v2-detail-card">
            <div class="upay-v2-detail-card-visual" style="background:linear-gradient(135deg,rgba(59,130,246,0.15),rgba(6,182,212,0.1));">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="1"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <div class="upay-v2-detail-card-body">
              <h4>更真实的支付延展</h4>
              <p>让数字资产通过卡片进入线上和线下消费场景。</p>
            </div>
          </div>
          <div class="upay-v2-detail-card">
            <div class="upay-v2-detail-card-visual" style="background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(99,102,241,0.1));">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="1"><path d="M12 2v20M2 12h20"/></svg>
            </div>
            <div class="upay-v2-detail-card-body">
              <h4>账户与卡片衔接更自然</h4>
              <p>从 ONEPAY 账户到卡片充值，资金流动清晰可追溯。</p>
            </div>
          </div>
          <div class="upay-v2-detail-card">
            <div class="upay-v2-detail-card-visual" style="background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,182,212,0.1));">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div class="upay-v2-detail-card-body">
              <h4>灵活奖励体验</h4>
              <p>灵活计划让资产在保持流动性的同时获得持续收益。</p>
            </div>
          </div>
          <div class="upay-v2-detail-card">
            <div class="upay-v2-detail-card-visual" style="background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(251,146,60,0.1));">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="1"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <div class="upay-v2-detail-card-body">
              <h4>更清晰的资金记录</h4>
              <p>充值、消费、奖励、提现，所有操作记录清晰可查。</p>
            </div>
          </div>
          <div class="upay-v2-detail-card">
            <div class="upay-v2-detail-card-visual" style="background:linear-gradient(135deg,rgba(236,72,153,0.12),rgba(139,92,246,0.1));">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#F472B6" stroke-width="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="upay-v2-detail-card-body">
              <h4>更适合长期留存</h4>
              <p>计划与奖励机制、合伙津贴体系支持长期使用。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 6: CTA -->
  <section class="cta-section">
    <div class="reveal">
      <span class="section-label">开始体验</span>
      <h2 class="section-title">下载 OneToken，体验完整的 ONEPAY 能力</h2>
      <p class="section-desc" style="margin:0 auto;">从账户到卡片，从计划到奖励，在 App 中体验 ONEPAY 的全部能力。</p>
      <div class="btn-group">
        <a class="btn btn-primary" onclick="showPage('download')">下载 App</a>
        <a class="btn btn-secondary" onclick="showPage('help')">查看帮助中心</a>
      </div>
    </div>
  </section>`;

  initReveals(el);
  setTimeout(function(){ initHScroll('upayHScroll'); }, 300);
  
  // Flow nodes sequential activation
  setTimeout(function(){
    var flowSection = document.getElementById('upayFlow');
    if(!flowSection) return;
    new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var nodes = flowSection.querySelectorAll('.upay-v2-flow-node');
        var lines = flowSection.querySelectorAll('.upay-v2-flow-line');
        nodes.forEach(function(n,i){
          setTimeout(function(){ n.classList.add('active'); }, i*400);
        });
        lines.forEach(function(l,i){
          setTimeout(function(){ l.classList.add('active'); }, i*400+200);
        });
      });
    },{threshold:0.3}).observe(flowSection);
  }, 200);

  // Delayed reveal scene
  setTimeout(function(){
    var revealSection = document.getElementById('upayReveal');
    if(!revealSection) return;
    new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var items = revealSection.querySelectorAll('.upay-v2-reveal-item, .upay-v2-plan-badge');
        items.forEach(function(item){
          var delay = parseInt(item.getAttribute('data-delay'))||0;
          setTimeout(function(){ item.classList.add('visible'); }, delay);
        });
      });
    },{threshold:0.3}).observe(revealSection);
  }, 200);
  
  // Attach inline PM click logic
  window.inlinePmExpand = function(key) {
    var data = pmProductData[key];
    if(!data) return;
    
    // Update left text area instead of full-screen popup
    document.getElementById('inlinePmTitle').textContent = data.name;
    document.getElementById('inlinePmDesc').textContent = data.positioning + ' ' + data.intro;
    
    var hlList = document.getElementById('inlinePmHighlights');
    hlList.innerHTML = '';
    data.highlights.forEach(function(h) {
      var li = document.createElement('li');
      li.textContent = h;
      hlList.appendChild(li);
    });

    var constellation = document.getElementById('inlinePmConstellation');
    if(!constellation) return;

    // Highlight selected card visually
    constellation.querySelectorAll('.pm-card').forEach(function(c) {
      c.classList.remove('pm-card-expanded'); // use expanded class to scale it up maybe
      if(c.dataset.pm === key) {
        c.classList.add('pm-active');
      } else {
        c.classList.remove('pm-active');
        c.classList.add('pm-dimmed');
      }
    });
  };
  
  // Initialize with U卡 content
  setTimeout(function() {
    if(window.inlinePmExpand) window.inlinePmExpand('ucard');
  }, 100);
};

// ========== NFC PAGE ==========
window.renderNfcPage = function() {
  var el = document.getElementById('page-nfc');
  if(!el) {
    el = document.createElement('div');
    el.className = 'page';
    el.id = 'page-nfc';
    document.body.appendChild(el);
  }

  el.innerHTML = `
  <!-- Screen 1: Hero -->
  <section class="nfc-hero">
    <div class="nfc-hero-inner reveal">
      <div class="nfc-hero-content">
        <span class="section-label" style="color:#60A5FA;">NFC HARDWARE SECURITY</span>
        <h1>让安全确认，回到一个更自然的动作</h1>
        <p>轻触设备即可完成关键确认。多卡互备、硬件级隔离、便携交互，让数字资产安全不再停留在抽象概念。</p>
        <div class="btn-group">
          <a class="btn btn-primary" onclick="showPage('download')">下载 App 了解 NFC</a>
          <a class="btn btn-secondary" onclick="document.getElementById('nfcSecurity').scrollIntoView({behavior:'smooth'})">查看安全机制</a>
        </div>
      </div>
      <div class="nfc-hero-visual">
        <div class="nfc-card-stack">
          <div class="nfc-c-base nfc-c-back2"></div>
          <div class="nfc-c-base nfc-c-back1"></div>
          <div class="nfc-c-base nfc-c-main">
            <div class="nfc-c-chip"></div>
            <div class="nfc-c-ripples"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 2: Security Core -->
  <section id="nfcSecurity" class="nfc-sec-scene">
    <div class="section-inner reveal">
      <div style="text-align:center;">
        <h2 class="section-title">重新定义物理安全</h2>
      </div>
      <div class="nfc-sec-layout">
        <div class="nfc-sec-lines">
          <svg viewBox="0 0 1000 500">
            <path d="M 140 250 L 430 250 M 860 250 L 570 250 M 500 140 L 500 80 M 500 360 L 500 420" stroke="#60A5FA" stroke-width="2" stroke-dasharray="8 8"/>
          </svg>
        </div>
        <div class="nfc-sec-chip">
          OneToken<br>Secure Element
        </div>
        
        <div class="nfc-sec-feat feat-tl">
          <h4>安全芯片隔离</h4>
          <p>私钥在安全芯片内生成与存储，不暴露给外部环境</p>
        </div>
        <div class="nfc-sec-feat feat-tr">
          <h4>防伪认证机制</h4>
          <p>每张卡片都有唯一硬件身份，降低假卡或异常替换风险</p>
        </div>
        <div class="nfc-sec-feat feat-bl">
          <h4>多卡互备方案</h4>
          <p>标准 3 卡互备，不把安全压在单一载体上</p>
        </div>
        <div class="nfc-sec-feat feat-br">
          <h4>近场确认交互</h4>
          <p>关键操作通过贴卡完成，减少复杂输入路径与误操作风险</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 3: Durability -->
  <section class="nfc-durability">
    <div class="durability-layout reveal">
      <div class="durability-visual">
        <div class="d-card-mock">
           <div class="d-card-sheen"></div>
        </div>
      </div>
      <div class="durability-content">
        <span class="section-label">DURABILITY & WARRANTY</span>
        <h2 class="section-title">不只是安全，也足够耐用</h2>
        <p class="section-desc">为高频携带与长期保存而设计，适合日常使用与长期备份。</p>
        
        <ul class="d-list">
          <li>
            <div class="d-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <div class="d-text"><h4>多年使用周期</h4><p>面向长期持有与长期备份场景设计</p></div>
          </li>
          <li>
            <div class="d-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
            <div class="d-text"><h4>抗日常磨损</h4><p>适合钱包随身携带、日常接触与常规使用环境</p></div>
          </li>
          <li>
            <div class="d-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg></div>
            <div class="d-text"><h4>防泼溅 / 防日常损耗</h4><p>提升真实生活场景中的可用性与稳定性</p></div>
          </li>
          <li>
            <div class="d-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
            <div class="d-text"><h4>多卡互备降低单卡损坏风险</h4><p>即使一张卡出现问题，仍可通过备用卡维持控制能力</p></div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Screen 4: Scrollytelling -->
  <section class="nfc-scrolly">
    <div class="nfc-scrolly-inner">
      <div class="nfc-scroll-text" id="nfcScrollText">
        <div class="nfc-step" data-step="1">
          <h3>已创建钱包</h3>
          <p>卡内生成独立安全凭证，作为后续确认的底层基础。</p>
        </div>
        <div class="nfc-step" data-step="2">
          <h3>第一张卡已连接</h3>
          <p>完成首卡确认后，系统开始建立多卡互备关系。</p>
        </div>
        <div class="nfc-step" data-step="3">
          <h3>第二张卡已连接</h3>
          <p>备用卡通过端到端安全链路加入，为后续恢复能力做准备。</p>
        </div>
        <div class="nfc-step" data-step="4">
          <h3>三卡互备完成</h3>
          <p>完成配置后，使用卡片轻触即可进行关键确认，兼顾便携与安全。</p>
        </div>
      </div>
      
      <div class="nfc-scroll-visual">
        <div class="nfc-sticky-box" id="nfcStickyVis">
          <div class="nfc-anim-stage step-state-1" id="nfcAnimStage">
            <div class="nfc-s-phone">
               <div class="nfc-s-msg" id="screenMsg">Ready to Scan<br><span style="font-size:14px;color:#94A3B8;">正在初始化</span></div>
            </div>
            <div class="nfc-s-card nfc-s-card1"></div>
            <div class="nfc-s-card nfc-s-card2"></div>
            <div class="nfc-s-card nfc-s-card3"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen 5: Card Sets & Themes -->
  <section class="nfc-sets reveal">
    <div class="sets-layout">
      <div class="sets-visual">
        <div class="sets-display theme-dark" id="nfcSetDisplay">
          <div class="set-c set-c-back2"></div>
          <div class="set-c set-c-back1"></div>
          <div class="set-c set-c-main"></div>
        </div>
        <div class="sets-thumbs" id="nfcThemeThumbs">
          <button class="thumb-btn active" data-theme="theme-dark" style="background:#0F172A;">极夜黑</button>
          <button class="thumb-btn silver" data-theme="theme-silver" style="background:#E2E8F0;">冰川银</button>
          <button class="thumb-btn" data-theme="theme-blue" style="background:#0EA5E9;">深海蓝</button>
          <button class="thumb-btn" data-theme="theme-explore" style="background:linear-gradient(135deg, #10B981, #06B6D4);">限定探索版</button>
        </div>
      </div>
      <div class="sets-content">
        <span class="section-label" style="color:#10B981;">CARD SET</span>
        <h2 class="section-title">3 张互备卡片，一套完成安全准备</h2>
        <p class="section-desc">统一采用三卡互备方案，在便携、安全与备份能力之间取得更优平衡。</p>
        
        <div class="sets-pricing">
          <h4>3 张卡片套装</h4>
          <p class="sub">标准互备方案</p>
          <div class="price">价格待确认</div>
        </div>
      </div>
    </div>
  </section>
  `;

  initReveals(el);

  // Scrollytelling Setup
  setTimeout(function() {
    var scrollText = el.querySelector('#nfcScrollText');
    if (!scrollText) return;
    var steps = scrollText.querySelectorAll('.nfc-step');
    var stage = el.querySelector('#nfcAnimStage');
    var msg = el.querySelector('#screenMsg');

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if(e.isIntersecting) {
          steps.forEach(function(s){ s.classList.remove('active'); });
          e.target.classList.add('active');
          
          var step = e.target.getAttribute('data-step');
          if(stage) {
            stage.className = 'nfc-anim-stage step-state-' + step;
          }
          if(msg) {
            if(step == '1') msg.innerHTML = 'Ready to Scan<br><span style="font-size:14px;color:#94A3B8;">正在初始化</span>';
            if(step == '2') msg.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><br><span style="font-size:16px;">首卡已连接</span>';
            if(step == '3') msg.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><br><span style="font-size:16px;">备用卡加入</span>';
            if(step == '4') msg.innerHTML = '<div style="color:#10B981;font-size:24px;font-weight:700;">NFC Ready</div><span style="font-size:14px;color:#94A3B8;">三卡组网完成</span>';
          }
        }
      });
    }, { threshold: 0.5 });
    
    steps.forEach(function(s){ observer.observe(s); });
  }, 100);

  // Theme Switcher
  setTimeout(function() {
    var thumbs = el.querySelectorAll('.thumb-btn');
    var disp = el.querySelector('#nfcSetDisplay');
    thumbs.forEach(function(btn) {
      btn.addEventListener('click', function() {
        thumbs.forEach(function(b){ b.classList.remove('active'); });
        this.classList.add('active');
        if(disp) {
          disp.className = 'sets-display ' + this.getAttribute('data-theme');
        }
      });
    });
  }, 100);
};
})();
