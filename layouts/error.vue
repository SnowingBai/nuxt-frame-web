<template>
  <div class="container">
    <template v-if="error.statusCode === 401">
      <my-error-401 />
    </template>
    <template v-else-if="error.statusCode === 404">
      <my-error-404 />
    </template>
    <template v-else>
      <my-error-500 />
    </template>
  </div>
</template>

<script>
export default {
  components: {
    MyError401: () => import('~/components/error/401'),
    MyError404: () => import('~/components/error/404'),
    MyError500: () => import('~/components/error/500')
  },
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  layout: 'empty'
}
</script>
