
export default function () {
    // create video element
    var domElement = document.createElement('video');
    domElement.setAttribute('autoplay', true);

    // window.domElement = video
    domElement.style.zIndex = -1;
    domElement.style.position = 'absolute';

    domElement.style.top = '0px';
    domElement.style.left = '0px';
    // domElement.style.width = '100%';
    domElement.style.height = window.innerHeight + 'px';

    function onResize() {
        // is the size of the video available ?
        if (domElement.videoHeight === 0) {
            return;
        }

        var videoAspect = domElement.videoWidth / domElement.videoHeight;
        var windowAspect = window.innerWidth / window.innerHeight;
    }

    window.addEventListener('resize', function (event) {
        onResize();
    });

    // just to be sure - resize on mobile is funky to say the least
    setInterval(function () {
        onResize();
    }, 500);

    var constraints = window.constraints = {
        audio: false,
        video: true
    };

    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: true, video: {width: 1280, height: 720}}, function (stream) {
            domElement.srcObject = stream;
            domElement.onloadedmetadata = function (e) {
                domElement.play();
            };
        }, function (err) {
            console.log('The following error occurred: ' + err.name);
        });
    }
    else if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            var videoTracks = stream.getVideoTracks();
            console.log('Got stream with constraints:', constraints);
            console.log('Using video device: ' + videoTracks[0].label);
            stream.onended = function () {
                    console.log('Stream ended');
            }
            domElement.srcObject = stream;
        });
    }
    else {
        console.log('getUserMedia not supported');
    }

    this.domElement = domElement;
}
