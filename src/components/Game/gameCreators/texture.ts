import * as THREE from "three";
import { Mesh } from "three";
import Core from "../../../engine/core";

export default class MyGeometry extends Core {
  myGeometry: any;
  clock!: THREE.Clock;
  material!: THREE.MeshBasicMaterial;
    plane!: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    sphere!: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
    cube!: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
    torus!: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>;

  constructor() {
    super();
    this.createEngine();
    this.createAxeshelp();
    this.createControls();
    this.controls.enableDamping = true;
    this.createClock();
    this.generateObj();
    this.run();
  }

  generateObj = () => {
    this.material = new THREE.MeshBasicMaterial()

    const textLoader = new THREE.TextureLoader().setPath('../../../../src/')
    textLoader.load('assets/texture/Material_1953.jpg', (texture)=>{
        this.material.map = texture
        this.material.needsUpdate = true
    }, ()=>{}, (e)=>{
        console.log('textLoader err:', e)
    })

    this.sphere = new Mesh(
        new THREE.SphereBufferGeometry(1),
        this.material
    )
    this.plane = new Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        this.material
    )
    this.torus = new Mesh(
        new THREE.TorusBufferGeometry(1),
        this.material
    )
    this.cube = new Mesh(
        new THREE.BoxGeometry(1,1,1),
        this.material
    ) 
    this.sphere.position.x = -2
    this.torus.position.x = 2
    this.cube.position.y = -2
    this.group.add(this.sphere, this.plane, this.torus, this.cube)
  }

  createClock = () => {
    this.clock = new THREE.Clock(true);
  };

  run() {
    this.cube.rotation.x = this.clock.getElapsedTime() * 0.2
    this.cube.rotation.y= this.clock.getElapsedTime() * 0.1

    this.sphere.rotation.x = this.clock.getElapsedTime() * 0.2
    this.sphere.rotation.y= this.clock.getElapsedTime() * 0.1

    this.plane.rotation.x = this.clock.getElapsedTime() * 0.2
    this.plane.rotation.y= this.clock.getElapsedTime() * 0.1
    

    this.torus.rotation.x = this.clock.getElapsedTime() * 0.2
    this.torus.rotation.y= this.clock.getElapsedTime() * 0.1

    this.controls && this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.run.bind(this));
  }
}
