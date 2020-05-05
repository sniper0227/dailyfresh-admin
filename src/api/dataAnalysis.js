import request from '@/utils/request'

export function dataAnalysis(query) {
  return request({
    url: '/',
    method: 'get',
    params: query
  })
}
