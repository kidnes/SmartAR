/**
 * @file 编译器
 *
 * @author liubin29@baidu.com
 * 2017年3月7日
 */


// init renderer
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// array of functions for the rendering loop
var onRenderFcts = [];

// init scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 0;

var markerObject3D = new THREE.Object3D;
scene.add(markerObject3D);

// ////////////////////////////////////////////////////////////////////////////////
//		set 3 point lighting						//
// ////////////////////////////////////////////////////////////////////////////////
(function () {
    var object3d = new THREE.AmbientLight(0x101010);
    object3d.name = 'Ambient light';
    scene.add(object3d);
    var object3d = new THREE.DirectionalLight('white', 0.1 * 1.6);
    object3d.position.set(2.6, 1, 3).setLength(1);
    object3d.name = 'Back light';
    scene.add(object3d);

    var object3d = new THREE.DirectionalLight('white', 0.375 * 1.6);
    object3d.position.set(-2, -1, 0);
    object3d.name = 'Key light';
    scene.add(object3d);
    var object3d = new THREE.DirectionalLight('white', 0.8 * 1);
    object3d.position.set(3, 3, 2);
    object3d.name = 'Fill light';
    scene.add(object3d);
})();

// ////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
// ////////////////////////////////////////////////////////////////////////////////

// add some debug display
(function () {
    var geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
    var material = new THREE.MeshBasicMaterial({
        wireframe: true
    });
    var mesh = new THREE.Mesh(geometry, material);
    markerObject3D.add(mesh);

    var mesh = new THREE.AxisHelper;
    markerObject3D.add(mesh);
})();

// add a awesome logo to the scene
(function () {
    // return
    var material = new THREE.SpriteMaterial({
        map: THREE.ImageUtils.loadTexture('./assets/images/awesome.png')
    });
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var object3d = new THREE.Sprite(material);
    object3d.scale.set(1, 1, 1).multiplyScalar(1.3);
    object3d.position.z = 1.4;
    markerObject3D.add(object3d);

    onRenderFcts.push(function (now, delta) {
        var angle = Math.PI * now / 1000;
        object3d.position.z = 1.4 + Math.cos(angle) * 0.1;

        var angle = Math.PI * now / 1000;
        object3d.position.x = 0 + Math.sin(angle) * 0.1;
    });
})();

(function () {
    var loader = new THREE.MMDLoader();
    var pmdFile = './assets/models/miku/miku_v2.pmd';
    var vmdFile = './assets/models/miku/wavefile_v2.vmd';
    loader.load(pmdFile, vmdFile, function onLoad(mesh) {

        mesh.scale.set(1, 1, 1).multiplyScalar(1 / 20);
        mesh.rotation.x = Math.PI / 2;

        markerObject3D.add(mesh);

        var animation = new THREE.Animation(mesh, mesh.geometry.animation);
        animation.play();

        var morphAnimation = new THREE.MorphAnimation2(mesh, mesh.geometry.morphAnimation);
        morphAnimation.play();

        var ikSolver = new THREE.CCDIKSolver(mesh);

        onRenderFcts.push(function (now, delta) {
            THREE.AnimationHandler.update(delta / 1000);
            ikSolver.update();
        });
    }, function onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }

    }, function onError(xhr) {});
})();

// ////////////////////////////////////////////////////////////////////////////////
//		render the whole thing on the page
// ////////////////////////////////////////////////////////////////////////////////

// handle window resize
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}, false);

// render the scene
onRenderFcts.push(function () {
    renderer.render(scene, camera);
});

// run the rendering loop
var previousTime = performance.now();
requestAnimationFrame(function animate(now) {

    requestAnimationFrame(animate);

    onRenderFcts.forEach(function (onRenderFct) {
        onRenderFct(now, now - previousTime);
    });

    previousTime = now;
});

// ////////////////////////////////////////////////////////////////////////////////
//		Do the Augmented Reality Upgrade
// ////////////////////////////////////////////////////////////////////////////////

// init the marker recognition
var jsArucoMarker = new THREEx.JsArucoMarker();

// init the image source grabbing

var videoGrabbing = new THREEx.WebcamGrabbing();
jsArucoMarker.videoScaleDown = 2;

// attach the videoGrabbing.domElement to the body
document.body.appendChild(videoGrabbing.domElement);

// process the image source with the marker recognition
onRenderFcts.push(function () {
    // var domElement = videoGrabbing.domElement;
    // var markers = jsArucoMarker.detectMarkers(domElement);
    var object3d = markerObject3D;

    object3d.visible = false;

    var markers = [{
        id: 265,
        corners: [
            {x: 116, y: 97},
            {x: 328, y: 79},
            {x: 345, y: 284},
            {x: 129, y: 312}
        ]
    }];

    // see if this.markerId has been found
    markers.forEach(function (marker) {
        jsArucoMarker.markerToObject3D(marker, object3d);

        object3d.visible = true;
    });
});


// ////////////////////////////////////////////////////////////////////
//		Init Sound
// ////////////////////////////////////////////////////////////////////

var soundUrl = './assets/sounds/wavefile_short.mp3';
var audio = new Audio(soundUrl);
audio.play();
