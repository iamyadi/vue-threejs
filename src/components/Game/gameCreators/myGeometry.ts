import * as THREE from "three";
import { Mesh } from "three";
import Core from "../../../engine/core";

export default class MyGeometry extends Core {
  myGeometry: any;
  clock!: THREE.Clock;
  constructor() {
    super();
    this.createEngine();
    this.createAxeshelp();
    this.createControls();
    this.controls.enableDamping = true;
    this.buildMyGeometry();
    this.createClock();
    this.run();
  }
  createClock = () => {
    this.clock = new THREE.Clock(true);
  };
  buildMyGeometry = () => {
    const geometry = new THREE.BufferGeometry();
    // const points = [];
    // for (let i = 0; i < 50; i++) {
    //   for (let j = 0; j < 3; j++) {
    //     points.push(
    //       new THREE.Vector3(
    //         (Math.random() - 0.5) * 10,
    //         (Math.random() - 0.5) * 10,
    //         (Math.random() - 0.5) * 10
    //       )
    //     );
    //   }
    // }
    // geometry.setFromPoints(points);
    const vertext = new Float32Array([
      0,0,0,
      0,1,0,
      0,0,1,
    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertext, 3))
    geometry.computeVertexNormals();

    this.myGeometry = new Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: "red",
        wireframe: true,
      })
    );

    this.group.add(this.myGeometry);
  };
  run() {
    this.group.rotateY(this.clock.getDelta());
    this.controls && this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.run.bind(this));
  }
}
