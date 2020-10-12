import { Store, StoreConfig } from '@datorama/akita';

export interface SettingsState {
  currencyCode: string;
}

export function createInitialState(): SettingsState {
  return {
    currencyCode: null,
  };
}

@StoreConfig({ name: 'settings' })
export class SettingsStore extends Store<SettingsState> {
  constructor() {
    super(createInitialState());
  }
}
