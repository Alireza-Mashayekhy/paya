<template>
  <date-picker
    color="#71c562"
    format="YYYY-MM-DD"
    display-format="jYYYY-jMM-jDD"
  />
</template>
<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
export default {
  components: {
    datePicker: VuePersianDatetimePicker,
  },
}
</script>
