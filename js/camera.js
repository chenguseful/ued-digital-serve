/**
 * author：程炎
 * update：2022-08-11
 * stack: javascript
 */

!(function () {
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator
                .msGetUserMedia;

            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }
    const constraints = {
        video: {
            /**
             * 后置摄像机控制
             * facingMode: 'environment'
             */
        },
        audio: false
    };
    let promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then(stream => {
        let video = document.getElementById('camera');
        if ("srcObject" in video) {
            video.srcObject = stream;
        } else {
            video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function (e) {
            video.play();
        };
    }).catch(err => {
        console.log(err.name + ": " + err.message);
    })
})();