import API from "../api";
import APINo from "../api_noauth";


export default class AuthService {
    static login(payload) {
        return APINo.axNo.post('auth/login', payload).catch(e => console.log(e))
    }

    static activate(payload) {
        return APINo.axNo.post('auth/activate', payload).catch(e => console.log(e))
    }

    static createToken(data){
        return API.ax.post('auth/create/security/token', data).catch(e => console.log(e))
    }


    static getRegistrationType() {
        return API.ax.get('registration/read/list/registration/type').catch(e => console.log(e))
    }

    static getUserReadModule() {
        return API.ax.get('sys/read/user/modules').catch(e => console.log(e))
    }

    static getCountries(){
        return API.ax.get(`locality/country/list`).catch(e => console.log(e))
    }

    static getRegion(){
        return API.ax.get(`locality/regions/list`).catch(e => console.log(e))
    }

    static getDistricts(region_id){
        return API.ax.get(`locality/districts/list/${region_id}`).catch(e => console.log(e))
    }

    static createApplicationInfo(data){
        return API.ax.post(`registration/create/applicant/info`, data).catch(e => console.log(e))
    }

    static getRegistrationInfo() {
        return API.ax.get(`registration/read/info`).catch(e => console.log(e))
    }

    static createReferee(data){
        return API.ax.post(`registration/create/referees`, data).catch(e => console.log(e))
    }

    static createMembership(data){
        return API.ax.post(`registration/create/membership`, data).catch(e => console.log(e))
    }

    static getPaymentInfo() {
        return API.ax.get(`registration/read/payment/info`).catch(e => console.log(e))
    }

    static createEdoction(data){
        return API.ax.post(`registration/create/education/background`, data, {headers: {'Content-Type': 'multipart/form-data'}}).catch(e => console.log(e))
    }

    static createPracticalExperience(data){
        return API.ax.post(`registration/create/practical`, data, {headers: {'Content-Type': 'multipart/form-data'}}).catch(e => console.log(e))
    }

    static getPracticalExperience() {
        return API.ax.get(`registration/read/practical`).catch(e => console.log(e))
    }

    static getMembership() {
        return API.ax.get(`registration/read/membership`).catch(e => console.log(e))
    }

    static getReferees() {
        return API.ax.get(`registration/read/referees`).catch(e => console.log(e))
    }

    static getPdf(){
        return API.ax.get(`registration/read/pdf`).catch(e => console.log(e))
    }


    






    


    static getUser(){
        return API.ax.get(`auth/activate?token=${sessionStorage.getItem('token')}`).catch(e => console.log(e))
    }


  
    static getAcademicResultsInfo() {
        return API.ax.get(`registration/read/education/background`).catch(e => console.log(e))
    }


    static upgateAcademicInfo(data){
        return API.ax.put(`registration/update/academic-info`, data).catch(e => console.log(e))
    }





}