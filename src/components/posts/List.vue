<template>
  <div class="posts">
    <h1>Posts</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'AddPost' }" class="add_post_link">Add Post</router-link>
      </div>
      <table>
        <tr>
          <td>ID</td>
          <td>Title</td>
          <td width="450">Content</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="post in posts" v-bind:key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.content }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPost', params: { id: post.id } }">Edit</router-link> |
            <a href="javascript:void(0)" @click="deletePost(post.id)">Delete</a>
          </td>
        </tr>
      </table>
      <div class="pagination-wrapper">
        <paginate
          v-model="page"
          :page-count="totalPage"
          :page-range="3"
          :click-handler="changePage"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :page-class="'page-numbers'"
          :prev-class="'page-numbers prev'"
          :next-class="'page-numbers next'"
          :container-class="'pagination'">
        </paginate>
      </div>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'AddPost' }" class="add_post_link">Add Post</router-link>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: [],
      page: 1,
      perpage: 5,
      total: 0,
      totalPage: 1
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts(this.page, this.perpage)
      this.posts = response.data.data
      this.total = response.data.total
      this.totalPage = Math.ceil(this.total / this.perpage)
    },
    async deletePost (id) {
      if (confirm('Do you really want to delete ?')) {
        await PostsService.deletePost(id)
        window.location.reload()
      }
    },
    async changePage (page) {
      this.page = page
      const response = await PostsService.fetchPosts(this.page, this.perpage)
      this.posts = response.data.data
    }
  }
}
</script>

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table {
  margin: 20px 0 80px 0;
  width: 100%;
  border: 1px double;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #41b883;;
  color: #fff;
}
a {
  color: #41b883;;
  text-decoration: none;
}
a.add_post_link {
  background: #35495e;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}

.pagination-wrapper {
  text-align: center;
  margin: 0;
}

.pagination {
  display: inline-block;
  height: 50px;
  padding: 0 25px;
  border-radius: 35px;
  background-color: #f2f2f2;
}

.page-numbers {
  display: block;
  padding: 0 25px;
  float: left;
  transition: 400ms ease;
  color: #595959;
  font-size: 16px;
  letter-spacing: 0.1em;
  line-height: 50px;
}

.page-numbers:hover, .page-numbers:focus, .page-numbers.active {
  background-color: #41b883;
  color: #fff;
}

.page-numbers a {
  color: black;
}

.page-numbers a:hover, .page-numbers a:focus, .page-numbers a.active {
  color: #fff;
  outline: none;
}
</style>
