<template>
  <div id="dealBody">
    <div class="box-information-active">
      <div class="ico active"></div>
      <div class="box-content">
        <div class="tittle text-dark-600">Информация о сделке</div>
        <div class="more-info">
          <div class="info-deal">
            <div class="box-info">
              <div class="tittle-info text-gray-600">Спишется</div>
              <div class="info-min text-gray">с кошелька</div>
              <div class="info-desc text-primary">200 RUB</div>
            </div>
          </div>

          <div class="info-deal">
            <div class="box-info">
              <div class="tittle-info text-gray-600">Комиссия</div>
              <div class="info-min text-warning">покупателя</div>
              <div class="info-desc text-dark">10.00%</div>
            </div>
          </div>

          <div class="info-deal">
            <div class="box-info">
              <div class="tittle-info text-gray-600">Получу</div>
              <div class="info-min text-gray">от покупателя</div>
              <div class="info-desc text-dark">220 RUB</div>
            </div>
          </div>

        </div>

        <div class="payment-box">
          <div class="payment-tittle text-gray-600">Способы оплаты</div>
        </div>

        <div class="payment-box">
          <div class="payment-tittle text-gray-600">Условия сделки</div>
          <div class="text">💯🚀 Быстрый, надежный и честный продавец криптовалюты!👇 Я всегда в сети, отвечу на любой вопрос в чате 📲, оперативно переведу средства 💸  и будете уверены в безопасности вашей сделки. 🔐 ✅Тинькофф / Почта Банк / Альфа-Банк / Авангард✅ удобства: округляйте сумму, что бы не было копеек. 😹 Комментарии к переводу не нужны. 👽 Могу запросить чек☝️ Хорошего дня и успеха в делах! 🤝</div>
        </div>

      </div>
    </div>

    <div class="box-information-active">
      <div class="ico active focus"></div>
      <div class="box-content">
        <div class="tittle text-dark-600">Информация о сделке</div>
        <div class="more-info">
          <div class="info-deal">
            <p></p>
          </div>
        </div>
      </div>
    </div>

    <div class="box-information">
      <div class="ico"></div>
      <div class="box-content">
        <div class="tittle text-dark-600" :class="'inactive'">Подтверждение платежа</div>
        <div class="more-info">
          <div class="info-deal">
            <p></p>
          </div>
        </div>
      </div>
    </div>

    <div class="box-information">
      <div class="ico"></div>
      <div class="box-content">
        <div class="tittle text-dark-600" :class="'inactive'">Завершение сделки</div>
        <div class="more-info">
          <div class="info-deal">
            <p></p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "dealBody"
})
</script>

<style scoped>
#dealBody {
  padding:30px;
  background:#fff;
  width:940px;
  min-height:720px;
  border-radius:6px;
}
.box-content {
  padding:10px 20px;
  width:fit-content;
}

.text-dark-600 {
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
  color:#3F4254;
}
.text-gray-600 {
  color:#7E8299;
  font-weight: 600;
}
.text-gray {
  color:#7E8299;
}
.text-primary {
  color:#2884EF;
}
.tittle-info {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
}
.info-min {
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  margin-top: 4px;
}
.info-desc {
  font-size: 24px;
  line-height: 24px;
  font-weight: 600;
  margin-top: 10px;
}
.more-info {
  margin-top: 20px;
  display:flex;
}
.info-deal {
  margin-left: 45px;
}
.info-deal:first-child {
  margin-left: 0px;
}
.text-dark {
  color:#3F4254;
}
.payment-box {
  margin-top: 20px;
}
.payment-tittle {
  font-size: 16px;
  line-height: 16px;
}
.text {
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  margin-top: 15px;
}
.box-information, .box-information-active {
  display:flex;
  min-height: 120px;
  position: relative;
}
.box-information:before {
  content:'';
  width:1px;
  height:100%;
  top: 40px;
  left: 20px;
  right:0;
  position: absolute;
  border-left:1px dashed #E1E3EA;
}
.box-information:last-child:before, .box-information-active:last-child:before {
  display:none;
}
.box-information-active:before {
  content:'';
  width:1px;
  height:100%;
  top: 40px;
  left: 20px;
  right:0;
  position: absolute;
  border-left:1px dashed #3E97FF;
}
.inactive {
  color:#7E8299;
}
.box-information .active, .box-information-active .active {
  background:#EEF6FF;

}
.box-information .focus, .box-information-active .focus {
  border:1px solid #3E97FF;
  box-shadow: 0px 0px 0px 2px rgba(62, 151, 255, 0.32);
}
.ico {
  display:block;
  width: 40px;
  height: 40px;
  padding:8px;
  border-radius: 100px;
  background:#F9F9F9;
}
.box-information .ico .active{

}
</style>