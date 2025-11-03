module.exports = {
  locales: ["en", "ar"],
  output: "src/locales/$LOCALE/$NAMESPACE.json",
  defaultNamespace: "translation",
  createOldCatalogs: false,
  keepRemoved: false,
  keySeparator: false,
  namespaceSeparator: false,
  interpolation: {
    prefix: "{{",
    suffix: "}}",
  },
};
