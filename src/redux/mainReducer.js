const SET_DATA = 'SET_DATA';
const SET_TOTAL_ROW_COUNT = 'SET_TOTAL_ROW_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_SELECTED_FIELD = 'SET_SELECTED_FIELD';
const SET_SELECTED_OPERATION = 'SET_SELECTED_OPERATION';
const SET_FILTER_TEXT = 'SET_FILTER_TEXT';
const SET_FIELD_SORT = 'SET_FIELD_SORT';
const SET_ASC_SORT = 'SET_ASC_SORT';

const initState = {
    data: [],
    dataCaption: [
        {
            fieldKey: 0,
            fielName: 'date',
            fieldCaption: 'Дата',
            type: 'date'
        },
        {
            fieldKey: 1,
            fielName: 'name',
            fieldCaption: 'Название',
            type: 'string'
        },
        {
            fieldKey: 2,
            fielName: 'count',
            fieldCaption: 'Количество',
            type: 'number'
        },
        {
            fieldKey: 3,
            fielName: 'distance',
            fieldCaption: 'Расстояние',
            type: 'number'
        },
    ],
    paginator: {
        currentPage: 1,
        pageSize: 4,
        totalRowCount: 0,
    },
    filter: {
        operation: {
            numberOperation: [
                {label: '-- Выберите операцию --', value: -1},
                {label: '=', value: 0}, 
                {label: '!=', value: 1}, 
                {label: '>', value: 2}, 
                {label: '<', value: 3}, 
                {label: '<=', value: 4}, 
                {label: '>=', value: 5}
            ],
            stringOperation: [
                {label: '-- Выберите операцию --', value: -1},
                {label: '=', value: 0}, 
                {label: '!=', value: 1}, 
                {label: 'like', value: 2}
            ]
        },
        currentTypeOperation: [{label: '-- Выберите операцию --', value: -1}],
        selectedFieldValue: -1,
        selectedOperationValue: -1,
        filterText: '',
        filterTextType: 'text',
        filterOption: {
            field: '',
            operation: '',
            searchText: '',
        }
    },
    sortTabel: {
        field: '',
        fieldKey: -1,
        ascSorting: true
    }
};

const mainReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_DATA:
            return { 
                ...state,
                data: action.data,
            };
        case SET_TOTAL_ROW_COUNT:
            return {
                ...state,
                paginator: { 
                    ...state.paginator,
                    totalRowCount: action.totalRowCount,
                },
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                paginator: { 
                    ...state.paginator,
                    currentPage: action.currentPage,
                },
            };
        case SET_SELECTED_FIELD:
            const searchField = state.dataCaption.filter(item => {return item.fieldKey === Number(action.selectedField)});
            const typeField = searchField.length ? searchField[0].type : undefined;
            const nameField = searchField.length ? searchField[0].fielName : '';
            let textType = 'text';
            let acsessOperation = undefined;
            switch (typeField) {
                case 'number':
                    acsessOperation = state.filter.operation.numberOperation;
                    textType = 'text';
                    break;
                case 'date':
                    acsessOperation = state.filter.operation.numberOperation;
                    textType = 'date';
                    break;
                case 'string':
                    acsessOperation = state.filter.operation.stringOperation;
                    textType = 'text';
                    break
                default:
                    acsessOperation = [{label: '-- Выберите операцию --', value: -1}];
                    break;
            }
            return {
                ...state,
                filter: { 
                    ...state.filter,
                    selectedFieldValue: action.selectedField,
                    currentTypeOperation: [...acsessOperation],
                    selectedOperationValue: -1,
                    filterTextType: textType,
                    filterOption: {
                        ...state.filter.filterOption,
                        field: nameField
                    }
                },
            };
        case SET_SELECTED_OPERATION:
            const searchOperation = state.filter.currentTypeOperation.filter(item => {return item.value === Number(action.selectedOperation)});
            const operationType = searchOperation.length && Number(action.selectedOperation) > -1 ? searchOperation[0].label : '';
            return {
                ...state,
                filter: { 
                    ...state.filter,
                    selectedOperationValue: Number(action.selectedOperation),
                    filterOption: {
                        ...state.filter.filterOption,
                        operation: operationType
                    }
                },
            };
        case SET_FILTER_TEXT:
            return {
                ...state,
                filter: { 
                    ...state.filter,
                    filterText: action.text,
                    filterOption: {
                        ...state.filter.filterOption,
                        searchText: action.text
                    }
                },
            };
        case SET_FIELD_SORT:
            const searchCaptionField = state.dataCaption.filter(item => {return item.fieldKey === Number(action.fieldKey)});
            const nameCaptionField = searchCaptionField.length ? searchCaptionField[0].fielName : '';
            return {
                ...state,
                sortTabel: { 
                    ...state.sortTabel,
                    fieldKey: action.fieldKey,
                    field: nameCaptionField,
                    ascSorting: true
                },
            };
        case SET_ASC_SORT:
            return {
                ...state,
                sortTabel: { 
                    ...state.sortTabel,
                    ascSorting: !state.sortTabel.ascSorting
                },
            };
        default: 
        return state;
    }
}

export const setDataActionCreator = (data) => {
    return {
        type: SET_DATA,
        data
    }
}

export const setTotalRowCountActionCreator = (totalRowCount) => {
    return {
        type: SET_TOTAL_ROW_COUNT,
        totalRowCount
    }
}

export const setCurrentPageActionCreator = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setSelectedFieldActionCreator = (selectedField) => {
    return {
        type: SET_SELECTED_FIELD,
        selectedField
    }
}

export const setSelectedOperationActionCreator = (selectedOperation) => {
    return {
        type: SET_SELECTED_OPERATION,
        selectedOperation
    }
}

export const setFilterTextActionCreator = (text) => {
    return {
        type: SET_FILTER_TEXT,
        text
    }
}

export const setFieldSortActionCreator = (fieldKey) => {
    return {
        type: SET_FIELD_SORT,
        fieldKey
    }
}

export const setAskSortActionCreator = () => {
    return {
        type: SET_ASC_SORT,
    }
}

export default mainReducer;