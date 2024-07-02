module.exports = {
  native: true,
  svgProps: {
    fill: "none",
  },
  svgoConfig: {
    plugins: [
      {
        name: "removeAttrs",
        params: {
          attrs: "xmlns",
        },
      },
    ],
  },
  template: ({ template }, opts = {}, { imports = "", componentName = "SvgComponent", props = "", jsx = "", exports = "" } = {}) => {
    const typeScriptTpl = template.smart({ plugins: ["typescript"] })
    return typeScriptTpl.ast`
      import * as React from 'react';
      import Svg, { Path } from 'react-native-svg';
      import type { SvgProps } from 'react-native-svg';
      const ${componentName} = (props: SvgProps) => ${jsx};
      export default ${componentName};
    `
  },
}
