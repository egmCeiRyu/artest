(() => {
  "use strict";

  console.log("🚀 Bundle carregado - Versão mínima");

  // Configuração básica do Image Target
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

  // Módulo básico
  const basicModule = {
    name: "basic-setup",
    onStart: () => {
      console.log("✅ onStart chamado - 8th Wall deve pedir permissão da câmera agora");
    }
  };

  const init = () => {
    XR8.addCameraPipelineModule(basicModule);
    console.log("📱 Módulos inicializados - Aguardando permissão da câmera");
  };

  if (window.XR8) {
    init();
  } else {
    window.addEventListener("xrloaded", init);
  }

  t(574);

})();