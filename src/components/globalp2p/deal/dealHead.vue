<template>
  <div id="dealHead">
    <div class="info-box">
      <div class="oreder-number fz-16 text-primary pointer">742749830329139200</div>
      <div class="oreder-box-info">
        <div class="info text-dark-600 fz-24">Вывод 200 RUB</div>
        <div class="status alert-info">Не оплачено</div>
      </div>
      <div class="order-alert-status text-gray-600">⏳ Ожидаем отправки средств</div>
    </div>
    <div class="box-timer">
      <div class="timer-text fz-16">Сделка завершится через</div>
      <div class="timer-box">
        <div class="box-time">0</div>
        <div class="box-time">0</div>
        <div class="box-interval">:</div>
        <div class="box-time">0</div>
        <div class="box-time">0</div>
      </div>
      <div class="timer-date-info fz-14">Вы создали 2023-08-02 09:22:39</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "dealHead"
})
</script>

<style scoped>
#dealHead {
  max-width: 1471px;
  padding:20px 30px;
  background:#fff;
  border-radius:6px;
  margin-top: 20px;
  min-height: 146px;
  display:flex;
  justify-content: space-between;
}
.fz-14 {
  font-size: 14px;
}
.fz-16 {
  font-size: 16px;
  line-height: 16px;
}
.fz-22 {
  font-size: 22px;
}
.fz-24 {
  font-size: 24px;
}
.pointer {
  cursor:pointer;
}
.mb-0 {
  margin-bottom: 0px;
}
.text-primary {
  color:#2884EF;
}
.info-box {

}
.oreder-box-info {
  margin-top: 9px;
  display:flex;
  align-items: center;
}
.oreder-box-info .info {
  line-height: 24px;
  color:#3F4254;
  font-weight: 600;
}
.status {
  padding:7px 8px;
  border-radius:6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  margin-left: 15px;
}
.alert-info {
  color:#2884EF;
  background:#EEF6FF;
}
.alert-success {

}
.alert-danger {

}
.order-alert-status {
  font-size: 18px;
  line-height: 18px;
  margin-top: 15px;
}
.box-timer {

}
.timer-box {
  display:flex;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
}
.box-time {
  background: rgba(62, 151, 255, 0.1);
  color:#2884EF;
  font-size: 36px;
  line-height: 36px;
  font-weight: 600;
  margin: 0px 2px;
  width:45px;
  height:56px;
  display:flex;
  align-items: center;
  justify-content: center;
}
.box-interval {
  font-size: 36px;
  line-height: 36px;
  font-weight: 600;
  color:#2884EF;
  margin:0px 3px;
  display:flex;
  align-items: center;
  justify-content: center;
}
.timer-text {
  color:#3F4254;
  text-align: right;
  font-weight: 500;
}
.oreder-number {
  line-height: 16px;
}
.timer-date-info {
  color:#7E8299;
  font-weight: 500;
  margin-top: 10px;
}
</style>