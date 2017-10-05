import * as R from 'rodin/core';

// export const bottomInterfaceLeft = new R.Plane(.529, .128, new THREE.MeshBasicMaterial({
//     transparent: true,
//     map: R.Loader.loadTexture('img/Group-24@2x.png')
// }));
// bottomInterfaceLeft.position.set(-.529/2 - .01, -.8, -1.2);
//
//
// for (let i = 0; i < 5; i++){
//     const hoverPlane = new R.Plane(0.08);
//     hoverPlane.position.z = 0.000001;
//     bottomInterfaceLeft.add(hoverPlane);
// }

//
// export const bottomInterfaceRight = new R.Plane(.675, .128, new THREE.MeshBasicMaterial({
//     transparent: true,
//     map: R.Loader.loadTexture('img/Group-23@2x.png')
// }));
// bottomInterfaceRight.position.set(.675/2 + .01, -.8, -1.2);


const interfaceLeft = {
    name: "bottomInterfaceLeftBg",
    width: .529,
    height: .128,
};
interfaceLeft.background = {
    color: 0x223341
};
interfaceLeft.border = {
    radius: 0.02
};

export const bottomInterfaceLeft = new R.Element(interfaceLeft);

const interfaceRight = {
    name: "bottomInterfaceLeftBg",
    width: .675,
    height: .128
};
interfaceRight.background = {
    color: 0x223341
};
interfaceRight.border = {
    radius: 0.02
};
export const bottomInterfaceRight = new R.Element(interfaceRight);

