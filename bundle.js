(() => {
  // 1. Configuração dos módulos internos e injeção do Image Target + SLAM
  var e = {
    574(e, a, t) {
      const r = () => {
        console.log("📍 Inicializando Sistema Híbrido: Image Target + SLAM...");
        
        // Dados do seu marcador original (marker.json)
        const myImageTarget = {
          "type": "PLANAR",
          "properties": { "top": 0, "left": 144, "width": 941, "height": 1254, "isRotated": false, "originalWidth": 1254, "originalHeight": 1254 },
          "imagePath": "image-targets/marker_luminance.png",
          "name": "marker"
        };

        // Força a ativação do SLAM (disableSlam: false) junto com o seu marcador
        XR8.XrController.configure({ 
          imageTargetData: [myImageTarget],
          disableSlam: false
        });
      };
      window.XR8 ? r() : window.addEventListener("xrloaded", r);
    }
  },
  a = {};

  // Gerenciador de dependências nativo
  function t(r) {
    var n = a[r];
    if (void 0 !== n) return n.exports;
    var d = a[r] = { exports: {} };
    return e[r](d, d.exports, t), d.exports;
  }

  // Inicialização principal da cena e dos componentes ECS
  (() => {
    "use strict";
    
    // Executa o módulo de configuração do XR8 (Target + SLAM)
    t(574);
    
    let isObjectAnchored = false;

    // Registra o componente que vai controlar o comportamento do seu Cubo
    window.ecs.registerComponent({
      name: "example-component", 
      add: () => {
        console.log("🤖 Componente de persistência CeiRyu ativado.");
        
        // Escuta o evento global de imagem encontrada pela câmera
        window.addEventListener('reality.imagefound', (event) => {
          if (event.detail.name === 'marker') {
            // Se o cubo já foi fixado no mundo uma vez, ignoramos novas leituras
            if (isObjectAnchored) return;

            console.log("🎯 Logo detectado! Posicionando e fixando o cubo padrão no cenário real...");
            
            // Localiza a entidade do seu Cubo Padrão dentro da Engine ECS
            const cubeEntity = window.ecs.application.getEntity("e35dbf9c-8de2-468e-9449-f9563e988696");
            
            if (cubeEntity) {
              const { position, rotation, scale } = event.detail;
              
              // Define a posição tridimensional do cubo baseada no marcador
              cubeEntity.position.set(position.x, position.y, position.z);
              cubeEntity.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
              
              // Define a escala proporcional ao marcador
              cubeEntity.scale.set(scale, scale, scale);
              
              // Torna o cubo visível e ativa a trava permanente
              cubeEntity.visible = true; 
              isObjectAnchored = true; 
            }
          }
        });

        // Escuta o evento de perda do marcador
        window.addEventListener('reality.imagelost', (event) => {
          if (event.detail.name === 'marker') {
            // O marcador sumiu, mas mantemos o cubo visível no mundo via SLAM
            console.log("📍 O logo saiu de vista, mas o cubo padrão permanece fixo no espaço.");
          }
        });
      }
    });

    // Árvore de objetos ECS configurada com um cubo nativo (Sem GLB externo)
    const sceneData = JSON.parse('{' +
      '"objects": {' +
        '"47699d9e-18a5-4f88-a4f9-b8be92e8f74a": {' +
          '"components": {},' +
          '"geometry": null,' +
          '"id": "47699d9e-18a5-4f88-a4f9-b8be92e8f74a",' +
          '"light": {"type": "ambient"},' +
          '"material": null,' +
          '"name": "Ambient Light",' +
          '"position": [10, 5, 5],' +
          '"rotation": [0, 0, 0, 1],' +
          '"scale": [1, 1, 1],' +
          '"parentId": "88453035-dc0f-486d-868a-8ff7c2fda864",' +
          '"order": 0.4038940050501252' +
        '},' +
        '"a608ddd9-9379-464d-966f-5d8d8674c83c": {' +
          '"camera": {' +
            '"type": "perspective",' +
            '"xr": {' +
              '"desktop": "disabled",' +
              '"xrCameraType": "world",' +
              '"headset": "disabled",' +
              '"phone": "AR"' +
            '}' +
          '},' +
          '"components": {' +
            '"example-component": {}' + 
          '},' +
          '"geometry": null,' +
          '"id": "a608ddd9-9379-464d-966f-5d8d8674c83c",' +
          '"material": null,' +
          '"name": "Camera",' +
          '"position": [0, 2, 3],' +
          '"rotation": [0.0004436887233141012, 0.9659425615285845, -0.25875089860082223, 0.0016563336561801576],' +
          '"scale": [1, 1, 1],' +
          '"parentId": "88453035-dc0f-486d-868a-8ff7c2fda864",' +
          '"order": 1.0308214152219775' +
        '},' +
        '"ac1989e3-3b71-49e2-a05f-e682aeb18c36": {' +
          '"components": {},' +
          '"geometry": null,' +
          '"id": "ac1989e3-3b71-49e2-a05f-e682aeb18c36",' +
          '"light": {"intensity": 1, "type": "directional"},' +
          '"material": null,' +
          '"name": "Directional Light",' +
          '"position": [20, 50, 10],' +
          '"rotation": [0, 0, 0, 1],' +
          '"scale": [1, 1, 1],' +
          '"parentId": "88453035-dc0f-486d-868a-8ff7c2fda864",' +
          '"order": 0.6644431107322474' +
        '},' +
        '"e35dbf9c-8de2-468e-9449-f9563e988696": {' +
          '"id": "e35dbf9c-8de2-468e-9449-f9563e988696",' +
          '"position": [0, 0, 0],' +
          '"rotation": [0, 0, 0, 1],' +
          '"scale": [1, 1, 1],' +
          '"geometry": {"primitive": "box"},' + 
          '"material": {"color": "#FF0000"},' + 
          '"parentId": "88453035-dc0f-486d-868a-8ff7c2fda864",' +
          '"components": {},' +
          '"name": "Default Cube",' +
          '"visible": false,' + 
          '"order": 2.0' +
        '}' +
      '},' +
      '"spaces": {' +
        '"88453035-dc0f-486d-868a-8ff7c2fda864": {' +
          '"id": "88453035-dc0f-486d-868a-8ff7c2fda864",' +
          '"name": "Default Space",' +
          '"activeCamera": "a608ddd9-9379-464d-966f-5d8d8674c83c"' +
        '}' +
      '},' +
      '"entrySpaceId": "88453035-dc0f-486d-868a-8ff7c2fda864"' +
    '}');

    delete sceneData.history,
    delete sceneData.historyVersion,
    window.ecs.application.init(sceneData);
  })();
})();