# jest-sequelize
Drop in for mocking sequelize models

## Install
``` npm install @efi.shtain/jest-sequelize ```

## Usage
Best way to use this module is through a jest.setup file. 
- In your jest config, add a sequelize-mock.js file to the setupFilesAfterEnv array
(You can use an existing file if you already have one)
- Paste the following lines to the top of the file:
```javascript
const path = require("path");
const modelsPath = path.join(__dirname, "./models");
const jestSequelize = require("@efi.shtain/jest-sequelize");

// will default to ["find", "findOne", "create", "update"]
const mocker = jestSequelize(modelsPath); 

// Another option is passing the list of functions you want to spy on in a model
const modelsMock = jestSequelize(modelsPath, ["findOne"]);

jest.mock("./models", () => modelsMock);
module.exports = async () => {};
```

- All set! Happy jesting!
const { User } = require("../../models");

## Test Example

```javascript
// Import the relevant models
const { User } = require("./models");

describe("users service", () => {
  describe("find all", () => {
    it("should return empty array on find all", async () => {
      
      // Prepare
      const find = jest
        .spyOn(User, "find") // You can spy on any method provided
        .mockResolvedValue(Promise.resolve([])); // mock return value

      // Execute
      const users = await service.findAll(); // assuming service is under test

      // Assert
      expect(find).toBeCalled();
      expect(users).toEqual([]);
    });
  })
})
```

