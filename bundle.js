(() => {
  "use strict";

  // Configuração do Image Target
  var e = {
    574(e, a, t) {
      const r = () => {
        XR8.XrController.configure({ imageTargetData: [t(43)] });
      };
      window.XR8 ? r() : window.addEventListener("xrloaded", r);
    },
    43(e) {
      "use strict";
      e.exports = JSON.parse('{"type":"PLANAR","properties":{"top":0,"left":144,"width":941,"height":1254,"isRotated":false,"originalWidth":1254,"originalHeight":1254},"imagePath":"image-targets/marker_luminance.png","metadata":{"type":"PLANAR","properties":{"top":0,"left":144,"width":941,"height":1254,"isRotated":false,"originalWidth":1254,"originalHeight":1254},"imagePath":"image-targets/marker_luminance.png","metadata":null,"name":"marker","resources":{"originalImage":"marker_original.png","croppedImage":"marker_cropped.png","thumbnailImage":"marker_thumbnail.png","luminanceImage":"marker_luminance.png"},"created":1777364648883,"updated":1777366647349},"name":"marker","resources":{"originalImage":"marker_original.png","croppedImage":"marker_cropped.png","thumbnailImage":"marker_thumbnail.png","luminanceImage":"marker_luminance.png"},"created":1777364648883,"updated":1777367342718}');
    }
  };

  var a = {};
  function t(r) {
    var n = a[r];
    if (void 0 !== n) return n.exports;
    var d = a[r] = { exports: {} };
    return e[r](d, d.exports, t), d.exports;
  }

  let anchored = false;

  const anchorModule = {
    name: "test-cube",
    listeners: [{
      event: "reality.imagefound",
      process: ({ detail }) => {
        if (detail.name !== "marker" || anchored) return;

        const { scene } = XR8.Threejs.xrScene();

        let cube = scene.getObjectByName("TestCube");
        if (!cube) {
          const geo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
          const mat = new THREE.MeshPhongMaterial({ color: 0x00ff88 });
          cube = new THREE.Mesh(geo, mat);
          cube.name = "TestCube";
          scene.add(cube);
        }

        cube.position.set(detail.position.x, detail.position.y, detail.position.z);
        cube.matrixAutoUpdate = false;
        cube.updateMatrix();
        cube.visible = true;

        anchored = true;

        console.log("✅ Cubo ancorado!");

        // ================== DESATIVA O IMAGE TARGET ==================
        console.log("⛔ Desativando Image Target...");
        
        XR8.XrController.configure({ 
          imageTargetsEnabled: false 
        });

        // Desativa também o objeto Image Target na cena
        const imageTargetObj = scene.getObjectByName("Image Target");
        if (imageTargetObj) {
          imageTargetObj.visible = false;
        }
      }
    }]
  };

  const init = () => {
    XR8.addCameraPipelineModule(anchorModule);
    console.log("🧪 Bundle carregado - Aponte para o marker (Image Target será desativado após scan)");
  };

  if (window.XR8) init();
  else window.addEventListener("xrloaded", init);

  t(574);
})();