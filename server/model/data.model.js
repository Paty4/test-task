const connection = require('./connection.model');

const getData = (...arg) => {
    return new Promise((resolve, reject) => {
        result = {
            data: null,
            countRecord: 0,
            err: null
        };
    
        const getAllRecordsCount = () => {
            return new Promise((resolve, reject) => {
                console.log('getCount', arg[0]);
                getQueryStringCondition(arg[0])
                .then(query => {
                    console.log('query', query);
                    const quryeString = `select count(*) as cnt from testdata${query}`;
                    connection.query(quryeString, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        console.log('getCountResult', result[0].cnt);
                        resolve(result[0].cnt);
                    });
                });
            });
        }
        
        getAllRecordsCount()
        .then((response) => {
            result.countRecord = response;
            let pageSize = arg[0].count || 4;
            let currentPage = arg[0].page || 1;
            let offsetRecord = (currentPage - 1) * pageSize;
            getListData({offsetRecord: offsetRecord, pageSize: pageSize}, arg[0])
            .then((response) => {
                result.data = response;
                resolve(result);
            });
        })
        .catch((err) => {
            result.data = null;
            result.countRecord = 0;
            result.err = err;
            reject(result);
        });
    });

}

const getListData = (limit, queryParams) => {
    return new Promise((resolve, reject) => {
        let query = '';
        console.log('getListData: ', queryParams, isUseFilter(queryParams));
        if (isUseFilter(queryParams)) {
            getQueryStringCondition(queryParams)
            .then(query => {
                let quryeString = `select * from testdata${query}`;
                if (queryParams.orderFieldName !== undefined && queryParams.orderType !== undefined) {
                    quryeString += ` order by ${queryParams.orderFieldName} ${queryParams.orderType === 'true' ? 'asc' : 'desc'}`;
                }
                quryeString += ` limit ${limit.offsetRecord}, ${limit.pageSize}`;
                console.log(quryeString);
                connection.query(quryeString, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        } else {
            query = `select * from testdata`
            if (queryParams.orderFieldName !== undefined && queryParams.orderType !== undefined) {
                query += ` order by ${queryParams.orderFieldName} ${queryParams.orderType === 'true' ? 'asc' : 'desc'}`;
            }
            query += ` limit ${limit.offsetRecord}, ${limit.pageSize}`;
            connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }
        
    });
} 

const getQueryStringCondition = (queryParams) => {
    return new Promise((resolve,reject) => {
        let query = '';
        if (isUseFilter(queryParams)) {
            getConditionFilter(queryParams.fieldName, queryParams.operation, queryParams.searchData)
            .then((response) => {
                query += isUseFilter(queryParams) ? ` where ${response}` : '';
                resolve(query);
            });
        } else {
            resolve(query);
        }
        
        
    });
}

const isUseFilter = (queryParams) => {
    return queryParams.fieldName != undefined && queryParams.operation != undefined && queryParams.searchData != undefined;
}

const getConditionFilter = (fieldName, operation, searchData) => {
    return new Promise((resolve, reject) => {
        const getFieldType = () => {
            return new Promise((resolve, reject) => {
                let sqlForTypeField = `SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'testdata' AND COLUMN_NAME = ${fieldName}`;
                connection.query(sqlForTypeField, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result[0].DATA_TYPE);
                })
            });
        }
        getFieldType()
        .then((fieldType) => {
            let resultCondition = fieldName.replace(/['"]/g, '') + ' ';
            switch (fieldType) {
                case 'int':
                case 'double':
                    resultCondition += operation.replace(/['"]/g, '') + ' ' +searchData.replace(/['"]/g, '');
                    break;
                case 'varchar':
                case 'date':
                    resultCondition += operation.replace(/['"]/g, '') + ' ';
                    resultCondition += `${operation.replace(/['"]/g, '') === 'like' ? `'%${searchData.replace(/['"]/g, '')}%'` : searchData}`;
                break;
            }
            resolve(resultCondition);
        });
    });
}

module.exports = getData;