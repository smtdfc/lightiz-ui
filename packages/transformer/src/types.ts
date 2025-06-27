export type LightizUIComponent =
  | 'accordion'
  | 'button'
  | 'card' 
  | 'form' 
  | 'loader' 
  | 'modal' 
  | 'switch' 
  | 'tab' 
  | 'toast' 

export type LightizUIHelper =
  | 'text'
  | 'background'
  | 'spacings'
  | 'display'
  | 'border'

export interface LightizUIConfig {
  base:string | 'lightizui',
  components?:Array<LightizUIComponent>,
  helpers?:Array<LightizUIHelper>
}