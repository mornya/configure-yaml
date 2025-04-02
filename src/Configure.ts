import fs from 'node:fs';
import deepmerge from 'deepmerge';
import { parse as parseYaml } from 'yaml';

/**
 * load
 * yaml 타입의 config 파일을 읽어온다.
 *
 * @template T
 * @param filepath {string | undefined}
 * @param phase {string | undefined}
 * @returns {T}
 */
export function load<T = Record<string, any>>(filepath: string | undefined = 'configure.yml', phase?: string): T {
  let configure: T;

  if (filepath && fs.existsSync(filepath)) {
    const originEnvConfig: Record<string, T> = parseYaml(fs.readFileSync(filepath, { encoding: 'utf8' }));
    const commonConfig = originEnvConfig.common ?? originEnvConfig.COMMON ?? originEnvConfig.Common;

    if (commonConfig) {
      configure = phase ? deepmerge<T>(commonConfig, originEnvConfig[phase]) : commonConfig;
    } else {
      configure = phase ? originEnvConfig[phase] : ({} as T);
    }
  } else {
    throw new Error(`File not found: ${filepath}`);
  }

  return configure;
}
