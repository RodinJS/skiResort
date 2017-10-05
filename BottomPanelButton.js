import * as R from 'rodin/core';

export class BottomPanelButton extends R.Sculpt {
    constructor(width, restBg, hoverBg, pin, pinSelected, color) {
        super();

        this.pin = pin;
        this.color = color;
        if (!this.color) this.pin.visible = pinSelected;
        this.position.z = 0.0001;

        const rest = new R.Plane(width, new THREE.MeshBasicMaterial({
            map: R.Loader.loadTexture(restBg),
            transparent: true
        }));
        this.add(rest);
        this.rest = rest;
        this.rest.visible = true;

        const hover = new R.Plane(width, new THREE.MeshBasicMaterial({
            map: R.Loader.loadTexture(hoverBg),
            transparent: true
        }));
        this.add(hover);
        this.hover = hover;
        this.hover.position.z = 0.0001;
        this.hover.scale.set(1.01, 1.01, 1.01);
        this.hover.visible = pinSelected;

        this.selected = pinSelected;

        this.rest.on(R.CONST.GAMEPAD_HOVER, () => {
            this.hover.visible = true;
        });
        this.rest.on(R.CONST.GAMEPAD_HOVER_OUT, () => {
            if (!this.selected) this.hover.visible = false;
        });

        this.hover.on(R.CONST.GAMEPAD_BUTTON_UP, () => {
            if (!this.selected) {
                this.hover.visible = true;
                if (!this.color) {
                    this.pin.visible = true;
                } else {
                    if(this.pin.isReady){
                        for (let i = 0; i < this.pin._threeObject.children.length; i++) {
                            this.pin._threeObject.children[i].material.color.r = this.color.r;
                            this.pin._threeObject.children[i].material.color.g = this.color.g;
                            this.pin._threeObject.children[i].material.color.b = this.color.b;
                        }
                    }
                }
                this.selected = true;
            } else {
                if (!this.color) {
                    this.pin.visible = false;
                }else {
                    if(this.pin.isReady){
                        for (let i = 0; i < this.pin._threeObject.children.length; i++) {
                            this.pin._threeObject.children[i].material.color.r = 0.4;
                            this.pin._threeObject.children[i].material.color.g = 0.4;
                            this.pin._threeObject.children[i].material.color.b = 0.4;
                        }
                    }
                }
                this.selected = false;
            }
        });


    }
}