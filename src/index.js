const fs = require('fs');
// ページの読み込みを待つ
window.addEventListener('load', init);

class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Line{
  constructor(ptS, ptE){
    this.ptS = ptS;
    this.ptE = ptE;
    this.Normalize();
  }

  isX(){
    return (Math.abs(this.ptS.x - this.ptE.x) < 0.001)
  }

  Normalize(){
    if (this.isX()){
      if( this.ptS.x > this.ptE.x ){
        const temp = this.ptS;
        this.ptS = this.ptE;
        this.ptE = temp;
      }
    }
    else{
      if( this.ptS.y > this.ptE.y ){
        const temp = this.ptS;
        this.ptS = this.ptE;
        this.ptE = temp;
      }
    }
  }
}

function createLine(line){
  const Cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry( 3, 3, Math.sqrt( (line.ptS.x - line.ptE.x)**2 + (line.ptS.y - line.ptE.y)**2 ), 100),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  Cylinder.position.set((line.ptS.x + line.ptE.x)/2, 0, (line.ptS.y + line.ptE.y)/2);
  if(Math.abs(line.ptS.x - line.ptE.x) < 0.0001 ){
    Cylinder.rotation.set(Math.PI/2,0,0);
  }else{
    Cylinder.rotation.set(0,0,Math.PI/2);
  }

  return Cylinder;
}

//指定したファイルを読み込む
function readFile(path) {
  fs.readFile(path, (error, data) => {
      if (error != null) {
          alert("file open error.");
          return;
      }
      preview.textContent = data.toString();
  })
}

function init() {

  // 1. canvas
  const canvas = document.querySelector("#myCanvas")
  const width = 600;
  const height = 500;

  // 2. scene
  const scene = new THREE.Scene();

  // ライトを作成
  const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  scene.add(light);

  //readFile("test.txt");

  {
    const ptS = new Point(0,0);
    const ptE = new Point(0,100);
    const line = new Line(ptS, ptE);
    scene.add(createLine(line));
  }
  {
    const ptS = new Point(0,100);
    const ptE = new Point(100,100);
    const line = new Line(ptS, ptE);
    scene.add(createLine(line));
  }
  {
    const ptS = new Point(100,100);
    const ptE = new Point(100,0);
    const line = new Line(ptS, ptE);
    scene.add(createLine(line));
  }
  {
    const ptS = new Point(100,0);
    const ptE = new Point(0,0);
    const line = new Line(ptS, ptE);
    scene.add(createLine(line));
  }

  // 4. camera
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);

  // 4-2. camera controls
  var controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // 5. renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xf0d0d0);
  renderer.setPixelRatio(window.devicePixelRatio);

  // 6. animate
  const animate = () => {
    // next frame
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    // render
    renderer.render(scene, camera);
  };

  animate();

}