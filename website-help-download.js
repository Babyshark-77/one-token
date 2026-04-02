/* OneToken — Help Center & Download Page Renderers */
(function(){
'use strict';
const ARROW=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
const FAQ_ICO=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;
const BACK=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`;

// --- Help Data ---
var helpArticles = [
  {id:'start',title:'开始使用 OneToken',tag:'新手入门',desc:'快速了解 OneToken 的核心功能与注册流程。',time:'2026-03-28',read:'3 min',body:'<h4>步骤一：下载与安装</h4><p>访问 OneToken 官网或应用商店下载最新版本，完成安装。</p><h4>步骤二：注册账户</h4><p>打开 App，选择注册，使用手机号或邮箱完成账户创建。</p><h4>步骤三：探索核心模块</h4><p>注册完成后即可进入钱包、UPAY、闪兑与行情四大核心模块。</p>'},
  {id:'upay-guide',title:'如何使用 UPAY',tag:'UPAY',desc:'了解 UPAY 的核心用途与操作流程。',time:'2026-03-27',read:'4 min',body:'<h4>什么是 UPAY</h4><p>UPAY 是 OneToken 的旗舰模块，连接数字资产与真实消费场景。</p><h4>开通 UPAY</h4><p>在 App 内进入 UPAY 模块，完成身份认证即可开通 UPAY 账户。</p><h4>管理卡片</h4><p>开通后可申请虚拟卡（线上使用）或实体卡（线下使用），从 UPAY 账户充值即可消费。</p>'},
  {id:'recharge',title:'如何充值到 UPAY',tag:'UPAY',desc:'了解从外部钱包充值到 UPAY 账户的完整流程。',time:'2026-03-26',read:'3 min',body:'<h4>步骤一：进入充值页面</h4><p>在 UPAY 模块点击"充值"，选择充值币种和网络。</p><h4>步骤二：转账充值</h4><p>复制充值地址，从外部钱包转入对应金额，等待链上确认。</p><h4>步骤三：确认到账</h4><p>链上确认完成后资金自动入账至 UPAY 账户，可在交易记录中查看。</p>'},
  {id:'cards',title:'如何申请和使用虚拟卡 / 实体卡',tag:'卡片服务',desc:'了解虚拟卡与实体卡的申请流程与使用场景。',time:'2026-03-25',read:'4 min',body:'<h4>虚拟卡</h4><p>在 UPAY 模块选择"申请虚拟卡"，即时开通，适用于线上消费场景。</p><h4>实体卡</h4><p>选择"申请实体卡"，填写邮寄信息，卡片国际邮寄到手后激活即可使用。</p><h4>充值使用</h4><p>两种卡片均从 UPAY 账户充值后使用，消费记录实时同步。</p>'},
  {id:'plans',title:'什么是灵活计划',tag:'计划与奖励',desc:'了解灵活计划的奖励机制与操作方式。',time:'2026-03-24',read:'3 min',body:'<h4>灵活计划</h4><p>随存随取，灵活奖励每日自动发放至 UPAY 账户。APY 约 4.5%。</p><h4>奖励去向</h4><p>奖励可保留在 UPAY 账户，也可自动回投灵活计划继续增长。</p>'},
  {id:'withdraw',title:'如何提现、互转与查看记录',tag:'提现与转账',desc:'了解提现到外部钱包、账户间互转以及查看记录的操作方式。',time:'2026-03-23',read:'3 min',body:'<h4>提现</h4><p>在 UPAY 模块选择"提现"，输入外部钱包地址与金额，确认后等待审核。</p><h4>内部互转</h4><p>支持 UPAY 账户间互转，输入对方 UPAY ID 和金额即可完成。</p><h4>查看记录</h4><p>所有充值、消费、奖励、提现记录均可在"交易记录"中查看。</p>'}
];

var helpCategories = [
  {name:'新手入门',icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',desc:'快速了解功能与使用流程',style:''},
  {name:'钱包',icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',desc:'资产管理与收发操作',style:'background:#DBEAFE;color:#2563EB;'},
  {name:'UPAY',icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',desc:'账户充值与资金流转',style:'background:#EDE9FE;color:#7C3AED;'},
  {name:'卡片服务',icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 7h8M8 11h5"/></svg>',desc:'虚拟卡与实体卡管理',style:'background:#FEF3C7;color:#D97706;'},
  {name:'计划与奖励',icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',desc:'灵活奖励机制',style:'background:#D1FAE5;color:#059669;'},
  {name:'闪兑与行情',icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/></svg>',desc:'资产转换与市场追踪',style:'background:#CCFBF1;color:#0D9488;'}
];

var faqGroups = [
  {name:'账户与登录',items:[
    {q:'如何注册 OneToken 账户？',a:'下载 App 后选择注册，使用手机号或邮箱即可完成账户创建。'},
    {q:'忘记密码怎么办？',a:'在登录页面点击"忘记密码"，通过注册时使用的手机号或邮箱进行密码重置。'}
  ]},
  {name:'UPAY 使用',items:[
    {q:'UPAY 可以做什么？',a:'UPAY 相关能力包括充值、虚拟卡/实体卡管理、提现、内部互转、计划与奖励，以及合伙相关内容。'},
    {q:'充值后为什么没有立刻到账？',a:'数字资产充值通常需要等待链上区块确认后才会完成入账。若等待时间较长，建议先查看交易记录。'}
  ]},
  {name:'卡片问题',items:[
    {q:'虚拟卡和实体卡有什么区别？',a:'虚拟卡适配线上消费场景，即开即用；实体卡支持线下刷卡场景，需国际邮寄。'},
    {q:'实体卡多久能收到？',a:'实体卡通常在申请后 7-15 个工作日内完成国际邮寄，具体时效因地区而异。'}
  ]},
  {name:'计划与奖励',items:[
    {q:'灵活计划怎么运作？',a:'灵活计划支持随存随取，奖励每日自动发放，更适合日常资金管理。'},
    {q:'奖励如何发放？',a:'灵活奖励每日发放至 UPAY 账户，可选择自动回投灵活计划继续增长。'}
  ]},
  {name:'提现与转账',items:[
    {q:'提现后会显示哪些状态？',a:'提现申请提交后，用户可至"交易记录"中查看"审核中""已完成"或"已驳回"等进度。'},
    {q:'内部互转需要手续费吗？',a:'UPAY 账户间内部互转不收取额外手续费，实时到账。'}
  ]},
  {name:'闪兑与行情',items:[
    {q:'闪兑支持哪些币种？',a:'目前支持 USDT、USDC、ETH、BTC 等主流币种之间的快速转换。'},
    {q:'行情数据多久更新？',a:'行情数据实时更新，支持 24 小时涨跌追踪和走势查看。'}
  ]}
];

function supportHtml(){
  return `<section class="cta-section" style="padding:60px 48px;background:var(--bg-secondary);"><div class="reveal"><h2 class="section-title" style="font-size:28px;margin-bottom:12px;">还是没找到答案？</h2><p class="section-desc" style="margin:0 auto 32px;">联系全天候人工客服 / 加入国际交流社群</p><div class="btn-group"><a class="btn btn-primary">联系客服</a><a class="btn btn-secondary" onclick="showHelpView('home')">返回帮助中心</a></div></div></section>`;
}

function articleCard(a){
  return `<div class="help-article-card reveal" onclick="showHelpView('article','${a.id}')"><div class="help-article-meta"><span class="help-article-tag">${a.tag}</span><span class="help-article-time">${a.time} · ${a.read}</span></div><div class="help-article-title">${a.title}</div><div class="help-article-desc">${a.desc}</div><div class="help-article-arrow">${ARROW}</div></div>`;
}

// --- Views ---
window.switchFaqTab=function(idx){document.querySelectorAll('.faq-tab').forEach(function(t,i){t.classList.toggle('active',i===idx);});document.querySelectorAll('.faq-panel').forEach(function(p,i){p.classList.toggle('active',i===idx);});};
window.toggleFaqItem=function(btn){var item=btn.closest('.faq-item');var all=btn.closest('.faq-panel').querySelectorAll('.faq-item');var was=item.classList.contains('active');all.forEach(function(el){el.classList.remove('active');});if(!was)item.classList.add('active');};
window.showHelpView=function(v,p){var c=document.getElementById('page-help');if(!c)return;if(v==='home')c.innerHTML=helpHome();else if(v==='search')c.innerHTML=helpSearch(p);else if(v==='category')c.innerHTML=helpCategory(p);else if(v==='article')c.innerHTML=helpArticle(p);setTimeout(function(){document.querySelectorAll('.reveal:not(.visible)').forEach(function(el){new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.15}).observe(el);});},50);window.scrollTo({top:0,behavior:'smooth'});};
window.handleHelpSearchKeyPress=function(e){if(e.key==='Enter'){var q=e.target.value.trim();if(q)showHelpView('search',q);}};
window.handleHelpSearchClick=function(sel){var q=document.querySelector(sel).value.trim();if(q)showHelpView('search',q);};
window.renderHelpPage=function(){showHelpView('home');};

function helpHome(){
  var catCards=helpCategories.map(function(c){return `<div class="help-cat-card" onclick="showHelpView('category','${c.name}')"><div class="help-cat-icon" ${c.style?'style="'+c.style+'"':''}>${c.icon}</div><div><h3>${c.name}</h3><p>${c.desc}</p></div></div>`;}).join('');
  var artCards=helpArticles.map(articleCard).join('');
  var faqTabs=faqGroups.map(function(g,i){return `<button class="faq-tab ${i===0?'active':''}" onclick="switchFaqTab(${i})">${g.name} ${FAQ_ICO}</button>`;}).join('');
  var faqPanels=faqGroups.map(function(g,i){var items=g.items.map(function(f){return `<div class="faq-item"><button class="faq-question" onclick="toggleFaqItem(this)">${f.q} <div class="faq-icon">${FAQ_ICO}</div></button><div class="faq-answer-wrapper"><div class="faq-answer"><div class="faq-answer-inner">${f.a}</div></div></div></div>`;}).join('');return `<div class="faq-panel ${i===0?'active':''}""><div class="faq-panel-title">${g.name}</div>${items}</div>`;}).join('');

  return `<section class="section" style="padding-top:140px;min-height:auto;padding-bottom:60px;"><div class="help-hero-bg"></div><div class="hero-content" style="flex-direction:column;text-align:center;"><div class="hero-text reveal" style="width:100%;min-width:auto;"><h1 class="hero-title" style="font-size:48px;">帮助中心</h1><p class="hero-subtitle" style="margin:16px auto 0;">快速了解钱包、UPAY、闪兑与行情的常见用法</p><div class="help-search-container"><svg class="help-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="cursor:pointer;" onclick="handleHelpSearchClick('.home-search')"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input type="text" class="help-search-input home-search" placeholder="搜索问题、产品功能或关键词..." onkeyup="handleHelpSearchKeyPress(event)"></div><div class="help-hot-words"><span class="help-hot-word" onclick="showHelpView('search','UPAY')">如何使用 UPAY</span><span class="help-hot-word" onclick="showHelpView('search','充值')">如何充值</span><span class="help-hot-word" onclick="showHelpView('search','提现')">如何提现</span></div></div></div></section>
  <section class="section" style="padding-top:40px;padding-bottom:60px;"><div class="reveal"><h3 style="text-align:center;font-size:20px;font-weight:700;margin-bottom:8px;">浏览分类</h3><div class="help-cat-grid">${catCards}</div></div></section>
  <section class="section" style="padding-top:20px;padding-bottom:60px;"><div class="reveal" style="text-align:center;"><span class="section-label">推荐文章</span><h2 class="section-title">热门文章</h2></div><div class="help-article-grid">${artCards}</div></section>
  <section class="section" style="padding-top:60px;padding-bottom:60px;"><div class="reveal" style="text-align:center;"><span class="section-label">详细解答</span><h2 class="section-title">常见问题</h2></div><div class="help-faq-container reveal reveal-delay-2"><div class="faq-tabs">${faqTabs}</div><div class="faq-content">${faqPanels}</div></div></section>${supportHtml()}`;
}

function helpSearch(q){
  var results=helpArticles.filter(function(a){return a.title.indexOf(q)!==-1||a.tag.indexOf(q)!==-1||a.desc.indexOf(q)!==-1;});
  if(results.length===0) results=helpArticles.slice(0,3);
  var faqResults=[];
  faqGroups.forEach(function(g){g.items.forEach(function(f){if(f.q.indexOf(q)!==-1||f.a.indexOf(q)!==-1) faqResults.push(f);});});
  if(faqResults.length===0) faqResults=faqGroups[0].items.slice(0,2);
  var artHtml=results.map(articleCard).join('');
  var faqHtml=faqResults.map(function(f){return `<div class="faq-item"><button class="faq-question" onclick="toggleFaqItem(this)">${f.q} <div class="faq-icon">${FAQ_ICO}</div></button><div class="faq-answer-wrapper"><div class="faq-answer"><div class="faq-answer-inner">${f.a}</div></div></div></div>`;}).join('');
  var crumb = `<div class="help-breadcrumb"><button class="demo-back-btn" onclick="showHelpView('home')">返回帮助中心</button><span class="bread-sep">/</span><span class="bread-current">搜索 "${q}" 的结果</span></div>`;
  return `<section class="section" style="padding-top:80px;min-height:60vh;"><div class="section-inner reveal" style="max-width:800px;margin:0 auto;">${crumb}<h1 style="font-size:28px;margin:32px 0 16px;">搜索 "${q}" 的结果</h1><h3 style="font-size:18px;font-weight:700;margin:24px 0 16px;">相关文章</h3><div class="help-article-grid" style="margin-top:0;">${artHtml}</div><h3 style="font-size:18px;font-weight:700;margin:40px 0 16px;">常见问题</h3><div style="max-width:800px;">${faqHtml}</div></div></section>${supportHtml()}`;
}

function helpCategory(cat){
  var arts=helpArticles.filter(function(a){return a.tag===cat;});
  if(arts.length===0) arts=helpArticles.slice(0,2);
  var faqG=faqGroups.find(function(g){return g.name===cat;});
  var faqHtml='';
  if(faqG){faqHtml=faqG.items.map(function(f){return `<div class="faq-item"><button class="faq-question" onclick="toggleFaqItem(this)">${f.q} <div class="faq-icon">${FAQ_ICO}</div></button><div class="faq-answer-wrapper"><div class="faq-answer"><div class="faq-answer-inner">${f.a}</div></div></div></div>`;}).join('');}
  var catObj=helpCategories.find(function(c){return c.name===cat;});
  var crumb = `<div class="help-breadcrumb"><button class="demo-back-btn" onclick="showHelpView('home')">返回帮助中心</button><span class="bread-sep">/</span><span class="bread-current">${cat}</span></div>`;
  return `<section class="section" style="padding-top:80px;min-height:60vh;"><div class="section-inner reveal" style="max-width:800px;margin:0 auto;">${crumb}<h1 style="font-size:36px;margin:32px 0 8px;">${cat}</h1><p style="color:var(--text-secondary);margin-bottom:32px;">${catObj?catObj.desc:''}</p><div class="help-article-grid" style="margin-top:0;">${arts.map(articleCard).join('')}</div>${faqHtml?'<h3 style="font-size:18px;font-weight:700;margin:40px 0 16px;">常见问题</h3><div style="max-width:800px;">'+faqHtml+'</div>':''}</div></section>${supportHtml()}`;
}

function helpArticle(id){
  var a=helpArticles.find(function(x){return x.id===id;});
  if(!a) a=helpArticles[0];
  var related=helpArticles.filter(function(x){return x.id!==a.id;}).slice(0,3);
  var relFaq=[];
  faqGroups.forEach(function(g){if(g.name===a.tag||g.items.length)relFaq=relFaq.concat(g.items.slice(0,2));});
  relFaq=relFaq.slice(0,3);
  var crumb = `<div class="help-breadcrumb"><button class="demo-back-btn" onclick="showHelpView('home')">返回帮助中心</button><span class="bread-sep">/</span><span class="bread-current">${a.title}</span></div>`;
  return `<section class="section" style="padding-top:80px;"><div class="section-inner reveal" style="max-width:800px;margin:0 auto;">${crumb}<div style="margin-top:32px;margin-bottom:40px;"><span class="help-article-tag" style="background:var(--bg-secondary);padding:6px 12px;border-radius:6px;font-size:13px;font-weight:600;">${a.tag}</span><h1 style="font-size:36px;margin:20px 0 8px;line-height:1.3;">${a.title}</h1><div style="font-size:13px;color:var(--text-muted);">更新时间：${a.time} · 阅读时长：${a.read}</div></div><div class="article-body" style="font-size:15px;color:var(--text-secondary);line-height:1.8;">${a.body}</div><div style="margin-top:48px;padding-top:32px;border-top:1px solid var(--border);"><h3 style="font-size:18px;font-weight:700;margin-bottom:16px;">推荐阅读</h3><div class="help-article-grid" style="margin-top:0;">${related.map(articleCard).join('')}</div></div>${relFaq.length?'<div style="margin-top:40px;"><h3 style="font-size:18px;font-weight:700;margin-bottom:16px;">相关问题</h3>'+relFaq.map(function(f){return '<div class="faq-item"><button class="faq-question" onclick="toggleFaqItem(this)">'+f.q+' <div class="faq-icon">'+FAQ_ICO+'</div></button><div class="faq-answer-wrapper"><div class="faq-answer"><div class="faq-answer-inner">'+f.a+'</div></div></div></div>';}).join('')+'</div>':''}</div></section>${supportHtml()}`;
}

// ========== DOWNLOAD PAGE ==========
window.renderDownloadPage = function(){
  document.getElementById('page-download').innerHTML = `
  <section class="section" style="padding-top:120px;padding-bottom:100px;">
    <div class="dl-tabs-wrapper reveal"><div class="dl-tabs"><button class="dl-tab active" data-os="android" onclick="switchDownloadPlatform('android')">Android</button><button class="dl-tab" data-os="ios" onclick="switchDownloadPlatform('ios')">iOS</button></div></div>
    <div class="dl-layout reveal reveal-delay-1">
      <div class="dl-left"><div class="dl-phone-mockup os-android" id="dlMockup"><div class="dl-phone-screen"><div class="dl-phone-notch"></div><div class="dl-phone-island"></div><div style="padding:40px 20px 20px;color:#fff;"><div style="font-size:12px;color:#94A3B8;">总资产 (USD)</div><div style="font-size:28px;font-weight:800;margin:8px 0;">$18,542.00</div><div style="display:flex;gap:8px;margin-top:16px;"><div style="flex:1;background:rgba(59,130,246,0.15);border-radius:10px;padding:10px;text-align:center;"><div style="font-size:11px;color:#94A3B8;">转账</div></div><div style="flex:1;background:rgba(16,185,129,0.15);border-radius:10px;padding:10px;text-align:center;"><div style="font-size:11px;color:#94A3B8;">收款</div></div><div style="flex:1;background:rgba(139,92,246,0.15);border-radius:10px;padding:10px;text-align:center;"><div style="font-size:11px;color:#94A3B8;">闪兑</div></div></div><div style="margin-top:20px;background:rgba(255,255,255,0.05);border-radius:12px;padding:12px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span style="display:flex;align-items:center;gap:6px;"><span style="width:24px;height:24px;background:#26A17B;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;">T</span> USDT</span><span style="font-weight:600;">6,180.00</span></div><div style="display:flex;justify-content:space-between;align-items:center;"><span style="display:flex;align-items:center;gap:6px;"><span style="width:24px;height:24px;background:#627EEA;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;">E</span> ETH</span><span style="font-weight:600;">2.45</span></div></div></div></div></div></div>
      <div class="dl-right"><div class="dl-title-tag">官方下载</div>
        <div class="dl-os-group active" data-os="android"><h1 class="dl-title">OneToken Android 客户端</h1><p class="dl-subtitle">一个连接钱包、UPAY、闪兑与行情的数字资产应用。</p><div class="dl-btn-group"><a class="dl-btn" href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 22.1c-.2.2-.4.2-.6.2-.2 0-.4-.1-.5-.4-.1-.2-.1-.4-.1-.7V2.8c0-.3 0-.5.1-.7.1-.2.3-.4.5-.4.2 0 .4.1.6.2l13.9 8.1c.3.2.5.5.5.8s-.2.7-.5.8L3.6 22.1z"/></svg><div class="dl-btn-text"><span class="dl-btn-sub">通过商店获取</span><span>Google Play</span></div></a><a class="dl-btn" style="background:var(--accent);color:#fff;" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><div class="dl-btn-text"><span class="dl-btn-sub">本地下载</span><span>Android APK</span></div></a><div class="dl-qr-card"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><line x1="21" y1="14" x2="21" y2="17"/><line x1="14" y1="21" x2="17" y2="21"/></svg><span style="font-size:12px;font-weight:600;">扫码下载</span><div class="dl-qr-popover"><div style="display:flex;flex-direction:column;align-items:center;gap:8px;"><div style="width:140px;height:140px;border-radius:8px;background:rgba(0,0,0,0.05);display:flex;align-items:center;justify-content:center;"><svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><rect x="5" y="5" width="3" height="3" fill="#94A3B8"/><rect x="16" y="5" width="3" height="3" fill="#94A3B8"/><rect x="5" y="16" width="3" height="3" fill="#94A3B8"/></svg></div><span style="font-size:12px;color:var(--text-muted);">扫描二维码下载 Android 版</span></div></div></div></div></div>
        <div class="dl-os-group" data-os="ios"><h1 class="dl-title">OneToken iOS 客户端</h1><p class="dl-subtitle">一个连接钱包、UPAY、闪兑与行情的数字资产应用。</p><div class="dl-btn-group"><a class="dl-btn" href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg><div class="dl-btn-text"><span class="dl-btn-sub">通过商店获取</span><span>App Store</span></div></a><div class="dl-qr-card"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><line x1="21" y1="14" x2="21" y2="17"/><line x1="14" y1="21" x2="17" y2="21"/></svg><span style="font-size:12px;font-weight:600;">扫码下载</span><div class="dl-qr-popover"><div style="display:flex;flex-direction:column;align-items:center;gap:8px;"><div style="width:140px;height:140px;border-radius:8px;background:rgba(0,0,0,0.05);display:flex;align-items:center;justify-content:center;"><svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><rect x="5" y="5" width="3" height="3" fill="#94A3B8"/><rect x="16" y="5" width="3" height="3" fill="#94A3B8"/><rect x="5" y="16" width="3" height="3" fill="#94A3B8"/></svg></div><span style="font-size:12px;color:var(--text-muted);">扫描二维码下载 iOS 版</span></div></div></div></div></div>
        <div class="dl-security-card"><div class="dl-security-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></div><div><div class="dl-security-title">官方下载安装提醒</div><ul class="dl-security-list"><li>请仅通过 OneToken 官网或官方渠道下载</li><li>请核对官网域名 <span style="font-family:monospace;background:rgba(0,0,0,0.05);padding:2px 6px;border-radius:4px;">onetoken.io</span></li><li>请妥善保管私钥、助记词等敏感信息</li></ul></div></div>
        <div class="dl-version-strip"><div class="dl-version-left">最新版本：v2.1.0 <span>更新时间：2026.04.01</span></div></div>
      </div>
    </div>
  </section>`;
};

window.switchDownloadPlatform = function(os){
  document.querySelectorAll('.dl-tab').forEach(t=>t.classList.toggle('active',t.dataset.os===os));
  document.querySelectorAll('.dl-os-group').forEach(g=>{g.classList.remove('active');if(g.dataset.os===os)g.classList.add('active');});
  var m=document.getElementById('dlMockup');if(m){m.classList.remove('os-android','os-ios');m.classList.add('os-'+os);}
};
})();
