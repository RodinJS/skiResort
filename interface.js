import * as R from 'rodin/core';

const interfaceSculpt = new R.Sculpt();

const leftInterface = new R.Plane(5.62, 10.24 + 2, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-25@2x.png')
}));
leftInterface.position.set(-12, 1, -12);
leftInterface.rotation.y = Math.PI/6;
interfaceSculpt.add(leftInterface);

const rightInterface = new R.Plane(5.12, 7.29 + 1, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-27@2x.png')
}));
rightInterface.position.set(12, 1 + (leftInterface.height - rightInterface.height) / 2, -12);
rightInterface.rotation.y = -Math.PI/6;
interfaceSculpt.add(rightInterface);

const rightInterfaceTop = new R.Plane(5.12, 2.55 + 1, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-26@2x.png')
}));
rightInterfaceTop.position.set(12, 1 - (leftInterface.height - rightInterfaceTop.height) / 2, -12);
rightInterfaceTop.rotation.y = -Math.PI/6;
interfaceSculpt.add(rightInterfaceTop);

const topInterfaceLeft = new R.Plane(5.29, 1.28, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-24@2x.png')
}));
topInterfaceLeft.position.set(-5.29/2 - 0.1, -7, -12);
interfaceSculpt.add(topInterfaceLeft);

const topInterfaceRight = new R.Plane(6.75, 1.28, new THREE.MeshBasicMaterial({
    transparent: true,
    map: R.Loader.loadTexture('img/Group-23@2x.png')
}));
topInterfaceRight.position.set(6.75/2 + 0.1, -7, -12);
interfaceSculpt.add(topInterfaceRight);


R.Avatar.active.HMDCamera.add(interfaceSculpt);