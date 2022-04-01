import * as THREE from "three";
import Core from "../../../engine/core";

export default class Cube extends Core {
  cube1!: THREE.Mesh<THREE.BoxGeometry, THREE.Material | THREE.Material[]>;
  cube2!: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  cursor: { x: any; y: any };
  constructor() {
    super();
    this.cursor = {
      x: 0,
      y: 0,
    };
    this.initEvent();
    this.createEngine();
    this.createCube();
    this.render();
    this.createAxeshelp();
  }
  initEvent() {
    document.addEventListener("mousemove", this.mouseMoveHandler);
  }
  mouseMoveHandler = (event: any) => {
    this.cursor = {
      x: -(event.clientX / this.size.x - 0.5),
      y: -(0.5 - event.clientY / this.size.y),
    };
  };
  updateCamera = () => {
    this.camera.position.x = Math.sin(2 * Math.PI * this.cursor.x) * 3;
    this.camera.position.z = Math.cos(2 * Math.PI * this.cursor.x) * 3;
    this.camera.position.y = this.cursor.y * 10;
    this.camera.lookAt(this.cube1.position);
  };
  createCube() {
    this.cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: "blue" })
    );
    this.group.add(this.cube1);
  }
  render() {
    this.run();
  }
  run = () => {
    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.run.bind(this));
  };
}
