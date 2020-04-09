import React, { Component } from 'react'
import BuildIcon from '@material-ui/icons/Build';
import { Link } from 'react-router-dom';
export default class RowInfo extends Component {
    render() {
        var {data}=this.props
        return (
            <div>
                <h1>{data.name}</h1>
                <Link to="/build"> <BuildIcon/></Link>
                

            </div>
        )
    }
}
