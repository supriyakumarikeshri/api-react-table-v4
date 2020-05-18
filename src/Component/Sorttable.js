import React from 'react';

 class Sorttable extends React.Component {
  constructor(props) {
    super();
    this.state = {sortDirectionNew: ""};
  }
   sortTableData(column,sortingIsRequired,rows,sortDirection) {
   	 console.log(column);
   	 const data = rows;
   	 var sortDirectionNew="";
   		 const comparer = (a, b) => {
			         if(sortDirection=="" || sortDirection === "DESC"){
			         	 this.setState({
			                   sortDirectionNew : "ASC"
			                }); 
			               return a[column] > b[column] ? 1 : -1; //making data in ascending order
			              
			           }else if(sortDirection === "ASC"){
						 this.setState({
			                   sortDirectionNew : "DESC"
			                }); 
			        
			            return a[column] < b[column] ? 1 : -1; //making data in descending order
			           }
		           
		         };
		       //  console.log(sortDirectionNew);
        const sortedData = data.sort(comparer);


     //    let sortColumn = column;
       this.props.handleSort(sortedData,this.state.sortDirectionNew);
  }
  render() {
  	console.log("test");
    return "";
  }
}
export default Sorttable; 