import * as R from 'rodin/core';
import {bottomInterfaceGrid} from './bottomInterfaceGrid.js';

export class WeatherInterface extends R.Sculpt {
    constructor(interfaceHeight) {
        super();
        this.interfaceHeight = interfaceHeight;
        this.width = .45;

        this.topInterface = new R.Element({
            width: this.width,
            height: .729 * 1.3,
            transparent: false,
            background: {
                color: 0x223341
            },
            border: {
                radius: 0.02
            },
        });
        this.topInterface.on(R.CONST.READY, () => {
            this.add(this.topInterface);
            this.topInterface.position.y = .1 + (this.interfaceHeight - this.topInterface.height) / 2;
        });

        this.bottomInterface = new R.Element({
            width: this.width,
            height: .255 * 1.3,
            transparent: false,
            background: {
                color: 0x223341
            },
            border: {
                radius: 0.02
            },
        });
        this.bottomInterface.on(R.CONST.READY, () => {
            this.add(this.bottomInterface);
            this.bottomInterface.position.y = .1 - (this.interfaceHeight - this.bottomInterface.height) / 2;

            const grid = new bottomInterfaceGrid(4, this.bottomInterface.width * ( 1 - 0.1 )/4 , this.bottomInterface.height * 0.9);
            this.bottomInterface.add(grid)
        });


    }
}

