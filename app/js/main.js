/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/* ColorObj */
var colorObj = {black: '#000', white: '#fff',yellow: '#ff0',skin: '#fa5',blue: '#00b', grey: '#555'};

// light: '#aaa' cyan: '#0aa' marroon: '#a00'
var buildingColors = ["#aaa", "#0aa", "#a00"];
var pickAColor = function () {
	return buildingColors[Math.floor(Math.random() * 3)];
};

var playerPosition = [];

AFRAME.registerComponent('arena', {
	init: function () {
		var targetEl = this.el; 
		 
		var arenaDepth = 10;
		var arenaWidth = 10;

		targetEl.setAttribute('position', `-${(arenaDepth/2)*10	} 0 -${(arenaWidth/2)*10}`);

		for(i = 0; i < arenaDepth; i++)
		{    
			for(j = 0; j < arenaWidth; j++)
		     {
				var buildingWidth = Math.floor(Math.random() * 5) + 5;
				var buildingDepth = Math.floor(Math.random() * 5) + 5;
				var buildingHeight = Math.floor(Math.random() * 10) + 15;
				var buildingColor = pickAColor();

                if(i < 4){
                    console.log(i + "-row " + j + "-id " + buildingHeight + " height " + buildingColor + " color ");
                    playerPosition.push({ xPos: i, zPos: j, yPos: buildingHeight});
                }

		        var building = document.createElement("a-entity");
		        building.setAttribute('geometry', `primitive: box; width: ${buildingWidth}; height: ${buildingHeight}; depth: ${buildingDepth};`);
		        building.setAttribute('material', `color: ${buildingColor}`);
		        building.setAttribute('position', `${j*10} ${buildingHeight/2} ${i*10}`);
		        targetEl.appendChild(building);
		     }
		}
        setStartPosition();
	}
});

AFRAME.registerComponent('banana', {
    init: function () {
        var targetEl = this.el;  
        var thebanana = document.createElement("a-entity");
        thebanana.setAttribute('scale', `0.8 1 1`);
        targetEl.appendChild(thebanana);

        var tori = [
          {arc: 15, radTub: 0.03, segTub: 3, rotZ: 0}, 
          {arc: 15, radTub: 0.045, segTub: 3, rotZ: 15}, 
          {arc: 120, radTub: 0.06, segTub: 5, rotZ: 30}, 
          {arc: 15, radTub: 0.045, segTub: 3, rotZ: 150}, 
          {arc: 15, radTub: 0.03, segTub: 3, rotZ: 165}, 
        ];

        for(var torus of tori){
            var b = document.createElement("a-entity");
            b.setAttribute('geometry', `primitive:torus;arc:${torus.arc};radius:0.5;radiusTubular:${torus.radTub};segmentsTubular:${torus.segTub};segmentsRadial:3`);
            b.setAttribute('material', `color: ${colorObj.yellow}`);
            b.setAttribute('rotation', `0 0 ${torus.rotZ}`);
            thebanana.appendChild(b);
        }
    },
    update: function () {
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
});


AFRAME.registerComponent('gorilla', {
    schema: {type: 'string', default: 'computer'},
    init: function () {
        var data = this.data;
        var targetEl = this.el;  
        var thegorilla = document.createElement("a-entity");
        thegorilla.setAttribute('position', `0 1.25 0`);
        targetEl.appendChild(thegorilla);
        this.thegorilla = thegorilla;

        var bodyparts = [
          {geo: 'primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;', rot: '0 0 0', pos: '0.25 0.5 0.2', scale: '0.51 0.5 0.35'}, 
          {geo: 'primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;', rot: '0 0 0', pos: '-0.25 0.5 0.2', scale: '0.51 0.5 0.35'}, 
          {geo: 'primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;', rot: '10 0 0', pos: '0 0 0', scale: '0.51 0.87 0.35'}, 
          {geo: 'primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;', rot: '10 0 0', pos: '0 0 0', scale: '0.51 0.61 0.35'}, 
          {geo: 'primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;', rot: '0 0 0', pos: '0 1.1 0.38', scale: '0.37 0.35 0.29'}, 
          {geo: 'primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;', rot: '-20 0 0', pos: '0 1.25 0.3', scale: '0.29 0.35 0.29'}, 
          {geo: 'primitive: sphere; radius:0.05; segmentsWidth: 10; segmentsHeight: 10;', rot: '0 0 0', pos: '0.103 1.215 0.6', scale: '1 1 1'}, 
          {geo: 'primitive: sphere; radius:0.05; segmentsWidth: 10; segmentsHeight: 10;', rot: '0 0 0', pos: '-0.103 1.215 0.6', scale: '1 1 1'}, 
          {geo: 'primitive: torus; arc:180;radiusTubular:0.08;segmentsRadial:10;segmentsTubular:10;radius:0.15', rot: '-90 -180 0', pos: '0 1.288 0.45', scale: '0.9 0.85 0.4'}, 
          {geo: 'primitive: torus; radiusTubular:0.09;segmentsRadial:20;segmentsTubular:20;radius:0.19', rot: '-25 -180 0', pos: '0 1.025 0.65', scale: '0.6 0.49 0.71'}, 
          {geo: 'primitive: torus; radiusTubular:0.07;segmentsRadial:10;segmentsTubular:10;radius:0.22', rot: '-100 -180 0', pos: '0 0.95 0.5', scale: '0.77 0.8 1.21'}, 
          {geo: 'primitive: torus; arc:180;radius:0.5;radiusTubular:0.1;segmentsRadial:10;segmentsTubular:10', rot: '0 0 0', pos: '0 -1.25 -0.1', scale: '1 1.28 1'}, 
          {geo: 'primitive: sphere; phiLength:180;segmentsWidth:10;segmentsHeight:10', rot: '-90 0 0', pos: '0.5 -1.25 0.08', scale: '0.25 0.35 0.29'}, 
          {geo: 'primitive: sphere; phiLength:180;segmentsWidth:10;segmentsHeight:10', rot: '-90 0 0', pos: '-0.5 -1.25 0.08', scale: '0.25 0.35 0.29'}, 
        ];

        for(var part of bodyparts){
            var g = document.createElement("a-entity");
            g.setAttribute('geometry', `${part.geo}`);
            g.setAttribute('material', `color: ${colorObj.skin}`);
            g.setAttribute('rotation', `${part.rot}`);
            g.setAttribute('position', `${part.pos}`);
            g.setAttribute('scale', `${part.scale}`);
            thegorilla.appendChild(g);
        }

        var leftarm = document.createElement("a-entity");
        leftarm.setAttribute('position', `0 2 0.175`);
        targetEl.appendChild(leftarm);
        this.leftarm = leftarm;
        var left = document.createElement("a-entity");
        left.setAttribute('geometry', `primitive: torus; arc:90;radiusTubular:0.1;segmentsRadial:10;segmentsTubular:10`);
        left.setAttribute('material', `color: ${colorObj.skin}`);
        left.setAttribute('position', `0 -0.87 0`);
        leftarm.appendChild(left);
        var lefthand = document.createElement("a-entity");
        lefthand.setAttribute('geometry', `primitive: sphere; radius:0.25;segmentsWidth:10;segmentsHeight:10`);
        lefthand.setAttribute('material', `color: ${colorObj.skin}`);
        lefthand.setAttribute('position', `1 -0.133 0`);
        left.appendChild(lefthand);

        var rightarm = document.createElement("a-entity");
        rightarm.setAttribute('position', `0 2 0.175`);
        targetEl.appendChild(rightarm);
        this.rightarm = rightarm;
        var right = document.createElement("a-entity");
        right.setAttribute('geometry', `primitive: torus; arc:90;radiusTubular:0.1;segmentsRadial:10;segmentsTubular:10`);
        right.setAttribute('material', `color: ${colorObj.skin}`);
        right.setAttribute('position', `0 -0.87 0`);
        right.setAttribute('rotation', `0 180 0`);
        rightarm.appendChild(right);
        var righthand = document.createElement("a-entity");
        righthand.setAttribute('geometry', `primitive: sphere; radius:0.25;segmentsWidth:10;segmentsHeight:10`);
        righthand.setAttribute('material', `color: ${colorObj.skin}`);
        righthand.setAttribute('position', `1 -0.133 0`);
        right.appendChild(righthand);

        var playerName = document.createElement("a-entity");
        playerName.setAttribute('geometry', `primitive: plane; width: 10; height: 3`);
        playerName.setAttribute('material', `color: ${colorObj.white}`);
        playerName.setAttribute('text', `value: ${data}; color: ${colorObj.black}; align:center;wrapCount:10`);
        playerName.setAttribute('position', `0 15 0`);
        targetEl.appendChild(playerName);

        
    },
    update: function () {
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
});

function setStartPosition() {
    var startPosition = playerPosition[Math.floor(Math.random()*playerPosition.length)];
    console.log("startPosition is " + startPosition.xPos + startPosition.zPos + startPosition.yPos);
}


