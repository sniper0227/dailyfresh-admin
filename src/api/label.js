import request from '@/utils/request'

export function labelList(query) {
  return request({
    url: '/shopping/label/list',
    method: 'get',
    params: query
  })
}

export function createLabel(data) {
  return request({
    url: '/shopping/label/save',
    method: 'post',
    data
  })
}

export function updateLabel(data) {
  return request({
    url: '/shopping/label/update',
    method: 'post',
    data
  })
}

export function deleteLabel(query) {
  return request({
    url: '/shopping/label/delete',
    method: 'get',
    params: query
  })
}
