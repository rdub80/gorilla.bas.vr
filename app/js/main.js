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

		        var building = document.createElement("a-entity");
		        building.setAttribute('geometry', `primitive: box; width: ${buildingWidth}; height: ${buildingHeight}; depth: ${buildingDepth};`);
		        building.setAttribute('material', `color: ${buildingColor}`);
		        building.setAttribute('position', `${j*10} ${buildingHeight/2} ${i*10}`);
		        targetEl.appendChild(building);
		     }
		}
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

    
  }
});


AFRAME.registerComponent('gorilla', {
  init: function () {
    var targetEl = this.el;  

/*
    var s_1 = document.createElement("a-entity");
    s_1.setAttribute('geometry', `primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;`);
    s_1.setAttribute('material', `color: ${colorObj.skin}`);
    s_1.setAttribute('position', `0.25 0.5 0.2`);
    s_1.setAttribute('scale', `0.51 0.5 0.35`);
    targetEl.appendChild(s_1);
    var s_2 = document.createElement("a-entity");
    s_2.setAttribute('geometry', `primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;`);
    s_2.setAttribute('material', `color: ${colorObj.skin}`);
    s_2.setAttribute('position', `-0.25 0.5 0.2`);
    s_2.setAttribute('scale', `0.51 0.5 0.35`);
    targetEl.appendChild(s_2);
    var s_3 = document.createElement("a-entity");
    s_3.setAttribute('geometry', `primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;`);
    s_3.setAttribute('material', `color: ${colorObj.skin}`);
    s_3.setAttribute('rotation', `10 0 0`);
    s_3.setAttribute('scale', `0.51 0.87 0.35`);
    targetEl.appendChild(s_3);
    var s_4 = document.createElement("a-entity");
    s_4.setAttribute('geometry', `primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;`);
    s_4.setAttribute('material', `color: ${colorObj.skin}`);
    s_4.setAttribute('rotation', `10 0 0`);
    s_4.setAttribute('scale', `0.51 0.61 0.35`);
    targetEl.appendChild(s_4);
    var s_5 = document.createElement("a-entity");
    s_5.setAttribute('geometry', `primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;`);
    s_5.setAttribute('material', `color: ${colorObj.skin}`);
    s_5.setAttribute('position', `0 1.1 0.38`);
    s_5.setAttribute('scale', `0.37 0.35 0.29`);
    targetEl.appendChild(s_5);
    var s_6 = document.createElement("a-entity");
    s_6.setAttribute('geometry', `primitive: sphere; segmentsWidth: 10; segmentsHeight: 10;`);
    s_6.setAttribute('material', `color: ${colorObj.skin}`);
    s_6.setAttribute('position', `0 1.25 0.3`);
    s_6.setAttribute('rotation', `-20 0 0`);
    s_6.setAttribute('scale', `0.29 0.35 0.29`);
    targetEl.appendChild(s_6);


    var s_7 = document.createElement("a-entity");
    s_7.setAttribute('geometry', `primitive: sphere; radius:0.05;segmentsWidth:10;segmentsHeight:10`);
    s_7.setAttribute('material', `color: ${colorObj.black}`);
    s_7.setAttribute('position', `0.103 1.215 0.6`);
    targetEl.appendChild(s_7);
    var s_8 = document.createElement("a-entity");
    s_8.setAttribute('geometry', `primitive: sphere; radius:0.05;segmentsWidth:10;segmentsHeight:10`);
    s_8.setAttribute('material', `color: ${colorObj.black}`);
    s_8.setAttribute('position', `-0.103 1.215 0.6`);
    targetEl.appendChild(s_8);


    var t_1 = document.createElement("a-entity");
    t_1.setAttribute('geometry', `primitive: torus; arc:180;radiusTubular:0.08;segmentsRadial:10;segmentsTubular:10;radius:0.15`);
    t_1.setAttribute('material', `color: ${colorObj.skin}`);
    t_1.setAttribute('position', `0 1.288 0.45`);
    t_1.setAttribute('rotation', `-90 -180 0`);
    t_1.setAttribute('scale', `0.9 0.85 0.4`);
    targetEl.appendChild(t_1);
    var t_2 = document.createElement("a-entity");
    t_2.setAttribute('geometry', `primitive: torus; radiusTubular:0.09;segmentsRadial:20;segmentsTubular:20;radius:0.19`);
    t_2.setAttribute('material', `color: ${colorObj.skin}`);
    t_2.setAttribute('position', `0 1.025 0.65`);
    t_2.setAttribute('rotation', `-25 -180 0`);
    t_2.setAttribute('scale', `0.6 0.49 0.71`);
    targetEl.appendChild(t_2);
    var t_3 = document.createElement("a-entity");
    t_3.setAttribute('geometry', `primitive: torus; radiusTubular:0.07;segmentsRadial:10;segmentsTubular:10;radius:0.22`);
    t_3.setAttribute('material', `color: ${colorObj.skin}`);
    t_3.setAttribute('position', `0 0.95 0.5`);
    t_3.setAttribute('rotation', `-100 -180 0`);
    t_3.setAttribute('scale', `0.77 0.8 1.21`);
    targetEl.appendChild(t_3);   
    var t_4 = document.createElement("a-entity");
    t_4.setAttribute('geometry', `primitive: torus; arc:180;radius:0.5;radiusTubular:0.1;segmentsRadial:10;segmentsTubular:10`);
    t_4.setAttribute('material', `color: ${colorObj.skin}`);
    t_4.setAttribute('position', `0 -1.25 -0.1`);
    t_4.setAttribute('rotation', `0 0 0`);
    t_4.setAttribute('scale', `1 1.28 1`);
    targetEl.appendChild(t_4);

    var s_9 = document.createElement("a-entity");
    s_9.setAttribute('geometry', `primitive: sphere; phiLength:180;segmentsWidth:10;segmentsHeight:10`);
    s_9.setAttribute('material', `color: ${colorObj.skin}`);
    s_9.setAttribute('position', `0.5 -1.25 0.08`);
    s_9.setAttribute('rotation', `-90 0 0`);
    s_9.setAttribute('scale', `0.25 0.35 0.29`);
    targetEl.appendChild(s_9);

    var s_10 = document.createElement("a-entity");
    s_10.setAttribute('geometry', `primitive: sphere; phiLength:180;segmentsWidth:10;segmentsHeight:10`);
    s_10.setAttribute('material', `color: ${colorObj.skin}`);
    s_10.setAttribute('position', `-0.5 -1.25 0.08`);
    s_10.setAttribute('rotation', `-90 0 0`);
    s_10.setAttribute('scale', `0.25 0.35 0.29`);
    targetEl.appendChild(s_10);
*/
    var thegorilla = document.createElement("a-entity");
    thegorilla.setAttribute('position', `0 1.25 0`);
    targetEl.appendChild(thegorilla);

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

    var left = document.createElement("a-entity");
    left.setAttribute('position', `0 2 0.175`);
    targetEl.appendChild(left);
    var leftarm = document.createElement("a-entity");
    leftarm.setAttribute('geometry', `primitive: torus; arc:90;radiusTubular:0.1;segmentsRadial:10;segmentsTubular:10`);
    leftarm.setAttribute('material', `color: ${colorObj.skin}`);
    leftarm.setAttribute('position', `0 -0.87 0`);
    left.appendChild(leftarm);
    var lefthand = document.createElement("a-entity");
    lefthand.setAttribute('geometry', `primitive: sphere; radius:0.25;segmentsWidth:10;segmentsHeight:10`);
    lefthand.setAttribute('material', `color: ${colorObj.skin}`);
    lefthand.setAttribute('position', `1 -0.133 0`);
    leftarm.appendChild(lefthand);

    var right = document.createElement("a-entity");
    right.setAttribute('position', `0 2 0.175`);
    targetEl.appendChild(right);
    var rightarm = document.createElement("a-entity");
    rightarm.setAttribute('geometry', `primitive: torus; arc:90;radiusTubular:0.1;segmentsRadial:10;segmentsTubular:10`);
    rightarm.setAttribute('material', `color: ${colorObj.skin}`);
    rightarm.setAttribute('position', `0 -0.87 0`);
    rightarm.setAttribute('rotation', `0 180 0`);
    right.appendChild(rightarm);
    var righthand = document.createElement("a-entity");
    righthand.setAttribute('geometry', `primitive: sphere; radius:0.25;segmentsWidth:10;segmentsHeight:10`);
    righthand.setAttribute('material', `color: ${colorObj.skin}`);
    righthand.setAttribute('position', `1 -0.133 0`);
    rightarm.appendChild(righthand);

  }
});
