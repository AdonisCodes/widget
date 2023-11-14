///embed.js
const React = window.React;
const ReactDOM = window.ReactDOM;

window.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = 'dist/chat-widget.umd.cjs';
  script.type = 'text/javascript';

  script.onload = () => {
    console.log('Chat widget script loaded.');
   
    if (window.ChatWidget) {
      const ChatWidget = window.ChatWidget;
      console.log(ChatWidget); // Log ChatWidget to the console
      const chatContainer = document.createElement('div');
      document.body.appendChild(chatContainer); 
      ReactDOM.render(React.createElement(ChatWidget), chatContainer);
    } else {
      console.error('ChatWidget is not defined.');
    }
  };

  script.onerror = () => {
    console.error('Failed to load chat widget script.');
  };

  document.head.appendChild(script);
});