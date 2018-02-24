function setPalya(palya) {
      switch(palya) {
            case 1:  return setElsoPalya(); 
            case 2:  return setMasoidkPalya(); 
            default: return [];
      }
}

function setElsoPalya() {       
    return [new Man(600,320), 
            
            new Wall2(40,200),  new Wall2(40,240), new Wall2(40,280), 
            new Wall2(40,320),  new Wall2(40,360),  

            new Wall2(80,200),  new Wall2(80,360), 
            new Wall2(120,200), new Wall2(120,360),
            new Wall2(160,200), new Wall2(160,360), 
            new Wall2(200,200), new Wall2(200,360),
            new Wall2(240,200), new Wall2(240,360), 
            new Wall2(280,200), new Wall2(280,360),

            new Wall2(320,200), new Wall2(320,240), 
            new Wall2(320,320), new Wall2(320,360),

            new Wall2(360,40),  new Wall2(360,80), 
            new Wall2(360,120), new Wall2(360,160),
            new Wall2(360,200), new Wall2(360,240), 
            new Wall2(360,320), new Wall2(360,360),
            new Wall2(360,400), new Wall2(360,440), 

            new Wall2(400,40),  new Wall2(400,440), 
            new Wall2(440,40),  new Wall2(440,120),
            new Wall2(440,200), new Wall2(440,440), 
            new Wall2(440,480), new Wall2(440,520),
            new Wall2(480,40),  new Wall2(480,200),
            new Wall2(480,520), 

            new Wall2(520,40),  new Wall2(520,80),
            new Wall2(520,120), new Wall2(520,200), 
            new Wall2(520,440), new Wall2(520,520),

            new Wall2(560,80),  new Wall2(560,120), 
            new Wall2(560,440), new Wall2(560,520),

            new Wall2(600,80),  new Wall2(600,240),
            new Wall2(600,280), new Wall2(600,360), 
            new Wall2(600,520),

            new Wall2(640,80),  new Wall2(640,240),
            new Wall2(640,280), new Wall2(640,320),
            new Wall2(640,360), new Wall2(640,400), 
            new Wall2(640,440), new Wall2(640,480), 
            new Wall2(640,520),

            new Wall2(680,80),  new Wall2(680,120), 
            new Wall2(680,160), new Wall2(680,200), 
            new Wall2(680,240),

            new Box(480,120),   new Box(600,160),
            new Box(400,280),   new Box(400,320),

            new Box(440,240),   new Box(440,400),
            new Box(480,280),   new Box(480,360),

            new Box(520,280),   new Box(520,320),
            new Box(520,400),   new Box(560,240),

            new Checkpoint(80,240),  new Checkpoint(80,280),
            new Checkpoint(80,320),  new Checkpoint(120,240),
            new Checkpoint(120,280), new Checkpoint(120,320),
            new Checkpoint(160,240), new Checkpoint(160,280),
            new Checkpoint(160,320), new Checkpoint(200,240),
            new Checkpoint(200,280), new Checkpoint(200,320)

            ];

}

function setMasodikPalya() {       
    return [new Man(600,320), 
            
            new Wall2(40,200),  new Wall2(40,240), new Wall2(40,280), 
            new Wall2(40,320),  new Wall2(40,360),  

            new Wall2(80,200),  new Wall2(80,360), 
            new Wall2(120,200), new Wall2(120,360),
            new Wall2(160,200), new Wall2(160,360), 
            new Wall2(200,200), new Wall2(200,360),
            new Wall2(240,200), new Wall2(240,360), 
            new Wall2(280,200), new Wall2(280,360),

            new Wall2(320,200), new Wall2(320,240), 
            new Wall2(320,320), new Wall2(320,360),

            new Wall2(360,40),  new Wall2(360,80), 
            new Wall2(360,120), new Wall2(360,160),
            new Wall2(360,200), new Wall2(360,240), 
            new Wall2(360,320), new Wall2(360,360),
            new Wall2(360,400), new Wall2(360,440), 

            new Wall2(400,40),  new Wall2(400,440), 
            new Wall2(440,40),  new Wall2(440,120),
            new Wall2(440,200), new Wall2(440,440), 
            new Wall2(440,480), new Wall2(440,520),
            new Wall2(480,40),  new Wall2(480,200),
            new Wall2(480,520), 

            new Wall2(520,40),  new Wall2(520,80),
            new Wall2(520,120), new Wall2(520,200), 
            new Wall2(520,440), new Wall2(520,520),

            new Wall2(560,80),  new Wall2(560,120), 
            new Wall2(560,440), new Wall2(560,520),

            new Wall2(600,80),  new Wall2(600,240),
            new Wall2(600,280), new Wall2(600,360), 
            new Wall2(600,520),

            new Wall2(640,80),  new Wall2(640,240),
            new Wall2(640,280), new Wall2(640,320),
            new Wall2(640,360), new Wall2(640,400), 
            new Wall2(640,440), new Wall2(640,480), 
            new Wall2(640,520),

            new Wall2(680,80),  new Wall2(680,120), 
            new Wall2(680,160), new Wall2(680,200), 
            new Wall2(680,240),

            new Box(480,120),   new Box(600,160),
            new Box(400,280),   new Box(400,320),

            new Box(440,240),   new Box(440,400),
            new Box(480,280),   new Box(480,360),

            new Box(520,280),   new Box(520,320),
            new Box(520,400),   new Box(560,240),

            new Checkpoint(80,240),  new Checkpoint(80,280),
            new Checkpoint(80,320),  new Checkpoint(120,240),
            new Checkpoint(120,280), new Checkpoint(120,320),
            new Checkpoint(160,240), new Checkpoint(160,280),
            new Checkpoint(160,320), new Checkpoint(200,240),
            new Checkpoint(200,280), new Checkpoint(200,320)

            ];

}

