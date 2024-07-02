module.exports = {
  jsxRuntime: "automatic",
  svgProps: {
    fill: "none",
  },
  svgoConfig: {
    plugins: [
      {
        name: "removeAttrs",
        params: {
          attrs: "(xmlns)",
        },
      },
    ],
  },
  template: ({ template }, opts, { componentName = "SvgComponent", props, jsx, imports = [], exports = [] }) => {
    return template.ast`
      import * as React from 'react';
      ${imports}
      const ${componentName} = (${props}) => ${jsx};
      ${exports}
    `
  },
}
