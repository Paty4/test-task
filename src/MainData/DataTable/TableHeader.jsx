import React from 'react';
import styleComponent from './DataTable.module.css';

const TableHeader = (props) => {

    const onClickField = (fieldKey) => {
        if (fieldKey > 0) {
            props.onClickTableCaptionField(fieldKey);
        }
    }
    
    const getArrayTh = () => {
        return props.headerData.map(item => {
            return <th key={item.fieldKey}
                 className={`${item.fieldKey > 0 ? styleComponent.clicked : ''}`}  
                 onClick={ () => {onClickField(item.fieldKey)} }
            >
                {item.fieldCaption}
            </th>;
        });
    }

    return (
        <thead>
            <tr>
                { getArrayTh() }
            </tr>
        </thead>
    );
}

export default TableHeader;