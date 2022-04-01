import * as THREE from "three";
import { Mesh } from "three";
import gsap from "gsap";
import Core from "../../../engine/core";

export default class OrbitCube extends Core {
  cube!: THREE.Mesh<THREE.BoxGeometry, THREE.Material | THREE.Material[]>;
  guiParams: { cubeColor: string; animate: boolean};
  cubeMaterial!: THREE.MeshBasicMaterial;
  geometry!: THREE.BoxGeometry;
  constructor() {
    super();
    this.initEvent();
    this.createEngine();
    this.createAxeshelp();
    this.createControls()
    this.controls.enableDamping = true
    this.guiParams = {
      cubeColor: '#5aca74',
      animate: true
    }
    this.createCube();
    this.addGui();
    this.render();
  }
  addGui=()=>{
    this.createGui()
    const f = this.gui.addFolder('cube')
    f.add(this.cube.position, 'x', -8, 8, 0.01).name('cubeX')
    f.add(this.cube.position, 'y', -8, 8, 0.01).name('cubeY')
    f.add(this.cube.position, 'z', -5, 8, 0.01).name('cubeZ')
    f.addColor(this.guiParams, 'cubeColor')
    .onChange((value)=>{
      this.cubeMaterial.setValues({color: value})
    })
    f.open()
    this.gui.add(this.guiParams, 'animate').onChange(value=>{
      this.animation()
    }).name('cube rotate')
  }
  animation = () => {
    gsap.to(this.cube.rotation, {
      duration: 1,
      y: this.cube.rotation.y === 3.14 ? 0: 3.14,
    })
  }
  createCube() {
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: this.guiParams.cubeColor })
    const cube = new THREE.BoxGeometry(2, 2, 2)
    this.cubeMaterial = cubeMaterial
    this.geometry = cube
    this.cube = new Mesh(
      cube,
      cubeMaterial
    );
    this.group.add(this.cube);
  }
  render() {
    this.run();
  }
}
