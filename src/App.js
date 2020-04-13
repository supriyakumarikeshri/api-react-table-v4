import React,{Component} from 'react';
import './App.css';
import axios from 'axios';
 
class App extends React.Component {
  constructor() {
    super();
    this.state = {data: [""]};
    this.tableHeading = "";
  }
  componentDidMount(){
    axios.get(`http://starlord.hackerearth.com/TopRamen`)
      .then(res => {
            this.setState({
                data: res.data
            });
            const headerData = Object.keys(res.data[0]);
            this.setState({
                tableHeading: headerData 
            });
            
      })
      .catch(error => {
          console.log(error)
      });
  }
  handleChange=(event)=>{
    //search filter based on any td data
      var arr = [];
      if(event.target.value.length){
              this.state.data.map((rowObj, i) => {
                    Object.keys(rowObj).map((val, ind) => {
                                    
                                      if(typeof(rowObj[val])=="string")
                                      {
                                        if(rowObj[val].toLowerCase().includes(event.target.value.toLowerCase())){
                                            //if any character in search filter which is getting here as(event.target.value),
                                            //is present in any <td> of a <tr>, then that <tr> should be display, so push that <tr>
                                            //obj in arr
                                            arr.push(rowObj);
                                           
                                        }
                                         
                                  }
                            })            
              });
              //state of tabledata is getting change accoring to the search filter 
              this.setState({
                  data: arr
             });
    } 
    else{
      this.componentDidMount();
    }
      

  
  }

  render() {
    
    const tableHeader = this.state.tableHeading && this.state.tableHeading.map(val=>  
                        {
                            return (<th>{val}</th>);
                        });
    
    const tableData = this.state.data && this.state.data.map((rowObj, i) => {
                                   let td = Object.keys(rowObj).map((val, ind) => {
                                        return <td key={ind}>{rowObj[val]}</td>  
                                   })
                                  return ( <tr key={i}>{td}</tr>)
                    }); 
    return (
          <div>
            <input type="text" className="searchbar" onChange={this.handleChange} placeholder="Search!" /> 
            <table id="customers">
              <thead>
                  <tr>
                      {tableHeader} 
                   </tr>
               </thead>
               <tbody>
                    {tableData} 
               </tbody>
           </table>
          </div>);  
    
  }
    }


 //{data.map(buildRow)}
 
export default App;