import { LightizUIMetadata } from '../types/index.js';
import { getMetadata } from '../utils/index.js';

export class LightizUIModal {
  public metadata: LightizUIMetadata;
  public root: HTMLElement;
  public modalContent: HTMLElement;
  
  constructor(root: HTMLElement) {
    this.root = root;
    this.modalContent = this.root.querySelector('.modal-content') !;
    this.metadata = getMetadata(root, {
      type: 'modal',
      data: {
        open: false
      }
    });
  }
  
  open() {
    this.root.classList.add('show');
    this.metadata.data['open'] = true;
  }
  
  close() {
    this.modalContent.classList.add('hiding');
    const transitionTime = 400;
    setTimeout(() => {
      this.root.classList.remove('show');
      this.modalContent.classList.remove('hiding');
      this.metadata.data['open'] = false;
    }, transitionTime);
  }
}