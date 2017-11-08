window.THREEx = window.THREEx || {};

/**
 * Grab camera
 */
window.THREEx.VideoGrabbing = function(){

	var domElement	= document.createElement('video')
	domElement.setAttribute('autoplay', true)
	domElement.setAttribute('loop', true)
	domElement.setAttribute('muted', true)
	this.domElement = domElement

	domElement.src = './assets/videos/markerVideo.mp4'

	domElement.style.zIndex = -1;
        domElement.style.position = 'absolute'

	domElement.style.top = '0px'
	domElement.style.left = '0px'
	domElement.style.width = '100%'
	domElement.style.height = '100%'
}
