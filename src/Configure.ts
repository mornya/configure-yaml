import { Files } from '@mornya/cli-libs';
import deepmerge from 'deepmerge';
import yaml from 'yaml';

let configure: any;

/**
 * load
 * yaml 타입의 config 파일을 읽어온다.
 *
 * @template T
 * @param filepath {string | undefined}
 * @param phase {string | undefined}
 * @returns {T}
 */
export function load<T>(filepath: string | undefined = './application.config.yml', phase?: string): T {
  if (!configure) {
    if (filepath && Files.isExist(filepath)) {
      const originEnvConfig: Record<string, Partial<T>> = yaml.parse(Files.read(filepath));
      const commonConfig = originEnvConfig.common ?? originEnvConfig.COMMON ?? originEnvConfig.Common;

      if (commonConfig) {
        configure = phase ? deepmerge<Partial<T>>(commonConfig, originEnvConfig[phase]) : commonConfig;
      } else {
        configure = phase ? originEnvConfig[phase] : {};
      }
    } else {
      throw new Error(`File not found: ${filepath}`);
    }
  }

  return configure;
}

/**
 * destroy
 */
export function unload(): void {
  configure = undefined;
}
