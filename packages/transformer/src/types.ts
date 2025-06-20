export type LightizUIComponent =
  | 'navbar'
  | 'sidebar'
  | 'offcanvas'

export interface LightizUIConfig {
  base:string | 'lightizui',
  use:Array<LightizUIComponent>
}