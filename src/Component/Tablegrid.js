import React from 'react';
import Sorttable from './Sorttable';
 
class Tablegrid extends React.Component {
  constructor(props) {
    super();
    this.state={
         sortDirection:"",
          sortColumn:""
    }
     this.child = React.createRef(); 
  }
  handleSort = (column,sortingIsRequired) =>{
  if(sortingIsRequired){
      const {sortDirection} = this.state;
      const {rows} = this.props;
      const comparer = (a, b) => {
        if(sortDirection=="" || sortDirection === "DESC"){
              this.setState({
                   sortDirection : "ASC"
                }); 
              return a[column] > b[column] ? 1 : -1; //making data in ascending order
              
          }else if(sortDirection === "ASC"){
            this.setState({
                   sortDirection : "DESC"
               });
            return a[column] < b[column] ? 1 : -1; //making data in descending order
          }
           
        };
        const sortedData = rows.sort(comparer);
      
        this.props.handleSortedData(sortedData);
          this.setState({
              sortColumn: column
           }); 
      }
 }
  
  render() {
  const {sorting,columns}  = this.props;
  const {sortDirection,sortColumn} = this.state;
  const tableHeader = columns && columns.map((val,ind)=>  
                        {
                            return (<th onClick={() => this.handleSort(val,sorting)} key={ind}>{val}
                              {sorting? <div style={{"display":sortColumn === val ? 'initial' : 'none',}}>
                                             
                                             {sortDirection=="ASC" ? (
                                                  <div className="glyphicon glyphicon-menu-up" />
                                                ) : (
                                                  <div className="glyphicon glyphicon-menu-down" />
                                              )}
                                        </div>:""}
                              </th>);
                        });
    
    const tableData = this.props.rows && this.props.rows.map((rowObj, i) => {
                                   let td = Object.keys(rowObj).map((val, ind) => {
                                        return <td key={ind}>{rowObj[val]}</td>  
                                   })
                                  return ( <tr key={i}>{td}</tr>)
                    }); 
    return (<div>
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
               {/*<Sorttable ref={this.child} handleSort={this.handleSortChnagedData}/> */}
           </div>);
  }
}
export default Tablegrid;