/**
 * @file 手游落地页
 *
 * @author liubin29@baidu.com
 * 2017年3月7日
 */

var THREE = window.THREE;

var renderer, scene, camera;

var onRenderFcts = [];
var markerObject3D;

var container = document.getElementById('container');

function initScene() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 5;

    markerObject3D = new THREE.Object3D();
    scene.add(markerObject3D);

    onRenderFcts.push(function () {
        renderer.render(scene, camera);
    });
}

function initLight() {
    var object3d = new THREE.AmbientLight(0x101010);
    object3d.name = 'Ambient light';
    scene.add(object3d);

    object3d = new THREE.DirectionalLight('white', 0.1 * 1.6);
    object3d.position.set(2.6, 1, 3).setLength(1);
    object3d.name = 'Back light';
    scene.add(object3d);
    object3d = new THREE.DirectionalLight('white', 0.375 * 1.6);
    object3d.position.set(-2, -1, 0);
    object3d.name = 'Key light';
    scene.add(object3d);
    object3d = new THREE.DirectionalLight('white', 0.8 * 1);
    object3d.position.set(3, 3, 2);
    object3d.name = 'Fill light';
    scene.add(object3d);
}


function initStage() {
    var geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
    var material = new THREE.MeshBasicMaterial({
        wireframe: true
    });
    var mesh = new THREE.Mesh(geometry, material);
    markerObject3D.add(mesh);

    var mesh = new THREE.AxisHelper;
    markerObject3D.add(mesh);
}

function initLogo() {
    var material = new THREE.SpriteMaterial({
        map: THREE.ImageUtils.loadTexture('./assets/images/awesome.png')
    });
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    var object3d = new THREE.Sprite(material);
    // object3d.scale.set(1, 1, 1).multiplyScalar(1);
    object3d.position.z = 5;
    object3d.position.y = 1;
    markerObject3D.add(object3d);

    onRenderFcts.push(function (now, delta) {
        var angle = Math.PI * now / 1000;
        object3d.position.z = 1.4 + Math.cos(angle) * 0.1;

        var angle = Math.PI * now / 1000;
        object3d.position.x = 0 + Math.sin(angle) * 0.1;
    });
}

function initMMD() {
    var loader = new THREE.MMDLoader();
    var pmdFile = './assets/models/miku/miku_v2.pmd';
    var vmdFile = './assets/models/miku/wavefile_v2.vmd';
    loader.load(pmdFile, vmdFile, function onLoad(mesh) {

        mesh.scale.set(1, 1, 1).multiplyScalar(1 / 10);
        // mesh.scale.set(1, 1, 1).multiplyScalar(1 / 5);
        // mesh.rotation.x = 0;
        mesh.position.y = -1.2;

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

        new THREE.OrbitControls(camera, renderer.domElement);
        initAudio();
    }, function onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }

    }, function onError(xhr) {});
}

function initAnimate() {
    var previousTime = performance.now();
    requestAnimationFrame(function animate(now) {

        requestAnimationFrame(animate);

        onRenderFcts.forEach(function (onRenderFct) {
            onRenderFct(now, now - previousTime);
        });

        previousTime = now;
    });
}


function initVideo() {
    var videoGrabbing = new THREEx.WebcamGrabbing();
    container.appendChild(videoGrabbing.domElement);
}

function initAudio() {
    var soundUrl = './assets/sounds/wavefile_short.mp3';
    var audio = new Audio(soundUrl);
    audio.play();
}

function initEnv() {
    if (parent === window) {
        new THREE.OrbitControls(camera, renderer.domElement);
    }
    else {
        document.getElementById('container').onclick = function () {
            window.open(location.href);
        };
    }
}

function initResize() {
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }, false);
}

function init() {
    initScene();
    initLight();
    // initLogo();
    initMMD();
    // initStage();
    initVideo();
    initAnimate();

    initEnv();
    initResize();
}

init();
