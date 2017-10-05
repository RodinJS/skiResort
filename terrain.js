import * as R from 'rodin/core';


export const resort = new R.Sculpt();

resort.scale.set(0.3, 0.3, 0.3);
resort.rotation.y = -1.8;
resort.position.y = -5;
resort.position.z = -10;
const pivot = new R.Sculpt();
R.Scene.add(pivot);
pivot.position.copy(resort.position);
const plane = new R.Plane(120, 120, new THREE.MeshBasicMaterial({transparent: true, opacity: 0, depthWrite: false}));
R.Scene.add(plane);
plane.position.copy(resort.position);
plane.rotation.x = -Math.PI / 2;

const terrain = new R.Sculpt('./models/terrain.obj');
terrain.on(R.CONST.READY, (evt) => {
    resort.add(evt.target);
});

plane.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
    if (terrain.doRotate) {
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
    if (evt.gamepad instanceof R.MouseGamePad) {
        if (evt.keyCode === R.CONST.MOUSE_RIGHT) {
            terrain.doRotate = true;
        }
    }
    else {
        terrain.doRotate = true;
    }
});

R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_UP, (evt) => {
    evt.stopPropagation();
    navigator.mouseGamePad.stopPropagationOnMouseMove = false;
    terrain.doRotate = false;
});

terrain.on(R.CONST.GAMEPAD_HOVER, (evt) => {
    resort.hoverred = true;
});
plane.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
    terrain.doRotate = false;
    resort.hoverred = false;
});
plane.on(R.CONST.GAMEPAD_MOVE, (evt) => {
    if(terrain.doRotate && plane.initialPos){
        const initialAngle = resort.getAngle(plane.initialPos, "y", "x");
        const currPoint = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);
        plane._threeObject.worldToLocal(currPoint);
        const currAngle = resort.getAngle(currPoint, "y", "x");
        resort.rotation.y = resort.initialRot.y - (currAngle - initialAngle);
        //console.log(evt.point.valueOf(),resort.initialRot.y, currAngle - initialAngle)
    }
});
resort.getAngle = function(dir, axis1, axis2) {
    let angle = Math.atan(dir[axis1] / dir[axis2]);
    if (dir[axis2] > 0) {
        if (dir[axis1] > 0) {
            angle = -Math.PI + angle
        } else {
            angle = Math.PI + angle
        }
    }
    return angle;
};


const forest = new R.Sculpt('./models/tree.obj');
forest.on(R.CONST.READY, (evt) => {
    const geo = new THREE.Geometry().fromBufferGeometry(evt.target._threeObject.children["0"].geometry);
    const finalGeo = new THREE.Geometry();
    const positions = new R.Sculpt('./models/trees_pos.obj');
    positions.on(R.CONST.READY, (e) => {
        const pos = e.target._threeObject.children["0"].geometry.attributes.position.array;
        for (let i = 0; i < pos.length; i += 12) {
            const treeGeo = geo.clone();
            treeGeo.translate(pos[i], pos[i + 1], pos[i + 2]);
            finalGeo.merge(treeGeo);
        }
        const tree = new R.Sculpt(new THREE.Mesh(finalGeo, new THREE.MeshPhongMaterial({color: 0x1c551c})));
        resort.add(tree);
    });
});

const lifts = new R.Sculpt('./models/lift.obj');
lifts.on(R.CONST.READY, (evt) => {
    resort.add(evt.target);
});

const lakes = new R.Sculpt('./models/lakes.obj');
lakes.on(R.CONST.READY, (evt) => {
    resort.add(evt.target);
});

