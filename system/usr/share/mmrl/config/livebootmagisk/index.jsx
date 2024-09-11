import { withRequireNewVersion } from "@mmrl/hoc";
import { ConfigProvider } from "@mmrl/providers";

import { App } from "./App";

import initialConfig from "./json/initialConfig.json";

export default withRequireNewVersion({
  versionCode: 32325,
  component: () => {
    return (
      <ConfigProvider loadFromFile="/data/adb/liveboot.config.json" initialConfig={initialConfig} loader="json">
        <App />
      </ConfigProvider>
    );
  },
});
