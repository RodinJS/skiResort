import * as R from 'rodin/core';

const interfaceSculpt = new R.Sculpt();

const leftInterface = new R.Plane(0.45, 1.024 + .02, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-25@2x.png')
}));
leftInterface.position.set(-1.4, .1, -1.2);
leftInterface.rotation.y = Math.PI/6;
interfaceSculpt.add(leftInterface);

const rightInterface = new R.Plane(.45, .729 + .1, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-27@2x.png')
}));
rightInterface.position.set(1.4, .1 + (leftInterface.height - rightInterface.height) / 2, -1.2);
rightInterface.rotation.y = -Math.PI/6;
interfaceSculpt.add(rightInterface);

const rightInterfaceTop = new R.Plane(.45, .255 + .1, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-26@2x.png')
}));
rightInterfaceTop.position.set(1.4, .17 - (rightInterface.height + rightInterfaceTop.height) / 2, -1.2);
rightInterfaceTop.rotation.y = -Math.PI/6;
interfaceSculpt.add(rightInterfaceTop);

const topInterfaceLeft = new R.Plane(.529, .128, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-24@2x.png')
}));
topInterfaceLeft.position.set(-.529/2 - .01, -.8, -1.2);
interfaceSculpt.add(topInterfaceLeft);

const topInterfaceRight = new R.Plane(.675, .128, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-23@2x.png')
}));
topInterfaceRight.position.set(.675/2 + .01, -.8, -1.2);
interfaceSculpt.add(topInterfaceRight);


R.Avatar.active.HMDCamera.add(interfaceSculpt);