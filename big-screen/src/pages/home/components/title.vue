<template>
  <div class="title">
    <img src="../assets/title-icon.png" alt="title-icon">
    <div class="title-name">
      {{titleName}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    titleName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.title {
  box-sizing: border-box;
  padding: 5px 10px 5px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  img {
    height: 16px;
  }
  .title-name {
    color: #20253A;
    font-size: 14px;
    margin-left: 5px;
  }
}
</style>
