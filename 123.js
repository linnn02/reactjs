const http = require('http');

const fetchUserData = async () => {
return new Promise((resolve) => {
setTimeout(() => {
resolve({
id: 101,
username: 'AlmauStudent2026',
theme: 'dark',
});
}, 500);
});
};

function safeSerialize(data) {
return JSON.stringify(data)
.replace(/</g, '\\u003c')
.replace(/>/g, '\\u003e')
.replace(/&/g, '\\u0026')
.replace(/\u2028/g, '\\u2028')
.replace(/\u2029/g, '\\u2029');
}

function getClientCode() {
return `
document.addEventListener('DOMContentLoaded', () => {
console.log('DOM Ready. Starting Hydration Process...');

const initialState = window.__INITIAL_STATE__ || {};
console.log('Hydrating with state:', initialState);

const profileNode = document.getElementById('user-profile');
const connectBtn = document.getElementById('connect-btn');
const statusBadge = document.getElementById('status-badge');
const displayName = document.getElementById('display-name');
const themeValue = document.getElementById('theme-value');

if (!profileNode || !connectBtn || !statusBadge || !displayName || !themeValue) {
console.error('Hydration failed: Target nodes missing.');
return;
}

displayName.textContent = initialState.username || 'Guest';
themeValue.textContent = initialState.theme || 'light';

setTimeout(() => {
profileNode.classList.remove('loading');
connectBtn.removeAttribute('disabled');
connectBtn.textContent = 'Go Online';

connectBtn.addEventListener('click', () => {
if (statusBadge.textContent === 'Offline') {
statusBadge.textContent = 'Online';
statusBadge.style.color = 'green';
connectBtn.textContent = 'Go Offline';
console.log('User ' + initialState.username + ' connected to socket.');
} else {
statusBadge.textContent = 'Offline';
statusBadge.style.color = 'inherit';
connectBtn.textContent = 'Go Online';
console.log('User ' + initialState.username + ' disconnected from socket.');
}
});

console.log('[SUCCESS] Node Hydrated Successfully');
}, 1000);
});
`;
}

const server = http.createServer(async (req, res) => {
if (req.url === '/') {
const userData = await fetchUserData();

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SSR Hydration Lab</title>

<script>
window.__INITIAL_STATE__ = ${safeSerialize(userData)};
</script>

<style>
body {
font-family: system-ui, sans-serif;
padding: 2rem;
background: #f8f9fa;
color: #222;
}

.hydration-target {
border: 2px dashed #0066cc;
padding: 1rem;
border-radius: 12px;
background: #fff;
max-width: 420px;
}

.loading {
opacity: 0.5;
}

.meta {
margin-top: 0.5rem;
color: #555;
}

button {
margin-top: 1rem;
padding: 0.7rem 1rem;
border: none;
border-radius: 8px;
background: #0066cc;
color: white;
cursor: pointer;
}

button:disabled {
opacity: 0.7;
cursor: not-allowed;
}
</style>
</head>
<body>
<h1>Dashboard</h1>

<div id="user-profile" class="hydration-target loading" data-hydrate="true">
<h2>Welcome, <span id="display-name">${userData.username}</span></h2>
<p>Status: <span id="status-badge">Offline</span></p>
<p class="meta">Theme: <span id="theme-value">${userData.theme}</span></p>
<button id="connect-btn" disabled>Connecting...</button>
</div>

<script src="/client.js"></script>
</body>
</html>
`;

res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
res.end(html);
} else if (req.url === '/client.js') {
res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
res.end(getClientCode());
} else {
res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
res.end('Not Found');
}
});

server.listen(3000, () => {
console.log('SSR Server running on http://localhost:3000');
});