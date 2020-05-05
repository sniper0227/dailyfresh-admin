import request from '@/utils/request'

export function list(query) {
  return request({
    url: `/cart/list`,
    method: 'get',
    params: query
  })
}
