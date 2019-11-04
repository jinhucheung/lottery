<template>
  <layout title='Lotteries' description='A lottery application' keywords='lottery'>
    <div class="container">
        <div class="lucky-wheel">
            <div class="lucky-title"></div>
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                     <div class="wheel-pointer" @click="rotate_handle" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
                </div>
                <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                            <div class="prize-pic">
                                <img :src="item.icon">
                            </div>
                            <div class="prize-count" v-if="item.count">
                                {{item.count}}
                            </div>
                            <div class="prize-type">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="main-bg"></div>
            <div class="bg-p"></div>
            <div class="content">
                <div class="lottery_ticket">今日免费抽奖次数： {{lottery_ticket}}</div>
            </div>
            <div class="tip">
                <div class="tip-title">活动规则</div>
                <div class="tip-content">
                    <p> 1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。 2.金币抽奖，每10个金豆可兑换一次大转盘机会。</p>
                    <p> 2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</p>
                    <p> 3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</p>
                </div>
            </div>
        </div>
        <div class="toast" v-show="toast_control">
            <div class="toast-container">
                <img :src="toast_pictrue" class="toast-picture">
                <div class="close" @click="close_toast"></div>
                <div class="toast-title">
                    {{toast_title}}
                </div>
                <div class="toast-btn">
                    <div class="toast-cancel"  @click="close_toast">关闭</div>
                </div>
            </div>
        </div>
        <div class="toast-mask" v-show="toast_control"></div>
    </div>
  </layout>
</template>

<style>
  @import url('../../asset/css/lotteries.css');
</style>

<script type='babel'>
  export default {
    data() {
      return {
        easejoy_bean: 0, //金豆
        lottery_ticket: 1, //抽奖次数
        prize_list: [
          {
            icon: require("../../asset/images/bean_500.png"), // 奖品图片
            count: 10, // 奖品数量
            name: "易趣豆", // 奖品名称
            isPrize: 1 // 该奖项是否为奖品
          },
          {
            icon: require("../../asset/images/bean_five.png"),
            count: 5,
            name: "豆",
            isPrize: 1
          },
          {
            icon: require("../../asset/images/bean_one.png"),
            count: 10,
            name: "易趣豆",
            isPrize: 1
          },
          {
            icon: require("../../asset/images/point_five.png"),
            count: 5,
            name: "积分",
            isPrize: 1
          },
          {
            icon: require("../../asset/images/point_ten.png"),
            count: 10,
            name: "积分",
            isPrize: 1
          },
          {
            icon: require("../../asset/images/bean_500.png"),
            count: 10,
            name: "易趣豆",
            isPrize: 1
          },
          {
            icon: require("../../asset/images/give_up.png"),
            count: 0,
            name: "未中奖",
            isPrize: 0
          },
          {
            icon: require("../../asset/images/bean_500.png"),
            count: 10,
            name: "易趣豆",
            isPrize: 1
          }
        ], //奖品列表
        toast_control: false, //抽奖结果弹出框控制器
        hasPrize: false, //是否中奖
        start_rotating_degree: 0, //初始旋转角度
        rotate_angle: 0, //将要旋转的角度
        start_rotating_degree_pointer: 0, //指针初始旋转角度
        rotate_angle_pointer: 0, //指针将要旋转的度数
        rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
        rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
        click_flag: true, //是否可以旋转抽奖
        index: 0
      };
    },
    computed: {
      toast_title() {
        return this.hasPrize
          ? "恭喜您，获得" +this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name
          : "未中奖";
      },
      toast_pictrue() {
        return this.hasPrize
          ? require("../../asset/images/congratulation.png")
          : require("../../asset/images/sorry.png");
      }
    },
    methods: {
      //此方法为处理奖品数据
      init_prize_list(list) {},
      rotate_handle() {
        this.index = 1 //指定每次旋转到的奖品下标
        this.rotating();
      },
      rotating() {
        if (!this.click_flag) return;
        var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var during_time = 5; // 默认为1s
        var random = Math.floor(Math.random() * 7);
        var result_index = this.index ; // 最终要旋转到哪一块，对应prize_list的下标
        var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
        var rand_circle = 6; // 附加多转几圈，2-3
        this.click_flag = false; // 旋转结束前，不允许再次触发
        if (type == 0) {
          // 转动盘子
          var rotate_angle =
            this.start_rotating_degree +
            rand_circle * 360 +
            result_angle[result_index] -
            this.start_rotating_degree % 360;
          this.start_rotating_degree = rotate_angle;
          this.rotate_angle = "rotate(" + rotate_angle + "deg)";
          // // //转动指针
          // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
          // this.start_rotating_degree_pointer =360*rand_circle;
          var that = this;
          // 旋转结束后，允许再次触发
          setTimeout(function() {
            that.click_flag = true;
            that.game_over();
          }, during_time * 1000 + 1500); // 延时，保证转盘转完
        } else {
          //
        }
      },
      game_over() {
        this.toast_control = true;
        this.hasPrize = this.prize_list[this.index].isPrize
      },
      //关闭弹窗
      close_toast() {
        this.toast_control = false;
      }
    }
  }
</script>