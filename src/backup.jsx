import { useState, useEffect } from 'react';
import './App.css';

// Item Images
import bottle from './assets/bottle.jpg';
import paper from './assets/paper.jpg';
import applecore from './assets/applecore.jpg';
import battery from './assets/battery.jpg';
import sodacan from './assets/sodacan.jpg';
import glassJar from './assets/glass.jpg'; 
import eggshell from './assets/eggshell.jpg';

// Character Images
import kidNormal from './assets/kidNormal.png';
import kidHappy from './assets/kidHappy.png';
import kidSad from './assets/kidSad.png';

const ITEMS = [
  { id: 1, name: 'Plastflaska', type: 'plastic', img: bottle },
  { id: 2, name: 'Tidning', type: 'paper', img: paper },
  { id: 3, name: 'Äppelskrutt', type: 'food', img: applecore },
  { id: 4, name: 'Batteri', type: 'battery', img: battery }, 
  { id: 5, name: 'Pantburk', type: 'pant', img: sodacan }, 
  { id: 6, name: 'Glasburk', type: 'glass', img: glassJar }, 
  { id: 7, name: 'Äggskal', type: 'food', img: eggshell }
];

const soundCorrect = new Audio('/yay.mp3');
const soundIncorrect = new Audio('/oops.mp3');

function App() {
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState(ITEMS[0]);
  const [feedback, setFeedback] = useState("");
  const [showEarth, setShowEarth] = useState(false);
  const [characterImg, setCharacterImg] = useState(kidNormal);
  const [isThrowing, setIsThrowing] = useState(false);

  // Initial throw on game start
  useEffect(() => {
    setIsThrowing(true);
    setTimeout(() => setIsThrowing(false), 800);
  }, []);

  const playSound = (isCorrect) => {
    const audio = isCorrect ? soundCorrect : soundIncorrect;
    audio.currentTime = 0; 
    audio.play().catch(() => console.log("Interaction needed for sound"));
  };

  useEffect(() => {
    if (score > 0 && score % 50 === 0) {
      setShowEarth(true);
      setTimeout(() => setShowEarth(false), 3000);
    }
  }, [score]);

  const onDragStart = (e, type) => {
    e.dataTransfer.setData("itemType", type);
  };

  const onDrop = (e, binType) => {
    const draggedItemType = e.dataTransfer.getData("itemType");
    
    if (draggedItemType === binType) {
      // SUCCESS LOGIC
      playSound(true);
      setScore(s => s + 10);
      setFeedback("🤩");
      setCharacterImg(kidHappy);
      
      setTimeout(() => {
        let nextItem;
        do {
          nextItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
        } while (nextItem.id === currentItem.id);
        
        setCurrentItem(nextItem);
        setFeedback("");
        setCharacterImg(kidNormal);
        
        // Trigger New Throw
        setIsThrowing(true);
        setTimeout(() => setIsThrowing(false), 800);
      }, 1200);
    } else {
      // FAILURE LOGIC
      playSound(false);
      setFeedback("😢");
      setCharacterImg(kidSad);
      setTimeout(() => {
        setFeedback("");
        setCharacterImg(kidNormal);
      }, 1200);
    }
  };

  return (
    <div className="game-container">
      <div className="sun"></div>
      <div className="grass-floor"></div>

      <div className={`game-character ${isThrowing ? 'toss-action' : ''}`}>
        <div className="speech-bubble">Sortera åt mig!</div>
        <img src={characterImg} className="character-sprite" alt="Hero" />
      </div>

      <header>
        <h1>EcoHero Sweden 🇸🇪</h1>
        <div className="score-badge">Poäng: {score} ⭐</div>
      </header>

      <div className="game-field">
        {feedback ? (
          <h2 className="big-feedback-emoji">{feedback}</h2>
        ) : (
          <div 
            key={currentItem.id} 
            className="trash-card entry-animation" 
            draggable 
            onDragStart={(e) => onDragStart(e, currentItem.type)}
          >
            <img src={currentItem.img} className="item-image" alt="trash" />
            <p className="item-name">{currentItem.name}</p>
          </div>
        )}
      </div>

      <div className="bins-container">
        {['plastic', 'paper', 'food', 'battery', 'pant', 'glass'].map((type) => (
          <div 
            key={type} 
            className={`bin-box ${type}`}
            onDrop={(e) => onDrop(e, type)}
            onDragOver={(e) => e.preventDefault()}
          >
            <span className="bin-emoji">
              {type === 'plastic' ? '♻️' : type === 'paper' ? '📦' : type === 'food' ? '🍎' : type === 'battery' ? '🔋' : type === 'pant' ? '🥫' : '🫙'}
            </span>
            <span className="bin-label">{type.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {showEarth && (
        <div className="earth-overlay">
          <div className="earth-content">
            <span className="giant-earth">🌍</span>
            <h2>"Jättebra! Du räddar planeten!"</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;