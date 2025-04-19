interface LightizUIData {
  [key: string]: any;
}

export function createOrGetData(element: HTMLElement & { _lightiz_uiui ? : LightizUIData }, data: LightizUIData = {}): LightizUIData {
  if (!element._lightiz_uiui) element._lightiz_uiui = data;
  return element._lightiz_uiui;
}