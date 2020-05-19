import Api from '@/services/Api'

export default {
  fetchPosts (page, perpage) {
    return Api().get('api/news?page=' + page + '&perpage=' + perpage)
  },
  addPost (params) {
    return Api().post('api/news/add', params)
  },
  updatePost (params) {
    return Api().put('api/news/update/' + params.id, params)
  },
  getPost (params) {
    return Api().get('api/news/' + params.id)
  },
  deletePost (id) {
    return Api().delete('api/news/delete/' + id)
  }
}
