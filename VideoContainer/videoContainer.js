/**
 * Created by Reinchard on 10/6/2017.
 */
import * as R from 'rodin/core';
import {Thumbnail} from './videoThumbnail.js'
import {Dot} from './Dots/Dots.js';

let videoList = [{
    "title": "Cafesjian Sculpture Garden",
    "description": "Cafesjian Sculpture Garden is located at the base of the Cascade, Yerevan and presents one of the finest collections of monumental sculpture found anywhere in the world. ",
    "url": {
        "SD": "video/360.mp4",
        "HD": "video/360.mp4"
    },
    "thumbnail": "img/thumbs/1.jpg"
}, {
    "title": "Cafesjian Sculpture Garden",
    "description": "Cafesjian Sculpture Garden is located at the base of the Cascade, Yerevan and presents one of the finest collections of monumental sculpture found anywhere in the world. ",
    "url": {
        "SD": "video/360.mp4",
        "HD": "video/360.mp4"
    },
    "thumbnail": "img/thumbs/2.jpg"
}, {
    "title": "Cafesjian Sculpture Garden",
    "description": "Cafesjian Sculpture Garden is located at the base of the Cascade, Yerevan and presents one of the finest collections of monumental sculpture found anywhere in the world. ",
    "url": {
        "SD": "video/360.mp4",
        "HD": "video/360.mp4"
    },
    "thumbnail": "img/thumbs/3.jpg"
}];


class VideoContainer {
    constructor() {
        this.height = 1.02 * 1.3;
        this.width = 0.45;
        this.infoText = new R.Text3D({
            text: 'Live Videos',
            color: 0x66b1ee,
            font: 'fonts/Roboto-Regular.ttf',
            fontSize: 0.03,
        });
        this.infoText.on(R.CONST.READY, (e) => {
            this.infoText.center();
            this.infoText.position.set(-.075,  .58, .05);
            this.infoText.rotation.y = 0.1;
            this.leftInterface.add(this.infoText);
        });
        this.leftInterface = new R.Element({
                width: this.width,
                height: this.height,
                background: {
                    color: 0x223341
                },
                border: {
                    radius: 0.02
                }
            }
        );
        this.leftInterface.position.set(-1.4, .1, -1.2);
        this.leftInterface.rotation.y = Math.PI / 6;
        this.leftInterface.on(R.CONST.READY, this.createThumbs.bind(this));
        this.setDots = this.setDots.bind(this);
    }

    createThumbs() {
        videoList.map((video, $index) => {
            let thumb = new Thumbnail(video);
            thumb.on(R.CONST.READY, this.setThumbnailPosition.bind(this, thumb, $index));
        })
    }

    setThumbnailPosition(thumb, $index) {
        this.leftInterface.add(thumb.draw($index));
        if (videoList.length <= 3) {
            thumb.position.y = ((this.height / 3) - ($index * (this.height / 3.5) + 0.1));
        } else {
            thumb.position.y = ((this.height / 3) - ($index * (this.height / 3.5) + 0.07));
        }
        thumb.position.z = 0.01;
        thumb.position.x = 0.001;
        this.setDots($index);

        thumb.on('select', (data) => {
            let selected = Dot.instances.filter((d) => {
                d.isActive = false;
                d.activeColor = '0x3a4650';
                return d.id === data.id;
            })[0];
            selected.activeColor = '0x66b1ee';
            selected.isActive = true;
        })
    }

    setDots($index) {
        let dot = new Dot();
        dot.id = $index;
        dot.element.on(R.CONST.READY, () => {
            this.leftInterface.add(dot.element);
            dot.element.position.set(.25, -($index * 0.05), 0);
            dot.element.rotation.y = .8;
            dot.element.id = $index;
            if($index === 0) {
                dot.isActive = true;
                dot.activeColor = '0x66b1ee';
            }
        });
    }
}

export default new VideoContainer();