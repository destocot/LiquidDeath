import React from 'react';
import ReactDOM from 'react-dom/client';
// ==== WHY NOTHING WORKED EARLIER ====
// instead of importing from ./App.tsx, import from ./App - removing the tsx extension
// makes it so we can bypass using the "allowImportingTsExtensions" property in tsconfig.json. This property
// required setting "noEmit" to true to work. When noEmit was true it caused the compiler to not output any
// TypeScript code from our tsx files - which was why nothing would render.
// TLDR - take off the extension and avoid making noEmit true.
import App from './App';

// creates the root to dispay React components from in browser DOM
// '!' character acts as a null-check in TypeScipt - makes sure value is never null
// (it doesn't need this check in jsx files i'm unsure why)
const root = ReactDOM.createRoot(document.getElementById('root')!);

// renders our App parent component on our root
root.render(<App />);

// this is kurt's test comment
// this is jon's much better test comment


// only changes to tsconfig were deleting the properties mentioned above. Minor changes to webpackconfig as well - deleted the
// HTML plugin (made index.html in dist reset every build), changed entry point and output point to correct file names and locations.
// Brief breakdown of how our webpack config works is in that file.
