import {
  init as initMFRuntime,
  loadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime';

import remotes from './data/remotes.prod.json';

export default class WidgetLoaderHelper {
  static shell;
  static appName;
  static pluginCache = [];
  #scope;
  #filePath;
  #pluginId;

  constructor(pluginId) {
    const regex = /^[a-z][a-zA-Z\-\_]+\/[a-zA-Z][a-zA-Z\-\_]+$/g;
    const isValidPluginId = pluginId.search(regex);
    if (isValidPluginId >= 0) {
      this.#pluginId = pluginId.trim();
      const [_scope, _filePath] = this.#pluginId.split('/');
      this.#scope = _scope;
      this.#filePath = _filePath;
    } else {
      throw new Error(
        `the pluginId is invalid,it must follow the regex ${regex}`,
      );
    }
  }

  static init(appNameV) {
    if (!this.shell) {
      this.appName = appNameV;
      this.shell = initMFRuntime({
        name: appNameV || 'appHost',
        remotes: [],
      });
    }
    return this.shell;
  }

  async loadRemoteHelper() {
    try {
      // if (WidgetLoaderHelper.pluginCache[this.#pluginId]) {
      //   console.log('returning from cache');
      //   return WidgetLoaderHelper.pluginCache[this.#pluginId];
      // }

      if (!WidgetLoaderHelper.shell || !WidgetLoaderHelper.appName)
        throw new Error(
          'WidgetLoaderHelper not initialized: use WidgetLoaderHelper.init(<appName>)',
        );
      if (!this.#scope || !this.#filePath)
        throw new Error(
          'WidgetLoaderHelper not initialized with pluginId: use new WidgetLoaderHelper(<pluginId>)',
        );

      const remoteFromRepo = await WidgetLoaderHelper.resolveRemote(
        WidgetLoaderHelper.appName,
        this.#scope,
      );

      const remoteFromShell = WidgetLoaderHelper.shell.options?.remotes?.find(
        (v) => v.name === this.#scope && v.entry === remoteFromRepo.entry,
      );

      let remoteEntry = this.loadLocalRemote();

      const evalToRegisterRemote =
        !remoteFromShell ||
        (remoteEntry
          ? remoteFromShell.entry !== remoteEntry
          : remoteFromShell.entry !== remoteFromRepo.entry);

      if (evalToRegisterRemote) {
        console.log('remote not found in shell, registering remote');

        registerRemotes([
          {
            name: this.#scope,
            entry: remoteEntry || remoteFromRepo.entry,
          },
        ]);
      }
      console.log('loading remote component', this.#pluginId);
      WidgetLoaderHelper.pluginCache[this.#pluginId] = loadRemote(
        this.#pluginId,
      );
      return WidgetLoaderHelper.pluginCache[this.#pluginId];
    } catch (e) {
      console.log('error caught');
      console.error(e);
      throw e;
    }
  }

  static async resolveRemote(appName, scope) {
    if (!remotes) throw new Error(`failed to load remotes for ${appName}`);

    return new Promise((resolve, reject) => {
      const app = remotes.find((r) => r.app === appName);
      if (!app)
        reject(
          new Error(`couldn't find the app ${appName} in the remotes repo`),
        );

      const remote = app.remotes?.find((r) => r.scope === scope);
      if (!remote)
        reject(
          new Error(
            `couldn't find the remote from scope ${scope} in th app ${appName}`,
          ),
        );

      resolve(remote);
    });
  }

  loadLocalRemote() {
    const localRemoteEntry = localStorage.getItem(this.#pluginId);

    if (localRemoteEntry) {
      console.log(`local remote entry found at ${localRemoteEntry}`);
    }

    return localRemoteEntry;
  }
}
