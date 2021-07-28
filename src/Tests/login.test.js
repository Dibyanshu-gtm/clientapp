import React from 'react';
import ReactDOM  from 'react-dom';
import Login from '../Components/Login';

import {render} from '@testing-library/react';

it("renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Login></Login>,div);
})

