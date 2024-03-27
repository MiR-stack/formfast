const fs = require("fs");
const path = require("path");
const sass = require("sass");

/**
 * compile any scss to css
 *
 * @param {String} src  scss directory src
 * @param {String} output output directory where css code will be writen
 */
const compile = (src, output) => {
  const result = sass.compile(path.resolve(src), {
    style: "expanded",
    verbose: true,
  });

  fs.writeFileSync(path.resolve(output), result.css);
};

/**
 * geting all components
 * @param {[String]} types
 * @returns {[Object]}
 */
const getAllComponents = (types) => {
  let allComponents = [];

  types.forEach((type) => {
    const allFiles = fs.readdirSync(`src/${type}`).map((file) => ({
      src: `src/${type}/${file}`,
      output: `lib/styles/${file.slice(0, -5)}.css`,
    }));

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

// define which components we need
const types = ["styles"];

// compile all components
getAllComponents(types).forEach((component) =>
  compile(component.src, component.output)
);
