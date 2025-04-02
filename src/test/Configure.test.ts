import fs from 'node:fs';
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
  afterEach(() => fs.existsSync('temp.yml') && fs.unlinkSync('temp.yml'));

  it('Configure.load (no parameter)', () => {
    let error;
    try {
      Configure.load();
    } catch (e) {
      error = e;
    }
    expect((error as Error).message).toBe('File not found: configure.yml');
  });

  it('Configure.load (config #1)', () => {
    fs.writeFileSync('temp.yml', yamlConfig1);
    expect(Configure.load('temp.yml')).toStrictEqual({ value1: 'AAA' });
  });

  it('Configure.load (config #2, no phase)', () => {
    fs.writeFileSync('temp.yml', yamlConfig2);
    expect(Configure.load('temp.yml')).toStrictEqual({ value1: 'AAA' });
  });

  it('Configure.load (config #2, local phase)', () => {
    fs.writeFileSync('temp.yml', yamlConfig2);
    expect(Configure.load('temp.yml', 'local')).toStrictEqual({ value1: 'AAA', value2: 'BBB' });
  });
});
