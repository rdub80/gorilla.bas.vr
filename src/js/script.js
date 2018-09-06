/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/* 
p0 (Initial position) is the initial position of the projectile.
v0 (Initial speed) is the speed at p0. Defined by the user, the higher the speed the further the distance.
t (time) is the time since shot.
a (acceleration) with gravity at 9.8m/s2.
*/
// Parabolic motion equation, y = p0 + v0*t + 1/2at^2
function parabolicCurveScalar(p0, v0, a, t) {
  return p0 + v0 * t + 0.5 * a * t * t;
}

//time to the ground or building in free fall
// t = Math.sqrt( (2 * h) / a )
// t = (2 * v0 * Math.sin(shotAng) ) / a

// h = p0 + v0 sin α * t - 0.5 * a * t * t; 

// h + y0 = 1/2 * a * t * t;

// h0 = (v * v * Math.sin(shotAng) * Math.sin(shotAng)) / 2 * a


function hitTimeTaken(v0, a, alpha, h0, h1) {
  t1 = (v0 * Math.sin(alpha) ) / a;
  t2 = Math.sqrt( (2 * (h0 + h1)) / a );
  return t1 + t2;
}

// Range = distance from launch point to hit point
// r = (v0 * v0 * Math.sin(2 * shotAng)) / a

// Parabolic motion equation applied to 3 dimensions
function parabolicCurve(p0, v0, a, t, out) {
  out.x = parabolicCurveScalar(p0.x, v0.x, a.x, t);
  out.y = parabolicCurveScalar(p0.y, v0.y, a.y, t);
  out.z = parabolicCurveScalar(p0.z, v0.z, a.z, t);
  return out;
}

function getDistance(mesh1, mesh2) { 
  var dx = mesh1.x - mesh2.x; 
  var dy = mesh1.y - mesh2.y; 
  var dz = mesh1.z - mesh2.z;
  return Math.sqrt(dx*dx+dy*dy+dz*dz); 
}

/* ColorObj */
var colorObj = {black: '#000', white: '#fff',yellow: '#ff0',skin: '#fa5',blue: '#00b', grey: '#555'};
// light: '#aaa' cyan: '#0aa' marroon: '#a00'
var buildingColors = ["#aaa", "#0aa", "#a00"], player2Position = [], player1Position = [];


AFRAME.registerComponent('arena', {
	init: function () {
		var targetEl = this.el; 
        var arenaDepth = 10;
        var arenaWidth = 10;
        targetEl.setAttribute('position', `-${(arenaWidth/2)*10-5 } 0 -${(arenaDepth/2)*10-5}`);

        var sky = document.createElement("a-sky");
        sky.setAttribute('color', `${colorObj.blue}`);
        targetEl.appendChild(sky);
        var plane = document.createElement("a-plane");
        plane.setAttribute('position', `${(arenaWidth/2)*10-5} 0 ${(arenaDepth/2)*10-5}`);
        plane.setAttribute('rotation', `-90 0 0`);
        plane.setAttribute('width', `100`);
        plane.setAttribute('height', `100`);
        plane.setAttribute('color', `${colorObj.grey}`);
        targetEl.appendChild(plane);


		for(i = 0; i < arenaDepth; i++)
		{    
			for(j = 0; j < arenaWidth; j++)
		     {
				var buildingWidth = Math.floor(Math.random() * 5) + 5;
				var buildingDepth = Math.floor(Math.random() * 5) + 5;
				var buildingHeight = Math.floor(Math.random() * 10) + 15;
				var buildingColor = buildingColors[Math.floor(Math.random() * 3)];

                var _x = (j*10) - (arenaWidth/2)*10+5;
                var _z = (i*10) - (arenaDepth/2)*10+5;
                if(i < 4){ player2Position.push({ xPos: _x, zPos: _z, yPos: buildingHeight}) }
                if(i > 6){ player1Position.push({ xPos: _x, zPos: _z, yPos: buildingHeight}) }

		        var building = document.createElement("a-entity");
		        building.setAttribute('geometry', `primitive: box; width: ${buildingWidth}; height: ${buildingHeight}; depth: ${buildingDepth};`);
		        building.setAttribute('material', `color: ${buildingColor}`);
		        building.setAttribute('position', `${j*10} ${buildingHeight/2} ${i*10}`);
		        targetEl.appendChild(building);
		     }
		}
	}
});

AFRAME.registerComponent('sun', {
    init: function () {
        this.target3D = null;
        this.vector = new THREE.Vector3();        
        var targetEl = this.el;  
        var sun = document.createElement("a-entity");
        sun.setAttribute('geometry', `primitive:sphere;radius:3`);
        sun.setAttribute('material', `color: ${colorObj.yellow};emissive:#333`);
        targetEl.appendChild(sun);
        var eye1 = document.createElement("a-entity");
        eye1.setAttribute('geometry', `primitive:sphere;radius:0.5`);
        eye1.setAttribute('material', `color: ${colorObj.black}`);
        eye1.setAttribute('position', `-1 0.5 2.65`);
        sun.appendChild(eye1);
        var eye2 = document.createElement("a-entity");
        eye2.setAttribute('geometry', `primitive:sphere;radius:0.5`);
        eye2.setAttribute('material', `color: ${colorObj.black}`);
        eye2.setAttribute('position', `1 0.5 2.65`);
        sun.appendChild(eye2);
        var mouth = document.createElement("a-entity");
        mouth.setAttribute('geometry', `primitive:sphere;radius:1.2`);
        mouth.setAttribute('material', `color: ${colorObj.black}`);
        mouth.setAttribute('position', `0 -1 2.45`);
        mouth.setAttribute('rotation', `10 0 0`);
        mouth.setAttribute('scale', `1 1 0.15`);
        sun.appendChild(mouth);
        this.mouth = mouth;
    },
    tick: (function () {
        var vec3 = new THREE.Vector3();

        return function (t) {
          var target3D = null;
          for (var i = 0; i < document.querySelectorAll('a-camera').length; i++) {
            if(document.querySelectorAll('a-camera')[i].components.camera.data.active){
                target3D = document.querySelectorAll('a-camera')[i].object3D;
            }
          }
          var object3D = this.el.object3D;
          var vector = this.vector;

          if (target3D) {
            object3D.parent.worldToLocal(target3D.getWorldPosition(vec3));
            if (this.el.getObject3D('camera')) {
              vector.subVectors(object3D.position, vec3).add(object3D.position);
            } else {
              vector = vec3;
            }
            object3D.lookAt(vector);
          }
        };
    })(),    
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
    schema: {type: 'string', default: ''},
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

        if(data != ''){
            var playerName = document.createElement("a-entity");
            playerName.setAttribute('geometry', `primitive: plane; width: 10; height: 3`);
            playerName.setAttribute('material', `color: ${colorObj.white}`);
            playerName.setAttribute('text', `value: ${data}; color: ${colorObj.black}; align:center;wrapCount:10`);
            playerName.setAttribute('position', `0 15 0`);
            targetEl.appendChild(playerName);
        }

    }
});


AFRAME.registerComponent('init', {
  init: function () {
    var sceneEl = this.el;

    var player1 = document.querySelector('#p1');
    var player2 = document.querySelector('#p2');
    var shotRotP1 = document.getElementById("rot1");
    var shotAngP1 = document.getElementById("ang1");
    var shotVelP1 = document.getElementById("vel1");
    var shotRotP2 = document.getElementById("rot2");
    var shotAngP2 = document.getElementById("ang2");
    var shotVelP2 = document.getElementById("vel2");

    var force = shotVelP1.value;
    var G = -9.8;

    var p1Pos = new THREE.Vector3();
    var p2Pos = new THREE.Vector3();

    var shooter = document.createElement('a-entity');
    shooter.setAttribute('position', '0 0 0');
    sceneEl.appendChild(shooter);
    this.shooter = shooter;
    var shooterArrow = document.createElement('a-entity');
    shooterArrow.setAttribute('geometry', 'primitive:box;width:0.075;height:0.075;depth:1');
    shooterArrow.setAttribute('material', 'color:white;shader:flat;opacity:0.45');
    shooterArrow.setAttribute('position', '0 0 -2');
    shooter.appendChild(shooterArrow);
    var shooterArrowHead = document.createElement('a-entity');
    shooterArrowHead.setAttribute('geometry', 'primitive:cone;radiusTop:0.001;radiusBottom:0.175;height:0.5;');
    shooterArrowHead.setAttribute('material', 'color:white;shader:flat;opacity:0.45');
    shooterArrowHead.setAttribute('position', '0 0 -2.75');
    shooterArrowHead.setAttribute('rotation', '-90 0 0');
    shooter.appendChild(shooterArrowHead);

    var banana = document.createElement('a-entity');
    banana.setAttribute('banana','');
    sceneEl.appendChild(banana); 


//interaction
    var turnP1 = true;
    var keyCount = 0;
    document.addEventListener("keydown", function(event) {
        if(event.keyCode == 32){
            keyCount++;
            if(turnP1){
                document.querySelector('#p1Cam').setAttribute('camera', 'active', keyCount % 2 === 0 ? false : true);
            }else{
                document.querySelector('#p2Cam').setAttribute('camera', 'active', keyCount % 2 === 0 ? false : true);
            }
        }
        if(event.keyCode == 37){ //left arrow
            if(turnP1){
                shotRotP1.value++;
            }else{
                shotRotP2.value++;
            }
        }
        if(event.keyCode == 39){ //right arrow
            if(turnP1){
                shotRotP1.value--;
            }else{
                shotRotP2.value--;
            }
        }
        if(event.keyCode == 38){ //up arrow
            if(turnP1){
                shotAngP1.value++;
            }else{
                shotAngP2.value++;
            }
        }
        if(event.keyCode == 40){ //down arrow
            if(turnP1){
                shotAngP1.value--;
            }else{
                shotAngP2.value--;
            }
        }
        if(event.keyCode == 187){ //plus
            if(turnP1){
                shotVelP1.value++;
            }else{
                shotVelP2.value++;
            }
        }
        if(event.keyCode == 189){ //minus
            if(turnP1){
                shotVelP1.value--;
            }else{
                shotVelP2.value--;
            }
        }
        if(event.keyCode == 13){ //enter
            setThrow(shooter);
        }
        updatePlayer();
    });

    document.getElementById("playP1").addEventListener("click", function(event) {
        setThrow(shooter);
    });
    document.getElementById("playP2").addEventListener("click", function(event) {
        //setThrow(shooter);
    });

    shotRotP1.addEventListener("change", function(event) {
      updatePlayer();
    });
    shotAngP1.addEventListener("change", function(event) {
      updatePlayer();
    });
    shotVelP1.addEventListener("change", function(event) {
      updatePlayer();
    });
    shotRotP2.addEventListener("change", function(event) {
      updatePlayer();
    });
    shotAngP2.addEventListener("change", function(event) {
      updatePlayer();
    });
    shotVelP2.addEventListener("change", function(event) {
      updatePlayer();
    });

    function updatePlayer(){
        if(turnP1){
            force = shotVelP1.value;
            shooter.setAttribute('rotation', shotAngP1.value + ' ' + shotRotP1.value + ' 0');
            p1.setAttribute('rotation', '0 ' + shotRotP1.value + ' 0');
        }else{
            force = shotVelP2.value;
            //shooter.setAttribute('rotation', shotAngP2.value + ' ' + shotRotP2.value + ' 0');
            p2.setAttribute('rotation', '0 ' + shotRotP2.value + ' 0');
        }      
    }

//game setup
    function setStartPositions() {
        var startPosP1 = player1Position[Math.floor(Math.random()*player1Position.length)];
        var startPosP2 = player2Position[Math.floor(Math.random()*player2Position.length)];
        
        var transP1 = new THREE.Vector3(startPosP1.xPos,startPosP1.yPos,startPosP1.zPos);
        var transP2 = new THREE.Vector3(startPosP2.xPos,startPosP2.yPos,startPosP2.zPos);
        p1Pos.add(transP1);
        p2Pos.add(transP2);

        p1.setAttribute('position', p1Pos);
        p2.setAttribute('position', p2Pos);

        shooter.setAttribute('position', startPosP1.xPos + " " + (startPosP1.yPos+1.5) + " " + startPosP1.zPos);

        console.log("startPos- enemy:" + startPosP2.xPos + " " + startPosP2.yPos + " " + startPosP2.zPos + " | my_gorilla:" + startPosP1.xPos + " " + startPosP1.yPos + " " + startPosP1.zPos + " | shooter:" + startPosP1.xPos + " " + (startPosP1.yPos+1.5) + " " + startPosP1.zPos);
    }
    setStartPositions();

//throw action

    function setThrow(shooterobj){
    
        var initTime = Date.now(); // milliseconds
        var shotDirection = new THREE.Vector3();
        shotDirection.set(0, 0, -1)
          .applyQuaternion(shooterobj.object3D.quaternion)
          .normalize();
        var out = new THREE.Vector3(); // working scratch vector
        var v0 = new THREE.Vector3(); // start velocity
        v0.copy(shotDirection).multiplyScalar(force);

        var p0 = shooterobj.object3D.getWorldPosition(); // start position
        var pF = p2.object3D.getWorldPosition(); // enemy position
        var gravityVector = new THREE.Vector3(0, G, 0);


        function setSpherePosition(t) {
            parabolicCurve(p0, v0, gravityVector, t, out);

//trace
            var b = document.createElement('a-sphere');
            b.setAttribute('radius', '0.1');
            b.setAttribute('color', '#fff');
            b.setAttribute('position', out);
            sceneEl.appendChild(b); 

            banana.setAttribute('position', out);
            banana.setAttribute('rotation', '0 90 '+ (720/t) );

            console.log("dist " + getDistance(pF, out)); 
            console.log("t " + t); 
        }

        //console.log("Time estimate: " + hitTimeTaken(shotVel.value, G, shotAng.value, 0, 0) );


        var throwAni = null;
        var ANIM_LENGTH = 4000; // ms
        function throwIt(){
          var now = Date.now();
          var sinceStart = now - initTime;
          var t = sinceStart % ANIM_LENGTH; // ms
          var seconds = t / 1000;
          
          var dist = getDistance(pF, out);
          setSpherePosition(seconds);
          
          if (sinceStart < ANIM_LENGTH && dist > 0.5){ // if ANIM_LENGTH not met yet and dist larger then 0.5 
            throwAni = requestAnimationFrame(throwIt);
          }
          if (dist < 0.5){
            cancel_animation();
            console.log("hit");
            //requestAnimationFrame(blow);
          }
        }

        function run_animation() {
            throwAni = requestAnimationFrame(throwIt);
        }
        function cancel_animation() {
            cancelAnimationFrame(throwAni);
        }
        run_animation();
    }


    // var start = null;
    // var DUR = 300;
    // function blow(timestamp) {
    //   if (!start) start = timestamp;
    //   var progress = timestamp - start;
    //   enemy.setAttribute('scale', '0 0 0');
    //   var scalerate = (Math.round( Math.sin( (timestamp % start)/DUR * Math.PI) * 100) / 100) * 10 ;
    //   console.log("progress: " + scalerate);
    //   banana.setAttribute('color', 'red');
    //   banana.setAttribute('scale', scalerate + ' ' + scalerate + ' ' + scalerate );
      
    //   if (progress < DUR) {
    //     requestAnimationFrame(blow); 
    //   }
    // }


//winning moves

    var winAni, moveArm = 0, repeats = 5;
    function startParty(player) { 
        if (!winAni) { 
            winAni = setInterval(function(){
                animateArms(player); 
                --repeats || stopParty(player);
            }, 500);
        }
    }
    function stopParty(player) {
        clearInterval(winAni); 
        winAni = null; 
        moveArm = 0; 
        repeats = 5;
        document.querySelector(player).components.gorilla.leftarm.setAttribute('rotation','0 0 0');
        document.querySelector(player).components.gorilla.rightarm.setAttribute('rotation','0 0 0');
    }

    function animateArms(player) {
        moveArm++;
        if(moveArm % 2 === 0){
            document.querySelector(player).components.gorilla.leftarm.setAttribute('rotation','180 0 0');
            document.querySelector(player).components.gorilla.rightarm.setAttribute('rotation','0 0 0');
        } else {
            document.querySelector(player).components.gorilla.leftarm.setAttribute('rotation','0 0 0');
            document.querySelector(player).components.gorilla.rightarm.setAttribute('rotation','180 0 0');
        }
    }


 }
}); //init