(() => {
  // Definição dos módulos internos da aplicação
  var e = {
    574(e, a, t) {
      const r = () => {
        // CORREÇÃO: Dados do seu Image Target cadastrados para ativar o escaneamento
        const meuMarcador = {
          "type": "PLANAR",
          "properties": { "top": 0, "left": 144, "width": 941, "height": 1254, "isRotated": false, "originalWidth": 1254, "originalHeight": 1254 },
          "imagePath": "image-targets/marker_luminance.png",
          "name": "marker"
        };

        // Ativa o escaneamento do logo e liga o SLAM para persistência, seguindo o slide
        XR8.XrController.configure({ 
          imageTargetData: [meuMarcador],
          disableSlam: false 
        });
        console.log("🌍 Varredura de Image Target ativada com persistência espacial!");
      };
      window.XR8 ? r() : window.addEventListener("xrloaded", r);
    }
  },
  a = {};

  // Gerenciador de dependências (Mantenho intacto)
  function t(r) {
    var n = a[r];
    if (void 0 !== n) return n.exports;
    var d = a[r] = { exports: {} };
    return e[r](d, d.exports, t), d.exports;
  }

  // Inicialização principal da cena e dos componentes
  (() => {
    "use strict";
    
    // Executa o módulo de configuração do XR8
    t(574);
    
    // Controle de ancoragem para fixar o objeto no primeiro escaneamento
    let objetoAncorado = false;
    
    // Ouvinte global seguro: captura os eventos sem quebrar as diretivas do runtime.js
    window.addEventListener('reality.imagefound', (event) => {
      if (event.detail.name === 'marker') {
        if (objetoAncorado) return; // Se já fixou no mundo real, ignora novas leituras

        console.log("🎯 Logo detectado! Posicionando o modelo 3D...");
        
        // Localiza a entidade do seu modelo utilizando o método nativo da sua aplicação
        const modelo3D = window.ecs.application.getEntity("e35dbf9c-8de2-468e-9449-f9563e988696");
        if (modelo3D) {
          const { position, rotation, scale } = event.detail;
          
          // Alinha o modelo com a posição real capturada pelo marcador
          modelo3D.position.set(position.x, position.y, position.z);
          modelo3D.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
          modelo3D.scale.set(scale, scale, scale);
          
          objetoAncorado = true; // Ativa a trava de persistência espacial
        }
      }
    });

    window.addEventListener('reality.imagelost', (event) => {
      if (event.detail.name === 'marker') {
        // Ignoramos o sumiço do papel: o SLAM local mantém o modelo na mesma coordenada real
        console.log("📍 Marcador saiu de vista, mas o objeto continua fixo no cenário.");
      }
    });

    // Registra o componente padrão (Exatamente como estava no seu código original que funciona)
    window.ecs.registerComponent({
      name: "example-component",
      add: () => {
        console.log("Component attached.");
      }
    });

    // SUA ÁRVORE ORIGINAL DE OBJETOS (100% INTACTA, SEM NENHUMA ALTERAÇÃO DE PROPRIEDADE)
    const e = JSON.parse('{' +
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
          '"components": {},' +
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
          '"geometry": null,' +
          '"material": null,' +
          '"parentId": "88453035-dc0f-486d-868a-8ff7c2fda864",' +
          '"components": {},' +
          '"gltfModel": {' +
            '"src": {"type": "asset", "asset": "assets/Untitled.glb"},' +
            '"animationClip": "*",' +
            '"loop": true' +
          '},' +
          '"name": "Untitled.glb",' +
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

    // Inicializa a aplicação ECS original sem interferências de parser
    delete e.history,
    delete e.historyVersion,
    window.ecs.application.init(e);
  })();
})();