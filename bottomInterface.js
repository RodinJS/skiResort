import * as R from 'rodin/core';
import {BottomPanelButton} from './BottomPanelButton.js';
import {resort} from './terrain.js';
import {Pin} from './Pin.js';

const leftBtnWidth = 0.08;
const interfaceHeight = .128;
const padding = (interfaceHeight - leftBtnWidth) / 2;
const step = (leftBtnWidth + padding);

////////////////////
const leftButtons = [];

const tracks = new R.Sculpt();
resort.add(tracks);

const blueMat = new THREE.MeshPhongMaterial({color: 0x299ed7});
const blue_tracks = new R.Sculpt('./models/blue.obj');
blue_tracks.on(R.CONST.READY, (evt) => {
    for (let i = 0; i < evt.target._threeObject.children.length; i++) {
        evt.target._threeObject.children[i].material = blueMat;
    }
    tracks.add(evt.target);
});
const greenMat = new THREE.MeshPhongMaterial({color: 0x34ab35});
const green_tracks = new R.Sculpt('./models/green.obj');
green_tracks.on(R.CONST.READY, (evt) => {
    for (let i = 0; i < evt.target._threeObject.children.length; i++) {
        evt.target._threeObject.children[i].material = greenMat;
    }
    tracks.add(evt.target);
});
const blackMat = new THREE.MeshPhongMaterial({color: 0x1c3e4f});
const black_tracks = new R.Sculpt('./models/black.obj');
black_tracks.on(R.CONST.READY, (evt) => {
    for (let i = 0; i < evt.target._threeObject.children.length; i++) {
        evt.target._threeObject.children[i].material = blackMat;
    }
    tracks.add(evt.target);
});
const blackDoubleMat = new THREE.MeshPhongMaterial({color: 0x061d29});
const black_double_tracks = new R.Sculpt('./models/black_double.obj');
black_double_tracks.on(R.CONST.READY, (evt) => {
    for (let i = 0; i < evt.target._threeObject.children.length; i++) {
        evt.target._threeObject.children[i].material = blackDoubleMat;
    }
    tracks.add(evt.target);
});

const blueBtn = new BottomPanelButton(leftBtnWidth, 'img/Tracks/Rest/Blue.png', 'img/Tracks/Hover/Blue.png', blue_tracks, true, blueMat);
leftButtons.push(blueBtn);
const greenBtn = new BottomPanelButton(leftBtnWidth, 'img/Tracks/Rest/Green.png', 'img/Tracks/Hover/Green.png', green_tracks, true, greenMat);
leftButtons.push(greenBtn);
const diamondBtn = new BottomPanelButton(leftBtnWidth, 'img/Tracks/Rest/Diamond.png', 'img/Tracks/Hover/Diamond.png', black_tracks, true, blackMat);
leftButtons.push(diamondBtn);
const doubleBtn = new BottomPanelButton(leftBtnWidth, 'img/Tracks/Rest/Double diamond.png', 'img/Tracks/Hover/Double diamond.png', black_double_tracks, true, blackDoubleMat);
leftButtons.push(doubleBtn);

const interfaceLeftWidth = leftButtons.length * (leftBtnWidth + padding) + padding;
const interfaceLeft = {
    name: "bottomInterfaceLeftBg",
    width: interfaceLeftWidth,
    height: interfaceHeight,
};
interfaceLeft.background = {
    color: 0x223341
};
interfaceLeft.border = {
    radius: 0.02
};
export const bottomInterfaceLeft = new R.Element(interfaceLeft);

for (let i = 0; i < leftButtons.length; i++) {
    leftButtons[i].position.x = -interfaceLeftWidth / 2 + step * (i + 0.63);
    bottomInterfaceLeft.add(leftButtons[i]);
}

///////////////////////////////
///////////////////////////////

const rightButtons = [];
///////////////////
const chopIcons = new R.Sculpt();
resort.add(chopIcons);
const positionsChop = new R.Sculpt('./models/chop_points.obj');
positionsChop.on(R.CONST.READY, (e) => {
    const pos = e.target._threeObject.children["0"].geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 9) {
        chopIcons.add(new Pin('img/icons/Chop.png', new R.Vector3(pos[i], pos[i + 1], pos[i + 2])));
    }
});
const chopBtn = new BottomPanelButton(leftBtnWidth, 'img/Filters/Rest/Chop.png', 'img/Filters/Hover/Chop.png', chopIcons, true);
rightButtons.push(chopBtn);
///////////////////
const medIcons = new R.Sculpt();
resort.add(medIcons);
const positionsMed = new R.Sculpt('./models/med_points.obj');
positionsMed.on(R.CONST.READY, (e) => {
    const pos = e.target._threeObject.children["0"].geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 9) {
        medIcons.add(new Pin('img/icons/Med.png', new R.Vector3(pos[i], pos[i + 1], pos[i + 2])));
    }
});
const medBtn = new BottomPanelButton(leftBtnWidth, 'img/Filters/Rest/Med.png', 'img/Filters/Hover/Med.png', medIcons, false);
rightButtons.push(medBtn);
///////////////////
const cafeIcons = new R.Sculpt();
resort.add(cafeIcons);
const positionsCafe = new R.Sculpt('./models/cafe_points.obj');
positionsCafe.on(R.CONST.READY, (e) => {
    const pos = e.target._threeObject.children["0"].geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 9) {
        cafeIcons.add(new Pin('img/icons/Cafe.png', new R.Vector3(pos[i], pos[i + 1], pos[i + 2])));
    }
});
const cafeBtn = new BottomPanelButton(leftBtnWidth, 'img/Filters/Rest/Cafe.png', 'img/Filters/Hover/Cafe.png', cafeIcons, false);
rightButtons.push(cafeBtn);
///////////////////
const phoneIcons = new R.Sculpt();
resort.add(phoneIcons);
const positionsPhone = new R.Sculpt('./models/phone_points.obj');
positionsPhone.on(R.CONST.READY, (e) => {
    const pos = e.target._threeObject.children["0"].geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 9) {
        phoneIcons.add(new Pin('img/icons/Phone.png', new R.Vector3(pos[i], pos[i + 1], pos[i + 2])));
    }
});
const phoneBtn = new BottomPanelButton(leftBtnWidth, 'img/Filters/Rest/Phone.png', 'img/Filters/Hover/Phone.png', phoneIcons, false);
rightButtons.push(phoneBtn);
///////////////////
const WCIcons = new R.Sculpt();
resort.add(WCIcons);
const positionsWC = new R.Sculpt('./models/wc_points.obj');
positionsWC.on(R.CONST.READY, (e) => {
    const pos = e.target._threeObject.children["0"].geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 9) {
        WCIcons.add(new Pin('img/icons/WC.png', new R.Vector3(pos[i], pos[i + 1], pos[i + 2])));
    }
});
const WCBtn = new BottomPanelButton(leftBtnWidth, 'img/Filters/Rest/WC.png', 'img/Filters/Hover/WC.png', WCIcons, false);
rightButtons.push(WCBtn);
///////////////////
const videoIcons = new R.Sculpt();
resort.add(videoIcons);
const positionsVideo = new R.Sculpt('./models/video_points.obj');
positionsVideo.on(R.CONST.READY, (e) => {
    const pos = e.target._threeObject.children["0"].geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 9) {
        videoIcons.add(new Pin('img/icons/360.png', new R.Vector3(pos[i], pos[i + 1], pos[i + 2])));
    }
});
const videoBtn = new BottomPanelButton(leftBtnWidth, 'img/Filters/Rest/360.png', 'img/Filters/Hover/360.png', videoIcons, false);
rightButtons.push(videoBtn);

const interfaceRightWidth = rightButtons.length * (leftBtnWidth + padding) + padding;
const interfaceRight = {
    name: "bottomInterfaceLeftBg",
    width: interfaceRightWidth,
    height: interfaceHeight
};
interfaceRight.background = {
    color: 0x223341
};
interfaceRight.border = {
    radius: 0.02
};
export const bottomInterfaceRight = new R.Element(interfaceRight);

for (let i = 0; i < rightButtons.length; i++) {
    rightButtons[i].position.x = -interfaceRightWidth / 2 + step * (i + 0.63);
    bottomInterfaceRight.add(rightButtons[i]);
}


