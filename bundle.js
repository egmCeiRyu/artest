(() => {
  // 1. Definição dos módulos internos e configuração do Rastreador Híbrido
  var e = {
    574(e, a, t) {
      const r = () => {
        // ATIVAÇÃO DO ESCANEAMENTO: Injetamos as configurações de dimensões do seu marcador real
        const meuMarcador = {
          "type": "PLANAR",
          "properties": { "top": 0, "left": 144, "width": 941, "height": 1254, "isRotated": false, "originalWidth": 1254, "originalHeight": 1254 },
          "imagePath": "image-targets/marker_luminance.png",
          "name": "marker"
        };

        // Configuramos o motor local para caçar o marcador e manter o SLAM ativo em paralelo
        XR8.XrController.configure({ 
          imageTargetData: [meuMarcador],
          disableSlam: false // Mantém o rastreamento tridimensional do espaço ligado conforme o slide
        });
        
        console.log("🎯 Buscando Image Target com Persistência SLAM ativada...");
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

  // Inicialização principal da cena e dos componentes ECS
  (() => {
    "use strict";
    
    // Executa a configuração do XR8 (Configura o imageTargetData)
    t(574);
    
    // Variável interna para travar o objeto na primeira detecção bem-sucedida
    let objetoFixoNoMundo = false;
    
    // Registra o componente padrão do projeto que escuta a câmera
    window.ecs.registerComponent({
      name: "example-component",
      add: () => {
        console.log("Componente CeiRyu anexado. Sistema de varredura pronto!");

        // SISTEMA DE ESCANEAMENTO: Disparado assim que a câmera reconhece o logo na vida real
        window.addEventListener('reality.imagefound', (event) => {
          if (event.detail.name === 'marker') {
            // Se o objeto já encontrou seu lugar no mundo real, ignoramos novas leituras para não dar "pulinhos"
            if (objetoFixoNoMundo) return;

            console.log("🎯 Marcador Escaneado! Fixando o modelo no espaço...");
            
            // Localiza o seu modelo 3D cadastrado na árvore ECS abaixo
            const meuModelo = window.ecs.application.getEntity("e35dbf9c-8de2-468e-9449-f9563e988696");
            if (meuModelo) {
              const { position, rotation, scale } = event.detail;
              
              // Move e rotaciona o seu modelo 3D para as