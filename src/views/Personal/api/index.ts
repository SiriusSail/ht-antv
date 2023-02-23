import request from '@/utils/request';

const personalApi = {
  basicInfo: '/ddm-iic/sys/sysuser',
  labelList: '/ddm-iic/sys/sysuser/label/list',
  personalTags: '/api/personal/tags'
}

class Service {
  /**
   * @description POST 设置基本信息
  */
  static postSetBasicInfo (id?: any) {
    return request({
      url: `${personalApi.basicInfo}/${id}`,
      method: 'get',
      json: true,
    }).then((res: any) => {
      try {
        if (res.success === true) {
          return Promise.resolve(res)
        }
        return Promise.reject(res)
      } catch (err) {
        console.error(err)
      }
    })
  }
   /**
   * @description POST 设置基本信息
  */
  static labelList (params?: any) {
    return request({
      url: `${personalApi.labelList}`,
      method: 'get',
      json: true,
      params
    }).then((res: any) => {
      try {
        if (res.success === true) {
          return Promise.resolve(res)
        }
        return Promise.reject(res)
      } catch (err) {
        console.error(err)
      }
    })
  }

  /**
     * @description Get 获取tags
    */
  static getPersonTags () {
    return request({
      url: personalApi.personalTags,
      method: 'get',
      json: true,
    }).then((res: any) => {
      if (res.code === 200) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }


}
export default Service


