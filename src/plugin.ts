import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
} from "@backstage/core-plugin-api";

import { rootRouteRef } from "./routes";
import { DXApiClient, dxApiRef } from "./api";

export const dxPlugin = createPlugin({
  id: "dx",
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: dxApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new DXApiClient({ discoveryApi }),
    }),
  ],
});

export const EntityDORAMetricsContent = dxPlugin.provide(
  createRoutableExtension({
    name: "EntityDORAMetricsContent",
    component: () =>
      import("./components/EntityDORAMetricsContent").then(
        (m) => m.EntityDORAMetricsContent,
      ),
    mountPoint: rootRouteRef,
  }),
);

export const EntityChangeFailureRateCard = dxPlugin.provide(
  createComponentExtension({
    name: "EntityChangeFailureRateCard",
    component: {
      lazy: () =>
        import("./components/EntityChangeFailureRateCard").then(
          (m) => m.EntityChangeFailureRateCard,
        ),
    },
  }),
);

export const EntityDeploymentFrequencyCard = dxPlugin.provide(
  createComponentExtension({
    name: "EntityDeploymentFrequencyCard",
    component: {
      lazy: () =>
        import("./components/EntityDeploymentFrequencyCard").then(
          (m) => m.EntityDeploymentFrequencyCard,
        ),
    },
  }),
);

export const EntityLeadTimeCard = dxPlugin.provide(
  createComponentExtension({
    name: "EntityLeadTimeCard",
    component: {
      lazy: () =>
        import("./components/EntityLeadTimeCard").then(
          (m) => m.EntityLeadTimeCard,
        ),
    },
  }),
);
