let overlayQueue = [];
let overlayIsVisible = true; // newsletter is open at start
let donationTriggered = false;
let startTime = Date.now();
let cookiesAccepted = false;

// Lesezeit-Zähler im Spendenoverlay
setInterval(() => {
    const secs = Math.floor((Date.now() - startTime) / 1000);
    const el = document.getElementById('read-seconds');
    if (el) el.textContent = secs;
}, 1000);

// Lese-Fortschrittsbalken
window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = Math.min(100, (window.scrollY / max) * 100);
    document.getElementById('progress-bar').style.width = pct + '%';

    // Spendenoverlay nach scrollen
    if (window.scrollY > 200 && !donationTriggered && !overlayIsVisible) {
        showOverlay('donation-overlay');
        donationTriggered = true;
    }
});

// Newsletter Countdown
let nlCount = 8;
const nlTimer = setInterval(() => {
    nlCount--;
    const cd = document.getElementById('nl-countdown');
    const sc = document.getElementById('nl-skip-count');
    if (cd) cd.textContent = nlCount;
    if (sc) sc.textContent = nlCount;
    if (nlCount <= 0) {
        clearInterval(nlTimer);
        const timerEl = document.getElementById('newsletter-timer');
        if (timerEl) timerEl.style.display = 'none';
        const skipBtn = document.getElementById('nl-skip-btn');
        if (skipBtn) {
            skipBtn.disabled = false;
            skipBtn.textContent = 'Nein danke, ich mag keine Information';
            skipBtn.onclick = () => closeOverlay('newsletter-overlay');
        }
    }
}, 1000);

function showOverlay(id) {
    document.getElementById(id).classList.add('active');
    overlayIsVisible = true;
}

function closeOverlay(id) {
    document.getElementById(id).classList.remove('active');
    overlayIsVisible = false;
}

// Cookie Banner
function acceptCookies() {
    document.getElementById('cookie-banner').style.display = 'none';
    cookiesAccepted = true;
    // Floating notification erscheint
    setTimeout(() => {
        document.getElementById('float-notif').style.display = 'block';
    }, 1500);
}

function rejectCookies() {
    // Ablehnen öffnet nochmal einen Dialog
    document.getElementById('cookie-banner').innerHTML = `
            <div class="cookie-title">😢 Sind Sie sicher?</div>
            <p class="cookie-text">Ohne Cookies können wir Ihnen keine personalisierte Erfahrung bieten. Die Seite wird in Graustufen angezeigt. Einige Funktionen stehen nicht zur Verfügung. Unsere Redakteure werden weinen.</p>
            <div class="cookie-buttons">
                <button class="btn-cookie-accept" onclick="acceptCookies()">OK, ich akzeptiere doch</button>
                <button class="btn-cookie-reject" onclick="document.getElementById('cookie-banner').style.display='none'">Trotzdem ablehnen (schämen Sie sich)</button>
            </div>`;
}

// Der 5-Sekunden-Zyklus
setInterval(() => {
    if (!overlayIsVisible) {
        showOverlay('register-overlay');
    }
}, 5000);

// Fake Video nach 4 Sekunden
setTimeout(() => {
    document.getElementById('fake-video').style.display = 'flex';
}, 4000);

// Cursor follower (dezent nervig)
let cursorVisible = false;
document.addEventListener('mousemove', (e) => {
    if (!cursorVisible) return;
    const ad = document.getElementById('cursor-ad');
    ad.style.left = (e.clientX + 15) + 'px';
    ad.style.top = (e.clientY - 10) + 'px';
});
setTimeout(() => {
    cursorVisible = true;
    document.getElementById('cursor-ad').style.display = 'block';
    setTimeout(() => {
        document.getElementById('cursor-ad').style.display = 'none';
        cursorVisible = false;
    }, 5000);
}, 12000);

// Benachrichtigungs-Anfrage bei Klick
document.addEventListener('click', () => {
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }
});

window.onbeforeunload = () => "Wirklich verlassen? Sie haben noch 3 ungelesene EILMELDUNGEN!";