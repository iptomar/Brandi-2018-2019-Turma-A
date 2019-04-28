import React, { Component } from "react";


class Materiais extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            alertText: '',
            alertisNotVisible: true,
            alertColor: ''
        };
    }

    render() {
        return (
            <div>
                <hr />
                <h2 >Materiais</h2>
                <table className="table table-sm table-hover" >
                    <tbody >
                        <tr >
                            <td > <label >Estrutura | Suporte:</label> </td>
                            <td> <label >Superfície:</label> </td>
                        </tr>
                        <tr>
                            <td >
                                <textarea type="text" className="form-control" placeholder="Estrutura | Suporte" id="estruturaSuporteMat" />
                            </td>
                            <td >
                                <textarea type="text" className="form-control" placeholder="Superfície" id="superficieMat" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Materiais;
