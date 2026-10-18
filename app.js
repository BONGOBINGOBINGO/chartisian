const patterns = [
  {number:'01',category:'REVERSAL / BULLISH',title:'Bullish engulfing',description:'A larger bullish candle covers the real body of the candle before it. Context matters: look at where it forms, not only what it looks like.',data:[[68,54,78,47],[54,62,71,45],[62,49,70,41],[49,60,66,43],[60,73,81,55],[73,66,82,58],[66,72,78,59],[72,43,78,38],[43,31,52,25],[31,21,39,16]]},
  {number:'02',category:'REVERSAL / BULLISH',title:'Double bottom',description:'Price tests a similar low twice, with a reaction between the tests. The shape is a prompt to study support and confirmation, not a forecast.',data:[[31,51,58,26],[51,61,68,45],[61,53,66,47],[53,72,78,49],[72,64,78,59],[64,53,69,46],[53,72,78,49],[72,58,76,53],[58,45,65,39],[45,31,51,27]]},
  {number:'03',category:'CONTINUATION / BULLISH',title:'Ascending triangle',description:'A relatively steady ceiling meets a series of rising lows. Watch how price behaves around the boundary and what the broader context suggests.',data:[[75,67,82,61],[67,76,82,59],[76,60,81,55],[60,69,75,53],[69,55,74,48],[55,63,69,46],[63,49,69,42],[49,58,65,40],[58,43,65,37],[43,36,53,31]]}
];

function chartSvg(data, id) {
  const bars = data.map((bar, i) => {
    const x = 20 + i * 32;
    const [open, close, high, low] = bar;
    const yOpen = 12 + open * 1.23;
    const yClose = 12 + close * 1.23;
    const yHigh = 12 + high * 1.23;
    const yLow = 12 + low * 1.23;
    const bullish = close < open;
    return `<g class="${bullish ? 'bar-up' : 'bar-down'}"><path d="M${x + 5} ${yHigh}V${yLow}"/><rect x="${x}" y="${Math.min(yOpen,yClose)}" width="10" height="${Math.max(4,Math.abs(yClose-yOpen))}" rx="1"/></g>`;
  }).join('');
  let overlay = '';
  if(id === 1) overlay = '<path class="pattern-guide" d="M42 112 C79 102 90 100 116 84 C145 68 158 111 182 120 C211 132 220 82 247 78 C273 72 292 62 316 38"/><circle class="pattern-point" cx="116" cy="84" r="3"/><circle class="pattern-point" cx="247" cy="78" r="3"/>';
  if(id === 2) overlay = '<path class="pattern-guide" d="M22 72L331 72M22 135L331 84"/><circle class="pattern-point" cx="181" cy="98" r="3"/>';
  return `<svg viewBox="0 0 350 170" role="img" aria-label="Illustrative ${patterns[id].title} candlestick chart"><g class="chart-grid"><path d="M0 30H350M0 70H350M0 110H350M0 150H350"/></g>${bars}${overlay}</svg>`;
}

const card = document.querySelector('.demo-card');
function showPattern(index) {
  const item = patterns[index];
  card.classList.add('changing');
  window.setTimeout(() => {
    document.querySelector('#pattern-number').textContent = item.number;
    document.querySelector('#pattern-category').textContent = item.category;
    document.querySelector('#pattern-title').textContent = item.title;
    document.querySelector('#pattern-description').textContent = item.description;
    document.querySelector('#demo-chart').innerHTML = chartSvg(item.data,index);
    document.querySelector('.side-index').textContent = `${item.number} / 03`;
    document.querySelectorAll('.pattern-select').forEach((button,i) => {
      button.classList.toggle('active',i === index);
      button.setAttribute('aria-pressed',String(i === index));
    });
    card.classList.remove('changing');
  }, 140);
}

document.querySelectorAll('.pattern-select').forEach(button => button.addEventListener('click', () => showPattern(Number(button.dataset.pattern))));
showPattern(0);

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded',String(!open));
  nav.classList.toggle('open',!open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click',() => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded','false');
}));

document.querySelector('#signup-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#signup-email').value.trim();
  if (!email) return;
  const subject = encodeURIComponent('Chartisian first draw signup');
  const body = encodeURIComponent(`Please add ${email} to the Chartisian launch updates list. I consent to receive launch updates at this address. I can request removal at any time.`);
  document.querySelector('#signup-status').textContent = 'Your email app is opening with the signup request. Send it to complete your request.';
  window.location.href = `mailto:hello@chartisian.com?subject=${subject}&body=${body}`;
});
