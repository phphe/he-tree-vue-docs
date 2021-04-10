export default ({ router }) => {
  // fix Initial load does not scroll to the heading referenced by the document hash
  // refer:
  //  https://github.com/vuejs/vuepress/issues/2428
  //  https://github.com/xugaoyi/vuepress-theme-vdoing/issues/164
  //  https://blog.csdn.net/sendudu/article/details/107368962
  if (typeof process === 'undefined' || process.env.VUE_ENV !== 'server') {
    router.onReady(() => {
      const { app } = router;

      app.$once("hook:mounted", () => {
        setTimeout(() => {
          const { hash } = document.location;
          if (hash.length > 1) {
            let id = hash.substring(1)
            let element = document.getElementById(id)
            if (!element) {
              id = decodeURIComponent(id)
              element = document.getElementById(id)
            }
            if (element) {
              element.scrollIntoView()
            }
          }
        }, 500);
      });
    });
  }
}