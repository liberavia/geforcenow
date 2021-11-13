(function () {
    window.speechSynthesis.getVoices = function () {
      return [
        {
          voiceURI: "Google DE German",
          name: "Google DE German",
          lang: "de-DE",
          localService: false,
          default: false,
        },
      ];
    };
  })();