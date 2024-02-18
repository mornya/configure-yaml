import { isExist, read } from '@mornya/cli-libs/dist/Files';
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
export function load<T = Record<string, any>>(
  filepath: string | undefined = 'configure.yml',
  phase?: string,
): Partial<T> {
  let configure: Partial<T>;

  if (filepath && isExist(filepath)) {
    const originEnvConfig: Record<string, Partial<T>> = parseYaml(read(filepath));
    const commonConfig = originEnvConfig.common ?? originEnvConfig.COMMON ?? originEnvConfig.Common;

    if (commonConfig) {
      configure = phase ? deepmerge(commonConfig, originEnvConfig[phase]) : commonConfig;
    } else {
      configure = phase ? originEnvConfig[phase] : {};
    }
  } else {
    throw new Error(`File not found: ${filepath}`);
  }

  return configure;
}
