const codeSymbols: {
  text: string; x: string; y: string; size: number;
  anim: string; delay: string; dur: string; opacity: number;
}[] = [
  { text: '</',  x: '4%',  y: '10%', size: 44, anim: 'float-bg-1', delay: '0s',   dur: '20s', opacity: 0.05 },
  { text: '/>',  x: '87%', y: '17%', size: 36, anim: 'float-bg-2', delay: '3s',   dur: '24s', opacity: 0.04 },
  { text: '{}',  x: '2%',  y: '43%', size: 52, anim: 'float-bg-3', delay: '6s',   dur: '19s', opacity: 0.05 },
  { text: '()',  x: '91%', y: '57%', size: 38, anim: 'float-bg-1', delay: '1.5s', dur: '22s', opacity: 0.04 },
  { text: '[]',  x: '7%',  y: '75%', size: 46, anim: 'float-bg-4', delay: '4s',   dur: '21s', opacity: 0.05 },
  { text: '=>',  x: '83%', y: '83%', size: 32, anim: 'float-bg-2', delay: '7s',   dur: '26s', opacity: 0.04 },
  { text: '//',  x: '44%', y: '5%',  size: 28, anim: 'float-bg-3', delay: '2s',   dur: '18s', opacity: 0.04 },
  { text: '&&',  x: '60%', y: '92%', size: 26, anim: 'float-bg-4', delay: '5s',   dur: '23s', opacity: 0.04 },
  { text: '**',  x: '24%', y: '62%', size: 22, anim: 'float-bg-1', delay: '8s',   dur: '17s', opacity: 0.03 },
  { text: '||',  x: '71%', y: '33%', size: 30, anim: 'float-bg-2', delay: '3.5s', dur: '25s', opacity: 0.04 },
]

type ShapeType = 'triangle' | 'circle' | 'hexagon' | 'diamond'

const shapes: {
  type: ShapeType; x: string; y: string; size: number;
  anim: string; delay: string; dur: string; opacity: number; rotate: number;
}[] = [
  { type: 'triangle', x: '17%', y: '27%', size: 58, anim: 'float-bg-2', delay: '2s',   dur: '28s', opacity: 0.04, rotate: 15  },
  { type: 'circle',   x: '76%', y: '63%', size: 72, anim: 'float-bg-1', delay: '5s',   dur: '22s', opacity: 0.03, rotate: 0   },
  { type: 'hexagon',  x: '38%', y: '47%', size: 66, anim: 'float-bg-3', delay: '1s',   dur: '30s', opacity: 0.03, rotate: -10 },
  { type: 'diamond',  x: '53%', y: '21%', size: 46, anim: 'float-bg-4', delay: '9s',   dur: '20s', opacity: 0.04, rotate: 0   },
  { type: 'circle',   x: '13%', y: '88%', size: 36, anim: 'float-bg-1', delay: '4s',   dur: '18s', opacity: 0.04, rotate: 0   },
  { type: 'triangle', x: '80%', y: '40%', size: 52, anim: 'float-bg-2', delay: '7s',   dur: '25s', opacity: 0.04, rotate: -30 },
  { type: 'hexagon',  x: '30%', y: '15%', size: 44, anim: 'float-bg-4', delay: '0.5s', dur: '27s', opacity: 0.03, rotate: 20  },
  { type: 'diamond',  x: '65%', y: '78%', size: 40, anim: 'float-bg-3', delay: '6.5s', dur: '23s', opacity: 0.04, rotate: 45  },
]

function ShapeSVG({ type, size, rotate }: { type: ShapeType; size: number; rotate: number }) {
  const common = { width: size, height: size, viewBox: '0 0 100 100', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
  const style = rotate !== 0 ? { transform: `rotate(${rotate}deg)` } : undefined

  if (type === 'triangle') return (
    <svg {...common} style={style}>
      <polygon points="50,8 92,88 8,88" />
    </svg>
  )
  if (type === 'circle') return (
    <svg {...common}>
      <circle cx="50" cy="50" r="44" />
    </svg>
  )
  if (type === 'hexagon') return (
    <svg {...common} style={style}>
      <polygon points="50,4 93,27 93,73 50,96 7,73 7,27" />
    </svg>
  )
  // diamond
  return (
    <svg {...common}>
      <polygon points="50,4 96,50 50,96 4,50" />
    </svg>
  )
}

export default function FloatingBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-2 overflow-hidden text-foreground"
    >
      {codeSymbols.map((el, i) => (
        <div
          key={i}
          className={`absolute font-mono font-bold select-none ${el.anim}`}
          style={{
            left: el.x,
            top: el.y,
            fontSize: el.size,
            opacity: el.opacity,
            ['--float-dur' as string]: el.dur,
            animationDelay: el.delay,
          }}
        >
          {el.text}
        </div>
      ))}

      {shapes.map((el, i) => (
        <div
          key={`s${i}`}
          className={`absolute ${el.anim}`}
          style={{
            left: el.x,
            top: el.y,
            opacity: el.opacity,
            ['--float-dur' as string]: el.dur,
            animationDelay: el.delay,
          }}
        >
          <ShapeSVG type={el.type} size={el.size} rotate={el.rotate} />
        </div>
      ))}
    </div>
  )
}
