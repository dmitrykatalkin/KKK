import './app.css';

import React from 'react';
import { saveSvgAsPng } from 'save-svg-as-png';
import { FifthsCircle } from '../fifths-circle/fifths-circle';

export class App extends React.Component {
  
  saveImage = () => {
    saveSvgAsPng(this.svgEl, "fifths.png");
  }

  render() {
    return (
      <main className="App">

        <section className="App__circle-section"> 

          <h1>Нескучный кварто-квинтовый круг</h1>
          <FifthsCircle svgRef={svg => this.svgEl = svg} />
          <button className="Button--primary" onClick={this.saveImage}>
            Скачать изображение
          </button>

        </section>
        
        <section className="App__controls-section">

          <ul className="App__hotkeys">
            <li>Основная тональность: <kbd>Mouse Left</kbd></li>
            <li>Дополнительная тональность: <kbd>Ctrl + Mouse Left</kbd></li>  
            <li>Выделить аккорд: <kbd>Mouse Right</kbd></li>    
          </ul>

          
       
        </section>

      </main>
    );
  }
}
