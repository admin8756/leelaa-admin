// useCustomModal.js
import { createVNode, render } from 'vue';
import CustomModal from './MessageBox.vue';

export default function openCustomModal({ title, content }) {
  if (typeof title !== 'string' || typeof content !== 'string') {
    throw new Error('Title and content must be strings');
  }

  const container = document.createElement('div');
  document.body.appendChild(container);

  const closeCallback = () => {
    setTimeout(() => {
      render(null, container);
      if (container.parentNode === document.body) {
        document.body.removeChild(container);
      }
    }, 300);
  };

  const vNode = createVNode(CustomModal, {
    title,
    content,
    closeCallback,
  });

  render(vNode, container);
}
