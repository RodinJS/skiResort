/**
 * Created by Reinchard on 10/6/2017.
 */
import * as R from 'rodin/core';
import {Thumbnail} from './videoThumbnail.js'

let videoList = [{

        "title": "Cafesjian Sculpture Garden",
        "description": "Cafesjian Sculpture Garden is located at the base of the Cascade, Yerevan and presents one of the finest collections of monumental sculpture found anywhere in the world. ",
        "url": {
            "SD": "video/360.mp4",
            "HD": "video/360.mp4"
        },
        "thumbnail": "img/icons/360.png"
    },{
        "title": "Cafesjian Sculpture Garden",
        "description": "Cafesjian Sculpture Garden is located at the base of the Cascade, Yerevan and presents one of the finest collections of monumental sculpture found anywhere in the world. ",
        "url": {
            "SD": "video/360.mp4",
            "HD": "video/360.mp4"
        },
        "thumbnail": "img/icons/360.png"
    },{
        "title": "Cafesjian Sculpture Garden",
        "description": "Cafesjian Sculpture Garden is located at the base of the Cascade, Yerevan and presents one of the finest collections of monumental sculpture found anywhere in the world. ",
        "url": {
            "SD": "video/360.mp4",
            "HD": "video/360.mp4"
        },
        "thumbnail": "img/icons/360.png"
    }];


class VideoContainer {
    constructor() {
        this.height = 1.02 * 1.3;
        this.width = 0.45;
        this.leftInterface = new R.Plane(this.width, this.height, new THREE.MeshBasicMaterial({
            transparent: true,
            color: 0xFFFFFF
        }));
        this.leftInterface.on(R.CONST.READY, this.createThumbs.bind(this));
    }

    createThumbs(evt) {
        videoList.map((video, i) => {
            let thumb = new Thumbnail(video);
            thumb.on(R.CONST.READY, (e) => {
                this.leftInterface.add(thumb.draw(e.id));
                thumb.position.y = (this.height / 3) - (i * (this.height / 3));
                thumb.position.z = 0.01;
                thumb.position.x = 0;
            })

        })
    }
}

export default new VideoContainer();