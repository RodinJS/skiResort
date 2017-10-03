import * as R from 'rodin/core';
import {Sky} from './Sky.js';
import {resort} from './terrain.js';
import {clouds} from './clouds.js';
R.start();


R.Scene.add(new R.Sculpt(new THREE.AmbientLight(0xffffff, 0.7)));

R.Scene.HMDCamera._threeObject.far = 500;



const light = new THREE.DirectionalLight(0xfffde9, 0.8, 200);
light.position.set(-30, 25, 30);

R.Scene.add(resort);
R.Scene.add(new R.Sculpt(light));

const cylinder = new R.Cylinder(120, 120, 30, 256, 1, true/*,-Math.PI/11, Math.PI*1.11*/, new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.4,
    //wireframe: true,
    side: THREE.BackSide,
    map: R.Loader.loadTexture("./img/bullet_.png")
}));
cylinder.on(R.CONST.READY, e => {
    cylinder.material.map.wrapS = cylinder.material.map.wrapT = THREE.RepeatWrapping;
    cylinder.material.map.repeat.set(24, 1);
});
cylinder.rotation.z = Math.PI / 2 - 0.072;
//cylinder.position.y = -30;
cylinder.position.x = 40;
R.Scene.add(cylinder);



// Add Sun Helper
let sunSphere = new R.Sphere(5, 32, 32, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: R.Loader.loadTexture("./img/moon.jpg")
}));
sunSphere.position.y = -100;
sunSphere.rotation.y = -Math.PI / 2;
sunSphere.visible = true;

const sky = new Sky({
    "turbidity": 6.5,
    "rayleigh": 1.466,
    "mieCoefficient": 0.004,
    "mieDirectionalG": 0.887,
    "luminance": 1.1,
    "inclination": 0.49,
    "azimuth": 0.3,
    "sun": false
}, sunSphere, light, 130.5);
R.Scene.add(sky);

sky.rotation.x = Math.PI / 2;
sky.position.y = 0;


const popUp = new R.AnimationClip("popUp", {
    scale: {
        x: {from: 0.01, to: 1.0},
        y: {from: 0.01, to: 1.0},
        z: {from: 0.01, to: 1.0}
    }
});
popUp.duration(800);
popUp.easing(R.AnimationClip.EASING.Elastic.Out);
sunSphere.animation.add(popUp);

const fadeinAnim = new R.AnimationClip("fadeinAnim", {
    material: {
        opacity: {from: 0.5, to: 1.0}
    }
});
fadeinAnim.duration(200);
cylinder.animation.add(fadeinAnim);

const fadeoutAnim = new R.AnimationClip("fadeoutAnim", {
    material: {
        opacity: {from: 1, to: 0.5}
    }
});
fadeoutAnim.duration(200);
cylinder.animation.add(fadeoutAnim)


const fadeinSunAnim = new R.AnimationClip("fadeinSunAnim", {
    effectController: {
        turbidity: {from: 1, to: 6.5}
    }
});
fadeinSunAnim.duration(200);
sky.animation.add(fadeinSunAnim);

const fadeoutSunAnim = new R.AnimationClip("fadeoutSunAnim", {
    effectController: {
        turbidity: {from: 6.5, to: 1.0}
    }
});
fadeoutSunAnim.duration(200);
sky.animation.add(fadeoutSunAnim);

R.Scene.preRender(()=> {
    /*    if(effectController.inclination < 1){
     effectController.inclination += 0.001;
     }else{
     effectController.inclination = -1;
     }
     */
    //sky.rotation.y+=0.01;
    //sky.update();
});

sky.on(R.CONST.ANIMATION_COMPLETE, (e) => {
    if (e.animation === 'fadeinSunAnim' || e.animation === 'fadeoutSunAnim') {
        sky.constUpdate = false;
    }
});


cylinder.on(R.CONST.GAMEPAD_HOVER, (e) => {
    //if(e.point.y >= 0 ){
    cylinder.animation.start('fadeinAnim');
    sky.constUpdate = true;
    sky.animation.start('fadeoutSunAnim');
    //}
});

cylinder.on(R.CONST.GAMEPAD_HOVER_OUT, (e) => {
    //if(sky.effectController.turbidity == 6.5) return;
    cylinder.animation.start('fadeoutAnim');
    sky.constUpdate = true;
    sky.animation.start('fadeinSunAnim');
});

cylinder.on(R.CONST.GAMEPAD_BUTTON_DOWN, (e) => {
    sky.engaged = true;
    sky.engagedAngle = getAngle(e.point);
    sky.engagedInclination = sky.effectController.inclination;
    navigator.mouseGamePad.stopPropagationOnMouseMove = true;
    //console.log(e.point)

});
cylinder.on(R.CONST.GAMEPAD_BUTTON_UP, (e) => {
    //console.log(sky.effectController.inclination);
    //console.log(e.point)
});
R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_UP, (e) => {
    sky.engaged = false;
    navigator.mouseGamePad.stopPropagationOnMouseMove = false;
});

sky.on(R.CONST.GAMEPAD_MOVE, (e) => {
    if (sky.engaged) {

        let angle = getAngle(e.point);
        const diff = angle - sky.engagedAngle;
        angle = sky.engagedInclination + diff;

        if (angle > 1.5) {
            angle -= 2;
        }
        else if (angle < -0.5) {
            angle += 2;
        }

        if (angle > 0.51 && angle < 1.49) {
            if (!sky.effectController.sun) {
                sky.effectController.sun = true;
                sunSphere.animation.start('popUp');

            }
        }
        else {
            sky.effectController.sun = false;
        }

        if(angle < 0.4 &&  angle > 0.3){
            if(!clouds.visible){
                clouds.show();
            }
        }
        else{
            if(clouds.hide()){
                clouds.show();
            }
        }
        sky.effectController.inclination = angle;
        sky.update();

    }
});
R.messenger.once(R.CONST.ALL_SCULPTS_READY, ()=> {
    document.getElementById('img').style.display = "none";
    document.getElementById('pulsating-circle').style.display = "none";
    sky.update();
});

function getAngle(dir) {
    let angle = Math.atan(dir.y / dir.z);
    if (dir.z > 0) {
        if (dir.y > 0) {
            angle = -Math.PI + angle
        } else {
            angle = Math.PI + angle
        }
    }
    angle /= Math.PI;
    angle += 0.5;
    return angle;
}

function weatherCheck(){

}


function getChildrenPolys(obj) {
    let count = 0;
    if (obj.geometry && obj.geometry.faces) {
        count += obj.geometry.faces.length;
    }
    if (obj.children) {
        for (let i = 0; i < obj.children.length; i++) {
            count += getChildrenPolys(obj.children[i]);
        }
    }
    return count;
}
