import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui';

export default class Core {
  renderer!: THREE.WebGLRenderer;
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  controls!: OrbitControls;
  group!: THREE.Group;
  axes!: THREE.AxesHelper;
  size!: { x: number; y: number };
  gui!: dat.GUI;
  canvas!: HTMLCanvasElement;
  createEngine() {
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGroup();
    this.initEvent();
  }
  createGui = ()=>{
    this.gui = new dat.GUI()
  }
  initEvent = () => {
    document.addEventListener("dblclick", this.handleDblclick);
    window.addEventListener("resize", this.handleResize);
  };
  handleResize = () => {
    this.size = {
      x: window.innerWidth,
      y: window.innerHeight,
    };
    // update camera
    this.camera.aspect = this.size.x / this.size.y;
    this.camera.updateProjectionMatrix();
    // update renderer
    this.renderer.setSize(this.size.x, this.size.y);
  };
  handleDblclick = () => {
    const canvas = document.getElementsByTagName("canvas")[0];
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      canvas.requestFullscreen();
    }
  };
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.size = {
      x: window.innerWidth,
      y: window.innerHeight,
    };
    this.renderer.setSize(this.size.x, this.size.y);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    this.canvas = this.renderer.domElement;
    document.body.appendChild(this.canvas);
  }
  createCamera() {
    const fov = 75;
    const aspect = this.size.x / this.size.y; // the canvas default
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.lookAt(0, 0, 0);
    this.camera.position.set(0, 0, 10);
  }
  createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("black");
  }
  createGroup() {
    this.group = new THREE.Group();
    this.scene.add(this.group);
  }
  createAxeshelp() {
    this.axes = new THREE.AxesHelper(100);
    this.scene.add(this.axes);
  }
  createControls() {
    const canvas = this.renderer.domElement;
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.update();
  }
  createLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    this.scene.add(light);
    this.scene.add(light.target);
  }
  frameArea(sizeToFitOnScreen: any, boxSize: any, boxCenter: any, camera: any) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = new THREE.Vector3()
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();
  }
  run() {
    this.controls && this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.run.bind(this));
  }
}
