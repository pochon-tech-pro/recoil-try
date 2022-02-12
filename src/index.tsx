import React from 'react';
import ReactDOM from 'react-dom';

import {RecoilRoot} from "recoil";
import Counter from "./Counter";

ReactDOM.render(
  <RecoilRoot>
    <Counter />
  </RecoilRoot>,
  document.getElementById('root')
);
