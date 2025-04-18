export function createOrGetData(element,data={}){
  if(!element._lightiz_uiui) element._lightiz_uiui = data;
  return element._lightiz_uiui;
}
