import * as R from 'rodin/core';
import {bottomInterfaceLeft, bottomInterfaceRight} from './bottomInterface.js'
import VideoContainer from './VideoContainer/videoContainer.js';
import {WeatherInterface} from './weatherInterface/WeatherInterface.js';

const interfaceSculpt = new R.Sculpt();
let {leftInterface} = VideoContainer;
console.log(VideoContainer.height);

interfaceSculpt.add(leftInterface);

const weatherInterface = new WeatherInterface(VideoContainer.height);
weatherInterface.rotation.y = -Math.PI / 6;
weatherInterface.position.set(1.4, 0, -1.2);
interfaceSculpt.add(weatherInterface);

bottomInterfaceLeft.on(R.CONST.READY, (e) => {
    bottomInterfaceLeft.position.set(-.529/2 - .01, -.8, -1.2);
    interfaceSculpt.add(bottomInterfaceLeft);
});

bottomInterfaceRight.on(R.CONST.READY, (e) => {
    bottomInterfaceRight.position.set(.675/2 + .01, -.8, -1.2);
    interfaceSculpt.add(bottomInterfaceRight);
});


R.Avatar.active.HMDCamera.add(interfaceSculpt);