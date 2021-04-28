import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPageActionCreator, setDataActionCreator, setFieldSortActionCreator, setFilterTextActionCreator, setSelectedFieldActionCreator, setSelectedOperationActionCreator, setTotalRowCountActionCreator, setAskSortActionCreator } from '../redux/mainReducer';
import MainData from './MainData';

class DataContainer extends React.Component {

    componentDidMount() {
        this.getDataFromServer(this.props.paginator.currentPage, true, -1);
    }

    onChangePage = (pageNumber) => {
        this.getDataFromServer(pageNumber, true, this.props.sortTabel.fieldKey);
        this.props.setCurrentPage(pageNumber);
    }

    onChangeSelectField = (selectedField) => {
        this.props.setSelectedFieldValue(selectedField);
    }

    onChangeSelectOperation = (selectedOperation) => {
        this.props.setSelectedOperationValue(selectedOperation);
    }

    onChangeFilterText = (text) => {
        this.props.setFilterText(text);
    }

    onClickSearchButton = () => {
        this.getDataFromServer('1', true);
        this.props.setCurrentPage('1');
        
    }

    onClickClearButton = () => {
        this.props.setSelectedFieldValue('-1');
        this.props.setSelectedOperationValue('-1');
        this.props.setFilterText('');
        this.getDataFromServer('1', false);
        this.props.setCurrentPage('1');
    }

    onClickTableCaptionField = (fieldKey) => {
        if (this.props.sortTabel.fieldKey !== Number(fieldKey)) {
            this.props.setFieldSort(fieldKey);

        } else {
            this.props.setAscSorting();
        }
        this.getDataFromServer('1', true, fieldKey);
    }

    render () {
        return <MainData 
            headerTable={ this.props.headerTable }
            bodyTable={ this.props.bodyTable }
            paginator={ this.props.paginator }
            filter={ this.props.filter }
            paginatorClick={ this.onChangePage }
            onChangeSelectField={ this.onChangeSelectField }
            onChangeSelectOperation={ this.onChangeSelectOperation }
            onChangeFilterText={ this.onChangeFilterText }
            onClickSearchButton={ this.onClickSearchButton }
            onClickClearButton={ this.onClickClearButton }
            onClickTableCaptionField={ this.onClickTableCaptionField }
         />;
    }

    getDataFromServer = (currentPage, filter = false, order = -1) => {
        axios.get(this.getQuerySrtring(currentPage, filter, order))
        .then((request) => {
            if (!request.data.err) {
                this.props.setTotalRowCount(request.data.countRecord);
                this.props.setData(request.data.data);
            } else {
                console.error(request.data.err);
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }

    getQuerySrtring = (currentPage, filter = false, order = -1) => {
        let baseUrl = `http://localhost:3001/data?page=${currentPage}&count=${this.props.paginator.pageSize}`;
        if (filter 
            && (this.props.filter.filterOption.field 
                && this.props.filter.filterOption.operation 
                && this.props.filter.filterOption.searchText
                )
            ) {
            baseUrl += `&fieldName='${ this.props.filter.filterOption.field }'&operation='${ this.props.filter.filterOption.operation }'&searchData='${ this.props.filter.filterOption.searchText }'`;
        }
        if (order && Number(order) > -1 ) {
            const seachfield = this.props.headerTable.filter(item => {return item.fieldKey === Number(order)});
            const nameField = seachfield.length ? seachfield[0].fielName : '';
            let ascSorting = true;
            if (this.props.sortTabel.field === nameField) {
                ascSorting = !this.props.sortTabel.ascSorting;
            }
            baseUrl += `&orderFieldName=${nameField}&orderType=${ascSorting}`;
        }
        return baseUrl;
    }
}

const mapStateToProps = (state) => {
    return {
        headerTable: state.mainReducer.dataCaption,
        bodyTable: state.mainReducer.data,
        paginator: state.mainReducer.paginator,
        filter: state.mainReducer.filter,
        sortTabel: state.mainReducer.sortTabel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setData: (reqData) => {
            dispatch(setDataActionCreator(reqData));
        },
        setTotalRowCount: (rowCount) => {
            dispatch(setTotalRowCountActionCreator(rowCount));
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageActionCreator(currentPage));
        },
        setSelectedFieldValue: (selectedField) => {
            dispatch(setSelectedFieldActionCreator(selectedField));
        },
        setSelectedOperationValue: (selectedOperation) => {
            dispatch(setSelectedOperationActionCreator(selectedOperation));
        },
        setFilterText: (text) => {
            dispatch(setFilterTextActionCreator(text));
        },
        setFieldSort: (fieldName) => {
            dispatch(setFieldSortActionCreator(fieldName));
        },
        setAscSorting: () => {
            dispatch(setAskSortActionCreator());
        }
    };
};

const MainDataContainer = connect(mapStateToProps, mapDispatchToProps)(DataContainer);

export default MainDataContainer;