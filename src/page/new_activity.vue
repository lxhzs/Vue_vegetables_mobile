<template>
  <div class="newActivity">
      <img :src="activity" alt="">
  </div>
</template>

<script>
import $ from '../common';

export default {
  name: 'new_activity',
  data () {
    return {
      activity: ''
    }    
  },
  metaInfo: {
    title: '最新活动'
  },
  mounted: function() {
    var id = this.$route.params.id;
    this.getActivity(id);
  },
  methods:{
    getActivity (id) {
      var self = this;
      $.ajax({
        url: '/api/v1/activities/' + id,
        success: function (res) {
          self.activity = res.data.activity.detail;
        },
        error: function () {
          self.$vux.toast.text('注册失败', 'middle');
        }
      })
    }
  }
}
</script>
