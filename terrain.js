import * as R from 'rodin/core';

export const resort = new R.Sculpt();

// resort.scale.set(0.03,0.03,0.03);
resort.rotation.y = -1.8;
//resort.position.x = -0.5;
resort.position.y = -20;//0.8;
// resort.position.x = 15;//-0.5;
resort.position.z = -35;//-0.5;
const pivot = new R.Sculpt();
R.Scene.add(pivot);
pivot.position.copy(resort.position);
const plane = new R.Plane(150,150, new THREE.MeshBasicMaterial({transparent:true, opacity:0, depthWrite:false}));
R.Scene.add(plane);
plane.position.copy(resort.position);
plane.rotation.x = -Math.PI/2;


const terrain = new R.Sculpt('./models/terrain.obj');
terrain.on(R.CONST.READY, (evt) => {
    resort.add(evt.target);
    //evt.target.position.set(8, -12, -18);
    //evt.target.rotation.y = -Math.PI / 2;
});

plane.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
    if(terrain.doRotate){
        evt.stopPropagation();
        navigator.mouseGamePad.stopPropagationOnMouseMove = true;
        //console.log("evt.point", evt.point.valueOf());
        plane.initialPos = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);
        plane._threeObject.worldToLocal(plane.initialPos);
        resort.initialRot = resort.rotation.clone();
        //console.log("plane.initialPos", plane.initialPos);
    }
});


terrain.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
    //evt.stopPropagation();
    //navigator.mouseGamePad.stopPropagationOnMouseMove = true;
    terrain.doRotate = true;
});

R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_UP, (evt) => {
    evt.stopPropagation();
    navigator.mouseGamePad.stopPropagationOnMouseMove = false;
    terrain.doRotate = false;
});

terrain.on(R.CONST.GAMEPAD_HOVER, (evt) => {
    evt.stopPropagation();
});
plane.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
    terrain.doRotate = false;
});
plane.on(R.CONST.GAMEPAD_MOVE, (evt) => {
    if(terrain.doRotate){
        const initialAngle = getAngle(plane.initialPos);
        const currPoint = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);
        plane._threeObject.worldToLocal(currPoint);
        const currAngle = getAngle(currPoint);
        resort.rotation.y = resort.initialRot.y - (currAngle - initialAngle);
        //console.log(evt.point.valueOf(),resort.initialRot.y, currAngle - initialAngle)
    }
});

function getAngle(dir) {
    let angle = Math.atan(dir.y / dir.x);
    if (dir.x > 0) {
        if (dir.y > 0) {
            angle = -Math.PI + angle
        } else {
            angle = Math.PI + angle
        }
    }
    return angle;
}


const forest = new R.Sculpt('./models/tree.obj');
forest.on(R.CONST.READY, (evt) => {
    //console.log(evt.target)
    const geo = new THREE.Geometry().fromBufferGeometry(evt.target._threeObject.children["0"].geometry);
    const finalGeo = new THREE.Geometry();
    const positions = new R.Sculpt('./models/trees_pos.obj');
    positions.on(R.CONST.READY, (e) => {
        const pos = e.target._threeObject.children["0"].geometry.attributes.position.array;
        for(let i = 0; i < pos.length; i+=12){
            const treeGeo = geo.clone();
            treeGeo.translate ( pos[i],pos[i+1],pos[i+2]);
            finalGeo.merge(treeGeo);
        }
        const tree = new R.Sculpt(new THREE.Mesh(finalGeo, new THREE.MeshPhongMaterial({color: 0x1c551c})));
        resort.add(tree);

    });
});

const tracks = new R.Sculpt();
resort.add(tracks);

const black_tracks = new R.Sculpt('./models/black.obj');
black_tracks.on(R.CONST.READY, (evt) => {
    tracks.add(evt.target);
});
const black_double_tracks = new R.Sculpt('./models/black_double.obj');
black_double_tracks.on(R.CONST.READY, (evt) => {
    tracks.add(evt.target);
});
const blue_tracks = new R.Sculpt('./models/blue.obj');
blue_tracks.on(R.CONST.READY, (evt) => {
    tracks.add(evt.target);
});
const green_tracks = new R.Sculpt('./models/green.obj');
green_tracks.on(R.CONST.READY, (evt) => {
    tracks.add(evt.target);
});

const lifts = new R.Sculpt('./models/lift.obj');
lifts.on(R.CONST.READY, (evt) => {
    resort.add(evt.target);
});

const lakes = new R.Sculpt('./models/lakes.obj');
lakes.on(R.CONST.READY, (evt) => {
    resort.add(evt.target);
});

