import * as R from 'rodin/core';

export class Pin extends R.Sculpt {
    constructor(img, pos) {
        super();

        this.img = img;
        this.position.copy(pos);

        const pinMaterial = new THREE.MeshBasicMaterial({color: 0x223341});

        const pinPoint = new R.Sphere(0.06, pinMaterial);
        this.add(pinPoint);

        const pinCylinder = new R.Cylinder(0.02, 0.02, 1.8, pinMaterial);
        pinCylinder.position.y = pinCylinder.height / 2;
        this.add(pinCylinder);

        const pinIcon = new R.Plane(0.5, new THREE.MeshBasicMaterial({
            map: R.Loader.loadTexture(this.img),
            transparent: true,
            side: THREE.DoubleSide
        }));
        pinIcon.position.y = pinCylinder.height + pinIcon.height / 2;
        this.add(pinIcon);

        pinIcon.on(R.CONST.UPDATE, (e) => {
            pinIcon.globalRotation.y = -R.Avatar.active.HMDCamera.rotation.y;
        });

        this.icon = pinIcon;
    }
}