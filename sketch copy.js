let textContent = [
  "In 2025, the Museum für Gestaltung Zürich is celebrating the 150th anniversary of its founding. A banner year that presents the perfect occasion not only to take a look back at the history of the museum but also to examine current developments in the field of design and venture an outlook toward the future. A variety program of exhibitions and activities will take place throughout the anniversary year. One highlight is the grand opening in mid-April of the new permanent exhibition Swiss Design Collection at the Toni-Areal, accompanied by a whole weekend of festivities. In recent years, the Museum für Gestaltung Zürich has further strengthened its position as a leading museum of design and visual communication. With innovative exhibitions and interactive formats, it attracts a wide audience, promoting an ongoing dialogue on the latest trends and social issues in design. The museum explores design in all its diversity, presenting outstanding works to the public while also addressing today's digital transformation and fostering exchange and networking within the global design community. The museum places special emphasis on inclusion and sustainability and is committed to making its exhibitions and activities as broadly accessible and resource-efficient as possible. The diverse program is geared toward people of varied age groups and cultural backgrounds. In an effort to appeal to a broad international audience, the museum offers information and guided tours in several languages as well as simple German. On our 150th anniversary, we respectfully remember our past while looking confidently to the future. We want to continue to serve as a platform for innovative exhibitions, for safeguarding and preserving outstanding works, and for creative exchange. Our program endeavors to convey the enormous importance of design in a fun and exciting way so that as many people as possible can be inspired by good design, says Christian Brändle, director of the museum. The year kicks off with a special program at the museum's Ausstellungsstrasse location. The admission-free exhibition Jakob Kudsk Steensen: Berl-Berl turns the lecture hall into an immersive installation that will continually be reconfigured in real time by dedicated game engines. The unique 1933 building will be additionally enlivened in January by a range of activities for young and old, including behind-the-scenes architecture tours, design talks, workshops, one-off sales, a bar, a screen-printing studio, game events, and musical performances. Following this multifaceted prelude to the anniversary year, the new permanent exhibition Swiss Design Collection will open at the Toni-Areal in April. The exhibition presents highlights from the fields of graphic design, posters, the decorative arts, and industrial design that shed light on the collection from diverse and unexpected perspectives while also making parts of the archives accessible to the public for the first time. Visitors will be invited to exercise their own creativity based on various themes and using a number of different techniques. The exhibition opening on April 11 will mark the start of an anniversary weekend featuring free admission to both the new Swiss Design Collection presentation and the other exhibitions on view at the Toni-Areal and Ausstellungsstrasse locations. In July, the museum will then extend its reach into the public space with an exhibition by the lake devoted to 150 years of poster culture. Historical as well as contemporary examples will illustrate the development of poster art and its significance for visual communication. Viewers can look forward to embarking on a visual journey through the decades as they learn how posters still serve today as a mirror of society and a medium for artistic expression. The exploratory exhibition Museum of the Future – 17 Digital Experiments, which opens in August on Ausstellungsstrasse, takes a fascinating peek at the world of tomorrow, showing how digitalization and artificial intelligence are radically expanding what can be presented at the museum. Guests will have a chance to interact with digital artworks that blur the boundaries between physical and virtual reality. In the fall, the exhibition Young Graphic Design Switzerland! will look at contemporary work and how the youngest generation is shaping the graphic design landscape of tomorrow. Last but not least, the museum is putting together a show of the highs and lows from 150 years of posters advertising its own exhibitions. The Museum für Gestaltung Zürich looks back on an eventful history dating back to 1875, when it was founded as the City of Zurich's museum of applied arts. From 1898, the collection was housed in the National Museum. In 1933, the museum and the School of Arts and Crafts, founded 1878 and today known as Zurich University of the Arts (ZHdK), then relocated to the striking building on Ausstellungsstrasse, an outstanding example of New Building in Switzerland. From 1968 to 2014, the museum ran the Museum Bellerive on Lake Zurich, with a focus on decorative arts. In 2014, new exhibition spaces were opened on the new ZHdK campus in the Toni-Areal in Zurich-West, bringing together all four of the museum's collections and their 580,000 objects under one roof. Following extensive renovations, the original museum location on Ausstellungsstrasse was officially reopened in March 2018. Since May 2019, the museum has also been operating the Pavillon Le Corbusier for the public on behalf of the City of Zurich. Throughout the anniversary year, admission will be free on Thursday evenings from 5:00 to 8:00pm. In addition, starting with the opening of the new permanent exhibition Swiss Design Collection, visitors will be able to visit all three museum locations – Ausstellungsstrasse, the Toni-Areal, and the Pavillon Le Corbusier – with a new combined ticket. Admission is now free for young adults under the age of 20."
];

let words = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  layoutText();
}

function layoutText() {
  words = [];
  let margin = 4 * poster.vw;
  let x = margin;
  let y = margin + 1.8 * poster.vw;
  let maxWidth = width - margin * 2;
  let fontSize = 1.8 * poster.vw;
  let lineHeight = fontSize*1.3;

  textFont('Times New Roman');
  textSize(fontSize);

  let allText = textContent.join(' ');
  let allWords = allText.split(' ');

  let currentLine = [];
  let currentLineWidth = 0;

  allWords.forEach((word, index) => {
    let w = textWidth(word + ' ');
    if (currentLineWidth + w > maxWidth && currentLine.length > 0) {
      justifyLine(currentLine, x, y, maxWidth, index === allWords.length - 1, fontSize);
      currentLine = [word];
      currentLineWidth = w;
      y += lineHeight;
    } else {
      currentLine.push(word);
      currentLineWidth += w;
    }
  });
  if (currentLine.length > 0) {
    currentLine.forEach(word => {
      let w = textWidth(word + ' ');
      words.push({
        text: word,
        x: x,
        y: y,
        w: w
      });
      x += w;
    });
  }
}

function justifyLine(lineWords, startX, yPos, maxWidth, isLastLine, fontSize) {
  if (lineWords.length === 0) return;
  textFont('Times New Roman');
  textSize(fontSize);
  let totalWordWidth = 0;
  lineWords.forEach(word => {
    totalWordWidth += textWidth(word);
  });
  let totalSpace = maxWidth - totalWordWidth;
  let spaceCount = lineWords.length - 1;
  let spaceWidth = spaceCount > 0 ? totalSpace / spaceCount : 0;
  if (isLastLine || lineWords.length === 1) {
    spaceWidth = textWidth(' ');
  }
  let x = startX;
  lineWords.forEach(word => {
    let w = textWidth(word);
    words.push({
      text: word,
      x: x,
      y: yPos,
      w: w
    });
    x += w + spaceWidth;
  });
}

function draw() {
  background(26, 26, 26);
  // Create graphics buffer for the number
  let pg = createGraphics(width, height);
  pg.textFont('Helvetica');
  pg.textSize(height * 0.9);
  pg.textAlign(CENTER, CENTER);
  pg.fill(255);
  pg.text(poster.getCounter().toString(), width / 2, height / 2);

  // Draw big number in background
  push();
  textFont('Helvetica');
  textSize(height * 0.9);
  textAlign(CENTER, CENTER);
  fill(255, 255, 255, 20);
  noStroke();
  text(poster.getCounter().toString(), width / 2, height / 2);
  pop();

  // Draw words with highlight
  textFont('Times New Roman');
  textSize(1.8 * poster.vw);
  textAlign(LEFT, BASELINE);
  noStroke();
  words.forEach(word => {
    let overlaps = checkOverlapPrecise(word, pg);
    if (overlaps) {
      fill(255, 215, 0); // Yellow
    } else {
      fill(136, 136, 136); // Gray
    }
    text(word.text, word.x, word.y);
  });
  pg.remove();
}

function checkOverlapPrecise(word, pg) {
  let wordHeight = 1.8 * poster.vw;
  let samples = 5;
  for (let i = 0; i < samples; i++) {
    let sampleX = word.x + (word.w * i / samples);
    let sampleY = word.y - wordHeight / 2;
    for (let j = 0; j < 3; j++) {
      let checkY = sampleY + (wordHeight * j / 2);
      if (sampleX >= 0 && sampleX < width && checkY >= 0 && checkY < height) {
        let px = pg.get(sampleX, checkY);
        if (px[0] > 128) {
          return true;
        }
      }
    }
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  layoutText();
}