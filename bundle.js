(() => {
  "use strict";

  console.log("🚀 Bundle iniciado");

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

  // Módulo simples
  const testModule = {
    name: "camera-test",
    onStart: () => {
      console.log("📷 onStart chamado - câmera deve estar ligando");
    }
  };

  const anchorModule = {
    name: "marker-test",
    listeners: [{
      event: "reality.imagefound",
      process: ({ detail }) => {
        console.log("✅ Marker detectado!", detail);
      }
    }]
  };

  const init = () => {
    XR8.addCameraPipelineModule(testModule);
    XR8.addCameraPipelineModule(anchorModule);
    console.log("✅ Módulos carregados - Aponte para o marker");
  };

  if (window.XR8) init();
  else window.addEventListener("xrloaded", init);

  t(574);
})();