import React from 'react';
import styleComponent from './DataTable.module.css';

const TableBodyRow = (props) => {

    const changeDateFormat = (inputDate) => {
        let tmpDate = new Date(inputDate);
        return `${tmpDate.getFullYear()}-${tmpDate.getMonth() + 1 < 10 ? '0' : ''}${tmpDate.getMonth() + 1}-${tmpDate.getDate() < 10 ? '0' : ''}${tmpDate.getDate()}`;
    }

    return (
        <tr>
            <td>{changeDateFormat(props.rowData.date)}</td>
            <td>{props.rowData.name}</td>
            <td>{props.rowData.count}</td>
            <td>{props.rowData.distance}</td>
        </tr>
    );
}

export default TableBodyRow;