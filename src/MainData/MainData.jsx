import React from 'react';
import TableBody from './DataTable/TableBody';
import TableHeader from './DataTable/TableHeader';
import FooterPage from './FooterPage/FooterPage';
import HeaderPage from './HeaderPage/HeaderPage';
import styleComponent from './MainData.module.css';

const MainData = (props) => {
    //debugger
    return (
        <div className={styleComponent.main}>
            <HeaderPage 
                headerData={ props.headerTable } 
                operation={ props.filter.currentTypeOperation }
                selectedField={ props.filter.selectedFieldValue }
                selectedOperation={ props.filter.selectedOperationValue }
                inputText={ props.filter.filterText }
                inputTypeText={ props.filter.filterTextType }
                onChangeSelectedField={props.onChangeSelectField}
                onChangeSelectOperation={ props.onChangeSelectOperation }
                onChangeFilterText={ props.onChangeFilterText } 
                onClickSearchButton={ props.onClickSearchButton }
                onClickClearButton={ props.onClickClearButton }
            />
            <p>Для сортировки требуется кликнуть на закголовок колонки в таблице(и еще раз для изменения направления сортировки)</p>
            <table className={styleComponent.table}>
                <TableHeader 
                    headerData={ props.headerTable } 
                    onClickTableCaptionField={ props.onClickTableCaptionField }
                />
                <TableBody bodyData={ props.bodyTable } />
            </table>
            <FooterPage paginator={ props.paginator } paginatorClick={ props.paginatorClick } />
        </div>
    );
}

export default MainData;