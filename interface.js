import * as R from 'rodin/core';
import {bottomInterfaceLeft, bottomInterfaceRight} from './bottomInterface.js'

const interfaceSculpt = new R.Sculpt();

const leftInterface = new R.Plane(0.45, 1.02 * 1.3, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-25@2x.png')
}));

leftInterface.position.set(-1.4, .1, -1.2);
leftInterface.rotation.y = Math.PI / 6;
interfaceSculpt.add(leftInterface);

const rightInterface = new R.Plane(.45, .729 * 1.3, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-27@2x.png')
}));
rightInterface.position.set(1.4, .1 + (leftInterface.height - rightInterface.height) / 2, -1.2);
rightInterface.rotation.y = -Math.PI / 6;
interfaceSculpt.add(rightInterface);

const rightInterfaceTop = new R.Plane(.45, .255 * 1.3, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-26@2x.png')
}));
rightInterfaceTop.position.set(1.4, .17 - (rightInterface.height + rightInterfaceTop.height) / 2, -1.2);
rightInterfaceTop.rotation.y = -Math.PI / 6;
interfaceSculpt.add(rightInterfaceTop);


bottomInterfaceLeft.on(R.CONST.READY, (e) => {
    bottomInterfaceLeft.position.set(-.529/2 - .01, -.8, -1.2);
    interfaceSculpt.add(bottomInterfaceLeft);
});

bottomInterfaceRight.on(R.CONST.READY, (e) => {
    bottomInterfaceRight.position.set(.675/2 + .01, -.8, -1.2);
    interfaceSculpt.add(bottomInterfaceRight);
});


R.Avatar.active.HMDCamera.add(interfaceSculpt);