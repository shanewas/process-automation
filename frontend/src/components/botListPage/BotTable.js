import React, { Component } from 'react';
export default class BotTable extends Component {

  state = {
    botList:[
      ['name','status','type','last',],
      ['name','status','type','last',],
      ['name','status','type','last',],
      ['name','status','type','last',],
      ['name','status','type','last',],
      ['name','status','type','last',],
    ]
}

addbot = () =>{
  console.log("added")
}
render(){

  return (
    
    <div className="row" style={{height:'100vh'}}>
  <div className="col-xl-12">
    <div className="card">
      <div className="card-body">
        <h4 className="mt-0 header-title mb-4">Bot List
        <span onClick={this.addbot} className="float-right"><i className="fas fa-plus"></i></span>
        </h4>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Bot Type</th>
                <th scope="col">Last Active</th>
                <th scope="col">Functions</th>


              </tr>
            </thead>
            <tbody>
            {this.state.botList.map((bot,index) =>{
              return(
                <tr key={index}>
                <td>{bot[0]}</td>
                <td><span className="badge badge-warning">{bot[1]}</span></td>
                <td>{bot[2]}</td>
                <td>{bot[3]}</td>
                <td>
                  <div>
                    <div className="btn btn-primary mr-2 btn-sm">
                      <div>
                      <i className="far fa-edit"></i> Edit
                      </div></div>
                    <div className="btn btn-danger mr-2 btn-sm"><div>
                      <i className="far fa-trash-alt"></i> Delete
                      </div></div>
                      <div className="btn btn-success mr-2 btn-sm"><div>
                      <i className="fas fa-running"></i> Start
                      </div></div>
                  </div>
                </td>
              </tr>
              )
              
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

);
}
  
}
