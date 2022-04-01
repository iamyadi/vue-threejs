import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Core from "../../../engine/core";

export default class HouseGame extends Core {
  gltfLoader!: GLTFLoader;
  constructor() {
    super();
    this.initHouse();
    this.createAxeshelp();
    this.run();
  }
  initHouse(){
    this.createEngine();
    this.addModel();
  }
  setPath(){
     this.gltfLoader = new GLTFLoader().setPath("/src/model/");
  }
  addModel() {
    this.setPath();
    // const path = 'https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf'
    this.gltfLoader.load("1_lever_yellow1.gltf", (gltf) => {
      const root = gltf.scene;
      this.group.add(root);
      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      this.frameArea(boxSize * 0.5, boxSize, boxCenter, this.camera);
      // update the Trackball controls to handle the new size
      this.controls.maxDistance = boxSize * 10;
      this.controls.target.copy(boxCenter);
      this.controls.update();
    });
  }
}
