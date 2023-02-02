import useSyncExternalStoreExports from "use-sync-external-store/shim/with-selector";
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;

import { languageStore } from "./store";
import { ParamsType } from "./types";
import { t } from "./utils";

export const useUpdateComponentWhenLanguageChange = () => {
  return useSyncExternalStoreWithSelector(
    languageStore.subscribe,
    languageStore.getState,
    languageStore.getState,
    (s) => s
  );
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
