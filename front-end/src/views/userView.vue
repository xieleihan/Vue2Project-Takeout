<template>
  <div class="user">
    <div class="topTitle">用户信息
      <img @click="returnHomeView" class="leftBtn" src="../assets/icon/向左箭头(1).png" alt="">
    </div>
    <div class="avater">
      <img :src="avater" alt="">
    </div>
    <p class="username">{{ username }}</p>
    <ul class="settingBox">
      <li class="item">
        <span>个人资料</span>
        <img src="../assets/icon/向左箭头(1).png" alt="">
      </li>
      <li class="item" @click="showPopup">
        <span>订单</span>
        <img src="../assets/icon/向左箭头(1).png" alt="">
      </li>
      <li class="item">
        <span>通知</span>
        <input type="checkbox" class="checkbox" @click="setCheck" :style="`backgroundColor:${themeColor}`"
          v-model="isOpenNotifily">
      </li>
      <li class="item">
        <span>设置</span>
        <img src="../assets/icon/向左箭头(1).png" alt="">
      </li>
    </ul>
    <button class="logout">登出</button>
    <van-popup v-model="show" closeable :style="{ height: '100%',width:'100%' }">
      <div class="popupTitle">订单详情</div>
      <van-steps :active="active" class="vantStep">
        <van-step>买家下单</van-step>
        <van-step>商家接单</van-step>
        <van-step>买家提货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
      <div class="popupContainer">
        <div class="item" v-for="(item, index) in successObj" :key="index">
          <div class="popupNumber">
            <span>订单编号:</span>
            <span>{{ item.number }}</span>
          </div>
          <div class="popupInfo">
            <div class="imgBox">
              <!-- 动态图片根据 index 渲染不同的图片 -->
              <img :src="`https://picsum.photos/300/300?${index}`" alt="商品图片">
            </div>
            <div class="popupSuccessTitle"><span>{{ item.card[0].title }}</span></div>
            <div class="quantity">{{ item.quantity || '未知件数' }}</div>
            <div class="picel">{{ item.total || '未知金额' }}</div>
            <div class="time">{{ item.time || '未知时间' }}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (sessionStorage.getItem('AUTO_TOKEN') !== 'pVZsemWZjpnh9EimXFmRHJoBdvd0qMO6wzjHG0DQixDm2WdNnKEPDvbwZUSOD97kUCb31w0dUv2O7NDY7RDh723blNRTF2etm12X') {
        vm.$router.push('/lognin/loginpage')
        vm.$emit('hide-nav-bar')
      }
    })
  },
  created () {
    this.$emit('hide-nav-bar')
    sessionStorage.setItem('avaterImg', 'https://picsum.photos/300/300')
    this.avater = sessionStorage.getItem('avaterImg')
    this.username = this.randomname[Math.floor(Math.random() * this.randomname.length)]
    this.successObj = JSON.parse(sessionStorage.getItem('orders'))
    // console.log(this.successObj)
  },
  data () {
    return {
      isCheckBox: false,
      themeColor: '#ccc',
      isOpenNotifily: false,
      avater: '',
      username: '',
      randomname: ['Hello World!', '你好世界!', 'こんにちは世界!', '안녕하세요 세계!', 'Bonjour le monde!', 'Hallo Welt!', 'Ciao mondo!', 'Hola Mundo!'],
      show: false,
      active: 1,
      successObj: ''
    }
  },
  methods: {
    setCheck () {
      if (!this.isCheckBox) {
        this.isCheckBox = true
        this.themeColor = '#1ebc5d'
        this.openNotification()
      } else {
        this.isCheckBox = false
        this.themeColor = '#ccc'
      }
    },
    returnHomeView () {
      this.$router.push('/home')
      this.$emit('show-nav-bar')
      sessionStorage.setItem('activeIndex', 0)
    },
    openNotification () {
      if (!('Notification' in window)) {
        window.alert('很抱歉你的浏览器不支持通知功能')
      } else if (Notification.permission === 'granted') {
        this.showNotification()
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.showNotification()
          }
        })
      }
    },
    showNotification () {
      const notification = new Notification('通知', {
        body: '这是一个通知,用于测试使用',
        icon: '../favicon.ico'
      })
      notification.onclick = () => {
        this.$router.push('/sms')
        this.$emit('show-nav-bar')
        sessionStorage.setItem('activeIndex', 3)
      }
    },
    showPopup () {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
@radius: 20px;
.user{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    position: relative;
    .topTitle{
        font-size: 20px;
        position: fixed;
        top: 0;
        left: 0;
        text-align: center;
        line-height: 50px;
        height: 50px;
        width: 100%;
        // background-color: #1ebc5d;
        color: black;
        .leftBtn{
            position: absolute;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
        }
    }
    .avater{
        width: 100px;
        height: 100px;
        position: absolute;
        top: 100px;
        border-radius: 50%;
        left: 50%;
        overflow: hidden;
        transform: translateX(-50%);
        img{
            width: 100%;
            height: 100%;
        }
    }
    .username{
        font-size: 20px;
        text-align: center;
        position: absolute;
        top: 220px;
        left: 50%;
        transform: translateX(-50%);
    }
    @media screen and (min-width: 545px){
        .avater{
            width: 80px;
            height: 80px;
            top: 80px;
            left: 100px;
        }
        .username{
            top: 100px;
            left: 60%;
        }
    }
    .settingBox{
        width: 90%;
        height: 300px;
        position: absolute;
        top: 62%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 16px;
        .item{
            background-color: #fcfbff;
            height: 50px;
            margin: 10px 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            border-radius: 10px;
            img{
                transform: rotate(-180deg);
                height: 50%;
            }
            .checkbox{
                position: relative;
                border: none;
                appearance: none;
                background: #ccc;
                outline: none;
                width: 40px;
                height: 15px;
                border-radius: 20px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            .checkbox::before{
                content: "";
                position: absolute;
                width: 15px;
                height: 15px;
                top: 0;
                left: 0;
                background-color: white;
                transform: scale(1.1);
                border-radius: 50%;
                transition: 0.3s ease all;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            .checkbox:checked::before{
                left: 25px;
                background-color: white;
            }
        }
    }
    .logout{
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        border: none;
        outline: none;
        background-color: #1ebc5d;
        width: 90%;
        height: 50px;
        font-size: 20px;
        color: white;
        text-align: center;
        border-radius: @radius;
    }
    .popupTitle{
      width: 100%;
      text-align: center;
      height: 50px;
      line-height: 50px;
      margin-top: 20px;
    }
    .vantStep{
      width: 90%;
      margin: 0 auto;
      margin-top: 30px;
    }
    .popupContainer{
      width: 90%;
      margin: 0 auto;
      margin-top: 10px;
      .item{
        width: 100%;
        height: 100px;
        position: relative;
        border-radius: 20px;
        background-color: #fcfbff;
        overflow: hidden;
        margin-bottom: 10px;
        .popupNumber{
          width: 100%;
          height: 20px;
          font-size: 14px;
          color: #ccc;
          span{
            margin-left: 10px;
          }
        }
        .popupInfo{
          width: 100%;
          height: calc(100% - 20px);
          padding: 10px;
          position: relative;
          .imgBox{
            width: 60px;
            overflow: hidden;
            height: 30px;
            vertical-align: middle;
            position: absolute;
            bottom: 20px;
            left: 20px;
            img{
              min-width: 28px;
              min-height: 28px;
              width: 28px;
              height: 28px;
            }
          }
          .popupSuccessTitle{
            font-size: 16px;
            position: absolute;
            top: 10px;
            left: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 60%;
            display: flex;
          }
          .quantity{
            font-size: 14px;
            color: #ccc;
            position: absolute;
            bottom: 40px;
            right: 10px;
          }
          .picel{
            font-size: 20px;
            color: black;
            font-family: "PingFang SC";
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-weight: bold;
          }
          .time{
            position: absolute;
            top: 0;
            right: 5px;
            font-size: 10px;
            color: #ccc;
          }
        }
      }
    }
}
</style>
