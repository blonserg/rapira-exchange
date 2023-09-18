<template>
  <div class="card">
    <div class="card-header p-0 border-0 d-flex justify-space-between align-items-center mb-3">
      <div class="d-flex flex-column flex-lg-row w-100">
        <!--begin::Toolbar-->
        <div class="card-toolbar m-0 w-100">
          <!--begin::Tab nav-->
          <div
              class="nav nav-stretch fs-4 text-black fw-semobold nav-line-tabs nav-line-tabs border-transparent w-100"
              role="tablist"
          >
            <div class="nav-item" role="presentation">
              <a
                  id="my_orders_tab1"
                  class="nav-link text-active-dark active p-0 m-0 me-0"
                  data-bs-toggle="tab"
                  role="tab"
                  href="#my_orders_market"
              >
                <span class="px-6 py-3 ms-0 fw-bold lh-1 fs-6">{{ $t('exchange.marketOrder') }}</span>
              </a>
            </div>

            <div class="nav-item flex-grow-1" role="presentation">
              <a
                  id="my_orders_tab2"
                  class="nav-link text-active-dark p-0 m-0 w-100"
                  data-bs-toggle="tab"
                  role="tab"
                  href="#my_orders_limit"
              >
                <span class="px-6 py-3 ms-0 fw-bold lh-1 fs-6">{{ $t('exchange.limitOrder') }}</span>
              </a>
            </div>
          </div>
          <!--end::Tab nav-->
        </div>
        <!--end::Toolbar-->
      </div>
    </div>
    <div class="card-body p-0">
      <!--begin::Tab Content-->
      <div id="my_orders_content" class="tab-content ">
        <div
            id="my_orders_market"
            class="py-0 tab-pane active show"
            role="tabpanel"
        >
          <div class="d-flex flex-column justify-content-between">
            <ul
                class="d-flex fs-4 px-6 pb-2 fw-semobold w-100 mb-2"
                role="tablist"
            >
              <li class="w-50 bg-secondary orders-tabs-tab1" role="presentation">
                <a
                    id="my_orders_market_tab1"
                    class="btn btn-secondary active d-block lh-1 fw-bold"
                    data-bs-toggle="tab"
                    role="tab"
                    href="#my_orders_market_buy"
                >
                  {{ $t('exchange.buy') }}
                </a>
              </li>

              <li class="w-50 bg-secondary orders-tabs-tab2" role="presentation">
                <a
                    id="my_orders_market_tab2"
                    class="btn btn-secondary d-block lh-1 fw-bold"
                    data-bs-toggle="tab"
                    role="tab"
                    href="#my_orders_market_sell"
                >
                  {{ $t('exchange.sell') }}
                </a>
              </li>
            </ul>
            <div class="tab-content px-6">
              <div id="my_orders_market_buy" role="tabpanel" class="tab-pane active show">
                <div class="d-flex">
                  <div v-if="isAuthenticated" class="d-flex fs-7 mb-4 fw-semibold">
                    <span class="text-gray-600 me-1">Доступно</span>
                    <span
                        @click="getFromBalance('balanceBuyMarket')"
                        class="me-1 cursor-pointer"
                        :class="[showErrorBuyMarket ? 'text-danger' : 'text-dark']"
                    >
                      {{ numberFormatting(limitOfSecondCurrency, 2) }}
                      {{ secondPair }}
                    </span>
                    <router-link to="/wallet/deposit">
                      <i class="ki-solid ki-plus-circle text-primary fs-3"></i>
                    </router-link>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="position-relative">
                    <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                    >
                      <span class="fw-semibold fs-7">{{ $t('exchange.give') }}</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        v-model="buyTotalMarket"
                        @input="changeBuyTotalMarket"
                        class="form-control mb-2 text-end pe-18"
                        :class="{'is-error': showErrorBuyMarket}"
                        placeholder="0"
                    />
                    <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ secondPair }}</div>
                  </div>
                  <div v-if="showErrorBuyMarket" class="text-danger fw-semibold fs-7">Сумма превышает баланс</div>
                </div>
                <div class="position-relative mb-4">
                  <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                  >
                    <span class="fw-semibold fs-7">Курс ≈</span>
                  </label>
                  <input
                      type="number"
                      class="form-control mb-2 text-end pe-18"
                      :placeholder="numberFormatting(buyPriceBest, 2)"
                      disabled
                  />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="position-relative">
                  <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                  >
                    <span class="fw-semibold fs-7">{{ $t('exchange.get') }} ≈</span>
                  </label>
                  <input
                      type="number"
                      min="0"
                      v-model="buyAmountMarket"
                      @input="changeBuyAmountMarket"
                      class="form-control mb-2 text-end pe-18"
                      placeholder="0"
                  />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ firstPair }}</div>
                </div>
                <div class="mt-3 position-relative">
                  <div class="range-buy">
                    <el-slider
                        v-model="rangeBuyMarket"
                        :marks="marks"
                        class="form-range"
                        :disabled="!isAuthenticated"
                        @click="checkLimit('rangeBuyMarket')"
                        :format-tooltip="formatTooltip"
                    />
                  </div>
                  <div class="d-flex justify-content-between text-gray-500 fs-7">
                    <span>
                      0
                    </span>
                    <span>
                      100%
                    </span>
                  </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <div class="fs-7 fw-semibold">{{ $t('exchange.commission') }}</div>
                  <div class="fs-7 fw-semibold">
                    <span v-if="buyComissionMarket">{{ formatNumbers(buyComissionMarket, ' ', '.', false,  coinScale) }}</span>
                    <span v-else>0</span>
                    {{ firstPair }}
                    <span> / 0.2%</span>
                  </div>
                </div>
                <div v-if="!isAuthenticated" class="my-3 py-4 fw-bold text-center orders-auth-btn lh-1">
                  <a
                      class="fs-6 fw-bold cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#login-modal"
                  >
                    <span class="text-primary">{{ $t('exchange.login') }}</span>
                  </a>
                  {{ $t('exchange.or') }}
                  <a
                      class="fs-6 fw-bold cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#register-modal"
                  >
                    <span class="text-primary">{{ $t('exchange.register') }}</span>
                  </a>
                </div>
                <div v-else-if="!dontRemindComputed" class="mt-3">
                  <button
                      class="btn btn-success w-100 fs-5 lh-1"
                      data-bs-toggle="modal"
                      data-bs-target="#confirm-modal"
                      @click="selectConfirmModal('buyMarket')"
                      :disabled="!buyTotalMarket || showErrorBuyMarket"
                  >
                    {{ $t('exchange.buy') }} {{ firstPair }}
                  </button>
                </div>
                <div v-else class="mt-3">
                  <button
                      class="btn btn-success w-100 fs-5 lh-1"
                      @click="actionDeal(choosenPair, '0', buyTotalMarket, 'BUY', 'MARKET_PRICE')"
                      :disabled="!buyTotalMarket || showErrorBuyMarket"
                  >
                    Купить {{ firstPair }}
                  </button>
                </div>
              </div>
              <div id="my_orders_market_sell" role="tabpanel" class="tab-pane">
                <div class="d-flex">
                  <div v-if="isAuthenticated" class="d-flex fs-7 mb-4 fw-semibold">
                    <span class="text-gray-600 me-1">Доступно</span>
                    <span
                        @click="getFromBalance('balanceSellMarket')"
                        class="me-1 cursor-pointer"
                        :class="[showErrorSellMarket ? 'text-danger' : 'text-dark']"
                    >
                      {{ numberFormatting(limitOfFirstCurrency, 2) }}
                      {{ firstPair }}
                    </span>
                    <router-link to="/wallet/deposit">
                      <i class="ki-solid ki-plus-circle text-primary fs-3"></i>
                    </router-link>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="position-relative">
                  <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                  >
                    <span class="fw-semibold fs-7">{{ $t('exchange.give') }}</span>
                  </label>
                  <input
                      type="number"
                      min="0"
                      v-model="sellAmountMarket"
                      @input="changeSellAmountMarket"
                      class="form-control mb-2 text-end pe-18"
                      :class="{'is-error': showErrorSellMarket}"
                      placeholder="0"
                  />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ firstPair }}</div>
                </div>
                  <div v-if="showErrorSellMarket" class="text-danger fw-semibold fs-7">Сумма превышает баланс</div>
                </div>
                <div class="position-relative mb-4">
                  <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                  >
                    <span class="fw-semibold fs-7">Курс ≈</span>
                  </label>
                  <input
                      type="number"
                      class="form-control mb-2 text-end pe-18"
                      :placeholder="numberFormatting(sellPriceBest, 2)"
                      disabled
                  />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="position-relative">
                  <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                  >
                    <span class="fw-semibold fs-7">{{ $t('exchange.get') }} ≈</span>
                  </label>
                  <input
                      type="number"
                      min="0"
                      v-model="sellTotalMarket"
                      @input="changeSellTotalMarket"
                      class="form-control mb-2 text-end pe-18"
                      placeholder="0"
                  />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="mt-3 position-relative">
                  <div class="range-sell">
                    <el-slider
                        v-model="rangeSellMarket"
                        :marks="marks"
                        class="form-range"
                        :disabled="!isAuthenticated"
                        @click="checkLimit('rangeSellMarket')"
                        :format-tooltip="formatTooltip"
                    />
                  </div>
                  <div class="d-flex justify-content-between text-gray-500 fs-7">
                    <span>
                      0
                    </span>
                    <span>
                      100%
                    </span>
                  </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <div class="fs-7 fw-semibold">{{ $t('exchange.commission') }}</div>
                  <div class="fs-7 fw-semibold">
                    <span v-if="sellComissionMarket">{{ formatNumbers(sellComissionMarket, ' ', '.', false, baseCoinScale) }}</span>
                    <span v-else>0</span>
                    {{ secondPair }}
                    <span> / 0.2%</span>
                  </div>
                </div>
                <div v-if="!isAuthenticated" class="my-3 py-4 fw-bold text-center orders-auth-btn lh-1">
                  <a
                      class="fs-6 fw-bold cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#login-modal"
                  >
                    <span class="text-primary">{{ $t('exchange.login') }}</span>
                  </a>
                  {{ $t('exchange.or') }}
                  <a
                      class="fs-6 fw-bold cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#register-modal"
                  >
                    <span class="text-primary">{{ $t('exchange.register') }}</span>
                  </a>
                </div>
                <div v-else-if="!dontRemindComputed" class="mt-3">
                  <button
                      class="btn btn-danger w-100 fs-5 lh-1"
                      data-bs-toggle="modal"
                      data-bs-target="#confirm-modal"
                      @click="selectConfirmModal('sellMarket')"
                      :disabled="!sellTotalMarket || showErrorSellMarket"
                  >
                    {{ $t('exchange.sell') }} {{ firstPair }}
                  </button>
                </div>
                <div v-else class="mt-3">
                  <button
                      class="btn btn-danger w-100 fs-5"
                      @click="actionDeal(choosenPair, '0', sellAmountMarket, 'SELL', 'MARKET_PRICE')"
                      :disabled="!sellTotalMarket || showErrorSellMarket"
                  >
                    Продать {{ firstPair }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
            id="my_orders_limit"
            class="py-0 tab-pane"
            role="tabpanel"
        >
          <div class="d-flex flex-column justify-content-between">
            <ul
                class="d-flex fs-4 px-6 pb-2 fw-semibold w-100 mb-2"
                role="tablist"
            >
              <li class="w-50 bg-secondary orders-tabs-tab1" role="presentation">
                <a
                    id="my_orders_limit_tab1"
                    class="btn btn-secondary active d-block lh-1 fw-bold"
                    data-bs-toggle="tab"
                    role="tab"
                    href="#my_orders_limit_buy"
                >
                  {{ $t('exchange.buy') }}
                </a>
              </li>

              <li class="w-50 bg-secondary orders-tabs-tab2" role="presentation">
                <a
                    id="my_orders_limit_tab2"
                    class="btn btn-secondary d-block lh-1 fw-bold"
                    data-bs-toggle="tab"
                    role="tab"
                    href="#my_orders_limit_sell"
                >
                  {{ $t('exchange.sell') }}
                </a>
              </li>
            </ul>
            <div class="tab-content px-6">
              <div id="my_orders_limit_buy" role="tabpanel" class="tab-pane active show">
                <div class="d-flex">
                  <div v-if="isAuthenticated" class="d-flex fs-7 mb-4 fw-semibold">
                    <span class="text-gray-600 me-1">Доступно</span>
                    <span
                        @click="getFromBalance('balanceBuyLimit')"
                        class="me-1 cursor-pointer"
                        :class="[showErrorBuyLimit ? 'text-danger' : 'text-dark']"
                    >
                      {{ numberFormatting(limitOfSecondCurrency, 2) }}
                      {{ secondPair }}
                    </span>
                    <router-link to="/walet/deposit">
                      <i class="ki-solid ki-plus-circle text-primary fs-3"></i>
                    </router-link>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="position-relative">
                    <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                    >
                      <span class="fw-semibold fs-7">{{ $t('exchange.give') }}</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        v-model="buyTotal"
                        @input="changeBuyTotal"
                        class="form-control mb-2 text-end pe-18"
                        :class="{'is-error': showErrorBuyLimit}"
                        placeholder="0"
                    />
                    <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ secondPair }}</div>
                  </div>
                  <div v-if="showErrorBuyLimit" class="text-danger fw-semibold fs-7">Сумма превышает баланс</div>
                </div>
                <div class="position-relative mb-4">
                  <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                  >
                    <span class="fw-semibold fs-7">{{ $t('exchange.price') }}</span>
                  </label>
                  <input type="number"
                         min="0"
                         v-model="buyPrice"
                         @input="changeBuyAmount"
                         class="form-control mb-2 text-end pe-18"
                         placeholder="0"
                  />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="position-relative">
                  <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                  >
                    <span class="fw-semibold fs-7">{{ $t('exchange.get') }}</span>
                  </label>
                  <input type="number"
                         min="0"
                         v-model="buyAmount"
                         @input="changeBuyAmount"
                         class="form-control mb-2 text-end pe-18"
                         placeholder="0"
                  />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ firstPair }}</div>
                </div>
                <div class="mt-3 position-relative">
                  <div class="range-buy">
                    <el-slider
                        v-model="rangeBuyLimit"
                        :marks="marks"
                        class="form-range"
                        :disabled="!isAuthenticated"
                        @click="checkLimit('rangeBuyLimit')"
                        :format-tooltip="formatTooltip"
                    />
                  </div>
                  <div class="d-flex justify-content-between text-gray-500 fs-7">
                    <span>
                      0
                    </span>
                    <span>
                      100%
                    </span>
                  </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <div class="fw-semibold fs-7">{{ $t('exchange.commission') }}</div>
                  <div class="fw-semibold fs-7">
                    <span v-if="buyComission">{{ formatNumbers(buyComission, ' ', '.', false,  coinScale) }}</span>
                    <span v-else>0</span>
                    {{ firstPair }}
                    <span> / 0.2%</span>
                  </div>
                </div>
                <div v-if="!isAuthenticated" class="my-3 py-4 fw-bold text-center orders-auth-btn lh-1">
                  <a
                      class="fs-6 fw-bold cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#login-modal"
                  >
                    <span class="text-primary">{{ $t('exchange.login') }}</span>
                  </a>
                  {{ $t('exchange.or') }}
                  <a
                      class="fs-6 fw-bold cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#register-modal"
                  >
                    <span class="text-primary">{{ $t('exchange.register') }}</span>
                  </a>
                </div>
                <div v-else-if="!dontRemindComputed" class="mt-3">
                  <button
                      class="btn btn-success w-100 fs-5 lh-1"
                      data-bs-toggle="modal"
                      data-bs-target="#confirm-modal"
                      @click="selectConfirmModal('buyLimit')"
                      :disabled="buyTotal === 0 || showErrorBuyLimit"
                  >
                    {{ $t('exchange.buy') }} {{ firstPair }}
                  </button>
                </div>
                <div v-else class="mt-3">
                  <button
                      class="btn btn-success w-100 fs-5"
                      @click="actionDeal(choosenPair, buyPrice, buyAmount, 'BUY', 'LIMIT_PRICE')"
                      :disabled="buyTotal === 0 || showErrorBuyLimit"
                  >
                    Купить {{ firstPair }}
                  </button>
                </div>
              </div>
              <div id="my_orders_limit_sell" role="tabpanel" class="tab-pane">
                <div class="d-flex">
                  <div v-if="isAuthenticated" class="d-flex fs-7 mb-4 fw-semibold">
                    <span class="text-gray-600 me-1">Доступно</span>
                    <span
                        @click="getFromBalance('balanceSellLimit')"
                        class="me-1 cursor-pointer"
                        :class="[showErrorSellLimit ? 'text-danger' : 'text-dark']"
                    >
                      {{ numberFormatting(limitOfFirstCurrency, 2) }}
                      {{ firstPair }}
                    </span>
                    <router-link to="/wallet/deposit">
                      <i class="ki-solid ki-plus-circle text-primary fs-3"></i>
                    </router-link>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="position-relative">
                    <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                    >
                      <span class="fw-semibold fs-7">{{ $t('exchange.give') }}</span>
                    </label>
                    <input type="number"
                           min="0"
                           v-model="sellAmount"
                           @input="changeSellAmount"
                           class="form-control mb-2 text-end pe-18"
                           :class="{'is-error': showErrorSellLimit}"
                           placeholder="0"
                    />
                    <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ firstPair }}</div>
                  </div>
                  <div v-if="showErrorSellLimit" class="text-danger fw-semibold fs-7">Сумма превышает баланс</div>
                </div>
                <div class="position-relative mb-4">
                  <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                  >
                    <span class="fw-semibold fs-7">{{ $t('exchange.price') }}</span>
                  </label>
                  <input
                      type="number"
                      min="0"
                      v-model="sellPrice"
                      @input="changeSellAmount"
                      class="form-control mb-2 text-end pe-18"
                      placeholder="0"
                  />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="position-relative">
                  <label class="position-absolute translate-middle-y top-50 start-0 text-gray-600 form-label ms-4 order-label"
                  >
                    <span class="fw-semibold fs-7">{{ $t('exchange.get') }}</span>
                  </label>
                  <input
                      type="number"
                      min="0"
                      v-model="sellTotal"
                      @input="changeSellTotal"
                      class="form-control mb-2 text-end pe-18"
                      placeholder="0"
                  />
                  <div class="position-absolute translate-middle-y top-50 end-0 me-5 fw-semibold fs-7 text-gray-600">{{ secondPair }}</div>
                </div>
                <div class="mt-3 position-relative">
                  <div class="range-sell">
                    <el-slider
                        v-model="rangeSellLimit"
                        :marks="marks"
                        class="form-range"
                        :disabled="!isAuthenticated"
                        @click="checkLimit('rangeSellLimit')"
                        :format-tooltip="formatTooltip"
                    />
                  </div>
                  <div class="d-flex justify-content-between text-gray-500 fs-7">
                    <span>
                      0
                    </span>
                    <span>
                      100%
                    </span>
                  </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <div class="fw-semibold fs-7">{{ $t('exchange.commission') }}</div>
                  <div class="fw-semibold fs-7">
                    <span v-if="sellComission">{{ formatNumbers(sellComission, ' ', '.', false,  baseCoinScale) }}</span>
                    <span v-else>0</span>
                    {{ secondPair }}
                    <span> / 0.2%</span>
                  </div>
                </div>
                <div v-if="!isAuthenticated" class="my-3 py-4 fw-bold text-center orders-auth-btn lh-1">
                  <a
                      class="fs-6 fw-bold cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#login-modal"
                  >
                    <span class="text-primary">{{ $t('exchange.login') }}</span>
                  </a>
                  {{ $t('exchange.or') }}
                  <a
                      class="fs-6 fw-bold cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#register-modal"
                  >
                    <span class="text-primary">{{ $t('exchange.register') }}</span>
                  </a>
                </div>
                <div v-else-if="!dontRemindComputed" class="mt-3">
                  <button
                      class="btn btn-danger w-100 fs-5 lh-1"
                      data-bs-toggle="modal"
                      data-bs-target="#confirm-modal"
                      @click="selectConfirmModal('sellLimit')"
                      :disabled="sellTotal === 0 || showErrorSellLimit"
                  >
                    {{ $t('exchange.sell') }} {{ firstPair }}
                  </button>
                </div>
                <div v-else class="mt-3 mx-3">
                  <button
                      class="btn btn-danger w-100 fs-5"
                      @click="actionDeal(choosenPair, sellPrice, sellAmount, 'SELL', 'LIMIT_PRICE')"
                      :disabled="sellTotal === 0 || showErrorSellLimit"
                  >
                    Продать {{ firstPair }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" tabindex="-1" id="confirm-modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header py-3 px-6">
          <h5 class="modal-title fs-3">Подтверждение ордера</h5>
          <!--begin::Close-->
          <div
              class="btn btn-icon btn-sm ms-2"
              data-bs-dismiss="modal"
              aria-label="Close"
          >
            <span class="svg-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M7.40992 6.00003L10.9999 2.44003C11.1909 2.24642 11.2971 1.98489 11.2952 1.71296C11.2933 1.44103 11.1835 1.18099 10.9899 0.990031C10.7963 0.799075 10.5348 0.692851 10.2628 0.694727C9.99092 0.696602 9.73088 0.806424 9.53992 1.00003L5.99992 4.59003L2.45992 1.07003C2.27256 0.883781 2.0191 0.779239 1.75492 0.779239C1.49073 0.779239 1.23728 0.883781 1.04992 1.07003C0.956191 1.16299 0.881796 1.2736 0.831028 1.39546C0.780259 1.51731 0.754121 1.64802 0.754121 1.78003C0.754121 1.91204 0.780259 2.04275 0.831028 2.16461C0.881796 2.28647 0.956191 2.39707 1.04992 2.49003L4.58992 6.00003L0.999919 9.56003C0.808963 9.75364 0.702739 10.0152 0.704614 10.2871C0.70649 10.559 0.816311 10.8191 1.00992 11.01C1.20353 11.201 1.46506 11.3072 1.73699 11.3053C2.00892 11.3035 2.26896 11.1936 2.45992 11L5.99992 7.41003L9.53992 10.93C9.72728 11.1163 9.98073 11.2208 10.2449 11.2208C10.5091 11.2208 10.7626 11.1163 10.9499 10.93C11.0436 10.8371 11.118 10.7265 11.1688 10.6046C11.2196 10.4827 11.2457 10.352 11.2457 10.22C11.2457 10.088 11.2196 9.95731 11.1688 9.83545C11.118 9.7136 11.0436 9.60299 10.9499 9.51003L7.40992 6.00003Z" fill="currentColor"/>
              </svg>
            </span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body pt-6">
          <div class="d-flex justify-content-between mb-6">
            <span class="text-gray-500">
              Торговая пара
            </span>
            <span class="fw-bolder">
              {{ firstPair }}
              <span class="fw-semibold">/{{ secondPair }}</span>
            </span>
          </div>
          <div class="d-flex justify-content-between mb-6">
            <span class="text-gray-500">
              Тип / Сторона
            </span>
            <span v-if="confirmModal === 'buyMarket'" class="fw-semibold">
              Рыночный
              <span class="text-success">/ Покупка</span>
            </span>
            <span v-if="confirmModal === 'sellMarket'" class="fw-semibold">
              Рыночный
              <span class="text-danger">/ Продажа</span>
            </span>
            <span v-if="confirmModal === 'buyLimit'" class="fw-semibold">
              Лимитный
              <span class="text-success">/ Покупка</span>
            </span>
            <span v-if="confirmModal === 'sellLimit'" class="fw-semibold">
              Лимитный
              <span class="text-danger">/ Продажа</span>
            </span>
          </div>
          <div class="d-flex justify-content-between mb-6">
            <span class="text-gray-500">
              Отдаю
            </span>
            <span v-if="confirmModal === 'buyMarket'" class="fw-semibold">
              {{ formatNumbers(buyTotalMarket, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
            <span v-if="confirmModal === 'sellMarket'" class="fw-semibold">
              {{ formatNumbers(sellAmountMarket, ' ', '.', false, coinScale) }} {{ firstPair }}
            </span>
            <span v-if="confirmModal === 'buyLimit'" class="fw-semibold">
              {{ formatNumbers(buyTotal, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
            <span v-if="confirmModal === 'sellLimit'" class="fw-semibold">
              {{ formatNumbers(sellAmount, ' ', '.', false, coinScale) }} {{ firstPair }}
            </span>
          </div>
          <div v-if="confirmModal === 'buyMarket' || confirmModal === 'sellMarket'" class="mb-6">
            <div class="alert alert-primary d-flex py-5 px-4">
              <i class="ki-duotone ki-information-3 text-primary fs-2hx me-4"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i>

              <div class="d-flex flex-column">
                <span class="text-black fw-semibold fs-8 lh-sm"><span class="fw-bolder">Обратите внимание.</span> Рыночный ордер исполняется на основе суммы активов, которую вы хотите потратить. Итоговая цена и получаемая сумма будут зависеть от очередности исполнения сделок в стакане.</span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-6">
            <span class="text-gray-500">
              Курс
            </span>
            <span v-if="confirmModal === 'buyMarket'" class="fw-semibold text-gray-500">
              {{ formatNumbers(buyPriceBest, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
            <span v-if="confirmModal === 'sellMarket'" class="fw-semibold text-gray-500">
              {{ formatNumbers(sellPriceBest, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
            <span v-if="confirmModal === 'buyLimit'" class="fw-semibold">
              {{ formatNumbers(buyPrice, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
            <span v-if="confirmModal === 'sellLimit'" class="fw-semibold">
              {{ formatNumbers(sellPrice, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
          </div>
          <div class="d-flex justify-content-between mb-6">
            <span class="text-gray-500">
              Получаю (до вычета комиссии)
            </span>
            <span v-if="confirmModal === 'buyMarket'" class="fw-semibold text-gray-500">
              {{ formatNumbers(buyAmountMarket + buyComissionMarket, ' ', '.', false, coinScale) }} {{ firstPair }}
            </span>
            <span v-if="confirmModal === 'sellMarket'" class="fw-semibold text-gray-500">
              {{ formatNumbers(sellTotalMarket + sellComissionMarket, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
            <span v-if="confirmModal === 'buyLimit'" class="fw-semibold">
              {{ formatNumbers(buyAmount + buyComission, ' ', '.', false, coinScale) }} {{ firstPair }}
            </span>
            <span v-if="confirmModal === 'sellLimit'" class="fw-semibold">
              {{ formatNumbers(sellTotal + sellComission, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
          </div>
          <div class="d-flex justify-content-between mb-6">
            <span class="text-gray-500">
              Комиссия
            </span>
            <span v-if="confirmModal === 'buyMarket'" class="fw-semibold text-gray-500">
              {{ formatNumbers(buyComissionMarket, ' ', '.', false, coinScale) }} {{ firstPair }}
            </span>
            <span v-if="confirmModal === 'sellMarket'" class="fw-semibold text-gray-500">
              {{ formatNumbers(sellComissionMarket, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
            <span v-if="confirmModal === 'buyLimit'" class="fw-semibold">
              {{ formatNumbers(buyComission, ' ', '.', false, coinScale) }} {{ firstPair }}
            </span>
            <span v-if="confirmModal === 'sellLimit'" class="fw-semibold">
              {{ formatNumbers(sellComission, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
          </div>
          <div class="d-flex justify-content-between mb-6">
            <span class="text-gray-500">
              Получаю
            </span>
            <span v-if="confirmModal === 'buyMarket'" class="fw-semibold text-gray-500">
              {{ formatNumbers(buyAmountMarket, ' ', '.', false, coinScale) }} {{ firstPair }}
            </span>
            <span v-if="confirmModal === 'sellMarket'" class="fw-semibold text-gray-500">
              {{ formatNumbers(sellTotalMarket, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
            <span v-if="confirmModal === 'buyLimit'" class="fw-semibold">
              {{ formatNumbers(buyAmount, ' ', '.', false, coinScale) }} {{ firstPair }}
            </span>
            <span v-if="confirmModal === 'sellLimit'" class="fw-semibold">
              {{ formatNumbers(sellTotal, ' ', '.', false, baseCoinScale) }} {{ secondPair }}
            </span>
          </div>
          <div class="form-check">
            <input v-model="dontRemind" @click="dontRemindChange" class="form-check-input flex-grow-1 mt-1" type="checkbox" value="" id="dontRemind" />
            <label class="form-check-label ms-1" for="dontRemind">
              Больше не напоминать
            </label>
          </div>
        </div>

        <div class="modal-footer border-0 pt-0">
          <button
              type="button"
              class="btn btn-light"
              data-bs-dismiss="modal"
          >
            {{ $t('button.cancel') }}
          </button>
          <button
              v-if="confirmModal === 'buyMarket'"
              class="btn btn-success"
              @click="actionDeal(choosenPair, '0', buyTotalMarket, 'BUY', 'MARKET_PRICE')"
              data-bs-dismiss="modal"
          >
            Купить {{ firstPair }}
          </button>
          <button
              v-if="confirmModal === 'sellMarket'"
              class="btn btn-danger"
              @click="actionDeal(choosenPair, '0', sellAmountMarket, 'SELL', 'MARKET_PRICE')"
              data-bs-dismiss="modal"
          >
            Продать {{ firstPair }}
          </button>
          <button
              v-if="confirmModal === 'buyLimit'"
              class="btn btn-success"
              @click="actionDeal(choosenPair, buyPrice, buyAmount, 'BUY', 'LIMIT_PRICE')"
              data-bs-dismiss="modal"
          >
            Купить {{ firstPair }}
          </button>
          <button
              v-if="confirmModal === 'sellLimit'"
              class="btn btn-danger"
              @click="actionDeal(choosenPair, sellPrice, sellAmount, 'SELL', 'LIMIT_PRICE')"
              data-bs-dismiss="modal"
          >
            Продать {{ firstPair }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import
{computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import { useExchangeStore } from "@/stores/exchange";
import { useAuthStore } from "@/stores/auth";
import Api from "@/config/api";
import axios from "axios";
import {ElMessage} from "element-plus";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import { formatNumbers } from "@/core/helpers/helpers";

export default defineComponent({
  name: "myorders",
  components: {},
  setup: function () {
    const exchangeStore = useExchangeStore();
    const isAuthenticated = useAuthStore().isAuthenticated;
    const buyPrice = ref();
    const buyPriceHistory = computed(() => exchangeStore.buyPrice);
    const buyPriceBest = ref();
    const sellPrice = ref();
    const sellPriceHistory = computed(() => exchangeStore.sellPrice);
    const sellPriceBest = ref();
    const buyAmount = ref();
    const buyAmountMarket = ref();
    const buyTotal = ref(0);
    const buyTotalMarket = ref(0);
    const sellAmount = ref();
    const sellAmountMarket = ref(0);
    const sellTotal = ref(0);
    const sellTotalMarket = ref(0);
    const buyComission = computed(() => buyAmount.value / 100 * 0.2);
    const sellComission = computed(() => sellTotal.value / 100 * 0.2);
    const buyComissionMarket = computed(() => buyAmountMarket.value / 100 * 0.2);
    const sellComissionMarket = computed(() => sellTotalMarket.value / 100 * 0.2);
    const choosenPair = computed(() => exchangeStore.symbolName);
    const firstPair = computed(() => exchangeStore.firstPair);
    const secondPair = computed(() => exchangeStore.secondPair);
    const limitOfFirstCurrency = ref();
    const limitOfSecondCurrency = ref();
    const buyPriceDeal = computed(() => exchangeStore.orders.buyLimitPrice);
    const buyAmountDeal = computed(() => exchangeStore.orders.buyLimitAmount);
    const sellPriceDeal = computed(() => exchangeStore.orders.sellLimitPrice);
    const sellAmountDeal = computed(() => exchangeStore.orders.sellLimitAmount);
    const baseCoinScale = computed(() => exchangeStore.baseCoinScale);
    const coinScale = computed(() => exchangeStore.coinScale);
    const confirmModal = ref('');
    const allOrders = computed(() => exchangeStore.orders.allOrders);
    const dontRemind = ref(false);
    const dontRemindComputed = ref();
    const marks = reactive({
      0: '',
      25: '',
      50: '',
      75: '',
      100: ''
    });
    const rangeSellLimit = ref();
    const rangeBuyMarket = ref();
    const rangeSellMarket = ref();
    const rangeBuyLimit = ref();
    const showErrorBuyMarket = ref(false);
    const showErrorSellMarket = ref(false);
    const showErrorBuyLimit = ref(false);
    const showErrorSellLimit = ref(false);

    watch([sellPriceHistory, buyPriceHistory], (value) => {
      sellPrice.value = value[0];
      buyPrice.value = value[1];
    });

    watch(choosenPair, () => {
      getWallet();
    });

    watch([buyPriceDeal, buyAmountDeal], (value) => {
      buyPrice.value = value[0];
      buyAmount.value = value[1];
      changeBuyAmount();
      document.getElementById('my_orders_tab2')?.click();
      document.getElementById('my_orders_limit_tab1')?.click();
    });

    watch([sellPriceDeal, sellAmountDeal], (value) => {
      sellPrice.value = value[0];
      sellAmount.value = value[1];
      changeSellAmount();
      document.getElementById('my_orders_tab2')?.click();
      document.getElementById('my_orders_limit_tab2')?.click();
    });

    watch(rangeBuyMarket, () => {
      if (buyTotalMarket.value <= limitOfSecondCurrency.value) {
        buyTotalMarket.value = Number((limitOfSecondCurrency.value * (rangeBuyMarket.value / 100)).toFixed(2));
        changeBuyTotalMarket();
      }
    });

    watch(rangeSellMarket, () => {
      if (sellAmountMarket.value <= limitOfFirstCurrency.value) {
        sellAmountMarket.value = Number((limitOfFirstCurrency.value * (rangeSellMarket.value / 100)).toFixed(2));
        changeSellAmountMarket();
      }
    });

    watch(rangeBuyLimit, () => {
      if (buyTotal.value <= limitOfSecondCurrency.value) {
        buyTotal.value = Number((limitOfSecondCurrency.value * (rangeBuyLimit.value / 100)).toFixed(2));
        changeBuyTotal();
      }
    });

    watch(rangeSellLimit, () => {
      if (sellAmount.value <= limitOfFirstCurrency.value) {
        sellAmount.value = Number((limitOfFirstCurrency.value * (rangeSellLimit.value / 100)).toFixed(2));
        changeSellAmount();
      }
    });

    watch(buyTotalMarket, ()=> {
      buyTotalMarket.value > limitOfSecondCurrency.value ? showErrorBuyMarket.value = true : showErrorBuyMarket.value = false;
    });

    watch(sellAmountMarket, ()=> {
      sellAmountMarket.value > limitOfFirstCurrency.value ? showErrorSellMarket.value = true : showErrorSellMarket.value = false;
    });

    watch(buyTotal, ()=> {
      buyTotal.value > limitOfSecondCurrency.value ? showErrorBuyLimit.value = true : showErrorBuyLimit.value = false;
    });

    watch(sellAmount, ()=> {
      sellAmount.value > limitOfFirstCurrency.value ? showErrorSellLimit.value = true : showErrorSellLimit.value = false;
    });

    const getWallet = async () => {
      if (isAuthenticated) {
        axios.post(Api.uc.wallet).then(response => {
          if (response.data.code === 0 || response.data.code === 200) {
            let res = response.data.data;
            limitOfFirstCurrency.value = res.find(item => item.unit === firstPair.value)?.balance
            limitOfSecondCurrency.value = res.find(item => item.unit === secondPair.value)?.balance
          } else ElMessage.error(response.data.message);
        }).catch(response => {
          ElMessage.error(response.data.message);
        });
      };
    };

    const CalculateOrderbook = async (orderbook, volume, isNormalVolume) => { // orderbook - нужная половина стакана, volume_left - объем для обмена
      let turnover = 0; // Получаемый объем в итоге
      let count = 0; // Количество затрагиваемых уровней в стакане
      let volume_left = volume; // Остаток объема который нужно обменять

      // need true direction sort (от лучшей цены к худшим)
      for (let i = 0; i < orderbook.length; i++) {
        if (orderbook[i].amount > volume_left) { // Если остаток меньше чем объем на уровне
          // Сколько получим обменяв на данном уровне
          if (isNormalVolume) {
            turnover += volume_left * orderbook[i].price;
          } else {
            turnover += volume_left / orderbook[i].price;
          }
          volume_left = 0;
          count++;
          break;
        } else {
          volume_left -= orderbook[i].amount; // уменьшаем объем на сумму обменянного на текущем уровне
          // Сколько получим обменяв на данном уровне
          if (isNormalVolume) {
            turnover += orderbook[i].amount * orderbook[i].price;
          } else {
            turnover += orderbook[i].amount / orderbook[i].price;
          }
          count++;
        }
      }

      let isEnoughLiquidity = true;
      let result_price = 0;
      if (volume_left == 0) {
        if (isNormalVolume) {
          result_price = turnover / volume;
        } else {
          result_price = volume / turnover;
        }
      } else {
        // Если мы попадаем сюда хорошо бы предупредить пользователя, что объем слишком большой и цена исполнения может значительно отличаться от заявленной
        // Если объем ордера больше чем весь стакан, обрезаем его до объема стакана
        isEnoughLiquidity = false;
        if (isNormalVolume) {
          result_price = turnover / (volume - volume_left);
        } else {
          result_price = (volume - volume_left) / turnover;
        }
      }


      let artificial_turnover = 0; // Объем который будет получен в результате обмена, равен реальному только при условии, что объем заявки меньше, чем объем всего стакана
      if (isNormalVolume) {
        artificial_turnover = result_price * volume;
      } else {
        artificial_turnover = volume / result_price;
      }

      return {turnover: artificial_turnover, price: result_price, isEnoughLiquidity: isEnoughLiquidity};
    };

    const getMarketPrice = async (pair, trueDir, volume, input, fee) => {
      // Половина стакана для подсчета средней цены сделки
      let orderbook = pair.ask.items;
      if (trueDir == 1) { // если сделка на продажу, берем bid
        orderbook = pair.bid.items;
      }

      // Если мы указываем не coin валюту (не USDT в паре USDTRUB),
      // тогда необходимо пересчитать заявки в стакане на Base валюту (RUB)
      let isNormalVolume = trueDir ^ input;
      if (!isNormalVolume) {
        for (let i = 0; i < orderbook.length; i++) {
          orderbook[i].amount = orderbook[i].price * orderbook[i].amount;
        }
      }

      let turnover_price = await CalculateOrderbook(orderbook, volume, isNormalVolume);
      let turnover = turnover_price.turnover;
      let price = turnover_price.price;
      let isEnoughLiquidity = turnover_price.isEnoughLiquidity;
      let c_turnover = turnover; // Оборот с учетом комиссии
      if (input == 1) {
        let temp = await CalculateOrderbook(orderbook, volume / (1 - fee), isNormalVolume);
        c_turnover = temp.turnover;
        isEnoughLiquidity = temp.isEnoughLiquidity;
      }
      if (input == 0) {
        c_turnover = c_turnover * (1 - fee);
      }
      // console.log("Заявок в стакане будет затронуто для выполнения сделки: " + count);
      if (isEnoughLiquidity) {
        console.log("Итоговая цена составит: " + price);
      } else {
        console.log("Внимание! Недостаточно ликвидности");
        console.log("Итоговая цена приблизительна: " + price);
      }
      console.log("Противоположный объем (без учета комиссии): " + turnover);
      console.log("Противоположный объем: " + c_turnover);

      if (trueDir == 1) {
        if (price != NaN) {
          sellPriceBest.value = price;
        }
      } else {
        if (price != NaN) {
          buyPriceBest.value = price;
        }
      }

      return {turnover: turnover, price: price, c_turnover: c_turnover};
    };

    const actionDeal = (symbol, price, amount, direction, type) => {
      let formData = new FormData;
      formData.append("symbol", symbol);
      formData.append("price", price);
      formData.append("amount", amount);
      formData.append("direction", direction);
      formData.append("type", type);
      formData.append("useDiscount", "0");
      ApiService.post(Api.exchange.orderAdd, formData).then(response => {
        if (response.data.code === 0 || response.data.code === 200) {
          ElMessage.success(response.data.message);
          exchangeStore.setIsDeal(`${response.data.message} ${Date.now()}`);
          setTimeout(() => {
            getWallet();
          }, 500);
        } else {
          successOrErrorSubmit('Ошибка', response.data.message);
        }
      }).catch(response => {
        successOrErrorSubmit('Ошибка', response.data.message);
      });
    };

    const successOrErrorSubmit = (text, message) => {
      Swal.fire({
        html: `<div>
                    <div class='mb-5'>${text}</div>
                    <span style='font-size: 12px'>${message}</span>
                 </div>`,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Закрыть",
        customClass: {
          confirmButton: "btn btn-light"
        }
      })
    };

    const changeBuyAmount = () => {
      buyTotal.value = Number((buyAmount.value * buyPrice.value).toFixed(2));
      rangeBuyLimit.value = buyTotal.value / limitOfSecondCurrency.value * 100;
    };

    const changeSellAmount = () => {
      sellTotal.value = Number((sellAmount.value * sellPrice.value).toFixed(2));
      rangeSellLimit.value = sellAmount.value / limitOfFirstCurrency.value * 100;
    };

    const changeBuyTotal = () => {
      buyAmount.value = Number((buyTotal.value / buyPrice.value).toFixed(2));
      rangeBuyLimit.value = buyTotal.value / limitOfSecondCurrency.value * 100;
    };

    const changeSellTotal = () => {
      sellAmount.value = Number((sellTotal.value / sellPrice.value).toFixed(2));
    };

    const selectConfirmModal = (modal) => {
      confirmModal.value = modal;
    };

    const changeBuyAmountMarket = async () => {
      const ordersCopy = JSON.parse(JSON.stringify(allOrders.value));
      const priceTurn = await getMarketPrice(ordersCopy, 0, buyAmountMarket.value, 1, 0.002);
      buyTotalMarket.value = Number((priceTurn.c_turnover).toFixed(2));
      rangeBuyMarket.value = buyTotalMarket.value / limitOfSecondCurrency.value * 100;
      if (isNaN(buyPriceBest.value)) {
        buyPriceBest.value = buyPriceHistory.value;
      }
    };

    const changeBuyTotalMarket = async () => {
      const ordersCopy = JSON.parse(JSON.stringify(allOrders.value));
      const priceTurn = await getMarketPrice(ordersCopy, 0, buyTotalMarket.value, 0, 0.002);
      buyAmountMarket.value = Number((priceTurn.c_turnover).toFixed(3));
      rangeBuyMarket.value = buyTotalMarket.value / limitOfSecondCurrency.value * 100;
      if (isNaN(buyPriceBest.value)) {
        buyPriceBest.value = buyPriceHistory.value;
      }
    };

    const changeSellAmountMarket = async () => {
      const ordersCopy = JSON.parse(JSON.stringify(allOrders.value));
      const priceTurn = await getMarketPrice(ordersCopy, 1, sellAmountMarket.value, 0, 0.002);
      sellTotalMarket.value = Number((priceTurn.c_turnover).toFixed(2));
      rangeSellMarket.value = sellAmountMarket.value / limitOfFirstCurrency.value * 100;
      if (isNaN(sellPriceBest.value)) {
        sellPriceBest.value = sellPriceHistory.value;
      }
    };

    const changeSellTotalMarket = async () => {
      const ordersCopy = JSON.parse(JSON.stringify(allOrders.value));
      const priceTurn = await getMarketPrice(ordersCopy, 1, sellTotalMarket.value, 1, 0.002);
      sellAmountMarket.value = Number((priceTurn.c_turnover).toFixed(3));
      // rangeSellMarket.value = sellAmountMarket.value / limitOfFirstCurrency.value * 100;
      if (isNaN(sellPriceBest.value)) {
        sellPriceBest.value = sellPriceHistory.value;
      }
    };

    const dontRemindChange = () => {
      if (!dontRemind.value) {
        localStorage.setItem('modalConfirm', 'true');
        dontRemindComputed.value = 'true';
      } else {
        localStorage.removeItem('modalConfirm');
        dontRemindComputed.value = '';
      }
    };

    const getFromBalance = (balance) => {
      if (balance === "balanceBuyMarket") {
        buyTotalMarket.value = limitOfSecondCurrency.value;
        changeBuyTotalMarket();
      }
      if (balance === "balanceSellMarket") {
        sellAmountMarket.value = limitOfFirstCurrency.value;
        changeSellAmountMarket();
      }
      if (balance === "balanceBuyLimit") {
        buyTotal.value = limitOfSecondCurrency.value;
        changeBuyTotal();
      }
      if (balance === "balanceSellLimit") {
        sellAmount.value = limitOfFirstCurrency.value;
        changeSellAmount();
      }
    };

    const formatTooltip = (val: number) => {
      return val.toFixed(0)
    }

    const checkLimit = (data) => {
      if (data === 'rangeBuyMarket') {
        if (showErrorBuyMarket) {
          buyTotalMarket.value = Number((limitOfSecondCurrency.value * (rangeBuyMarket.value / 100)).toFixed(2));
        }
      }
      if (data === 'rangeSellMarket') {
        if (showErrorSellMarket) {
          sellAmountMarket.value = Number((limitOfFirstCurrency.value * (rangeSellMarket.value / 100)).toFixed(2));
        }
      }
      if (data === 'rangeBuyLimit') {
        if (showErrorBuyLimit) {
          buyTotal.value = Number((limitOfSecondCurrency.value * (rangeBuyLimit.value / 100)).toFixed(2));
        }
      }
      if (data === 'rangeSellLimit') {
        if (showErrorSellLimit) {
          sellAmount.value = Number((limitOfFirstCurrency.value * (rangeSellLimit.value / 100)).toFixed(2));
        }
      }
    };

    onMounted(() => {
      if (isAuthenticated) {
        getWallet();
      }
      dontRemindComputed.value = localStorage.getItem('modalConfirm');
      setTimeout(() => {
        buyPriceBest.value = buyPriceHistory.value;
        sellPriceBest.value = sellPriceHistory.value;
      }, 500);
    });

    return {
      buyPrice,
      buyPriceHistory,
      sellPrice,
      sellPriceHistory,
      buyAmount,
      buyAmountMarket,
      buyTotal,
      buyTotalMarket,
      sellAmount,
      sellAmountMarket,
      sellTotal,
      sellTotalMarket,
      isAuthenticated,
      buyComission,
      sellComission,
      buyComissionMarket,
      sellComissionMarket,
      choosenPair,
      firstPair,
      secondPair,
      limitOfFirstCurrency,
      limitOfSecondCurrency,
      actionDeal,
      selectConfirmModal,
      confirmModal,
      changeBuyAmountMarket,
      changeBuyTotalMarket,
      buyPriceBest,
      sellPriceBest,
      changeSellAmountMarket,
      changeSellTotalMarket,
      changeBuyAmount,
      changeSellAmount,
      changeBuyTotal,
      changeSellTotal,
      dontRemindChange,
      dontRemind,
      dontRemindComputed,
      marks,
      rangeSellLimit,
      rangeBuyLimit,
      rangeBuyMarket,
      rangeSellMarket,
      getFromBalance,
      showErrorBuyMarket,
      showErrorSellMarket,
      showErrorBuyLimit,
      showErrorSellLimit,
      checkLimit,
      baseCoinScale,
      coinScale,
      formatNumbers,
      formatTooltip,
    };
  },

  methods: {
    numberFormatting(number, count) {
      return new Intl.NumberFormat("ru", {style: "decimal", maximumFractionDigits: count}).format(number);
    },
  },
});
</script>

<style scoped lang="scss">
  .card {
    border-radius: 0;
  }
  .svg-icon svg [fill]:not(.permanent):not(g) {
    transition: fill .3s ease;
    fill: #a1a5b7;
  }

  .svg-icon:hover svg [fill]:not(.permanent):not(g) {
    transition: fill .3s ease;
    fill: #151617;
  }

  .modal-dialog {
    max-width: 438px;
  }

  .card .card-header {
    min-height: auto;
  }

  .nav-line-tabs .nav-item .nav-link span{
    border-top: 3px solid transparent;
  }
  .nav-line-tabs .nav-item .nav-link.active span
  {
    border-top: 3px solid var(--bs-primary);
  }
  .nav-line-tabs .nav-item .nav-link.active, .nav-line-tabs .nav-item.show .nav-link, .nav-line-tabs .nav-item .nav-link:hover:not(.disabled) {
    border-bottom: 1px solid transparent;
  }

  .nav-line-tabs .nav-item {
    margin-bottom: 0;
  }

  li::marker {
    content: none;
  }

  .orders-tabs-tab1 .btn.btn-secondary:focus:not(.btn-active).active,
  .orders-tabs-tab1 .btn.btn-secondary.active,
  .orders-tabs-tab1 .btn.btn-secondary:hover
  {
    background-color: var(--bs-success-active) !important;
    color: white;
  }

  .orders-tabs-tab2 .btn.btn-secondary:focus:not(.btn-active).active,
  .orders-tabs-tab2 .btn.btn-secondary.active,
  .orders-tabs-tab2 .btn.btn-secondary:hover
  {
    background-color: var(--bs-danger-active) !important;
    color: white;
  }

  .orders-auth-btn {
    background: #f2f4f6;
    border-radius: 4px;
  }

  .orders-tabs-tab1 {
    border-radius: 6px 0 0 6px;
    margin-right: 1px;
  }

  .orders-tabs-tab1 .btn {
    border-radius: 6px 0 0 6px;
    color: #B3B5BD;
  }

  .orders-tabs-tab2 {
    border-radius: 0 6px 6px 0;
  }

  .orders-tabs-tab2 .btn {
    border-radius: 0 6px 6px 0;
    color: #B3B5BD;
  }

  .form-check {
    padding-left: 1.25rem;
  }

  .form-check-input {
    width: 13px;
    height: 13px;
    border-radius: 2px;
    border: 1px solid var(--mexc-gray, #2F3133);
    margin-left: -1.25rem;
  }

  .form-check-input:hover,
  .form-check-input:checked {
    border-color: #357AFF;
  }

  .form-check-input:checked:hover {
    border: 1px solid rgba(66, 129, 255, 0.32);
  }

  .form-check-label {
    color: #555B63;
  }

  .svg-icon {
    color: #97A1A9;
  }

  .form-range {
    height: 14px;
    width: calc(100% - 10px);
  }

  .form-control:hover {
    border-color: #357aff;
  }
  .form-control:focus {
    border-color: #5d95ff;
    box-shadow: rgba(53, 122, 255, 0.2) 0px 0px 0px 2px;
  }
  .form-control.is-error {
    border-color: var(--bs-danger);
  }
  .form-control.is-error:focus {
    box-shadow: 0px 0px 0px 2px rgba(255, 71, 97, 0.32);
  }
  //.nav-item {
  //  border-bottom: 1px solid #DDE0E2 !important;
  //}
  .nav-item .nav-link.active span {
    position: relative;
    z-index: 15;
    background-color: #fff;
    //border-bottom: 1px solid transparent !important;
  }
  .nav-item .nav-link {
    border-bottom: 0;
  }
  .nav {
    position: relative;
    border-bottom: 0;
  }
  .nav::after {
    content:'';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 0.8px;
    background-color: #DDE0E2;
  }
  .order-label {
    pointer-events: none;
  }
</style>

<style>
.el-slider__button {
  height: 13px;
  width: 13px;
  border-radius: 50%;
  background-color: #fff;
  transform: translateY(-1px);
}
.range-buy .el-slider__button{
  border: 2px solid var(--bs-success);
}
.range-sell .el-slider__button{
  border: 2px solid var(--bs-danger);
}
.el-slider__button {
  transform: translateY(-1px);
}
.el-slider__button.hover,
.el-slider__runway.is-disabled .el-slider__button:hover{
  transform: translateY(-1px);
}
.el-slider__runway {
  height: 2px;
  border-radius: 3px;
  background: #EBEDF1;
}
.el-slider__runway.is-disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.el-slider__bar {
  height: 2px;
}
.range-sell .el-slider__bar {
  background-color: var(--bs-danger);;
}
.range-buy .el-slider__bar {
  background-color: var(--bs-success);;
}
.el-slider__stop {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #EBEDF1;
  transform: translateY(-2px);
}
.el-slider__button-wrapper {
  transform: translate(-35%, 3px);
  width: 30px;
  height: 30px;
}
</style>
