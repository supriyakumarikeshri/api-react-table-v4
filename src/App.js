import React from 'react';
import './App.css';
import axios from 'axios';
 
class App extends React.Component {
  constructor() {
    super();
    this.state = {data: [4,5,5]};

  }
  componentDidMount(){
    axios.get(`http://starlord.hackerearth.com/TopRamen`)
      .then(res => {
        //console.log(res.data); 
        
            this.setState({
                data: res.data
            });
      })
      .catch(error => {
          console.log(error)
      });
  }
  render() {
    // return <h2>I am a Car!</h2>;
    var header = Object.keys(this.state.data[0]);
    const tableHeader = header && header.map(val=> 
                        {
                            return (
                                        <th>{val}</th>
                                     );
                        });
    
    const tableData = this.state.data.map((rowObj, i) => {
                            let td = Object.keys(rowObj).map((val, ind) => {
                                  return <td key={ind}>{rowObj[val]}</td>  
                          })
                          return (
                              <tr key={i}>{td}</tr>
                            )
                    }); 
    return (<table id="customers">
              <thead>
              <tr>
                  {tableHeader} 
               </tr>
               </thead>
               <tbody>
                  {tableData} 
               </tbody>
           </table>); 
    
  }
}

 //{data.map(buildRow)}
 
export default App;