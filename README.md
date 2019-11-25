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
jest.mock("./models", () => {
  const path = require("path");
  const jestSequelize = require("@efi.shtain/jest-sequelize");
  const modelsPath = path.join(process.cwd(), "./models");
  return jestSequelize(modelsPath);
});
module.exports = async () => {};
```

- All set! Happy jesting!



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

