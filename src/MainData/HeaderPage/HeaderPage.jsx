import React from 'react';
import styleComponent from './HeaderPage.module.css';

const HeaderPage = (props) => {
//debugger
    const getOptionsFields = () => {
        return props.headerData.map(item => {
             return <option value={item.fieldKey} key={item.fieldKey}>{item.fieldCaption}</option>
        });
    }

    const getOptionsOperation = () => {
        return props.operation.map(item => {
            return <option value={item.value} key={item.value}>{item.label}</option>
       });
    }

    const onChangeField = (event) => {
        const elment = event.target;
        props.onChangeSelectedField(elment.value);
    }

    const onChangeOpeation = (event) => {
        const elment = event.target;
        props.onChangeSelectOperation(elment.value);
    }

    const onChangeInput = (event) => {
        const elment = event.target;
        props.onChangeFilterText(elment.value);
    }

    return (
        <div className={styleComponent.header}>
            <select className={ styleComponent.headerSelect } value={ props.selectedField } onChange={ onChangeField  }>
                <option disabled defaultValue value='-1'> -- Выберите поле -- </option>
                { getOptionsFields() }
            </select>
            <select className={ styleComponent.headerSelect } value={ props.selectedOperation } onChange={ onChangeOpeation } >
                { getOptionsOperation() }
            </select>
            <input className={ styleComponent.headerInput } type={ props.inputTypeText } onChange={ onChangeInput } value={ props.inputText } />
            <button className={ styleComponent.headerButton } onClick={ props.onClickSearchButton } >Искать</button>
            <button className={ styleComponent.headerButton } onClick={ props.onClickClearButton } >Сбросить</button>
        </div>
    );
}

export default HeaderPage;