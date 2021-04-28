import React from 'react';
import styleComponent from './DataTable.module.css';
import TableBodyRow from './TableBodyRow';

const TableBody = (props) => {
    
    const getRows = () => {
        return props.bodyData.map(item => {
            return  <TableBodyRow rowData={ item } key={item.id} />
        });
    }

    return (
        <tbody>
                { getRows() }
        </tbody>
    );
}

export default TableBody;