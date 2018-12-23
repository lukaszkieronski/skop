import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto-multilang'
import './index.css'
import { Application } from 'containers'

window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

ReactDOM.render(<Application />, document.getElementById('root'));
