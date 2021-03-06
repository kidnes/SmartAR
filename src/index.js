/**
 * @file mmd
 *
 * @author liubin29@baidu.com
 * 2017年11月7日
 */

import * as THREE from 'three';

import 'three/examples/js/libs/mmdparser.min.js';
import 'three/examples/js/libs/ammo.js';
import 'three/examples/js/loaders/TGALoader.js';
import 'three/examples/js/animation/MMDPhysics.js';
import 'three/examples/js/animation/CCDIKSolver.js';
import 'three/examples/js/effects/OutlineEffect.js';
import 'three/examples/js/loaders/MMDLoader.js';

import 'three/examples/js/controls/OrbitControls.js';

import WebcamGrabbing from './common/webcamgrabbing';

var renderer, scene, camera;
var markerObject3D;

var onRenderFcts = [];

var config = {};

var clock = new THREE.Clock();

var container = document.getElementById('container');

function initScene() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // init scene and camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 40;

    markerObject3D = new THREE.Object3D();
    scene.add(markerObject3D);

    onRenderFcts.push(function () {
        renderer.render(scene, camera);
    });
}

function initConfig() {
    config = {
        1: {
            mmd: './assets/models/miku/miku_v2.pmd',
            vmd: ['./assets/models/miku/wavefile_v2.vmd'],
            audio: './assets/sounds/wavefile_short.mp3'
        }
    }
}

function initLight() {
    // var object3d = new THREE.AmbientLight(0x101010);
    // object3d.name = 'Ambient light';
    // scene.add(object3d);
    // var object3d = new THREE.DirectionalLight('white', 0.1 * 1.6);
    // object3d.position.set(2.6, 1, 3).setLength(1);
    // object3d.name = 'Back light';
    // scene.add(object3d);

    // var object3d = new THREE.DirectionalLight('white', 0.375 * 1.6);
    // object3d.position.set(-2, -1, 0);
    // object3d.name = 'Key light';
    // scene.add(object3d);
    // var object3d = new THREE.DirectionalLight('white', 0.8 * 1);
    // object3d.position.set(3, 3, 2);
    // object3d.name = 'Fill light';
    // scene.add(object3d);

    var ambient = new THREE.AmbientLight(0x101010);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight('white', 0.8 * 1);
    directionalLight.position.set(-1, 1, 1).normalize();
    scene.add(directionalLight);
}

function initLogo() {
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

        object3d.position.x = 0 + Math.sin(angle) * 0.1;
    });
}

function initMMD() {
    var pmdFile = './assets/models/miku/miku_v2.pmd';
    var vmdFile = ['./assets/models/miku/wavefile_v2.vmd'];

    var loader = new THREE.MMDLoader();
    loader.load(pmdFile, vmdFile, function onLoad(mesh) {
        mesh.position.y = -10;
        markerObject3D.add(mesh);

        var helper = new THREE.MMDHelper();
        helper.add(mesh);
        helper.setAnimation(mesh);

        // var ikHelper = new THREE.CCDIKHelper(mesh);
        // ikHelper.visible = false;
        // markerObject3D.add(ikHelper);

        // helper.setPhysics(mesh);
        // var physicsHelper = new THREE.MMDPhysicsHelper(mesh);
        // physicsHelper.visible = false;
        // markerObject3D.add(physicsHelper);

        helper.unifyAnimationDuration({
            afterglow: 2.0
        });

        onRenderFcts.push(function (now, delta) {
            helper.animate(clock.getDelta());
            // if (physicsHelper !== undefined && physicsHelper.visible) {
            //     physicsHelper.update();
            // }

            // if (ikHelper !== undefined && ikHelper.visible) {
            //     ikHelper.update();
            // }

            onMaterialLoad();
        });
    }, function onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }

    }, function onError(xhr) {});
}

function onMaterialLoad() {
    let elem = document.getElementById('action');
    elem.style.display = 'block';
    elem.onclick = function () {
    };

    initAudio();
}

function initStage() {
    var geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
    var material = new THREE.MeshBasicMaterial({
        wireframe: true
    });
    var mesh = new THREE.Mesh(geometry, material);
    markerObject3D.add(mesh);

    var mesh = new THREE.AxisHelper();
    markerObject3D.add(mesh);
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

function initWebcam() {
    var videoGrabbing = new WebcamGrabbing();

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

function init() {
    initScene();
    initLight();
    // initLogo();
    initMMD();
    // initStage();

    initWebcam();

    initAnimate();

    initEnv();

    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }, false);
}

init();

