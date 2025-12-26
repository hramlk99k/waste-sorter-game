import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import { motion } from "framer-motion";
// Asset Imports
import bottle from './assets/bottle.png';
import paper from './assets/paper.png';
import applecore from './assets/applecore.png';
import battery from './assets/battery2.png';
import glassJar from './assets/glass.png'; 
import kidNormal from './assets/kidNormal.png';
import kidHappy from './assets/kidHappy.png';
import kidSad from './assets/kidSad.png';
import bananaPeel from './assets/bananaPeel.png';
import chicken from './assets/chicken.png';
import fish from './assets/fish.png';
import light from './assets/light.png';
import milk from './assets/milk.png';
import newspaper from './assets/newspaper.png';
import phone from './assets/phone.png';
import pizza from './assets/pizza.png';
import toothbrush from './assets/toothbrush.png';
import trashbag from './assets/trashbag.png';
import watch from './assets/watch.png';


const ITEMS = [
  { id: 1, name: { sv: 'PLASTFLASKA', en: 'PLASTIC BOTTLE' }, type: 'plastic', img: bottle },
  { id: 2, name: { sv: 'PAPPER', en: 'PAPER' }, type: 'paper', img: paper },
  { id: 3, name: { sv: 'ÄPPELSKRUTT', en: 'APPLE CORE' }, type: 'food', img: applecore },
  { id: 4, name: { sv: 'BATTERI', en: 'BATTERY' }, type: 'battery', img: battery },
  { id: 5, name: { sv: 'BANAN SKAL', en: 'BANANA PEEL' }, type: 'food', img: bananaPeel }, 
  { id: 6, name: { sv: 'GLASBURK', en: 'GLASS JAR' }, type: 'glass', img: glassJar },
  { id: 7, name: { sv: 'KYCKLING', en: 'CHICKEN' }, type: 'food', img: chicken }, 
  { id: 8, name: { sv: 'FISK', en: 'FISH' }, type: 'food', img: fish },
  { id: 9, name: { sv: 'GLÖDLAMPA', en: 'LIGHT BULB' }, type: 'battery', img: light },
  { id: 10, name: { sv: 'MJÖLK', en: 'MILK' }, type: 'paper', img: milk },
  { id: 11, name: { sv: 'TIDNING', en: 'NEWSPAPER' }, type: 'paper', img: newspaper },
  { id: 12, name: { sv: 'TELEFON', en: 'PHONE' }, type: 'battery', img: phone },
  { id: 13, name: { sv: 'PIZZA', en: 'PIZZA' }, type: 'food', img: pizza },
  { id: 14, name: { sv: 'TANDBORSTE', en: 'TOOTHBRUSH' }, type: 'plastic', img: toothbrush },
  { id: 15, name: { sv: 'SKORPSÄCK', en: 'TRASH BAG' }, type: 'plastic', img: trashbag },
  { id: 16, name: { sv: 'KLOCKA', en: 'WATCH' }, type: 'battery', img: watch },
];

const BRIGHT_COLORS = ['#FF5722', '#E91E63', '#9C27B0', '#3F51B5', '#00BCD4', '#4CAF50', '#FF9800'];

function App() {
  const [lang, setLang] = useState('en');
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState(ITEMS[0]);
  const [characterImg, setCharacterImg] = useState(kidNormal);
  const [isSparkling, setIsSparkling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [openBin, setOpenBin] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [nameColor, setNameColor] = useState(BRIGHT_COLORS[0]);
  const [bubbleColor, setBubbleColor] = useState('yellow'); 
const [isDragging, setIsDragging] = useState(false);
  const audioCtx = useRef(null);
  const buffers = useRef({});
  const tickAudio = useRef(null);

useEffect(() => {
    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    const audio = new Audio('/clocktick.mp3');
    audio.loop = true;
    tickAudio.current = audio;

    const loadSound = async (name, url) => {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const decodedData = await audioCtx.current.decodeAudioData(arrayBuffer);
            buffers.current[name] = decodedData;
        } catch (e) { console.error("Sound error:", e); }
    };

    loadSound('yay', '/yay.mp3');
    loadSound('oops', '/oops.mp3');

    return () => {
        if (tickAudio.current) {
            tickAudio.current.pause();
            tickAudio.current = null;
        }
    };
}, []);
 
useEffect(() => {
    if (!tickAudio.current) return;
    if (isMuted || gameOver || score === 0) {
      tickAudio.current.pause();
    } else {
      tickAudio.current.play().catch(e => console.log("Waiting for user click..."));
    }
  }, [isMuted, score, gameOver]);

 const handleInteraction = () => {
  if (audioCtx.current?.state === 'suspended') audioCtx.current.resume();
  if (!isMuted && score > 0 && !gameOver && tickAudio.current.paused) {
    tickAudio.current.play().catch(() => {});
  }
};

  const playInstantSound = (name) => {
    if (isMuted || !buffers.current[name]) return;
    const source = audioCtx.current.createBufferSource();
    source.buffer = buffers.current[name];
    source.connect(audioCtx.current.destination);
    source.start(0);
  };

  // UPDATED onDrop to work on both mobile and desktop
  const onDrop = (binType) => {
    handleInteraction();
    if (gameOver) return;
    setOpenBin(null);
    
    // Check type against binType
    if (currentItem.type === binType) {
      playInstantSound('yay');
      setScore(s => s + 10);
      setBubbleColor('green');
      if ((score + 10) >= 100) {
        setGameOver(true);
        tickAudio.current.pause();
      }
      if ((score + 10) % 50 === 0) confetti({ particleCount: 150, spread: 70 });
      
      setCharacterImg(kidHappy);
      setIsSparkling(true);
      setTimeout(() => {
        setIsSparkling(false);
        const next = ITEMS[Math.floor(Math.random() * ITEMS.length)];
        setCurrentItem(next);
        setNameColor(BRIGHT_COLORS[Math.floor(Math.random() * BRIGHT_COLORS.length)]);
        setCharacterImg(kidNormal);
        setBubbleColor('yellow');
      }, 1000);
    } else {
      playInstantSound('oops');
      setBubbleColor('red');
      setCharacterImg(kidSad);
      setTimeout(() => {
        setCharacterImg(kidNormal);
        setBubbleColor('yellow');
      }, 1000);
    }
  };

  return (
    <div className="game-wrapper" onMouseDown={handleInteraction}>
      <div className="sky-bg">
        <div className="sun-pulsing"></div>
        <div className="moving-thing plane p1">✈️</div>
        <div className="moving-thing plane p2">🛩️</div>
        <div className="moving-thing plane p3">✈️</div>
        <div className="moving-thing swinging-balloon b-red">🎈</div>
        <div className="moving-thing swinging-balloon b-blue">🎈</div>
        <div className="moving-thing swinging-balloon b-yellow">🎈</div>
        <div className="moving-thing cloud c1">☁️</div>
        <div className="moving-thing cloud c2">☁️</div>
        <div className="moving-thing cloud c3">☁️</div>
        <div className="moving-thing cloud c4">☁️</div>
      </div>
      <div className="grass-bg"></div>

      <header className="game-header">
        <h1 className="flashing-title">TRASH CRACKER!</h1>
        <div className="score-pill">SCORE: {score}</div>
      </header>

      {/* FLAGS ARE BACK */}
      <div className="side-controls-right">
        <button onClick={() => setLang('sv')} className="control-btn orange-btn">
          <img src="https://flagcdn.com/w160/se.png" alt="Sweden" style={{ width: '100%', borderRadius: '4px' }} />
        </button>
        <button onClick={() => setLang('en')} className="control-btn orange-btn">
          <img src="https://flagcdn.com/w160/us.png" alt="USA" style={{ width: '100%', borderRadius: '4px' }} />
        </button>
        <button 
          className="control-btn orange-btn" 
          onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        <button className="control-btn orange-btn" onClick={() => window.location.reload()}>🔄</button>
      </div>

      <main className="play-area">
        <div className="character-zone">
          <div className={`cloud-bubble bubble-${bubbleColor}`}>
            <span className="bubble-text">
              {bubbleColor === 'green' ? (lang === 'sv' ? 'BRA!' : 'YAY!') : 
               bubbleColor === 'red' ? (lang === 'sv' ? 'NEJ!' : 'OOPS!') : 
               (lang === 'sv' ? 'HJÄLP MIG!' : 'HELP ME!')}
            </span>
          </div>
          <div className="kid-container breathe-animation">
            <img src={characterImg} alt="boy" className="kid-img" />
          </div>
        </div>

        <div className="trash-zone">
          {isSparkling && <div className="sparkle-container">✨⭐✨</div>}
          {!isSparkling && !gameOver && (
            /* TRASH IS NOW MOBILE DRAGGABLE BUT KEEPS WIGGLING */
          <motion.div 
  // We remove the "bounce-float" class only while dragging
  className={`trash-item-wrap ${isDragging ? '' : 'bounce-float'}`}
  drag
  dragSnapToOrigin
  whileDrag={{ scale: 1.2, zIndex: 1000 }}
  onDragStart={() => {
    setIsDragging(true); // Stop the wiggle
    setOpenBin(null);
  }}
  onDrag={(e, info) => {
    const bins = document.querySelectorAll('.bin-item');
    let hoveredBin = null;
    bins.forEach(bin => {
      const r = bin.getBoundingClientRect();
      if (info.point.x > r.left && info.point.x < r.right && info.point.y > r.top && info.point.y < r.bottom) {
        hoveredBin = bin.getAttribute('data-type');
      }
    });
    setOpenBin(hoveredBin);
  }}
  onDragEnd={(e, info) => {
    setIsDragging(false); // Restart the wiggle
    const bins = document.querySelectorAll('.bin-item');
    let foundType = null;
    bins.forEach(bin => {
      const r = bin.getBoundingClientRect();
      if (info.point.x > r.left && info.point.x < r.right && info.point.y > r.top && info.point.y < r.bottom) {
        foundType = bin.getAttribute('data-type');
      }
    });
    if (foundType) onDrop(foundType);
    setOpenBin(null);
  }}
>
   <img src={currentItem.img} className="trash-img" alt="trash" draggable="false" />
   <div className="trash-name-tag" style={{ color: nameColor }}>{currentItem.name[lang]}</div>
</motion.div>
          )}
        </div>

        {gameOver && (
          <div className="game-over">
            <div className="modal">
              <h2 className="rainbow-text">WINNER!</h2>
              <div style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 'bold' }}>Final Score: {score} 🏆</div>
              <button className="restart-btn" onClick={() => window.location.reload()}>PLAY AGAIN</button>
            </div>
          </div>
        )}
      </main>

      <footer className="bins-container">
        {['plastic', 'paper', 'food', 'battery', 'glass'].map(bin => (
          <div key={bin} data-type={bin} className={`bin-item ${bin} ${openBin === bin ? 'lid-open' : ''}`}>
            <div className="bin-lid"></div>
            <div className="bin-body">
              <span className="bin-emoji">
                {bin === 'plastic' ? '♻️' : bin === 'paper' ? '📦' : bin === 'food' ? '🍎' : bin === 'battery' ? '🔋'  : '🫙'}
              </span>
              <span className="bin-label">{bin.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
}

export default App;