<template>
  <div>
    <router-link to="cart">购物车</router-link>
    <van-tabbar
      v-model="active"
      placeholder
      fixed
    >
      <van-tabbar-item
        :name="tabNames[0]"
        icon="apps-o"
        :to="{name:tabNames[0]}"
        replace
      >
        工作
      </van-tabbar-item>
      <van-tabbar-item
        :name="tabNames[1]"
        icon="apps-o"
        :to="{name:tabNames[1]}"
        replace
      >
        工作
      </van-tabbar-item>
      <van-tabbar-item
        :name="tabNames[2]"
        icon="apps-o"
        :to="{name:tabNames[2]}"
        replace
      >
        工作
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 'list',
      tabNames: [ 'list', 'detail', 'message' ],
    }
  },
  async created() {
    await this.test()
  },
  methods: {
    test() {
      console.log('created test----')
    }
  }
}
</script>