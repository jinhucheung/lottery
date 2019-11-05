<template>
  <layout title='幸运大转盘' description='A lottery application' keywords='lottery'>
    <div class="container">
        <div class="lucky-wheel">
            <div class="lucky-title"></div>
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                     <div class="wheel-pointer" @click="hit"></div>
                </div>
                <div class="wheel-bg" :class="rotateClass" :style="hitStyle">
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item, index) in prizes" :key="index">
                            <div class="prize-pic">
                                <img :src="item.icon">
                            </div>
                            <div class="prize-value" v-if="item.value">
                                {{item.value}}
                            </div>
                            <div class="prize-type">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main content-main">
            <div class="main-bg"></div>
            <div class="bg-p"></div>
            <div class="content">
                <div class="lottery_ticket">抽奖次数: {{count}}</div>
            </div>
        </div>
        <div class="toast" v-show="toast">
            <div class="toast-container">
                <img :src="toast_pictrue" class="toast-picture">
                <div class="close" @click="toast=false"></div>
                <div class="toast-title">
                    {{toast_title}}
                </div>
                <div class="toast-btn">
                    <div class="toast-cancel"  @click="toast=false">关闭</div>
                </div>
            </div>
        </div>
        <div class="toast-mask" v-show="toast"></div>
    </div>
  </layout>
</template>

<style>
  @import url('../../asset/css/lotteries.scss');
</style>

<script type='babel'>
  export default {
    data() {
      return {
        toast: false,
        hasPrize: false,
        rotating: false,
        index: 0
      };
    },
    computed: {
      toast_title() {
        return this.hasPrize
          ? `恭喜您，获得 ${this.prizes[this.index].value}${this.prizes[this.index].name}`
          : "未中奖";
      },
      toast_pictrue() {
        return this.hasPrize
          ? require("../../asset/images/congratulation.png")
          : require("../../asset/images/sorry.png");
      },
      rotateClass() {
        return this.rotating ? 'rotate' : ''
      },
      hitStyle() {
        return this.rotating ? '' : `transform: rotate(${this.hitAngle}deg); transition: transform 5s ease-in-out`
      },
      hitAngle() {
        return 360 - (360.0 / this.prizes.length * (this.index + 1) - 180.0 / this.prizes.length)
      }
    },
    methods: {
      hit() {
        if (this.rotating || this.count <= 0 || this.hasPrize) return;

        this.rotating = true

        this.$request.post(`/lotteries/${this.id || 0}`)
          .then(res => {
            this.$nextTick(() => {
              setTimeout(() => {
                this.index = res.data.index
                this.hasPrize = res.data.hasPrize
                this.count = res.data.count
                this.rotating = false
                this.toast = true
              }, 5000)
            })
          })
          .catch(xhr => {
            this.rotating = false
            this.hasPrize = false
            console.error(xhr)
          })
      }
    }
  }
</script>