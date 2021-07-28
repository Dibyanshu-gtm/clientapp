import React from 'react';
import ReactDOM  from 'react-dom';
import Register from '../Components/Register';

import {render} from '@testing-library/react';

it("renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Register></Register>,div);
})