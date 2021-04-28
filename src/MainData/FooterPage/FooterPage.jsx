import React from 'react';
import styleComponent from './FooterPage.module.css';

const FooterPage = (props) => {

    const getPaginationButtons = () => {

        let pageCount = Math.ceil(props.paginator.totalRowCount / props.paginator.pageSize);
        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
        return pages.map(item => {
            return (
                <button key={item} 
                    className={props.paginator.currentPage === item ? styleComponent.activePage : ''}
                    onClick={ () => props.paginatorClick(item) }
                >
                    {item}
                </button>
            );
        });
    }
    
    return (
        <div className={styleComponent.footer}>
            { getPaginationButtons() }
        </div>
    );
}

export default FooterPage;