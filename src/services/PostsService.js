import Api from '@/services/Api'

export default {
  fetchPosts (page, perpage) {
    return Api().get('news?page=' + page + '&perpage=' + perpage)
  },
  addPost (params) {
    return Api().post('news/add', params)
  },
  updatePost (params) {
    return Api().put('news/update/' + params.id, params)
  },
  getPost (params) {
    return Api().get('news/' + params.id)
  },
  deletePost (id) {
    return Api().delete('news/delete/' + id)
  }
}
