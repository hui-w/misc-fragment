import React from 'react';
import ReactDom from 'react-dom';

const fruits = [
  'Peach',
  'Lemon',
  'Pear',
  'Avocado',
  'Cantaloupe',
  'Banana'
];

const fruits_dom = fruits.map((item, index) => 
  <div key={index}>{item}</div>
);

ReactDom.render((
  <div>{fruits_dom}</div>
), document.getElementById('root'));