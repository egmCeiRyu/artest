(() => {
  "use strict";

  console.log("🚀 Iniciando projeto de teste: Cubo sobre Image Target");

  let scene, camera, renderer, cube;
  let isTargetFound = false;

  // 1. Configuração do Image Target (mantendo sua lógica do marker.json)
  var e = {
    574(e, a, t) {
      const r = () => {
        console.log("📍 Configurando Image Target...");
        XR8.XrController.configure({ 
          imageTargetData: [t(43)] 
        });
      };
      window.XR8 ? r() : window.addEventListener("xrloaded", r);
    },
    43(e) {
      "use strict";
      // Seu JSON original do marker.json
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

  // 2. Módulo de Realidade Aumentada (Pipeline Module)
  const arCubeModule = {
    name: "ar-cube-test",

    // Executado quando a câmera inicia
    onStart: ({ canvasWidth, canvasHeight }) => {
      console.log("✅ Câmera liberada. Inicializando cena 3D...");
      
      // Inicializa a cena do Three.js usando a biblioteca interna/externa da 8th Wall
      const THREE = window.THREE || XR8.Threejs.three();
      
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, canvasWidth / canvasHeight, 0.01, 1000);
      
      // Cria um cubo vermelho simples
      const geometry = new THREE.BoxGeometry(1, 1, 1); // Tamanho do cubo
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
      cube = new THREE.Mesh(geometry, material);
      
      // Oculta o cubo inicialmente até encontrar o marcador
      cube.visible = false;
      scene.add(cube);

      // Adiciona uma luz básica
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1).normalize();
      scene.add(light);
    },

    // Sincroniza a câmera do Three.js com o movimento real do celular
    onUpdate: ({ processCpuResult }) => {
      if (!processCpuResult.reality) return;

      const { rotation, position, intrinsics } = processCpuResult.reality;
      
      // Atualiza a posição da câmera virtual para bater com o mundo real
      if (rotation && position) {
        camera.position.set(position.x, position.y, position.z);
        camera.quaternion.set(rotation.x, rotation.rotationY, rotation.z, rotation.w); // Ajuste básico de rotação
      }
    },

    // Detecta o Image Target na tela
    onRealityImageScanning: (e) => {
      // Se encontrar o marcador cadastrado com o nome "marker"
      if (e.detail.name === "marker") {
        console.log("🎯 Marcador detectado!");
        
        const { position, rotation, scale } = e.detail;
        
        // Posiciona o cubo exatamente onde o marcador está no mundo real
        cube.position.set(position.x, position.y, position.z);
        cube.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
        
        // Ajusta a escala do cubo proporcionalmente ao tamanho do marcador
        cube.scale.set(scale, scale, scale);
        cube.visible = true;
      }
    },

    // O que fazer se o marcador sumir da câmera
    onRealityImageLost: (e) => {
      if (e.detail.name === "marker") {
        console.log("❌ Marcador perdido de vista");
        cube.visible = false;
      }
    }
  };

  // 3. Inicialização
  const init = () => {
    // Adiciona o módulo customizado e o módulo de renderização de Three.js da própria 8th Wall
    XR8.addCameraPipelineModule(XR8.GlTextureRenderer.pipelineModule());
    XR8.addCameraPipelineModule(XR8.Threejs.pipelineModule()); // Garante o motor 3D rodando
    XR8.addCameraPipelineModule(arCubeModule);
    
    console.log("📱 Módulos prontos. Aguardando permissão.");
  };

  if (window.XR8) {
    init();
  } else {
    window.addEventListener("xrloaded", init);
  }

  // Executa a configuração do target
  t(574);

})();