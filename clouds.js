import * as R from 'rodin/core';

/*

clouds.scale.set(0.03,0.03,0.03);
clouds.rotation.y = -0.2;
clouds.position.x = -0.5;
*/


export const clouds = new R.Sculpt('./models/clouds.obj');
clouds.on(R.CONST.READY, (evt) => {
    R.Scene.add(evt.target);
    clouds.visible = false;
    clouds.position.y = 0;
    clouds.position.z = -0.5;
    //evt.target.position.set(8, -12, -18);
    evt.target.rotation.y = -Math.PI / 2;
});
const showAnim = new R.AnimationClip("showAnim", {
    position: {
        y: {from: 0, to: 1.7}
    }
});
showAnim.duration(1000);
showAnim.easing( R.AnimationClip.EASING.Quadratic.Out);
clouds.animation.add(showAnim);



const  hideAnim = new R.AnimationClip("hideAnim", {
    position: {
        y: {from: 1.7, to: 0}
    }
});
hideAnim.duration(1000);
hideAnim.easing( R.AnimationClip.EASING.Quadratic.Out);
clouds.animation.add(hideAnim);

clouds.show = function() {
    clouds.visible = true;
    clouds.animation.start("showAnim");
}
clouds.hide = function() {
    clouds.visible = false;
}