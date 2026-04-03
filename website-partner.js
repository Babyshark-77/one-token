/* OneToken Website — Partner Page */
window.renderPartnerPage = function(){
  var el = document.getElementById('page-partner');
  if(!el) return;

  el.innerHTML = `
  <!-- ===== Screen 1: Hero ===== -->
  <section class="partner-hero">
    <div class="partner-hero-bg">
      <div class="partner-hero-grid"></div>
      <div class="partner-hero-glow g1"></div>
      <div class="partner-hero-glow g2"></div>
      <div class="partner-hero-glow g3"></div>
    </div>
    <div class="partner-hero-content section-inner">
      <div class="partner-hero-text">
        <span class="partner-label">PARTNER PROGRAM</span>
        <h1 class="partner-hero-title">成为 One Token<br>Türkiye 合伙人</h1>
        <p class="partner-hero-sub">从个人推广到城市合作，五级阶梯激励，最高可享 <strong>50% 直推返佣 + 25% 二级返佣</strong>。<br>支持 <strong>USD 结算</strong>，更适合土耳其本地市场拓展与长期经营。</p>
        <div class="partner-hero-btns">
          <a class="btn btn-primary partner-btn-glow" onclick="document.getElementById('partnerContact').scrollIntoView({behavior:'smooth'})">立即咨询合伙政策</a>
          <a class="btn btn-secondary partner-btn-outline" onclick="document.getElementById('partnerTiers').scrollIntoView({behavior:'smooth'})">查看返佣路径</a>
        </div>
      </div>
      <div class="partner-hero-visual">
        <div class="partner-float-cards">
          <div class="pf-card pf-card-1">
            <div class="pf-dot" style="background:#10B981;"></div>
            <div>
              <div class="pf-label">Istanbul</div>
              <div class="pf-val">Active</div>
            </div>
          </div>
          <div class="pf-card pf-card-2">
            <div class="pf-dot" style="background:#3B82F6;"></div>
            <div>
              <div class="pf-label">Partner Network</div>
              <div class="pf-val">128+ Partners</div>
            </div>
          </div>
          <div class="pf-card pf-card-3">
            <div class="pf-dot" style="background:#F59E0B;"></div>
            <div>
              <div class="pf-label">Monthly Revenue</div>
              <div class="pf-val">$12,500 USD</div>
            </div>
          </div>
          <div class="pf-card pf-card-4">
            <div class="pf-dot" style="background:#8B5CF6;"></div>
            <div>
              <div class="pf-label">USD Settlement</div>
              <div class="pf-val">Real-time</div>
            </div>
          </div>
          <div class="pf-card pf-card-5">
            <div class="pf-dot" style="background:#EC4899;"></div>
            <div>
              <div class="pf-label">City Expansion</div>
              <div class="pf-val">5 Cities</div>
            </div>
          </div>
        </div>
        <div class="partner-hero-map-mini">
          <svg viewBox="0 0 400 200" class="partner-mini-map">
            <defs>
              <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
              </radialGradient>
              <filter id="heroMapGlow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <!-- Turkey outline - stronger -->
            <path d="M50,120 Q80,80 120,85 Q150,70 180,75 Q220,65 260,70 Q300,60 340,80 Q360,90 350,110 Q340,130 300,125 Q280,135 260,125 Q240,130 220,120 Q200,135 180,125 Q150,130 120,125 Q90,135 60,130 Z" fill="rgba(59,130,246,0.15)" stroke="rgba(96,165,250,0.45)" stroke-width="1.5"/>
            <!-- Inner detail lines -->
            <path d="M120,85 Q140,95 160,90" stroke="rgba(96,165,250,0.15)" stroke-width="0.5" fill="none"/>
            <path d="M180,75 Q200,85 220,80" stroke="rgba(96,165,250,0.15)" stroke-width="0.5" fill="none"/>
            <!-- City dots - stronger -->
            <circle cx="140" cy="90" r="16" fill="url(#cityGlow)" class="city-pulse"/>
            <circle cx="140" cy="90" r="5" fill="#3B82F6" filter="url(#heroMapGlow)"/>
            <circle cx="140" cy="90" r="2" fill="#fff"/>
            <text x="140" y="76" text-anchor="middle" fill="#CBD5E1" font-size="9" font-weight="700">Istanbul</text>
            <circle cx="210" cy="88" r="13" fill="url(#cityGlow)" class="city-pulse"/>
            <circle cx="210" cy="88" r="4.5" fill="#10B981" filter="url(#heroMapGlow)"/>
            <circle cx="210" cy="88" r="1.5" fill="#fff"/>
            <text x="210" y="76" text-anchor="middle" fill="#CBD5E1" font-size="9" font-weight="700">Ankara</text>
            <circle cx="270" cy="105" r="11" fill="url(#cityGlow)" class="city-pulse"/>
            <circle cx="270" cy="105" r="4" fill="#F59E0B" filter="url(#heroMapGlow)"/>
            <circle cx="270" cy="105" r="1.5" fill="#fff"/>
            <text x="270" y="95" text-anchor="middle" fill="#CBD5E1" font-size="9" font-weight="700">Antalya</text>
            <circle cx="120" cy="100" r="9" fill="url(#cityGlow)" class="city-pulse"/>
            <circle cx="120" cy="100" r="3.5" fill="#8B5CF6" filter="url(#heroMapGlow)"/>
            <text x="120" y="113" text-anchor="middle" fill="#CBD5E1" font-size="8" font-weight="700">Izmir</text>
            <circle cx="160" cy="82" r="8" fill="url(#cityGlow)" class="city-pulse"/>
            <circle cx="160" cy="82" r="3" fill="#EC4899" filter="url(#heroMapGlow)"/>
            <text x="173" y="79" text-anchor="start" fill="#CBD5E1" font-size="8" font-weight="700">Bursa</text>
            <!-- Connection lines - stronger -->
            <line x1="140" y1="90" x2="210" y2="88" stroke="rgba(96,165,250,0.3)" stroke-width="1" stroke-dasharray="4 3" class="conn-line"/>
            <line x1="210" y1="88" x2="270" y2="105" stroke="rgba(52,211,153,0.25)" stroke-width="1" stroke-dasharray="4 3" class="conn-line"/>
            <line x1="140" y1="90" x2="120" y2="100" stroke="rgba(96,165,250,0.25)" stroke-width="1" stroke-dasharray="4 3" class="conn-line"/>
            <line x1="140" y1="90" x2="160" y2="82" stroke="rgba(167,139,250,0.25)" stroke-width="1" stroke-dasharray="4 3" class="conn-line"/>
          </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== Screen 2: Revenue Model ===== -->
  <section class="partner-section partner-revenue" id="partnerRevenue">
    <div class="section-inner">
      <div style="text-align:center;margin-bottom:64px;" class="reveal">
        <span class="partner-label">REVENUE MODEL</span>
        <h2 class="section-title" style="color:#F8FAFC;">两种收益来源，一条升级路径</h2>
        <p class="section-desc" style="margin:0 auto;color:#B0BEC5;">理解为什么值得做，收益怎么来。</p>
      </div>
      <div class="revenue-cards reveal">
        <div class="revenue-card">
          <div class="revenue-card-glow" style="background:rgba(16,185,129,0.1);"></div>
          <div class="revenue-icon" style="background:rgba(16,185,129,0.15);color:#10B981;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
          </div>
          <h3>直推收益</h3>
          <div class="revenue-num">最高 <span>50%</span></div>
          <p>你直接邀请的用户参与计划后，可获得对应比例的合作收益返佣。</p>
          <div class="revenue-tag">Direct Referral</div>
        </div>
        <div class="revenue-card">
          <div class="revenue-card-glow" style="background:rgba(59,130,246,0.1);"></div>
          <div class="revenue-icon" style="background:rgba(59,130,246,0.15);color:#3B82F6;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <h3>二级收益</h3>
          <div class="revenue-num">最高 <span>25%</span></div>
          <p>下级合伙人继续拓展市场，你仍可持续获得二级收益，形成团队放大效应。</p>
          <div class="revenue-tag">Team Leverage</div>
        </div>
        <div class="revenue-card">
          <div class="revenue-card-glow" style="background:rgba(139,92,246,0.1);"></div>
          <div class="revenue-icon" style="background:rgba(139,92,246,0.15);color:#8B5CF6;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          </div>
          <h3>阶梯式成长</h3>
          <div class="revenue-num" style="font-size:28px;">V1 → 区域总代</div>
          <p>从 V1 到区域总代，随着团队规模与本地资源能力提升，返佣比例和合作权益同步提升。</p>
          <div class="revenue-tag">Growth Path</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== Screen 3: Calculator ===== -->
  <section class="partner-section partner-calc" id="partnerCalc">
    <div class="section-inner">
      <div style="text-align:center;margin-bottom:64px;" class="reveal">
        <span class="partner-label">REVENUE CALCULATOR</span>
        <h2 class="section-title" style="color:#F8FAFC;">看看你的市场，能带来多少收益</h2>
      </div>
      <div class="calc-container reveal">
        <div class="calc-inputs">
          <div class="calc-group">
            <label>当前等级</label>
            <div class="calc-tier-btns" id="calcTierBtns">
              <button class="calc-tier-btn active" data-tier="0" onclick="window._calcTier(0)">V1</button>
              <button class="calc-tier-btn" data-tier="1" onclick="window._calcTier(1)">V2</button>
              <button class="calc-tier-btn" data-tier="2" onclick="window._calcTier(2)">V3</button>
              <button class="calc-tier-btn" data-tier="3" onclick="window._calcTier(3)">市级代理</button>
              <button class="calc-tier-btn" data-tier="4" onclick="window._calcTier(4)">区域总代</button>
            </div>
          </div>
          <div class="calc-group">
            <label>直推活跃用户数</label>
            <div class="calc-slider-row">
              <input type="range" class="calc-range" id="calcDirect" min="1" max="200" value="20" oninput="window._calcUpdate()">
              <span class="calc-range-val" id="calcDirectVal">20 人</span>
            </div>
          </div>
          <div class="calc-group">
            <label>二级活跃用户数</label>
            <div class="calc-slider-row">
              <input type="range" class="calc-range" id="calcSecond" min="0" max="500" value="50" oninput="window._calcUpdate()">
              <span class="calc-range-val" id="calcSecondVal">50 人</span>
            </div>
          </div>
          <div class="calc-group">
            <label>团队月度参与规模 (USD)</label>
            <div class="calc-slider-row">
              <input type="range" class="calc-range" id="calcScale" min="500" max="100000" step="500" value="10000" oninput="window._calcUpdate()">
              <span class="calc-range-val" id="calcScaleVal">$10,000</span>
            </div>
          </div>
        </div>
        <div class="calc-results">
          <div class="calc-result-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            预估月收益
          </div>
          <div class="calc-result-card">
            <div class="calc-result-item">
              <span class="calc-r-label">直推收益</span>
              <span class="calc-r-value" id="calcR1">$500</span>
              <span class="calc-r-unit">USD</span>
            </div>
            <div class="calc-result-item">
              <span class="calc-r-label">二级收益</span>
              <span class="calc-r-value" id="calcR2">$125</span>
              <span class="calc-r-unit">USD</span>
            </div>
            <div class="calc-result-divider"></div>
            <div class="calc-result-total">
              <span class="calc-r-label">预计月总收益</span>
              <span class="calc-r-total-value" id="calcTotal">$625</span>
              <span class="calc-r-unit large">USD</span>
            </div>
          </div>
          <div class="calc-disclaimer">以上为示意测算，实际收益与用户活跃度、等级规则及团队参与规模有关。</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== Screen 4: Tier Roadmap ===== -->
  <section class="partner-section partner-tiers" id="partnerTiers" style="background:linear-gradient(180deg,#0C1424 0%,#101C2F 50%,#132240 100%);">
    <div class="section-inner">
      <div style="text-align:center;margin-bottom:64px;" class="reveal">
        <span class="partner-label">GROWTH ROADMAP</span>
        <h2 class="section-title" style="color:#F8FAFC;">合伙人晋升之路</h2>
        <p class="section-desc" style="margin:0 auto;color:#B0BEC5;">等级越高，收益越强，身份越高。从零门槛起步，成长为区域合作核心。</p>
      </div>
      <div class="tier-road reveal">
        <div class="tier-road-line"></div>
        <div class="tier-card tier-v1" data-tier-hover="适合个人社群推广，零门槛起步">
          <div class="tier-badge">V1</div>
          <h4>初级合伙人</h4>
          <div class="tier-condition">推荐 1–5 人</div>
          <div class="tier-rates">
            <div class="tier-rate"><span>直推</span><strong>10%</strong></div>
            <div class="tier-rate"><span>二级</span><strong>5%</strong></div>
          </div>
          <div class="tier-hover-tip">适合个人社群推广</div>
        </div>
        <div class="tier-card tier-v2" data-tier-hover="社群扩展阶段">
          <div class="tier-badge">V2</div>
          <h4>中级合伙人</h4>
          <div class="tier-condition">推荐 6–15 人</div>
          <div class="tier-rates">
            <div class="tier-rate"><span>直推</span><strong>20%</strong></div>
            <div class="tier-rate"><span>二级</span><strong>10%</strong></div>
          </div>
          <div class="tier-hover-tip">社群扩展阶段</div>
        </div>
        <div class="tier-card tier-v3" data-tier-hover="高级合伙人，具备团队运营能力">
          <div class="tier-badge">V3</div>
          <h4>高级合伙人</h4>
          <div class="tier-condition">推荐 16–30 人</div>
          <div class="tier-rates">
            <div class="tier-rate"><span>直推</span><strong>30%</strong></div>
            <div class="tier-rate"><span>二级</span><strong>15%</strong></div>
          </div>
          <div class="tier-hover-tip">高级合伙人</div>
        </div>
        <div class="tier-card tier-city" data-tier-hover="适合线下门店与本地资源方">
          <div class="tier-badge badge-gold">市级</div>
          <h4>市级代理</h4>
          <div class="tier-condition">线下门店 + 押金</div>
          <div class="tier-rates">
            <div class="tier-rate"><span>直推</span><strong>40%</strong></div>
            <div class="tier-rate"><span>二级</span><strong>20%</strong></div>
          </div>
          <div class="tier-hover-tip">适合线下门店与本地资源方</div>
        </div>
        <div class="tier-card tier-region" data-tier-hover="区域合作与总部直签机会">
          <div class="tier-badge badge-gold">总代</div>
          <h4>区域总代</h4>
          <div class="tier-condition">开设 3 家市级店</div>
          <div class="tier-rates">
            <div class="tier-rate"><span>直推</span><strong>50%</strong></div>
            <div class="tier-rate"><span>二级</span><strong>25%</strong></div>
          </div>
          <div class="tier-hover-tip">区域合作与总部直签机会</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== Screen 5: Benefits ===== -->
  <section class="partner-section partner-benefits" id="partnerBenefits">
    <div class="section-inner">
      <div style="text-align:center;margin-bottom:64px;" class="reveal">
        <span class="partner-label">PARTNER BENEFITS</span>
        <h2 class="section-title" style="color:#F8FAFC;">成为合伙人，你不只是拿返佣</h2>
        <p class="section-desc" style="margin:0 auto;color:#B0BEC5;">这是一个有资源支持的体系，不是自己单打独斗。</p>
      </div>
      <div class="benefits-grid benefits-grid-2x2 reveal">
        <div class="benefit-card benefit-card-lg">
          <div class="benefit-icon benefit-icon-lg" style="background:rgba(16,185,129,0.15);color:#10B981;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
          </div>
          <h4>专属返佣</h4>
          <p>实时结算，收益透明可查。根据等级享受不同比例的合作收益，支持 USD 结算到账。</p>
        </div>
        <div class="benefit-card benefit-card-lg">
          <div class="benefit-icon benefit-icon-lg" style="background:rgba(59,130,246,0.15);color:#3B82F6;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <h4>本地化物料支持</h4>
          <p>提供土耳其语宣传素材与基础推广内容，降低本地化运营门槛。</p>
        </div>
        <div class="benefit-card benefit-card-lg">
          <div class="benefit-icon benefit-icon-lg" style="background:rgba(236,72,153,0.15);color:#EC4899;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h4>城市合作机会</h4>
          <p>优质区域可申请更高合作资格与本地协同，共同推进市场覆盖。</p>
        </div>
        <div class="benefit-card benefit-card-lg">
          <div class="benefit-icon benefit-icon-lg" style="background:rgba(6,182,212,0.15);color:#06B6D4;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h4>总部业务支持</h4>
          <p>提供策略、培训、活动与产品配合，让合伙人专注市场拓展。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== Screen 6: City Coverage ===== -->
  <section class="partner-section partner-map" id="partnerMap" style="background:linear-gradient(180deg,#0E1826 0%,#111E32 100%);">
    <div class="section-inner">
      <div style="text-align:center;margin-bottom:64px;" class="reveal">
        <span class="partner-label">LOCAL PRESENCE</span>
        <h2 class="section-title" style="color:#F8FAFC;">从线上增长，到本地落地</h2>
      </div>
      <div class="map-layout reveal">
        <div class="map-visual">
          <svg viewBox="0 0 600 320" class="turkey-map-svg" id="turkeyMap">
            <defs>
              <radialGradient id="mapCityGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
              </radialGradient>
              <radialGradient id="mapCityGlowGreen" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#10B981" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
              </radialGradient>
              <radialGradient id="mapCityGlowYellow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
              </radialGradient>
              <filter id="mapGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <!-- Turkey shape (simplified) -->
            <path d="M60,170 Q100,110 160,115 Q200,90 250,100 Q300,80 350,95 Q400,85 440,100 Q480,90 520,110 Q550,125 540,155 Q530,175 490,170 Q460,185 430,175 Q400,185 370,170 Q340,185 310,175 Q280,185 250,170 Q220,185 190,175 Q160,185 130,175 Q100,190 70,180 Z" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" stroke-width="1.5"/>
            <!-- Grid lines -->
            <line x1="50" y1="130" x2="560" y2="130" stroke="rgba(59,130,246,0.04)" stroke-width="0.5"/>
            <line x1="50" y1="160" x2="560" y2="160" stroke="rgba(59,130,246,0.04)" stroke-width="0.5"/>
            <line x1="200" y1="80" x2="200" y2="200" stroke="rgba(59,130,246,0.04)" stroke-width="0.5"/>
            <line x1="350" y1="80" x2="350" y2="200" stroke="rgba(59,130,246,0.04)" stroke-width="0.5"/>

            <!-- Istanbul -->
            <circle cx="175" cy="120" r="22" fill="url(#mapCityGlow)" class="city-pulse"/>
            <circle cx="175" cy="120" r="7" fill="#3B82F6" filter="url(#mapGlow)"/>
            <circle cx="175" cy="120" r="3" fill="#fff"/>
            <text x="175" y="102" text-anchor="middle" fill="#E2E8F0" font-size="12" font-weight="700">Istanbul</text>
            <text x="175" y="148" text-anchor="middle" fill="#10B981" font-size="9" font-weight="600">已覆盖</text>

            <!-- Ankara -->
            <circle cx="310" cy="118" r="18" fill="url(#mapCityGlowGreen)" class="city-pulse"/>
            <circle cx="310" cy="118" r="6" fill="#10B981" filter="url(#mapGlow)"/>
            <circle cx="310" cy="118" r="2.5" fill="#fff"/>
            <text x="310" y="100" text-anchor="middle" fill="#E2E8F0" font-size="12" font-weight="700">Ankara</text>
            <text x="310" y="142" text-anchor="middle" fill="#10B981" font-size="9" font-weight="600">已覆盖</text>

            <!-- Antalya -->
            <circle cx="350" cy="165" r="16" fill="url(#mapCityGlowYellow)" class="city-pulse"/>
            <circle cx="350" cy="165" r="5" fill="#F59E0B" filter="url(#mapGlow)"/>
            <circle cx="350" cy="165" r="2" fill="#fff"/>
            <text x="350" y="185" text-anchor="middle" fill="#E2E8F0" font-size="11" font-weight="700">Antalya</text>
            <text x="350" y="197" text-anchor="middle" fill="#F59E0B" font-size="9" font-weight="600">招募中</text>

            <!-- Izmir -->
            <circle cx="145" cy="148" r="14" fill="url(#mapCityGlowYellow)" class="city-pulse"/>
            <circle cx="145" cy="148" r="5" fill="#F59E0B" filter="url(#mapGlow)"/>
            <circle cx="145" cy="148" r="2" fill="#fff"/>
            <text x="115" y="162" text-anchor="middle" fill="#E2E8F0" font-size="11" font-weight="700">Izmir</text>
            <text x="145" y="170" text-anchor="middle" fill="#F59E0B" font-size="9" font-weight="600">招募中</text>

            <!-- Bursa -->
            <circle cx="210" cy="110" r="12" fill="url(#mapCityGlow)" class="city-pulse"/>
            <circle cx="210" cy="110" r="4" fill="#8B5CF6" filter="url(#mapGlow)"/>
            <circle cx="210" cy="110" r="2" fill="#fff"/>
            <text x="228" y="107" text-anchor="start" fill="#E2E8F0" font-size="10" font-weight="700">Bursa</text>
            <text x="228" y="118" text-anchor="start" fill="#94A3B8" font-size="9" font-weight="600">待合作</text>

            <!-- Connection lines -->
            <line x1="175" y1="120" x2="310" y2="118" stroke="rgba(59,130,246,0.12)" stroke-width="1" stroke-dasharray="6 4"/>
            <line x1="310" y1="118" x2="350" y2="165" stroke="rgba(16,185,129,0.12)" stroke-width="1" stroke-dasharray="6 4"/>
            <line x1="175" y1="120" x2="145" y2="148" stroke="rgba(59,130,246,0.12)" stroke-width="1" stroke-dasharray="6 4"/>
            <line x1="175" y1="120" x2="210" y2="110" stroke="rgba(139,92,246,0.1)" stroke-width="1" stroke-dasharray="6 4"/>
          </svg>
          <div class="map-legend">
            <div class="map-legend-item"><span class="legend-dot" style="background:#3B82F6;"></span> 已覆盖</div>
            <div class="map-legend-item"><span class="legend-dot" style="background:#F59E0B;"></span> 招募中</div>
            <div class="map-legend-item"><span class="legend-dot" style="background:#94A3B8;"></span> 待合作</div>
          </div>
        </div>
        <div class="map-text">
          <h3 style="font-size:28px;font-weight:800;color:#F1F5F9;margin-bottom:20px;">本地化市场协同</h3>
          <p style="color:#94A3B8;line-height:1.8;font-size:16px;margin-bottom:24px;">One Token 正在推进土耳其本地市场协同。欢迎具备社群资源、门店资源、渠道资源、换汇资源的伙伴加入。</p>
          <div class="map-stats">
            <div class="map-stat">
              <div class="map-stat-num">5</div>
              <div class="map-stat-label">覆盖城市</div>
            </div>
            <div class="map-stat">
              <div class="map-stat-num">128+</div>
              <div class="map-stat-label">合作伙伴</div>
            </div>
            <div class="map-stat">
              <div class="map-stat-num">24/7</div>
              <div class="map-stat-label">总部支持</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== Screen 7: Offline Store ===== -->
  <section class="partner-section partner-store" id="partnerStore">
    <div class="section-inner">
      <div class="store-layout reveal">
        <div class="store-visual">
          <div class="store-image-container">
            <div class="store-image-placeholder">
              <div class="store-img-overlay"></div>
              <div class="store-mock-front">
                <div class="store-sign">
                  <span class="store-sign-logo">O</span>
                  <span>One Token</span>
                </div>
                <div class="store-window">
                  <div class="store-w-item">USD ↔ TRY</div>
                  <div class="store-w-item">开卡服务</div>
                  <div class="store-w-item">本地取现</div>
                </div>
                <div class="store-door"></div>
              </div>
              <div class="store-street">
                <div class="store-people"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="store-text">
          <span class="partner-label">OFFLINE PARTNERSHIP</span>
          <h2 style="font-size:32px;font-weight:800;color:#F1F5F9;margin-bottom:20px;">线下门店合作，共建本地生态</h2>
          <p style="color:#94A3B8;line-height:1.8;font-size:16px;margin-bottom:32px;">深耕本地市场，通过线下门店、法币场景与消费服务节点，共同建立更强的用户信任与本地转化能力。符合条件的合作方，可申请更高等级返佣与区域合作资格。</p>
          <a class="btn btn-primary partner-btn-glow" onclick="document.getElementById('partnerContact').scrollIntoView({behavior:'smooth'})">联系总部申请门店合作</a>
          <div class="store-contact-quick">
            <a href="https://wa.me/1234567890" target="_blank" class="quick-contact-btn whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="https://t.me/onetoken_official" target="_blank" class="quick-contact-btn telegram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.28-.02-.12.03-2.02 1.28-5.69 3.77-.54.37-1.03.55-1.47.54-.48-.01-1.4-.27-2.09-.5-.84-.27-1.51-.42-1.45-.89.03-.25.38-.5 1.04-.78 4.07-1.77 6.79-2.94 8.15-3.51 3.88-1.62 4.69-1.9 5.21-1.91.12 0 .37.03.54.17.14.12.18.28.2.47-.01.06.01.24 0 .37z"/></svg>
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== Screen 8: Contact & Lead Form ===== -->
  <section class="partner-section partner-contact" id="partnerContact">
    <div class="section-inner">
      <div style="text-align:center;margin-bottom:64px;" class="reveal">
        <span class="partner-label">GET STARTED</span>
        <h2 class="section-title" style="color:#F8FAFC;">准备成为 One Token 土耳其合伙人？</h2>
        <p class="section-desc" style="margin:0 auto;color:#B0BEC5;">留下你的联系方式，我们将在最短时间内与你沟通合作模式、市场支持与城市机会。</p>
      </div>
      <div class="contact-layout reveal">
        <div class="contact-left">
          <h3 style="font-size:22px;font-weight:700;color:#F1F5F9;margin-bottom:24px;">即时联系</h3>
          <a href="https://wa.me/1234567890" target="_blank" class="contact-channel whatsapp-ch">
            <div class="contact-ch-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div class="contact-ch-info">
              <div class="contact-ch-name">WhatsApp</div>
              <div class="contact-ch-desc">点击直接发起对话</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
          <a href="https://t.me/onetoken_official" target="_blank" class="contact-channel telegram-ch">
            <div class="contact-ch-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.28-.02-.12.03-2.02 1.28-5.69 3.77-.54.37-1.03.55-1.47.54-.48-.01-1.4-.27-2.09-.5-.84-.27-1.51-.42-1.45-.89.03-.25.38-.5 1.04-.78 4.07-1.77 6.79-2.94 8.15-3.51 3.88-1.62 4.69-1.9 5.21-1.91.12 0 .37.03.54.17.14.12.18.28.2.47-.01.06.01.24 0 .37z"/></svg>
            </div>
            <div class="contact-ch-info">
              <div class="contact-ch-name">Telegram</div>
              <div class="contact-ch-desc">加入官方合伙人频道</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
          <a href="mailto:partner@onetoken.com" class="contact-channel email-ch">
            <div class="contact-ch-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div class="contact-ch-info">
              <div class="contact-ch-name">Email</div>
              <div class="contact-ch-desc">partner@onetoken.com</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
          <div class="contact-suited">
            <h4>适合以下类型伙伴：</h4>
            <div class="suited-tags">
              <span>本地社群主</span>
              <span>渠道 / KOL</span>
              <span>线下门店经营者</span>
              <span>支付 / 换汇相关资源方</span>
            </div>
          </div>
        </div>
        <div class="contact-right">
          <form class="partner-form" id="partnerForm" onsubmit="window._submitPartnerForm(event)">
            <div class="form-group">
              <label>姓名</label>
              <input type="text" placeholder="请输入您的姓名" required>
            </div>
            <div class="form-group">
              <label>所在城市</label>
              <input type="text" placeholder="例如：Istanbul, Ankara">
            </div>
            <div class="form-group">
              <label>联系方式</label>
              <input type="text" placeholder="手机 / WhatsApp / Telegram" required>
            </div>
            <div class="form-group">
              <label>资源类型</label>
              <div class="form-resource-tags" id="formResourceTags">
                <button type="button" class="form-resource-tag" onclick="this.classList.toggle('active')">社群</button>
                <button type="button" class="form-resource-tag" onclick="this.classList.toggle('active')">门店</button>
                <button type="button" class="form-resource-tag" onclick="this.classList.toggle('active')">KOL</button>
                <button type="button" class="form-resource-tag" onclick="this.classList.toggle('active')">渠道</button>
              </div>
            </div>
            <div class="form-group">
              <label>留言（选填）</label>
              <textarea placeholder="请简述您的资源与合作意向..." rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary partner-btn-glow" style="width:100%;justify-content:center;margin-top:8px;">提交合作申请</button>
          </form>
          <div class="form-success" id="formSuccess" style="display:none;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="16 9 10.5 14.5 8 12"/></svg>
            <h3>申请已提交</h3>
            <p>我们将在 24 小时内与您联系，感谢您的合作意向。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  // Calculator logic
  var tierData = [
    { name: 'V1', direct: 0.10, second: 0.05 },
    { name: 'V2', direct: 0.20, second: 0.10 },
    { name: 'V3', direct: 0.30, second: 0.15 },
    { name: '市级代理', direct: 0.40, second: 0.20 },
    { name: '区域总代', direct: 0.50, second: 0.25 }
  ];
  var currentTier = 0;

  window._calcTier = function(t) {
    currentTier = t;
    var btns = document.querySelectorAll('.calc-tier-btn');
    btns.forEach(function(b, i) { b.classList.toggle('active', i === t); });
    window._calcUpdate();
  };

  window._calcUpdate = function() {
    var directUsers = parseInt(document.getElementById('calcDirect').value);
    var secondUsers = parseInt(document.getElementById('calcSecond').value);
    var scale = parseInt(document.getElementById('calcScale').value);

    document.getElementById('calcDirectVal').textContent = directUsers + ' 人';
    document.getElementById('calcSecondVal').textContent = secondUsers + ' 人';
    document.getElementById('calcScaleVal').textContent = '$' + scale.toLocaleString();

    var tier = tierData[currentTier];
    var totalUsers = directUsers + secondUsers;
    var directShare = totalUsers > 0 ? (directUsers / totalUsers) : 1;
    var secondShare = totalUsers > 0 ? (secondUsers / totalUsers) : 0;
    var directRev = Math.round(scale * directShare * tier.direct);
    var secondRev = Math.round(scale * secondShare * tier.second);
    var total = directRev + secondRev;

    // Animate the values
    animateValue('calcR1', '$' + directRev.toLocaleString());
    animateValue('calcR2', '$' + secondRev.toLocaleString());
    animateValue('calcTotal', '$' + total.toLocaleString());
  };

  function animateValue(id, newVal) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.transform = 'translateY(-4px)';
    el.style.opacity = '0.5';
    setTimeout(function() {
      el.textContent = newVal;
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    }, 150);
  }

  window._submitPartnerForm = function(e) {
    e.preventDefault();
    document.getElementById('partnerForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'flex';
  };

  // Initial calc
  window._calcUpdate();

  // Init reveals
  setTimeout(function() {
    var els = el.querySelectorAll('.reveal:not(.visible)');
    els.forEach(function(r) {
      new IntersectionObserver(function(entries) {
        entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.15 }).observe(r);
    });
  }, 100);
};
