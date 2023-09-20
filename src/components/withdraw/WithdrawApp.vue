<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body p-0">
      <div class="card-px d-flex flex-column align-items-start my-10">
        <!-- Выбор валюты -->
        <section class="mw-400px w-100">
          <!-- Название блока -->
          <div class="d-flex mb-6">
            <span class="badge badge-square badge-primary me-2">1</span>
            <span class="fw-bold fs-6">{{
              $t("withdraw.chooseCurrency")
            }}</span>
          </div>
          <div class="mb-8">
            <Multiselect
              class="mw-400px multiselect-withdraw"
              v-model="currentCoinUnit"
              v-bind="dataUnit"
              @change="changeCoin"
            >
              <template v-slot:singlelabel="{ value }">
                <div class="multiselect-single-label d-flex gap-2">
                  <img
                    class="character-label-icon w-20px"
                    :src="getAssetPath(`media/crypto/${value.value}.svg`)"
                    :alt="value.value"
                  />
                  <p class="my-0 text-gray-800">{{ value.value }}</p>
                  <p class="my-0 text-muted">
                    {{ currentUnit(value.value).name }}
                  </p>
                </div>
              </template>
              <template v-slot:option="{ option }">
                <div class="d-flex justify-content-between w-100">
                  <div class="d-flex gap-2">
                    <img
                      class="character-label-icon w-20px"
                      :src="getAssetPath(`media/crypto/${option.value}.svg`)"
                      :alt="option.value"
                    />
                    <p class="my-0 text-gray-800">{{ option.value }}</p>
                    <p class="my-0 text-muted">
                      {{ currentUnit(option.value).name }}
                    </p>
                  </div>
                  <p class="my-0 text-muted">
                    {{
                      numberFormatting(
                        unitBalance(option.value)["balance"],
                        unitBalance(option.value)["coinScale"]
                      )
                    }}
                  </p>
                </div>
              </template>
            </Multiselect>
          </div>
        </section>
        <!-- Способы вывода -->
        <section class="mw-400px w-100">
          <!-- Название блока -->
          <div class="d-flex mb-5">
            <span class="badge badge-square badge-primary me-2">2</span>
            <span class="fw-bold fs-6"
              >{{ $t("withdraw.optionWithdraw") }}
            </span>
          </div>
          <article class="mb-8" v-if="currentCoinUnit">
            <div v-if="isFiat">
              <div
                class="border border-dashed rounded mw-400px py-3 px-4 mb-3 cursor-pointer"
                :class="[
                  currentMethodDeposit === paymentsType.paymentName
                    ? 'border-primary bg-light-primary'
                    : 'border-gray-300',
                  paymentsType.withdrawStatus !== 2
                    ? 'cursor-na'
                    : 'cursor-pointer',
                ]"
                @click="
                  paymentsType.withdrawStatus === 2
                    ? changeCurrentMethodDeposit(paymentsType.paymentName)
                    : ''
                "
                v-for="paymentsType in paymentsTypeFiat"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex">
                    <div class="me-4 position-relative">
                      <div class="symbol symbol-50px">
                        <img
                          :src="paymentsType.icon"
                          :alt="paymentsType.paymentName"
                        />
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <div class="fw-bold fs-3 d-flex gap-3 align-items-center">
                        <span>{{ paymentsType.paymentName }}</span>
                        <span
                          class="badge badge-light-danger badge-square badge-sm px-2 py-0"
                          v-if="paymentsType.withdrawStatus !== 2"
                          >Приостановлен</span
                        >
                      </div>
                      <div class="fw-bold text-gray-600">
                        {{ $t("withdraw.paymentType1") }}
                      </div>
                    </div>
                  </div>
                  <span
                    class="badge badge-square badge-light-primary"
                    :class="[
                      currentMethodDeposit === paymentsType.name
                        ? 'badge-primary'
                        : 'badge-light-primary',
                    ]"
                    >2%</span
                  >
                </div>
              </div>
            </div>
            <div v-if="!isFiat">
              <div
                class="border border-dashed rounded mw-400px w-100 py-3 px-4 me-6 mb-3 cursor-pointer"
                :class="[
                  currentMethodDeposit === paymentsType.name
                    ? 'border-primary bg-light-primary'
                    : 'border-gray-300',
                ]"
                v-for="paymentsType in paymentsTypeCrypto"
                @click="
                  paymentsType['isWithdrawable']
                    ? changeCurrentMethodDeposit(paymentsType.name)
                    : ''
                "
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex">
                    <div class="me-4 position-relative">
                      <div class="symbol symbol-50px">
                        <img
                          :src="
                            getAssetPath(
                              `media/crypto/${paymentsType['coinName']}.svg`
                            )
                          "
                          :alt="paymentsType['coinName']"
                        />
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <div class="fw-bold fs-3 d-flex gap-3 align-items-center">
                        <span>{{ paymentsType["name"] }}</span>
                        <span
                          class="badge badge-light-danger badge-square badge-sm px-2 py-0"
                          v-if="!paymentsType['isWithdrawable']"
                          >Приостановлен</span
                        >
                      </div>
                      <div class="fw-bold text-gray-600">
                        {{ $t("withdraw.paymentType1") }}
                      </div>
                    </div>
                  </div>
                  <span
                    class="badge badge-square"
                    :class="[
                      currentMethodDeposit === paymentsType.name
                        ? 'badge-primary'
                        : 'badge-light-primary',
                    ]"
                    >2%</span
                  >
                </div>
              </div>
            </div>
          </article>
        </section>
        <!-- Детали вывода -->
        <section class="mw-400px w-100">
          <!-- Название блока -->
          <div class="d-flex mb-6">
            <span class="badge badge-square badge-primary me-2">3</span>
            <span class="fw-bold fs-6">{{
              $t("withdraw.detailsWithdraw")
            }}</span>
          </div>
          <!-- Содержимое блока -->
          <article v-if="currentMethodDeposit">
            <!-- Блок Криптовалюты -->
            <div
              class="mw-400px w-100 mb-5"
              v-if="!needVerification && isCrypto"
            >
              <!-- Блок комиссии и минимальной суммы -->
              <div class="mb-5 mw-400px">
                <p class="text-gray-600 fs-6 fw-semibold mb-2">
                  {{ $t("withdraw.minSumWith") }} {{ currentNetwork["min"] }}
                  {{ currentCoinUnit }}
                </p>
                <p class="text-gray-600 fs-6 fw-semibold mb-1">
                  {{ $t("withdraw.notice") }}
                </p>
              </div>
              <!-- Блок остаток суточного лимита -->
              <div
                v-if="!isInfinityCryptoWithdraw"
                class="border border-dashed border-gray-400 rounded bg-light mw-400px w-100 mb-5"
              >
                <div
                  class="d-flex justify-content-between p-7 align-items-center"
                >
                  <div class="d-flex align-items-center">
                    <p class="text-gray-500 fw-bold fs-6 mb-0">
                      {{ $t("withdraw.dailyLimit") }}
                    </p>
                    <el-popover
                      placement="top"
                      :width="300"
                      trigger="click"
                      popper-class="popover-base"
                    >
                      <p class="fs-6 mb-1">{{ $t("withdraw.diemLimit") }}</p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.yourLevel") }} {{ userLevelText }}
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.limitCrypto") }}
                        {{ limitCryptoWithdraw }} USDT
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.timeRefreshLimit") }}
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.descriptionOperation") }}
                      </p>
                      <template #reference>
                        <span
                          class="d-flex align-items-center ms-1 cursor-pointer"
                        >
                          <i class="ki-outline ki-question-2 fs-4"></i>
                        </span>
                      </template>
                    </el-popover>
                  </div>
                  <div class="text-gray-500 fw-bold fs-6">
                    {{ limitCryptoWithdraw }} USDT
                  </div>
                </div>
              </div>
              <!-- Crypto -->
              <div class="d-flex flex-column mb-4">
                <div class="mb-4">
                  <label
                    class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                  >
                    <span class="d-flex justify-content-between w-100">
                      <span class="fw-bold fs-6">{{
                        $t("withdraw.addressWithdraw")
                      }}</span>
                      <router-link :to="{ name: 'withdrawAddress' }">{{
                        $t("withdraw.savedAddresses")
                      }}</router-link>
                    </span>
                  </label>
                  <el-autocomplete
                    v-model="currentAddress"
                    class="form-select-elemental w-100"
                    :class="{ 'is-invalid': currentAddressError }"
                    clearable
                    :fetch-suggestions="fetchSuggestionsAddress"
                    placeholder="Введите адрес"
                    @keydown.enter="handleCrypto"
                  />
                  <span class="text-danger">{{ currentAddressError }}</span>
                </div>
                <div class="mb-4">
                  <label
                    class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                  >
                    <span class="fw-bold fs-6">{{ $t("withdraw.total") }}</span>
                    <span>
                      <span class="fw-bold fs-7"
                        ><span class="fs-6 fw-normal"
                          >{{ $t("withdraw.balance") }}
                        </span>
                        {{
                          numberFormatting(
                            balanceCoin["balance"],
                            balanceCoin["coinScale"]
                          )
                        }}
                        {{ currentCoinUnit }}</span
                      >
                    </span>
                  </label>
                  <div class="position-relative">
                    <input
                      v-model="amount"
                      type="number"
                      :min="currentNetwork['min']"
                      :class="{ 'is-invalid': amountCryptoError }"
                      @keydown.enter="handleCrypto"
                      style="background-image: none"
                      class="form-control"
                      placeholder=""
                    />
                    <div
                      class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5"
                    >
                      {{ currentCoinUnit }}
                    </div>
                  </div>
                  <span class="text-danger">{{ amountCryptoError }}</span>
                </div>
                <div
                  class="d-flex justify-content-between text-gray-600 align-items-center mb-3"
                >
                  <span class="fs-6">{{ $t("withdraw.commission") }}</span
                  ><span class="fw-semibold fs-6">{{ currentFee }}</span>
                </div>
                <div
                  class="d-flex justify-content-between text-gray-600 align-items-center"
                >
                  <span class="fs-6">{{ $t("withdraw.recievedSum") }}</span>
                  <span class="fw-semibold fs-3"
                    >{{ currentAmount }} {{ currentCoinUnit }}</span
                  >
                </div>
              </div>
              <button class="btn btn-primary w-100 fs-6" @click="handleCrypto">
                {{ $t("button.withdraw") }}
              </button>
            </div>
            <!-- Фиат, наличные -->
            <div class="mw-400px w-100" v-if="!needVerification && isCash">
              <!-- Описание -->
              <p class="text-gray-600 fs-7 fw-semibold mb-0">
                {{ $t("withdraw.commission") }} 0%.
              </p>
              <p class="text-gray-600 fs-7 fw-semibold mb-0">
                {{ $t("withdraw.minSum") }}
                {{ numberFormatting(minAmountFiat, 2) }}
                ₽.
              </p>
              <p class="text-gray-600 fs-7 fw-semibold">
                {{ $t("withdraw.stepSum") }}
              </p>
              <!-- Блок остаток суточного лимита -->
              <div
                class="border border-dashed border-gray-400 rounded bg-light w-400px mb-5"
                v-if="!isInfinityCashWithdraw"
              >
                <div class="d-flex justify-content-between p-7">
                  <div class="d-flex align-items-center">
                    <p class="text-gray-500 fw-bold fs-6 mb-0 mw-400px">
                      {{ $t("withdraw.dailyLimit") }}
                    </p>
                    <el-popover
                      placement="top"
                      :width="300"
                      trigger="click"
                      popper-class="popover-base"
                    >
                      <p class="fs-6 mb-1">{{ $t("withdraw.diemLimit") }}</p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.yourLevel") }} {{ userLevelText }}
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.limitCash") }}
                        {{ limitCashWithdraw }} USDT
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.timeRefreshLimit") }}
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.descriptionOperation") }}
                      </p>
                      <template #reference>
                        <span
                          class="d-flex align-items-center ms-1 cursor-pointer"
                        >
                          <i class="ki-outline ki-question-2 fs-4"></i>
                        </span>
                      </template>
                    </el-popover>
                  </div>
                  <div class="text-gray-500 fw-bold fs-6">
                    {{ limitCashWithdraw }} USDT
                  </div>
                </div>
              </div>
              <!-- Fiat Cash -->
              <div class="d-flex flex-column mb-7">
                <label
                  class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-6">{{ $t("withdraw.total") }}</span>
                  <span>
                    <span class="fw-bold fs-7"
                      ><span class="fs-6 fw-normal">{{
                        $t("withdraw.balance")
                      }}</span>
                      {{ numberFormatting(balanceCoin["balance"], 2) }}
                      RUB</span
                    >
                  </span>
                </label>
                <div class="position-relative">
                  <input
                    v-model="amount"
                    type="number"
                    :min="minAmountFiat"
                    :class="{ 'is-invalid': amountError }"
                    style="background-image: none"
                    class="form-control"
                    placeholder=""
                    @keydown.enter="handleCash"
                  />
                  <div
                    class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5"
                  >
                    RUB
                  </div>
                </div>
                <span class="text-danger">{{ amountError }}</span>
              </div>
              <div class="d-flex flex-column mb-4">
                <div v-if="!isSuperUser">
                  <div class="form-floating mb-7">
                    <input
                      type="email"
                      :class="{ 'is-invalid': fullNameError }"
                      class="form-control text-gray-600 fs-7 fw-bold"
                      id="floatingInputRCode"
                      v-model="fullName"
                      placeholder="Иванов Иван Иванович"
                      @keydown.enter="handleCash"
                      disabled
                    />
                    <label
                      for="floatingInputRCode"
                      class="text-gray-600 fs-7 fw-semibold"
                      >ФИО</label
                    >
                  </div>
                  <span class="text-danger">{{ fullNameError }}</span>
                </div>
                <div v-else>
                  <label
                    class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                  >
                    <span class="fw-bold fs-7">{{ $t("withdraw.fio") }}</span>
                  </label>
                  <el-autocomplete
                    v-model="fullName"
                    class="form-select-elemental mw-400px w-100"
                    :class="{ 'is-invalid': fullNameError }"
                    clearable
                    :fetch-suggestions="fetchSuggestions"
                    placeholder="Иванов Иван Иванович"
                    @keydown.enter="handleCash"
                  />
                  <span class="text-danger">{{ fullNameError }}</span>
                </div>
              </div>
              <!-- Описание -->
              <p class="text-gray-600 fs-6 fw-semibold mb-5">
                {{ $t("withdraw.notificationAccess") }}
                <span class="text-primary">Telegram</span>.
              </p>
              <!-- Описание -->
              <div class="d-flex mb-5">
                <span class="d-flex mt-1 me-3">
                  <i class="text-danger ki-outline ki-information-3 fs-2"></i>
                </span>
                <p class="text-gray-600 fs-6 fw-semibold mb-0">
                  {{ $t("withdraw.afterCreate") }}
                  <span class="text-primary"
                    >Telegram {{ $t("withdraw.bot") }}</span
                  >
                  {{ $t("withdraw.forRecieve") }}
                </p>
              </div>
              <button class="btn btn-primary w-100 fs-6" @click="handleCash">
                {{ $t("button.withdraw") }}
              </button>
            </div>
            <!-- Фиат, карты -->
            <div class="mw-400px w-100" v-if="!needVerification && isBankCard">
              <!-- Описание -->
              <p class="text-gray-600 fs-6 fw-semibold mb-0">
                {{ $t("withdraw.commission") }} 2%.
              </p>
              <p class="text-gray-600 fs-6 fw-semibold">
                {{ $t("withdraw.minSum") }}
                {{ numberFormatting(minAmountFiat, 2) }} ₽.
                {{ $t("withdraw.maxSum") }}
                {{ numberFormatting(maxAmountFiat, 2) }} ₽.
              </p>
              <!-- Блок остаток суточного лимита -->
              <div
                class="border border-dashed border-gray-400 rounded bg-light mw-400px mb-5"
                v-if="!isInfinityFiatWithdraw"
              >
                <div class="d-flex justify-content-between p-7">
                  <div class="d-flex align-items-center">
                    <p class="text-gray-500 fw-bold fs-6 mb-0 mw-400px">
                      {{ $t("withdraw.dailyLimit") }}
                    </p>
                    <el-popover
                      placement="top"
                      :width="300"
                      trigger="click"
                      popper-class="popover-base"
                    >
                      <p class="fs-6 mb-1">{{ $t("withdraw.diemLimit") }}</p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.yourLevel") }} {{ userLevelText }}
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.limitFiat") }}
                        {{ limitFiatWithdraw }} USDT
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.timeRefreshLimit") }}
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.descriptionOperation") }}
                      </p>
                      <template #reference>
                        <span
                          class="d-flex align-items-center ms-1 cursor-pointer"
                        >
                          <i class="ki-outline ki-question-2 fs-4"></i>
                        </span>
                      </template>
                    </el-popover>
                  </div>
                  <div class="text-gray-500 fw-bold fs-6">
                    {{ limitFiatWithdraw }} USDT
                  </div>
                </div>
              </div>
              <!-- Fiat -->
              <div class="d-flex flex-column mb-7">
                <div class="mb-4">
                  <label
                    class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                  >
                    <span class="fw-bold fs-6">{{ $t("withdraw.total") }}</span>
                    <span>
                      <span class="fw-bold fs-7"
                        ><span class="fs-6 fw-normal"
                          >{{ $t("withdraw.balance") }}
                        </span>
                        {{ numberFormatting(balanceCoin["balance"], 2) }}
                        RUB</span
                      >
                    </span>
                  </label>
                  <div class="position-relative">
                    <input
                      v-model="amount"
                      type="number"
                      :min="minAmountFiat"
                      :class="{ 'is-invalid': amountError }"
                      style="background-image: none"
                      class="form-control"
                      placeholder=""
                      @keydown.enter="handleFiat"
                    />
                    <div
                      class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5"
                    >
                      RUB
                    </div>
                  </div>
                  <span class="text-danger">{{ amountError }}</span>
                </div>
                <div>
                  <label class="text-gray-600 mb-1"
                    ><span class="fw-bold fs-7">{{
                      $t("withdraw.numberCard")
                    }}</span></label
                  >
                  <input
                    type="text"
                    v-model="cardNumber"
                    class="form-control"
                    :class="{ 'is-invalid': cardNumberError }"
                    style="background-image: none"
                    placeholder="0000 0000 0000 0000"
                    @keydown.enter="handleFiat"
                  />
                  <span class="text-danger">{{ cardNumberError }}</span>
                </div>
              </div>
              <button class="btn btn-primary w-100 fs-6" @click="handleFiat()">
                {{ $t("button.withdraw") }}
              </button>
            </div>
            <!-- rCode -->
            <div class="mw-400px w-100" v-if="!needVerification && isRCode">
              <!-- Описание rCode -->
              <p class="text-gray-600 fs-6 fw-semibold">
                {{ $t("withdraw.generateCode") }}
              </p>
              <!-- Блок остаток суточного лимита -->
              <div
                class="border border-dashed border-gray-400 rounded bg-light mw-400px mb-5"
                v-if="!isInfinityRCode"
              >
                <div class="d-flex justify-content-between p-7">
                  <div class="d-flex align-items-center">
                    <p class="text-gray-500 fw-bold fs-6 mb-0 mw-400px">
                      {{ $t("withdraw.dailyLimit") }}
                    </p>
                    <el-popover
                      placement="top"
                      :width="300"
                      trigger="click"
                      popper-class="popover-base"
                    >
                      <p class="fs-6 mb-1">{{ $t("withdraw.diemLimit") }}</p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.yourLevel") }} {{ userLevelText }}
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.limitRcode") }}
                        {{ limitRCodeWithdraw }} USDT
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.timeRefreshLimit") }}
                      </p>
                      <p class="fs-8 mb-1 lh-1">
                        {{ $t("withdraw.descriptionOperation") }}
                      </p>
                      <template #reference>
                        <span
                          class="d-flex align-items-center ms-1 cursor-pointer"
                        >
                          <i class="ki-outline ki-question-2 fs-4"></i>
                        </span>
                      </template>
                    </el-popover>
                  </div>
                  <div class="text-gray-500 fw-bold fs-6">
                    {{ limitRCodeWithdraw }} USDT
                  </div>
                </div>
              </div>
              <!-- Блок rCode -->
              <div class="mb-4">
                <label
                  class="d-flex text-gray-600 justify-content-between align-items-center form-label mb-1"
                >
                  <span class="fw-bold fs-6">{{ $t("withdraw.total") }}</span>
                  <span>
                    <span class="fw-bold fs-7"
                      ><span class="fs-6 fw-normal"
                        >{{ $t("withdraw.balance") }}
                      </span>
                      {{
                        numberFormatting(
                          balanceCoin["balance"],
                          balanceCoin["coinScale"]
                        )
                      }}
                      {{ currentCoinUnit }}</span
                    >
                  </span>
                </label>
                <div class="position-relative">
                  <input
                    v-model="amount"
                    type="number"
                    min="0"
                    :class="{ 'is-invalid': amountRCodeError }"
                    style="background-image: none"
                    class="form-control"
                    placeholder=""
                    @keydown.enter="handleRCode"
                  />
                  <div
                    class="position-absolute translate-middle-y top-50 end-0 me-5 fw-bold fs-5"
                  >
                    {{ currentCoinUnit }}
                  </div>
                </div>
                <span class="text-danger">{{ amountRCodeError }}</span>
              </div>
              <button class="btn btn-primary w-100 fs-6" @click="handleRCode()">
                {{ $t("button.withdraw") }}
              </button>
            </div>
            <!-- Блок верификации -->
            <div
              v-if="needVerification"
              class="bg-light-primary border border-primary rounded w-400px p-9 me-6 mb-4"
            >
              <div class="d-flex flex-column justify-content-center">
                <h3 class="fw-bold mb-5">{{ $t("withdraw.enterData") }}</h3>
                <p class="text-gray-600 fs-6 fw-semibold">
                  {{ $t("withdraw.forWork") }}
                </p>
                <div class="mb-5">
                  <div class="d-flex align-items-center">
                    <span class="d-flex align-items-center me-3">
                      <i class="ki-outline ki-time fs-3"></i>
                    </span>
                    <p class="text-gray-600 mb-1">
                      <span class="fw-bold">{{
                        $t("withdraw.checkTime")
                      }}</span>
                      {{ $t("withdraw.instantly") }}
                    </p>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="d-flex align-items-center me-3">
                      <i class="ki-outline ki-message-text fs-3"></i>
                    </span>
                    <p class="text-gray-600 mb-0">
                      <span class="fw-bold">{{
                        $t("withdraw.documents")
                      }}</span>
                      {{ $t("withdraw.enoughFoto") }}
                    </p>
                  </div>
                </div>
                <button class="btn btn-primary w-150px fs-7" @click="">
                  {{ $t("withdraw.specifyData") }}
                </button>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAssetPath } from "@/core/helpers/assets";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Api from "@/config/api";
import Multiselect from "@/components/multiselect/Multiselect.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useWithdrawStore } from "@/stores/withdraw";
import ClipboardJS from "clipboard";
import { useI18n } from "vue-i18n";
import { useBasicRequest } from "@/stores/basicRequests";

export default defineComponent({
  name: "withdraw-application",
  components: {
    Multiselect,
  },
  setup() {
    const withdrawStore = useWithdrawStore();
    const { t, te } = useI18n();
    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const storeBasicRequest = useBasicRequest();

    return {
      getAssetPath,
      withdrawStore,
      translate,
      storeBasicRequest,
    };
  },
  data() {
    return {
      amountRCodeError: "",
      amountCryptoError: "",
      code: "",
      fee: [] as any,
      address: [] as any,
      currentAddress: "",
      currentAddressError: "",
      amountErrorCrypto: "",
      rCode: "",
      memberLevel: 0,
      fullName: "",
      dataFullName: {
        placeholder: "Иванов Иван Иванович",
        options: [] as any,
      },
      mainAmountCrypto: 0,
      currentCoinUnit: "",
      currentMethodDeposit: "",
      title: "",
      paymentsTypeFiat: [] as any,
      paymentsTypeCrypto: [] as any,
      networks: [] as any,
      dataUnit: {
        placeholder: "Выберите валюту",
        options: [] as any,
        data: [],
      },
      limit: [] as any,
      myLimit: [] as any,
      limitRCodeWithdraw: "",
      limitFiatWithdraw: "",
      limitCashWithdraw: "",
      limitCryptoWithdraw: "",
      fullNameError: "",
      amountError: "",
      amount: 0,
      payPwd: "",
      cardNumber: "",
      cardNumberError: "",
      remark: "",
      isInfinityRCode: false,
      isInfinityCryptoWithdraw: false,
      isInfinityCashWithdraw: false,
      isInfinityFiatWithdraw: false,
    };
  },
  methods: {
    modal2FA(submit) {
      Swal.fire({
        title: this.translate("googleAuth.title2FA"),
        buttonsStyling: true,
        showCloseButton: true,
        showCancelButton: true,
        html: `
          <label for="swal2-input1" class="text-start mb-3">${this.translate(
            "googleAuth.label2FA"
          )}</label>
          <div class="input-group mb-5">
            <span class="input-group-text bg-opacity-100 border-right-0" id="basic-addon1">
            <i class="ki-outline ki-key fs-3"></i>
            </span>
            <input type="text" class="form-control border-secondary border-left-0 ps-0" placeholder="000 000" id="swal2-input1" aria-label="000 000" aria-describedby="basic-addon1" />
          </div>
          `,
        confirmButtonText: this.translate("button.confirm"),
        cancelButtonText: this.translate("button.cancel"),
        heightAuto: true,
        allowEnterKey: true,
        didOpen: () => {
          let input = document.getElementById("swal2-input1");
          input?.focus();

          function handleKeypress(e) {
            if (e.key === "Enter") {
              (
                document.getElementsByClassName(
                  "swal2-confirm"
                )[0] as HTMLInputElement | null
              )?.click();
              e.preventDefault();
            }
          }

          input?.addEventListener("keydown", handleKeypress);
        },
        preConfirm: () => {
          let code = (
            document.getElementById("swal2-input1") as HTMLInputElement | null
          )?.value;
          if (code?.replace(/ /g, "").length === 6) {
            if (submit === "handleSubmitFiat") {
              this.handleSubmitFiat(code.replace(/ /g, ""));
            } else if (submit === "handleSubmitRCode") {
              this.handleSubmitRCode(code.replace(/ /g, ""));
            } else if (submit === "handleSubmitCrypto") {
              this.handleSubmitCrypto(code.replace(/ /g, ""));
            }
          } else {
            ElMessage.error(this.translate("googleAuth.error2FA"));
            this.modal2FA(submit);
          }
        },
        customClass: {
          title: "text-start mx-0 px-0",
          htmlContainer: "mx-0",
          input: "form-control form-control-lg form-control-solid w-auto",
          actions:
            "flex-row-reverse justify-content-start align-items-center w-100 m-0 gap-5 pt-0 border-light",
          confirmButton: "btn btn-lg btn-primary mw-100 rounded px-4 py-3 m-0",
          cancelButton: "btn btn-light rounded px-4 py-3 m-0",
        },
      });
    },
    successOrErrorSubmit(text, message, value) {
      //@ts-ignore
      Swal.fire({
        html: `<div>
                    <div class='mb-5 fw-bold'>${text}</div>
                    <span style='font-size: 12px'>${message}</span>
                 </div>`,
        icon: `${value}`,
        buttonsStyling: false,
        confirmButtonText: "Закрыть",
        customClass: {
          confirmButton: "btn btn-light",
        },
      });
    },
    handleRCode() {
      if (!this.amount) this.amountRCodeError = "Введите сумму создания rCode";
      if (this.amountRCodeError) return;
      this.modal2FA("handleSubmitRCode");
    },
    handleSubmitRCode(code) {
      let formData = new FormData();
      formData.append("unit", this.currentCoinUnit);
      formData.append("amount", this.amount.toString());
      formData.append("code", code);
      ApiService.post(Api.uc.withdrawCodeApplyCode, formData).then(
        (response) => {
          if (response.data.code === 200 || response.data.code === 0) {
            const clipboard = new ClipboardJS("#copyButton");
            clipboard.on("success", () => {
              clipboard.destroy();
              ElMessage.success("Copied to clipboard");
            });
            clipboard.on("error", () => {
              clipboard.destroy();
              ElMessage.error("Failed to copy to clipboard");
            });
            Swal.fire({
              html: `<div">
                    <div class="modal-body" style="text-align: left">
                      <p>
                        <span class="pe-2 fs-3">⚠</span>️️ Не сообщайте rCode третьим лицам.
                        Для активации или отмены используйте раздел <a href="/deposit">Пополнение</a>.
                      </p>
                      <div class="position-relative form-control-divided w-100">
                    <input value="${response.data.data.withdrawCode}" style="padding-right: 44px;" readonly type="text"
                           class="form-control form-control-white" />
                    <div class="position-absolute translate-middle-y top-50 end-0 fw-bold fs-5 me-4">
                      <button
                          data-clipboard-text="${response.data.data.withdrawCode}"
                          id="copyButton"
                          class="btn btn-light btn-icon btn-sm btn-history m-auto"
                      >
                        <i class="ki-solid ki-copy fs-6"></i>
                      </button>
                    </div>
                  </div>
                    </div>
                 </div>`,
              title: `rCode успешно создан`,
              buttonsStyling: false,
              position: "top",
              showCloseButton: true,
              showConfirmButton: false,
              showCancelButton: true,
              confirmButtonText: "Продолжить",
              cancelButtonText: "Закрыть",
              reverseButtons: true,
              didDestroy() {
                clipboard.destroy();
              },
              customClass: {
                title: "text-start mx-0 px-0",
                htmlContainer: "mx-0",
                input: "form-control form-control-lg form-control-solid w-auto",
                actions:
                  "flex-row-reverse justify-content-start align-items-center w-100 m-0 mt-3 gap-5 pt-0 border-light",
                confirmButton:
                  "btn btn-lg btn-primary mw-100 rounded px-4 py-3 m-0",
                cancelButton: "btn btn-light rounded px-4 py-3 m-0",
              },
            });
            this.withdrawStore.setRcode(
              `${response.data.message} ${Date.now()}`
            );
          } else {
            ElMessage.error(response.data.message);
          }
        }
      );
    },
    handleCash() {
      if (this.amount < this.minAmountFiat)
        this.amountError = "Сумма меньше минимально возможной";
      if (!this.fullName) this.fullNameError = "Введите ФИО";
      if (this.amountError || this.fullNameError) return;
      this.modal2FA("handleSubmitFiat");
    },
    handleFiat() {
      if (!this.cardNumber)
        this.cardNumberError = "Введите валидный номер карты";
      if (this.amount < this.minAmountFiat)
        this.amountError = "Сумма меньше минимально возможной";
      if (this.cardNumberError || this.amountError) return;
      this.modal2FA("handleSubmitFiat");
    },
    handleCrypto() {
      if (this.amount < this.minAmountCrypto)
        this.amountCryptoError = "Сумма меньше минимально возможной";
      if (!this.currentAddress)
        this.currentAddressError = "Введите адрес вывода";
      if (this.amountCryptoError || this.currentAddressError) return;
      this.modal2FA("handleSubmitCrypto");
    },
    handleSubmitCrypto(code) {
      let formData = new FormData();
      formData.append(
        "coinName",
        this.currentUnit(this.currentCoinUnit)["name"]
      );
      formData.append("networkName", this.currentMethodDeposit);
      formData.append("address", this.currentAddress);
      formData.append("money", this.amount.toString());
      formData.append("code", code);
      formData.append("remark", "");
      ApiService.post(Api.uc.withdrawCrypto, formData)
        .then((response) => {
          if (response.data.code === 0 || response.data.code === 200) {
            ElMessage.success(response.data.message);
            this.withdrawStore.setCrypto(
              `${response.data.message} ${Date.now()}`
            );
          } else ElMessage.error(response.data.message);
        })
        .catch((response) => {
          ElMessage.error(response.data.message);
        });
    },
    handleSubmitFiat(code) {
      let formData = new FormData();
      formData.append("unit", this.currentCoinUnit);
      formData.append("cardNumber", this.cardNumber.replace(/ /g, ""));
      formData.append("amount", this.amount.toString());
      formData.append("remark", this.remark);
      formData.append(
        "paymentTypeId",
        this.currentPaymentTypeFiat(this.currentMethodDeposit)["id"]
      );
      formData.append("code", code);
      formData.append("fullName", this.fullName);
      ApiService.post(Api.uc.legalWalletWithdraw, formData)
        .then((response) => {
          if (response.data.code === 0 || response.data.code === 200) {
            this.amount = 0;
            this.cardNumber = "";
            ElMessage.success(response.data.message);
            this.withdrawStore.setFiat(
              `${response.data.message} ${Date.now()}`
            );
            this.successOrErrorSubmit(
              `Код заявки: ${response.data.data}`,
              "Код всегда можно посмотреть в истории Фиата",
              "success"
            );
          } else {
            this.successOrErrorSubmit(
              "Ошибка вывода",
              response.data.message,
              "error"
            );
          }
        })
        .catch((response) => {
          this.successOrErrorSubmit(
            "Ошибка вывода",
            response.data.message,
            "error"
          );
        });
    },
    async fetchSuggestions(queryString, cb) {
      try {
        const data = this.dataFullName.options;
        const array = data.map((item) => {
          return { value: item };
        });
        const createFilter = (queryString: string) => {
          return (name) => {
            return (
              name.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
          };
        };
        const results = queryString
          ? array.filter(createFilter(queryString))
          : array;
        setTimeout(() => {
          cb(results);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSuggestionsAddress(queryString, cb) {
      try {
        const data = this.address;
        const array = data.map((item) => {
          return { value: item.address };
        });
        const createFilter = (queryString: string) => {
          return (name) => {
            return (
              name.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
          };
        };
        const results = queryString
          ? array.filter(createFilter(queryString))
          : array;
        setTimeout(() => {
          cb(results);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    },
    async init() {
      ApiService.setHeader();
      this.getStatus();
      this.getAddress();
      this.getDataUnit();
      this.getPaymentsTypeFiat();
      this.getPassesNames();
    },
    maskText(text) {
      const masked = text;
      return masked.slice(0, 3) + "..." + masked.slice(-5);
    },
    changeCurrentMethodDeposit(name) {
      this.currentMethodDeposit = name;
      this.getMinAmountCrypto();
    },
    async changeCoin() {
      await this.changeCurrentMethodDeposit("");
      await this.getPaymentsTypeCrypto();
      await this.getMinAmountCrypto();
      this.rCode = "";
      this.withdrawStore.current = "";
    },
    getPassesNames() {
      axios
        .get(Api.uc.passesName)
        .then((response) => {
          this.dataFullName.options = response.data.data;
        })
        .catch((response) => {
          ElMessage.error(response.data.message);
        });
    },
    getMinAmountCrypto() {
      if (this.currentCoinUnit) {
        let coinName = this.currentUnit(this.currentCoinUnit);
        return this.networks.filter((item) => item.name === coinName["name"])[
          "min"
        ];
      }
    },
    getPaymentsTypeCrypto() {
      if (this.currentCoinUnit) {
        console.log("currentCoinUnit", this.currentCoinUnit);
        let coinName = this.currentUnit(this.currentCoinUnit);
        console.log("coinName", coinName);
        this.paymentsTypeCrypto = this.networks.filter(
          (item) => coinName["name"] === item.coinName
        );
        console.log("networks", this.networks);
        this.paymentsTypeCrypto.push({
          coinName: "rCode",
          name: "rCode",
          isWithdrawable: true,
        });
      }
    },
    numberFormatting(number, scale) {
      let str = `${number}`.replaceAll(",", ".").split(".") as any;
      let left = Intl.NumberFormat("ru", { style: "decimal" }).format(str[0]);
      let right = str[1];
      if (right) {
        if (right.length < scale) {
          right = right.padEnd(scale, "0");
        }
      } else {
        right = "0";
        right = right.padEnd(scale, "0");
      }
      right = right.slice(0, scale);
      return `${left}.${right}`;
    },
    currentPaymentTypeFiat(paymentType) {
      return this.paymentsTypeFiat.filter(
        (item) => item.paymentName === paymentType
      )[0];
    },
    currentUnit(unit) {
      return this.dataUnit.data.filter((item) => item["unit"] === unit)[0];
    },
    unitBalance(unit) {
      return (
        this.wallet.filter((item) => item["unit"] === unit)[0] || {
          balance: 0,
        }
      );
    },
    getStatus() {
      axios
        .get(Api.uc.businessStatus)
        .then((response) => {
          if (response.data.code === 0 || response.data.code === 200) {
            this.memberLevel = response.data.data.memberLevel;
            this.getLimits();
          } else ElMessage.error(response.data.message);
        })
        .catch((response) => {
          ElMessage.error(response.data.message);
        });
    },
    getLimits() {
      ApiService.post(Api.uc.limits, "")
        .then((response) => {
          if (response.data.code === 0 || response.data.code === 200) {
            this.limit = response.data.data.find(
              (item) => item.level === this.memberLevel
            );
            ApiService.post(Api.uc.myLimit, "")
              .then((response) => {
                if (response.data.code === 0 || response.data.code === 200) {
                  this.myLimit = response.data.data;
                  this.limitRCodeWithdraw = this.numberFormatting(
                    Number(this.limit.rcodeCreate) -
                      Number(this.myLimit.rcodeCreate),
                    2
                  ); // Лимиты rCode
                  this.limitFiatWithdraw = this.numberFormatting(
                    Number(this.limit.fiatWithdraw) -
                      Number(this.myLimit.fiatWithdraw),
                    2
                  ); // Лимиты вывода на карту
                  this.limitCashWithdraw = this.numberFormatting(
                    Number(this.limit.cashWithdraw) -
                      Number(this.myLimit.cashWithdraw),
                    2
                  ); // Лимиты вывода наличкой
                  this.limitCryptoWithdraw = this.numberFormatting(
                    Number(this.limit.cryptoWithdraw) -
                      Number(this.myLimit.cryptoWithdraw),
                    2
                  ); // Лимиты вывода криптовалюты
                  this.isInfinityRCode = this.limit.rcodeCreate === -1; // Есть ли лимиты на rCode
                  this.isInfinityCryptoWithdraw =
                    this.limit.cryptoWithdraw === -1; // Есть ли лимты на вывод крипты
                  this.isInfinityCashWithdraw = this.limit.cashWithdraw === -1; // Есть ли лимиты на вывод наличкой
                  this.isInfinityFiatWithdraw = this.limit.fiatWithdraw === -1; // Есть ли лимиты на вывод на карту
                } else ElMessage.error(response.data.message);
              })
              .catch((response) => {
                ElMessage.error(response.data.message);
              });
          } else ElMessage.error(response.data.message);
        })
        .catch((response) => {
          ElMessage.error(response.data.message);
        });
    },
    getAddress() {
      axios
        .get(Api.uc.addressWithdraw)
        .then((response) => {
          if (response.data.code === 0 || response.data.code === 200) {
            this.address = response.data.data.addresses;
          } else ElMessage.error(response.data.message);
        })
        .catch((response) => {
          ElMessage.error(response.data.message);
        });
    },
    getPaymentsTypeFiat() {
      axios
        .post(Api.uc.paymentTypes + `?type=1`)
        .then((response) => {
          if (response.data.code === 0 || response.data.code === 200) {
            this.paymentsTypeFiat = response.data.data;
            this.paymentsTypeFiat.push({
              paymentName: "rCode",
              withdrawStatus: 2,
              icon: getAssetPath(`media/crypto/rCode.svg`),
            });
          } else ElMessage.error(response.data.message);
        })
        .catch((response) => {
          ElMessage.error(response.data.message);
        });
    },
    getDataUnit() {
      ApiService.post(Api.uc.coinFull, "")
        .then((response) => {
          if (response.data.code === 0 || response.data.code === 200) {
            this.dataUnit.options = response.data.data.coin
              .filter((item) => item["isFiat"])
              .map((coin) => coin.unit);
            this.dataUnit.options = [
              ...this.dataUnit.options,
              ...response.data.data.coin
                .filter((item) => !item["isFiat"])
                .map((coin) => coin.unit),
            ];
            this.dataUnit.data = response.data.data.coin;
            this.networks = response.data.data.network;
            this.fee = response.data.data.fee;
            this.networks.forEach((itemNetworks, indexNetworks) => {
              this.wallet.forEach((itemWallet) => {
                if (itemNetworks.coinName === itemWallet["name"]) {
                  this.networks[indexNetworks]["isWithdrawable"] =
                    itemWallet["isWithdrawable"];
                }
              });
            });
          } else ElMessage.error(response.data.message);
        })
        .catch((response) => {
          ElMessage.error(response.data.message);
        });
    },
  },
  computed: {
    wallet() {
      return this.storeBasicRequest.wallet;
    },
    realName() {
      return this.storeBasicRequest.securitySetting.realName;
    },
    needVerification() {
      return !this.realName && !this.isRCode && !this.isCrypto;
    },
    currentAmount() {
      if (
        this.currentMethodDeposit &&
        this.isCrypto &&
        this.amount >= this.currentFee
      ) {
        return this.numberFormatting(
          this.amount - this.currentFee,
          this.currentNetwork["scale"]
        );
      }
      return 0;
    },
    currentFee() {
      if (this.currentMethodDeposit && this.isCrypto) {
        return this.fee[this.currentMethodDeposit]["param"];
      }
    },
    balanceCoin() {
      if (this.currentMethodDeposit) {
        return (
          this.wallet.find((item) => item.unit === this.currentCoinUnit) || {
            balance: 0,
            coinScale: 2,
          }
        );
      }
    },
    currentNetwork() {
      if (this.currentMethodDeposit && this.isCrypto) {
        return this.networks.find(
          (item) => item.name === this.currentMethodDeposit
        );
      }
    },
    userLevelText() {
      if (1 === this.memberLevel) {
        return "Верифицирован";
      }
      return "";
    },
    maxAmountFiat() {
      if (this.currentMethodDeposit) {
        return this.paymentsTypeFiat.filter(
          (item) => item.paymentName === this.currentMethodDeposit
        )[0]["withdrawMaxAmount"];
      }
    },
    minAmountFiat() {
      if (this.currentMethodDeposit) {
        return this.paymentsTypeFiat.filter(
          (item) => item.paymentName === this.currentMethodDeposit
        )[0]["withdrawMinAmount"];
      }
    },
    minAmountCrypto() {
      if (this.currentMethodDeposit && this.isCrypto) {
        return this.currentNetwork["min"];
      }
    },
    isCrypto() {
      return !this.isRCode && !this.isCash && !this.isFiat;
    },
    isRCode() {
      if (this.currentMethodDeposit) {
        return this.currentMethodDeposit === "rCode";
      }
      return false;
    },
    isBankCard() {
      return this.isFiat && !this.isCash && !this.isRCode;
    },
    isCash() {
      if (this.currentMethodDeposit && this.isFiat) {
        return (
          this.paymentsTypeFiat.filter(
            (item) => item.paymentName === this.currentMethodDeposit
          )[0]["category"] === 2
        );
      }
      return false;
    },
    isSuperUser() {
      return this.memberLevel === 3;
    },
    isFiat() {
      if (this.currentCoinUnit) {
        return this.dataUnit.data.filter(
          (item) => item["unit"] === this.currentCoinUnit
        )[0]["isFiat"];
      }
      return false;
    },
    isCurrent() {
      return this.withdrawStore.current;
    },
  },
  watch: {
    cardNumber() {
      this.cardNumber = this.cardNumber.replace(/\D/g, "").substring(0, 16);
      if (this.cardNumber) {
        let array = this.cardNumber.match(/.{1,4}/g) as any;
        array = array.join(" ");
        this.cardNumber = array;
      }
      if (this.cardNumber.replace(/ /g, "").length !== 16) {
        this.cardNumberError = "Введите валидный номер карты";
      }
      if (this.cardNumber.replace(/ /g, "").length === 16) {
        this.cardNumberError = "";
      }
    },
    amount() {
      if (this.isFiat) {
        if (this.amount < this.minAmountFiat) {
          this.amountError = "Сумма меньше минимально возможной";
        } else this.amountError = "";
      }

      if (this.isCrypto) {
        if (this.amount < this.minAmountCrypto) {
          this.amountCryptoError = "Сумма меньше минимально возможной";
        } else this.amountCryptoError = "";
      }

      if (this.isRCode) {
        if (!this.amount) {
          this.amountRCodeError = "Введите сумму создания rCode";
        } else this.amountRCodeError = "";
      }
    },
    currentAddress() {
      if (!this.currentAddress) {
        this.currentAddressError = "Введите адрес вывода";
      } else this.currentAddressError = "";
    },
    fullName() {
      if (!this.fullName) {
        this.fullNameError = "Введите ФИО";
      } else this.fullNameError = "";
    },
    // isCurrent() {
    //   this.changeCoin();
    // },
  },
  created() {
    this.init();
    this.fullName = this.realName;
  },
  mounted() {
    if (this.isCurrent) {
      this.currentCoinUnit = this.isCurrent;
      this.getDataUnit();
      setTimeout(() => {
        this.changeCoin();
      }, 1000);
    }
  },
});
</script>

<style lang="scss">
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none; // Yeah, yeah everybody write about it
}

input[type="number"],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: textfield;
}

.is-invalid {
  .el-input {
    .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--bs-danger, var(--bs-danger)) inset;
    }
  }
}
.multiselect-withdraw {
  .multiselect-options {
    max-height: 194px !important;
  }
}
</style>
