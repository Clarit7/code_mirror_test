import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import { Component } from 'react';
import axios from 'axios';

const config = require('./config.js');
const port = 3001

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          code:'import numpy as np\n\ndef func(arg1=0):\n\tprint(np.array([1, 3]))\n\treturn 1\n\nfunc()',
          output:null,
      };
  }

  render() {
    const {code} = this.state;
    const {output} = this.state;

    const run = async () => {
      const client = axios.create({
        baseURL:config.default.address + ':' + port,
      });
      const result = await client.post('/api', {code});
      this.setState({output: result.data.output});
      console.log('send onclick');
    };

    return (
      <div className="App">

        <div className="header">
            Python Code Editor
        </div>

        <CodeMirror
          value={code}
          width={'1500px'}
          height={'800px'}
          options={{
            theme: 'monokai',
            tabSize: 2,
            keyMap: 'sublime',
            mode: 'python',
          }}
          onChange={
            (code) =>{ this.setState({code: code.getDoc().getValue()}); }
          }
        />
        
        <button className="Run" onClick={ ()=>{ run(); } }>run</button>

        <div className="Output"> 
          {output? <pre style={{fontFamily:'consolas'}}>{output}</pre> : ''}
        </div>

      </div>
    );
  }
};


export default App;
