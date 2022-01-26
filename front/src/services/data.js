import api from './api'


const getCsvRows = (params) => { 
    return api.get('/reader/csv-row/', {params:params});
}

const updateStatusRow = (id, payload) => {
    return api.patch(`/reader/csv-row/${id}/`, payload)
}



const uploadCsvFile = (file) =>{
    const form = new FormData();
    form.append('csv',file); 
    return api.post('/reader/upload-csv/', form, { 
        headers : {
            "Content-Type" : "multipart/form-data",
        }})
 }


const statistics = () =>{
    return api.get('/reader/statistics/')
}

const DataService = {
    updateStatusRow,
    getCsvRows,
    uploadCsvFile,
    statistics
}

export default DataService;