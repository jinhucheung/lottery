import Vue from 'vue';
export default function createLayout(name, components, tpl) {
  return {
    name,
    props: ['title', 'description', 'keywords'],
    components,
    computed: {
      vTitle() {
        return this.$root.title || this.title || 'Lottery';
      },
      vKeywords() {
        return this.$root.keywords || this.keywords || 'lottery';
      },
      vDescription() {
        return this.$root.description || this.description || 'A lottery application';
      },
      baseClass() {
        return this.$root.baseClass || this.base;
      }
    },
    template: EASY_ENV_IS_BROWSER ? tpl : `<!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <title>{{vTitle}}</title>
                      <meta charset="utf-8">
                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                      <meta name="keywords" :content="vKeywords">
                      <meta name="description" :content="vDescription">
                      <meta http-equiv="content-type" content="text/html;charset=utf-8">
                      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
                    </head>
                    <body :class="baseClass">
                      ${tpl}
                    </body>
                  </html>`,
    install(vue, options) {
      //
    }
  };
}
