/* OneToken Website — Referral Campaign Landing Page */
/* Pages 6-10: Campaign active, Register drawer, Success, Ended, Error modal */

window.renderReferralCampaignPage = function() {
  var el = document.getElementById('page-referral-campaign');
  if(!el) return;

  // State management
  var campaignState = 'active'; // 'active', 'ended', 'not_started'
  var queryParams = new URLSearchParams(window.location.search);
  var inviteCode = queryParams.get('code') || '8A9B2C';

  // Check if campaign ended (demo: use hash)
  if(window.location.hash === '#ended') campaignState = 'ended';

  if(campaignState === 'ended') {
    renderCampaignEnded(el);
    return;
  }

  el.innerHTML = buildActiveCampaign(inviteCode);

  // Page 6: Auto-dismiss app open attempt
  var appBar = document.getElementById('rc-app-attempt');
  if(appBar) {
    setTimeout(function() {
      appBar.style.opacity = '0';
      appBar.style.transform = 'translateY(-100%)';
      setTimeout(function() { appBar.style.display = 'none'; }, 400);
    }, 1500);
  }
};

function buildActiveCampaign(code) {
  return `
  <!-- Page 6: Active Campaign Landing -->
  <div class="rc-page">
    <!-- App attempt bar -->
    <div class="rc-app-attempt" id="rc-app-attempt">
      <div class="rc-app-attempt-dot"></div>
      正在尝试打开 App...
    </div>

    <!-- Hero Section -->
    <section class="rc-hero">
      <div class="rc-hero-bg">
        <div class="rc-hero-glow g1"></div>
        <div class="rc-hero-glow g2"></div>
      </div>
      <div class="rc-hero-content">
        <!-- Invite Relationship Banner -->
        <div class="rc-invite-banner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FDE68A" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <div>
            <div class="rc-invite-banner-main">你正在通过 <strong>${code}</strong> 的专属邀请链接进入</div>
            <div class="rc-invite-banner-sub">邀请码已自动带入，无需手动填写</div>
          </div>
        </div>

        <h1 class="rc-hero-title">邀请好友开卡<br>领专属津贴与开卡奖励</h1>
        <p class="rc-hero-subtitle">注册即可锁定邀请关系，完成虚拟卡激活后正式生效</p>

        <!-- Reward Blocks -->
        <div class="rc-rewards">
          <div class="rc-reward-block">
            <div class="rc-reward-amount">20<span class="rc-reward-unit">USD</span></div>
            <div class="rc-reward-cond">满 5 位有效伙伴</div>
          </div>
          <div class="rc-reward-block">
            <div class="rc-reward-amount">15<span class="rc-reward-unit">USD</span></div>
            <div class="rc-reward-cond">再邀 3 位</div>
          </div>
          <div class="rc-reward-block">
            <div class="rc-reward-amount">6<span class="rc-reward-unit">USD</span></div>
            <div class="rc-reward-cond">后续每新增 1 位</div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="rc-cta-group">
          <button class="rc-btn-primary" onclick="openRegisterDrawer()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            立即注册，锁定邀请关系
          </button>
          <button class="rc-btn-secondary" onclick="window.open('onetoken://open','_self')">
            已安装 App，立即打开
          </button>
        </div>

        <p class="rc-hero-note">注册成功后即可锁定邀请关系；完成虚拟卡激活后，将计入有效一级伙伴</p>
      </div>
    </section>

    <!-- Module 1: Why register via link -->
    <section class="rc-section">
      <div class="rc-section-inner">
        <h2 class="rc-section-title">为什么通过链接注册</h2>
        <div class="rc-features">
          <div class="rc-feature">
            <div class="rc-feature-icon" style="background:rgba(16,185,129,0.1);color:#10B981;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </div>
            <div>
              <div class="rc-feature-title">邀请关系自动锁定</div>
              <div class="rc-feature-desc">无需手动输入邀请码，注册即绑定</div>
            </div>
          </div>
          <div class="rc-feature">
            <div class="rc-feature-icon" style="background:rgba(59,130,246,0.1);color:#3B82F6;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div>
              <div class="rc-feature-title">流程更简洁</div>
              <div class="rc-feature-desc">点击链接 → 注册 → 激活，一键完成</div>
            </div>
          </div>
          <div class="rc-feature">
            <div class="rc-feature-icon" style="background:rgba(245,158,11,0.1);color:#F59E0B;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M2 8h20v4H2z"/><path d="M12 2v20"/></svg>
            </div>
            <div>
              <div class="rc-feature-title">激活即生效</div>
              <div class="rc-feature-desc">完成虚拟卡激活后自动计入有效伙伴</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Module 2: Process Flow -->
    <section class="rc-section rc-section-dark">
      <div class="rc-section-inner">
        <h2 class="rc-section-title">活动流程</h2>
        <div class="rc-flow">
          <div class="rc-flow-step">
            <div class="rc-flow-num">1</div>
            <div class="rc-flow-text">点击专属链接</div>
          </div>
          <div class="rc-flow-line"></div>
          <div class="rc-flow-step">
            <div class="rc-flow-num">2</div>
            <div class="rc-flow-text">注册锁定邀请关系</div>
          </div>
          <div class="rc-flow-line"></div>
          <div class="rc-flow-step">
            <div class="rc-flow-num">3</div>
            <div class="rc-flow-text">下载 / 打开 App</div>
          </div>
          <div class="rc-flow-line"></div>
          <div class="rc-flow-step">
            <div class="rc-flow-num">4</div>
            <div class="rc-flow-text">完成虚拟卡激活</div>
          </div>
          <div class="rc-flow-line"></div>
          <div class="rc-flow-step">
            <div class="rc-flow-num rc-flow-num-done">✓</div>
            <div class="rc-flow-text">链路闭环，奖励生效</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Module 3: Brand Value -->
    <section class="rc-section">
      <div class="rc-section-inner" style="text-align:center;">
        <div style="font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">POWERED BY</div>
        <h2 class="rc-section-title" style="margin-bottom:12px;">OneToken</h2>
        <p style="color:rgba(255,255,255,0.5);font-size:14px;line-height:1.6;max-width:400px;margin:0 auto 32px;">集钱包、UPAY、闪兑与行情于一体，连接数字资产管理与真实使用场景。</p>
        <button class="rc-btn-primary" onclick="openRegisterDrawer()" style="max-width:320px;margin:0 auto;">
          立即注册，锁定邀请关系
        </button>
      </div>
    </section>

    <!-- Footer -->
    <div class="rc-footer">
      <div>© 2026 OneToken. All rights reserved.</div>
    </div>
  </div>

  <!-- Page 7: Register Drawer -->
  <div class="rc-register-overlay" id="rc-register-overlay" onclick="if(event.target===this) closeRegisterDrawer()">
    <div class="rc-register-panel" id="rc-register-panel">
      <div class="rc-register-header">
        <h2 class="rc-register-title">注册并锁定邀请关系</h2>
        <button class="rc-register-close" onclick="closeRegisterDrawer()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="rc-register-body">
        <div class="rc-form-group">
          <label class="rc-form-label">邮箱地址</label>
          <input class="rc-form-input" type="email" id="rc-email" placeholder="请输入您的邮箱">
        </div>
        <div class="rc-form-group">
          <label class="rc-form-label">设置密码</label>
          <input class="rc-form-input" type="password" id="rc-password" placeholder="请设置登录密码">
        </div>
        <div class="rc-form-group">
          <label class="rc-form-label">
            邀请码
            <span class="rc-form-tag">已自动带入</span>
          </label>
          <div class="rc-invite-note">你的邀请关系将在注册成功后自动锁定</div>
          <input class="rc-form-input rc-form-readonly" type="text" value="${code}" readonly>
        </div>
        <button class="rc-btn-primary" onclick="submitRegister()" style="margin-top:8px;">立即注册</button>
        <div class="rc-register-footer">
          已有账号？请直接<a onclick="window.open('onetoken://open','_self')" style="color:#E8D48B;cursor:pointer;text-decoration:underline;">打开 App 登录</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Page 10: Error Modal (account exists) -->
  <div class="rc-error-overlay" id="rc-error-overlay" onclick="if(event.target===this) closeErrorModal()">
    <div class="rc-error-card">
      <div class="rc-error-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <h3 class="rc-error-title">该账号已注册</h3>
      <p class="rc-error-desc">请直接打开 App 登录</p>
      <button class="rc-btn-primary" onclick="window.open('onetoken://open','_self')" style="margin-bottom:10px;">打开 App</button>
      <button class="rc-btn-secondary" onclick="showPage('download')">下载 App</button>
    </div>
  </div>
  `;
}

// Page 9: Campaign Ended State
function renderCampaignEnded(el) {
  el.innerHTML = `
  <div class="rc-page">
    <section class="rc-hero" style="min-height:100vh;">
      <div class="rc-hero-bg">
        <div class="rc-hero-glow g1" style="opacity:0.3;"></div>
      </div>
      <div class="rc-hero-content" style="padding-top:120px;">
        <div class="rc-ended-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h1 class="rc-hero-title" style="font-size:24px;opacity:0.7;">当前活动暂未开放</h1>
        <p class="rc-hero-subtitle" style="opacity:0.4;">活动已结束或暂停中，感谢你的关注</p>
        <div class="rc-cta-group" style="margin-top:40px;">
          <button class="rc-btn-primary" onclick="showPage('download')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            下载 App
          </button>
          <button class="rc-btn-secondary" onclick="showPage('home')">返回官网首页</button>
        </div>
      </div>
    </section>
  </div>`;
}

// Page 7: Register drawer controls
window.openRegisterDrawer = function() {
  var overlay = document.getElementById('rc-register-overlay');
  if(overlay) overlay.classList.add('active');
};
window.closeRegisterDrawer = function() {
  var overlay = document.getElementById('rc-register-overlay');
  if(overlay) overlay.classList.remove('active');
};

// Page 8: Submit registration (demo)
window.submitRegister = function() {
  var email = document.getElementById('rc-email');
  var pwd = document.getElementById('rc-password');
  if(!email || !pwd) return;

  // Demo: if email contains "exist" trigger error modal (page 10)
  if(email.value.toLowerCase().includes('exist')) {
    closeRegisterDrawer();
    setTimeout(function() {
      var errOverlay = document.getElementById('rc-error-overlay');
      if(errOverlay) errOverlay.classList.add('active');
    }, 300);
    return;
  }

  if(!email.value || !pwd.value) {
    alert('请填写完整信息');
    return;
  }

  // Show success state (page 8)
  var panel = document.getElementById('rc-register-panel');
  if(panel) {
    panel.innerHTML = `
      <div class="rc-success-content">
        <div class="rc-success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h2 class="rc-success-title">注册成功，邀请关系已锁定</h2>
        <p class="rc-success-desc">完成虚拟卡激活后，将正式计入有效一级伙伴</p>
        <div class="rc-success-actions">
          <button class="rc-btn-primary" onclick="window.open('onetoken://open','_self')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            打开 App
          </button>
          <button class="rc-btn-secondary" onclick="showPage('download')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            下载 App
          </button>
        </div>
      </div>`;
  }
};

// Page 10: Error modal controls
window.closeErrorModal = function() {
  var overlay = document.getElementById('rc-error-overlay');
  if(overlay) overlay.classList.remove('active');
};

// Demo helpers for campaign state
window.setCampaignState = function(state) {
  if(state === 'ended') {
    window.location.hash = '#ended';
  } else {
    window.location.hash = '';
  }
  renderReferralCampaignPage();
};
