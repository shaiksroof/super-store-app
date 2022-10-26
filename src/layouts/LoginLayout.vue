<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page
        class="window-height window-width row justify-center items-center"
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card square style="width: 400px; height: 540px">
              <q-card-section style="background: #c6ebc5">
                <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
              </q-card-section>
              <q-card-section>
                <q-fab
                  color="primary"
                  @click="switchTypeForm"
                  icon="add"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%)"
                >
                  <q-tooltip> Регистрация нового пользователя </q-tooltip>
                </q-fab>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input
                    ref="emailRef"
                    square
                    clearable
                    v-model="email"
                    type="email"
                    lazy-rules
                    :rules="[required, isEmail, short]"
                    label="Email"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    ref="username"
                    v-if="register"
                    square
                    clearable
                    v-model="username"
                    lazy-rules
                    :rules="[required, short]"
                    type="username"
                    label="Пользователь"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    ref="passwordRef"
                    square
                    clearable
                    v-model="password"
                    :type="passwordFieldType"
                    lazy-rules
                    :rules="[required, short]"
                    label="Enter Password"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                  <q-input
                    ref="repasswordRef"
                    v-if="register"
                    square
                    clearable
                    v-model="repassword"
                    :type="passwordFieldType"
                    lazy-rules
                    :rules="[required, short, diffPassword]"
                    label="Повторить пароль"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  @click="submit"
                  class="full-width text-white"
                  :label="btnLabel"
                />
              </q-card-actions>
              <q-card-section v-if="!register" class="text-center q-pa-sm">
                <p class="text-grey-6">Forgot Password?</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const emailRef = ref(null);
const usernameRef = ref(null);
const passwordRef = ref(null);
const repasswordRef = ref(null);

const title = ref("OTT Login");
const email = ref("");
const username = ref("");
const password = ref("");
const repassword = ref("");
const register = ref(false);
const passwordFieldType = ref("password");
const btnLabel = ref("Submit");
const visibility = ref(false);
const visibilityIcon = ref("visibility");

function required(val) {
  return (val && val.length > 0) || "Please enter Valid Name";
}
function diffPassword(val) {
  const val2 = password.value;
  return (val && val === val2) || "Password dousn't match!";
}
function short(val) {
  return (val && val.length > 3) || "Значение слишком короткое";
}
function isEmail(val) {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Is email";
}
function submit() {
  if (register.value) {
    email.value.validate();
    username.value.validate();
    password.value.validate();
    repassword.value.validate();
  } else {
    email.value.validate();
    password.value.validate();
  }

  if (!register.value)
    if (!email.value.hasError && !password.value.hasError) {
      this.$q.notify({
        icon: "done",
        color: "positive",
        message: "Completed",
      });
    }
}
function switchTypeForm() {
  register.value = !register.value;
  title.value = register.value ? "Новый пользователь" : "Авторизация";
  btnLabel.value = register.value ? "Регистрация" : "Вход";
}
function switchVisibility() {
  visibility.value = !visibility.value;
  passwordFieldType.value = visibility.value ? "text" : "password";
  visibilityIcon.value = visibility.value ? "visibility_off" : "visibility";
}
</script>
