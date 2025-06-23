import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(url, blog) {
  // Pass blog data as props
  return renderToString(<App blog={blog} url={url} />);
}