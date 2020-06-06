
import axios from 'axios'

import sever from './index'

const axiosFn = {
    commonPost(url, params) {
        return new Promise((resolve, reject) => {
            this.createTokenAxios().post(url, params).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    commonGet(url, params) {
        return new Promise((resolve, reject) => {
            this.createTokenAxios().get(url, { params: params }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    commonGetId(url, params) {
        return new Promise((resolve, reject) => {
            this.createTokenAxios().get(`${url}/${params}`).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    commonDelete(url) {
        return new Promise((resolve, reject) => {
            this.createTokenAxios().delete(url).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
	 * 将键值对象转换为FormData对象。
	 * @param {*} params 键值对象
	 */
    paramsToFormData(params) {
        let newFormData = new FormData();
        for (let name in params) {
            newFormData.append(name, params[name]);
        }
        return newFormData
    },
	/**
	 * 创建ajax请求对象
	 */
    createAxios(token, posOid, posOtype) {
        const timeout = 60 * 1000 * 5
        if (token) {
            if (posOid && posOtype) {
                return axios.create({
                    headers: {
                        "token": token,
                        "GxUser-PosOid": posOid,
                        "GxUser-PosOtype": posOtype
                    },
                    timeout: timeout
                });
            } else {
                let groupId = sever.getGroupId()||0
                return axios.create({
                    headers: {
                        'token': token,
                        "GxUser-PosOid": groupId,
                        "GxUser-PosOtype": 2
                    },
                    timeout: timeout
                });
            }

        } else {
            return axios.create({
                timeout: timeout
            });
        }
    },

    createTokenAxios() {
        return this.createAxios(this.getToken())
    },




    /**
     * 获取token
     */
    getToken() {
        return localStorage.getItem('blockToken') || ''
    },
	/**
	 * 改变token
	 * @param {*} val 参数token
	 */
    setToken(val) {
        return localStorage.setItem('blockToken', val)
    },
	/**
	 * 删除token
	 */
    removeToken() {
        return localStorage.removeItem('blockToken');
    },

    /**
   * 获取userData
   */
    getUserData() {
        return localStorage.getItem('userData') || ''
    },
    /**
     * 改变userData
     * @param {*} val 参数userData
     */
    setUserData(val) {
        return localStorage.setItem('userData', val)
    },
    /**
     * 删除UserData
     */
    removeUserData() {
        return localStorage.removeItem('userData');
    },
}


export default axiosFn
