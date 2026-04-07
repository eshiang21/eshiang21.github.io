// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// Ribbon mouse responsiveness
(function () {
  const hero = document.querySelector('.hero');
  // ribbon-3 excluded: CSS d: animation overrides setAttribute('d') on same property
  const ribbons = [
    { el: document.querySelector('.ribbon-1'), strength: 0.6 },
    { el: document.querySelector('.ribbon-2'), strength: 1.0 },
  ];

  const basePaths = [
    "M-80,176 C80,176 180,12 400,18 C620,24 550,285 645,285 C780,285 820,50 920,50 C1020,50 1080,165 1160,165 C1240,165 1450,62 1520,68",
    "M-80,192 C80,192 180,28 400,34 C620,40 550,301 645,301 C780,301 820,66 920,66 C1020,66 1080,181 1160,181 C1240,181 1450,78 1520,84",
  ];

  let mouse = { x: 0, y: 0 };
  let lerped = { x: 0, y: 0 };
  const MAX = 25;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = 0;
    mouse.y = 0;
  });

  function warpPath(base, dx, dy) {
    return base.replace(/C([\d.-]+),([\d.-]+) ([\d.-]+),([\d.-]+)/g, (_, x1, y1, x2, y2) =>
      `C${+x1 + dx},${+y1 + dy} ${+x2 - dx},${+y2 - dy}`
    );
  }

  function tick() {
    lerped.x += (mouse.x - lerped.x) * 0.06;
    lerped.y += (mouse.y - lerped.y) * 0.06;

    ribbons.forEach(({ el, strength }, i) => {
      const dx = lerped.x * MAX * strength;
      const dy = lerped.y * MAX * strength;
      el.setAttribute('d', warpPath(basePaths[i], dx, dy));
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

// Stars flowing along ribbon-3
(function () {
  const svg = document.querySelector('.hero-ribbons');
  const path = document.querySelector('.ribbon-3');
  if (!svg || !path) return;

  const SPEED = 0.000055;

  const starDefs = [
    { sym: '✦', size: 14, opacity: 0.55 },
    { sym: '✧', size: 11, opacity: 0.4  },
    { sym: '✳\uFE0E', size: 13, opacity: 0.45 },
    { sym: '•', size: 16, opacity: 0.35 },
    { sym: '∘', size: 12, opacity: 0.5  },
    { sym: '♪', size: 15, opacity: 0.5  },
    { sym: '◆', size: 10, opacity: 0.4  },
    { sym: '◇', size: 13, opacity: 0.35 },
    { sym: '×', size: 14, opacity: 0.45 },
    { sym: '✦', size: 10, opacity: 0.3  },
    { sym: '✧', size: 15, opacity: 0.5  },
    { sym: '•', size: 11, opacity: 0.55 },
    { sym: '◇', size: 10, opacity: 0.4  },
    { sym: '✳\uFE0E', size: 16, opacity: 0.3  },
    { sym: '∘', size: 10, opacity: 0.45 },
    { sym: '◆', size: 13, opacity: 0.35 },
    { sym: '♫', size: 14, opacity: 0.45 },
    { sym: '×', size: 11, opacity: 0.5  },
    { sym: '✧', size: 13, opacity: 0.4  },
    { sym: '•', size: 10, opacity: 0.55 },
    { sym: '✦', size: 12, opacity: 0.35 },
    { sym: '◇', size: 14, opacity: 0.45 },
    { sym: '✳\uFE0E', size: 11, opacity: 0.4  },
    { sym: '∘', size: 14, opacity: 0.35 },
    { sym: '♩', size: 15, opacity: 0.4  },
    { sym: '×', size: 12, opacity: 0.5  },
    { sym: '◆', size: 15, opacity: 0.3  },
    { sym: '✦', size: 16, opacity: 0.45 },
    { sym: '✧', size: 10, opacity: 0.55 },
    { sym: '◇', size: 12, opacity: 0.4  },
    { sym: '•', size: 14, opacity: 0.35 },
    { sym: '✳\uFE0E', size: 10, opacity: 0.5  },
    { sym: '♬', size: 14, opacity: 0.5  },
    { sym: '×', size: 15, opacity: 0.4  },
    { sym: '∘', size: 11, opacity: 0.45 },
    { sym: '◆', size: 12, opacity: 0.4  },
    { sym: '✦', size: 13, opacity: 0.5  },
    { sym: '◇', size: 11, opacity: 0.35 },
    { sym: '♯', size: 13, opacity: 0.4  },
    { sym: '•', size: 13, opacity: 0.4  },
    { sym: '✧', size: 12, opacity: 0.45 },
    { sym: '×', size: 10, opacity: 0.35 },
    { sym: '∘', size: 13, opacity: 0.5  },
    { sym: '♭', size: 15, opacity: 0.45 },
    { sym: '✳\uFE0E', size: 12, opacity: 0.4  },
    { sym: '◆', size: 11, opacity: 0.5  },
    { sym: '◇', size: 15, opacity: 0.3  },
    { sym: '✦', size: 11, opacity: 0.4  },
    { sym: '•', size: 12, opacity: 0.5  },
    { sym: '∘', size: 16, opacity: 0.35 },
  ];

  const musicSyms = new Set(['♪','♫','♩','♬','♯','♭']);

  const stars = starDefs.map(def => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.textContent = def.sym;
    el.setAttribute('font-size', def.size);
    el.setAttribute('fill', '#b0b8c4');
    el.setAttribute('text-anchor', 'middle');
    el.setAttribute('dominant-baseline', 'middle');
    el.setAttribute('pointer-events', 'none');
    el.style.opacity = def.opacity;
    svg.appendChild(el);
    const isMusic = musicSyms.has(def.sym);
    return {
      el,
      offset:   Math.random(),
      speed:    SPEED * (0.5 + Math.random() * 1.2),
      perp:     (Math.random() - 0.5) * 40,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      rot:      isMusic ? (Math.random() - 0.5) * 120 : Math.random() * 360,
      isMusic,
    };
  });

  const pathLen = path.getTotalLength(); // cached once

  let lastTime = null;

  function tick(ts) {
    if (!lastTime) lastTime = ts;
    const dt = ts - lastTime;
    lastTime = ts;

    stars.forEach(star => {
      star.offset = (star.offset + star.speed * dt) % 1;
      const t   = star.offset * pathLen;
      const pt  = path.getPointAtLength(t);
      const pt2 = path.getPointAtLength(Math.min(t + 2, pathLen));
      const tx  = pt2.x - pt.x, ty = pt2.y - pt.y;
      const tl  = Math.sqrt(tx * tx + ty * ty) || 1;
      const nx  = -ty / tl, ny = tx / tl;

      star.rot += star.rotSpeed * dt;
      if (star.isMusic) {
        if (star.rot >  60) { star.rot =  60; star.rotSpeed = -Math.abs(star.rotSpeed); }
        if (star.rot < -60) { star.rot = -60; star.rotSpeed =  Math.abs(star.rotSpeed); }
      }
      const x = pt.x + nx * star.perp;
      const y = pt.y + ny * star.perp;
      star.el.setAttribute('x', x);
      star.el.setAttribute('y', y);
      star.el.setAttribute('transform', `rotate(${star.rot}, ${x}, ${y})`);
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

// Ribbon scroll parallax
(function () {
  const ribbons = [
    { el: document.querySelector('.ribbon-1'), rate: 0.05 },
    { el: document.querySelector('.ribbon-2'), rate: 0.08 },
    { el: document.querySelector('.ribbon-3'), rate: 0.03 },
  ];

  function onScroll() {
    const scrollY = window.scrollY;
    ribbons.forEach(({ el, rate }) => {
      const shift = Math.min(scrollY * rate, 30);
      el.style.transform = `translateY(${shift}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
