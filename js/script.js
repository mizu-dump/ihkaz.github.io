function createScriptCard(e){let t=(e.tags||[]).map(e=>`<span class="tag">${e}</span>`).join(""),a=e.icon||"fa-link";return`
<article class="script-card" data-animate="fade-up" data-category="${e.category?e.category.toLowerCase():""}">
  <div class="card-glow"></div>
  <div class="card-content">
    <div class="card-header">
      <div class="card-icon">
        <i class="fas ${a}"></i>
      </div>
      <span class="card-badge">${e.category||""}</span>
    </div>
    <div class="card-image-wrapper">
      <img
        alt="${e.title} Preview"
        class="card-image"
        loading="lazy"
        onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 400 300\\'%3E%3Crect fill=\\'%23111\\' width=\\'400\\' height=\\'300\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' fill=\\'%23666\\' font-family=\\'monospace\\' font-size=\\'14\\'%3EImage Loading...%3C/text%3E%3C/svg%3E';"
        src="${e.image||""}" />
      <div class="card-image-overlay"></div>
    </div>
    <h3 class="card-title" data-text="${e.title}">
      <span class="typing-wrapper"></span>
    </h3>
    <p class="card-description">${e.description||""}</p>
    <div class="card-tags">${t}</div>
    <div class="card-actions">
      <!-- Tombol lama diganti dengan satu tautan (link) -->
      <a href="${e.link||"#"}" class="btn-card" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-arrow-right"></i>
        <span>Go!</span>
      </a>
    </div>
  </div>
</article>
`}function renderScriptCards(){let e=document.getElementById("scriptCards");if(!e){console.error("Script cards container tidak ditemukan!");return}if(!window.scriptData||!Array.isArray(window.scriptData)){console.error("Script data tidak ditemukan atau bukan array!"),e.innerHTML='<p style="text-align: center; color: white;">No scripts available</p>';return}console.log("Rendering",window.scriptData.length,"script cards"),e.innerHTML=window.scriptData.map(createScriptCard).join("")}const elements={exploreBtn:document.getElementById("exploreBtn"),statNumbers:document.querySelectorAll(".stat-number")};function smoothScrollTo(e){let t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth",block:"start"})}function showNotification(e,t="success"){let a=document.querySelectorAll(".notification");a.forEach(e=>e.remove());let r=document.createElement("div");r.className=`notification ${t}`,r.innerHTML=`
        <div class="notification-content">
            <i class="fas ${"success"===t?"fa-check":"fa-exclamation-circle"}"></i>
            <span>${e}</span>
        </div>
    `,document.body.appendChild(r),requestAnimationFrame(()=>{r.style.transform="translateX(0)"}),setTimeout(()=>{r.style.transform="translateX(100%)",setTimeout(()=>r.remove(),300)},3e3)}const observerOptions={threshold:.1,rootMargin:"0px 0px -50px 0px"},observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add("animated"),e.target.querySelector(".stat-number")&&animateCounters())})},observerOptions),cardObserverOptions={threshold:.2,rootMargin:"0px 0px -50px 0px"},cardObserver=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");let t=e.target.querySelector(".card-title");t&&!t.dataset.animated&&(animateTypingTitles(),t.dataset.animated="true"),cardObserver.unobserve(e.target)}})},cardObserverOptions);function initializeAnimations(){let e=document.querySelectorAll("[data-animate]");e.forEach(e=>{observer.observe(e)})}function initializeCardAnimations(){let e=document.querySelectorAll(".script-card");e.forEach(e=>{cardObserver.observe(e)})}function animateCounters(){elements.statNumbers.forEach(e=>{let t=parseInt(e.getAttribute("data-count"))||0,a=parseInt(e.textContent)||0;if(a!==t&&t>0){let r=Math.max(1,Math.ceil(t/50)),i=setInterval(()=>{let a=parseInt(e.textContent)||0;a<t?e.textContent=Math.min(a+r,t):(e.textContent=t,clearInterval(i))},50)}})}function animateTypingTitles(){let e=document.querySelectorAll(".card-title");e.forEach(e=>{let t=e.getAttribute("data-text")||"",a=e.querySelector(".typing-wrapper");a&&t&&(a.innerHTML="",t.split("").forEach((e,t)=>{let r=document.createElement("span");r.className="typing-char",r.textContent=" "===e?"\xa0":e,r.setAttribute("aria-hidden","true"),a.appendChild(r),setTimeout(()=>{r.classList.add("visible")},50*t)}))})}function initializeEventListeners(){elements.exploreBtn&&elements.exploreBtn.addEventListener("click",()=>{smoothScrollTo("scripts")});let e=document.getElementById("menuToggle"),t=document.getElementById("mobileMenu");e&&e.addEventListener("click",()=>{e.classList.toggle("active"),t.classList.toggle("show")}),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();let a=e.getAttribute("href").slice(1);a&&smoothScrollTo(a)})})}function handleImageErrors(){let e=document.querySelectorAll("img");e.forEach(e=>{e.addEventListener("error",e=>{e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23111' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-family='monospace' font-size='14'%3EImage not found%3C/text%3E%3C/svg%3E"})})}document.addEventListener("DOMContentLoaded",()=>{console.log("DOM Content Loaded"),renderScriptCards(),initializeEventListeners(),initializeAnimations(),initializeCardAnimations(),handleImageErrors(),setTimeout(()=>{showNotification("Welcome to My Personal Web! \uD83D\uDE80")},1e3),console.log("initialized successfully")}),"performance"in window&&window.addEventListener("load",()=>{setTimeout(()=>{let e=performance.getEntriesByType("navigation")[0];e&&console.log(`Page loaded in ${Math.round(e.loadEventEnd-e.fetchStart)}ms`)},0)});
