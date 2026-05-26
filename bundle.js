(() => {
  // Definição dos módulos internos da aplicação
  var e = {
    574(e, a, t) {
      const r = () => {
        // CORREÇÃO: Dados do seu Image Target ('marker') para ativar o escaneamento por câmera
        const meuMarcador = {
          "type": "PLANAR",
          "properties": { "top": 0, "left": 144, "width": 941, "height": 1254, "isRotated": false, "originalWidth": 1254, "originalHeight": 1254 },
          "imagePath": "image-targets/marker_luminance.png",
          "name": "marker"
        };

        // AJUSTE: Vincula os dados de imagem e ativa o SLAM híbrido para permitir a persistência pós-escaneamento
        XR8.XrController.configure({ 
          imageTargetData: [meuMarcador],
          disableSlam: false 
        });
        
        console.log("🌍 Escaneamento de Image Target ativo com persistência SLAM habilitada!");
      };
      window.XR8 ? r() : window.addEventListener("xrloaded", r);
    }
  },
  a = {};

  // Gerenciador de dependências (Webpack/Rollup minimalista)
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
    
    // Controle interno para travar o objeto na primeira vez que for escaneado
    let objetoFixo = false;
    
    // Registra o componente padrão do projeto
    window.ecs.registerComponent({
      name: "example-component",
      add: () => {
        console.log("Component attached. Sistema pronto para varredura.");

        // Monitora o momento exato em que o logo "CeiRyu" é detectado
        window.addEventListener('reality.imagefound', (event) => {
          if (event.detail.name === 'marker') {
            if (objetoFixo) return; // Se já fixou no espaço físico, ignora novas leituras para evitar saltos

            console.log("🎯 Logo escaneado com sucesso! Posicionando e ancorando o objeto no cenário...");
            
            // Localiza a entidade do seu modelo 3D pelo ID estático nativo do seu JSON original
            const modeloAR = window.ecs.application.getEntity("e35dbf9c-8de2-468e-9449-f9563e988696");
            if (modeloAR) {
              const { position, rotation, scale } = event.detail;
              
              // Ajusta o modelo de acordo com os dados espaciais reais do marcador detectado
              modeloAR.position.set(position.x, position.y, position.z);
              modeloAR.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
              modeloAR.scale.set(scale, scale, scale);
              
              modeloAR.visible = true; // Exibe o objeto na cena
              objetoFixo = true;       // Ativa a ancoragem estática definitiva
            }
          }
        });

        // Monitora quando o papel/logo sai do campo de visão da câmera
        window.addEventListener('reality.imagelost', (event) => {
          if (event.detail.name === 'marker') {
            // FIXADO: Graças ao SLAM concomitante, nós simplesmente ignoramos o evento de sumiço.
            // O motor assume os pontos do ambiente e preserva o objeto intocado no lugar onde foi gerado.
            console.log("📍 Marcador saiu de vista. O modelo 3D continuará fixo na tela via SLAM.");
          }
        });
      }
    });

    // Árvore estrutural de objetos mantida idêntica à original (Apenas alterado visible: false inicial)
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
          '"components": {' +
            '"example-component": {}' + // Vincula os listeners diretamente à câmera de renderização
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
          '"visible": false,' + // CORREÇÃO: Começa invisível para não brotar na tela antes do escaneamento do logo
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

    // Limpa propriedades legadas do histórico e inicializa a aplicação ECS
    delete e.history,
    delete e.historyVersion,
    window.ecs.application.init(e);
  })();
})();