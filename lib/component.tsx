import { useDebugValue } from "react";
import useSyncExternalStoreExports from "use-sync-external-store/shim/with-selector";
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;

import { languageStore } from "./store";
import { ParamsType } from "./types";
import { t } from "./utils";

export const useUpdateComponentWhenLanguageChange = () => {
  const conf = useSyncExternalStoreWithSelector(
    languageStore.subscribe,
    languageStore.getState,
    languageStore.getState,
    (s) => s
  );

  useDebugValue(conf);

  return conf;
};

export const I18nText = ({
  id,
  params,
}: {
  params?: ParamsType;
  id: string;
}) => {
  useUpdateComponentWhenLanguageChange();
  return t(id, params);
};
