import { createRandom } from "../src/util/index";

test('createRandom', () => {
  expect(createRandom(2, 5));
})
