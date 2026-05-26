(() => {
  "use strict";

  console.log("🚀 Iniciando motor AR CeiRyu...");

  // Configuração dos dados do Image Target (Seu JSON original)
  const imageTargetData = {
    "type": "PLANAR",
    "properties": { "top": 0, "left": 144, "width": 941, "height": 1254, "isRotated": false, "originalWidth": 1254, "originalHeight": 1254 },
    "imagePath": "image-targets/marker_luminance.png",
    "name": "marker"
  };

  let cube;

  // Módulo customizado para controlar o cubo
  const cCubeModule = () => {
    const THREE = window.XRExtras.ThreeExtras.three(); // Pega o Three.js interno da 8th Wall

    return {
      name: "ceiryu-cube",
      
      // Executa quando a cena 3D interna estiver pronta
      onStart: ({scene}) => {
        // Cria o cubo vermelho de teste
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        cube = new THREE.Mesh(geometry, material);
        
        cube.visible = false; // Esconde até achar o target
        scene.add(cube);

        // Adiciona uma luz na cena
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      },

      // Executa a cada frame rastreando o mundo real
      onUpdate: () => {
        if (cube && cube.visible) {
          cube.rotation.y += 0.01; // Dá um efeito de rotação no cubo
        }
      },

      // Escuta os eventos de imagem encontrada/perdida
      listeners: [
        {
          event: 'reality.imagefound',
          process: (e) => {
            if (e.detail.name === 'marker') {
              console.log("🎯 Marcador Encontrado!");
              cube.visible = true;
              
              // Posiciona o cubo no marcador
              const {position, rotation, scale} = e.detail;
              cube.position.set(position.x, position.y, position.z);
              cube.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
              cube.scale.set(scale, scale, scale);
            }
          }
        },
        {
          event: 'reality.imagelost',
          process: (e) => {
            if (e.detail.name === 'marker') {
              console.log("❌ Marcador Perdido");
              cube.visible = false;
            }
          }
        }
      ]
    };
  };

  const init = () => {
    // Configura o target de imagem no controlador principal
    XR8.XrController.configure({ imageTargetData: [imageTargetData] });

    // Adiciona os módulos necessários para ligar a câmera e renderizar o 3D automaticamente
    XR8.addCameraPipelineModule(XR8.GlTextureRenderer.pipelineModule());
    XR8.addCameraPipelineModule(XR8.Threejs.pipelineModule());
    XR8.addCameraPipelineModule(cCubeModule());

    // Abre a câmera de fato!
    XR8.run({ canvas: document.getElementById('camerafeed') || undefined });
  };

  // Carrega o motor de AR
  window.addEventListener('xrloaded', init);

})();