import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [activeKey, setActiveKey] = useState('');
  const [activeKeyColor, setActiveKeyColor] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      playSound(event.key.toUpperCase());
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }); // Removed playSound from the dependency array

const drumPads = [
    {
      keyCode: 81,
      text: "Q",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      keyCode: 87,
      text: "W",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      keyCode: 69,
      text: "E",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      keyCode: 65,
      text: "A",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      keyCode: 83,
      text: "S",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      keyCode: 68,
      text: "D",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
      keyCode: 90,
      text: "Z",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
      keyCode: 88,
      text: "X",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
      keyCode: 67,
      text: "C",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
  ];

  function playSound(selector) {
    const drumPad = drumPads.find((pad) => pad.text === selector);

    if (drumPad) {
      const audio = document.getElementById(selector);
      audio.play();
      setActiveKey(selector);
      setActiveKeyColor('active');
    } else {
      console.error(`No drum pad found for key: ${selector}`);
    }
  }

  return (
    <div className="App">
      <div id="drum-machine">
        <div id="display">{activeKey}</div>
        <div className="drumPads">
          {drumPads.map((drumpad) => (
            <div
              key={drumpad.src}
              onClick={() => playSound(drumpad.text)}
              className={`drum-pad ${activeKey === drumpad.text ? activeKeyColor : ''}`}
              id={drumpad.src}
            >
              {drumpad.text}
              <audio className="clip" id={drumpad.text} src={drumpad.src}></audio>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
