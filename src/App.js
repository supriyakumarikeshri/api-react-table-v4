import React,{Component} from 'react';
import './App.css';
import axios from 'axios';//Tablegrid
import Tablegrid from './Component/Tablegrid.js'; 
import Searchfilter from './Component/Searchfilter.js'; 
class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [""],
                   tableHeading: "",
                   filteredData: "",
                   searchInput: "",
                   sortingIsRequired:true,//if you dont want sorting make it false
                   sortedData:""
                   };
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

    handleSetFilteredData = filteredData => {
      this.setState({ filteredData });
    };

    handleSetSearchInput = searchInput => {
      this.setState({ searchInput });
    };
     handleSortedData = sortedData => {
      this.setState({ sortedData });
    };
  render(){
    let { data,filteredData,searchInput,tableHeading,sortingIsRequired,sortedData} = this.state; 
    console.log(sortedData); 
    var len = searchInput.length;
    const dataToDisplay = (len>0) ? filteredData : data;
     
                return (
                          <div>
                            <Searchfilter rows={data}  
                                          handleSetFilteredData={this.handleSetFilteredData}
                                          handleSetSearchInput={this.handleSetSearchInput}
                                          columns={tableHeading}
                                         
                                          />  
                            <Tablegrid columns={tableHeading} 
                                       rows={dataToDisplay}  
                                       sorting={sortingIsRequired}
                                       handleSortedData={this.handleSortedData}/> 
                          </div>
                      );  
              }
}

 
export default App;