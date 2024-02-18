import { Files } from '@mornya/cli-libs';
import * as Configure from '../Configure';

const yamlConfig1 = `
common:
  value1: "AAA"
`;
const yamlConfig2 = `
common:
  value1: "AAA"
local:
  value2: "BBB"
`;

describe('Configure module', () => {
  afterEach(() => {
    Files.rimraf('temp.yml');
    Configure.unload();
  });

  it('Configure.load (no parameter)', () => {
    let error;
    try {
      Configure.load();
    } catch (e) {
      error = e;
    }
    expect((error as Error).message).toBe('File not found: ./application.config.yml');
  });

  it('Configure.load (config #1)', () => {
    Files.write('temp.yml', yamlConfig1);
    expect(Configure.load('temp.yml')).toStrictEqual({
      value1: 'AAA',
    });
  });

  it('Configure.load (config #2, no phase)', () => {
    Files.write('temp.yml', yamlConfig2);
    expect(Configure.load('temp.yml')).toStrictEqual({
      value1: 'AAA',
    });
  });

  it('Configure.load (config #2, local phase)', () => {
    Files.write('temp.yml', yamlConfig2);
    expect(Configure.load('temp.yml', 'local')).toStrictEqual({
      value1: 'AAA',
      value2: 'BBB',
    });
  });
});
