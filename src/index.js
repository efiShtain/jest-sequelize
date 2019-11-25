const fs = require("fs");
const path = require("path");

function sequelizeMock(functionsList) {
  return functionsList.reduce((mock, func) => {
    mock[func] = jest.fn();
    return mock;
  }, {});
}

function mock(
  modelsPath,
  functionsList = ["find", "findOne", "create", "update"]
) {
  return fs
    .readdirSync(modelsPath)
    .filter(file => file !== "index.js")
    .map(file => path.join(modelsPath, file))
    .map(require)
    .map(model => {
      let modelName = "";
      const sequelizeDummy = {
        define(name) {
          modelName = name;
          return {};
        }
      };

      model(sequelizeDummy, {});
      return modelName;
    })
    .reduce((modelsMock, model) => {
      modelsMock[model] = sequelizeMock(functionsList);
      return modelsMock;
    }, {});
}

module.exports = mock;
