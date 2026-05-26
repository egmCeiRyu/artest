(() => {
  "use strict";

  // =============================================
  // 1. CONFIGURAÇÃO DO IMAGE TARGET
  // =============================================
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

  // =============================================
  // 2. CÓDIGO DO CUBO DE TESTE
  // =============================================
  let cubeAnchored = false;

  const hideModule = {
    name: "hide-on-start",
    onStart: () => {
      console.log("🚀 Teste com Cubo iniciado");
    }
  };

  const anchorModule = {
    name: "marker-anchoring",
    listeners: [
      {
        event: "reality.imagefound",
        process: ({ detail }) => {
          if (detail.name !== "marker" || cubeAnchored) return;

          const { scene } = XR8.Threejs.xrScene();

          // Cria o cubo de teste (se ainda não existir)
          let cube = scene.getObjectByName("TestCube");
          if (!cube) {
            const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
            const material = new THREE.MeshPhongMaterial({ 
              color: 0x00ff00,
              shininess: 30 
            });
            cube = new THREE.Mesh(geometry, material);
            cube.name = "TestCube";
            scene.add(cube);
            console.log("🟩 Cubo criado");
          }

          // Posiciona o cubo no marker
          const { position } = detail;
          cube.position.set(position.x, position.y, position.z);
          
          // Fix para evitar tremor
          cube.matrixAutoUpdate = false;
          cube.updateMatrix();

          cube.visible = true;
          cubeAnchored = true;

          console.log("✅ Cubo ancorado com sucesso!");

          // Desativa Image Target depois de ancorar
          XR8.XrController.configure({ imageTargetsEnabled: false });
        }
      }
    ]
  };

  const initPipeline = () => {
    XR8.addCameraPipelineModule(hideModule);
    XR8.addCameraPipelineModule(anchorModule);
    console.log("📍 Sistema de teste com cubo carregado");
  };

  if (window.XR8) initPipeline();
  else window.addEventListener("xrloaded", initPipeline);

  // =============================================
  // 3. INICIALIZAÇÃO DA CENA (Mínima)
  // =============================================
  t(574);

  console.log("✅ Bundle com Cubo de Teste carregado!");
})();