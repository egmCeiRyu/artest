(() => {
  "use strict";

  console.log("🚀 Iniciando Motor AR Local (SLAM + Image Target)");

  // Seu JSON original do marker.json
  var e = {
    574(e, a, t) {
      const r = () => {
        console.log("📍 Configurando Image Target e SLAM...");
        // Força a ativação do SLAM na engine local junto com o Image Target
        XR8.XrController.configure({ 
          imageTargetData: [t(43)],
          disableSlam: false 
        });
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

  let scene, camera, cube;
  let isCubeAnchored = false;

  // Módulo básico adaptado para rodar sem dependências externas da nuvem
  const arModule = {
    name: "ceiryu-local-module",
    
    onStart: ({ canvasWidth, canvasHeight }) => {
      console.log("✅ Câmera liberada no motor local.");
      
      // Tenta pegar o THREE integrado no pacote local
      const THREE = window.THREE || (window.XR8 && XR8.Threejs ? XR8.Threejs.three() : null);
      if (!THREE) {
        console.error("❌ Three.js não encontrado no escopo global.");
        return;
      }

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, canvasWidth / canvasHeight, 0.01, 1000);
      
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      cube = new THREE.Mesh(geometry, material);
      cube.visible = false;
      scene.add(cube);

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    },

    onUpdate: ({ processCpuResult }) => {
      if (cube && cube.visible) {
        cube.rotation.y += 0.01;
      }

      // Sincroniza posição tridimensional da câmera caso o SLAM local responda
      if (processCpuResult && processCpuResult.reality) {
        const { rotation, position } = processCpuResult.reality;
        if (rotation && position && camera) {
          camera.position.set(position.x, position.y, position.z);
          camera.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
        }
      }
    },

    // Detecção usando os eventos do pipeline local
    onRealityImageScanning: (e) => {
      if (e.detail.name === "marker") {
        if (isCubeAnchored) return; // Se já fixou, não mexe mais

        console.log("🎯 Logo detectado! Fixando objeto...");
        const { position, rotation, scale } = e.detail;
        
        cube.position.set(position.x, position.y, position.z);
        cube.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
        cube.scale.set(scale, scale, scale);
        
        cube.visible = true;
        isCubeAnchored = true; // Trava o cubo no cenário
      }
    },

    onRealityImageLost: (e) => {
      if (e.detail.name === "marker") {
        // Ignoramos o sumiço para manter o cubo persistente na tela
        console.log("📍 Marcador perdido, mas objeto mantido via SLAM.");
      }
    }
  };

  const init = () => {
    if (window.XR8) {
      XR8.addCameraPipelineModule(XR8.GlTextureRenderer.pipelineModule());
      if (XR8.Threejs) XR8.addCameraPipelineModule(XR8.Threejs.pipelineModule());
      XR8.addCameraPipelineModule(arModule);
      console.log("📱 Inicializando módulos locais...");
    }
  };

  if (window.XR8) {
    init();
  } else {
    window.addEventListener("xrloaded", init);
  }

  t(574);

})();