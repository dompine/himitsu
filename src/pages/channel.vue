<template>
  <div>
    <div class="channelTip">
      <p>选择你的故事投放轨道:</p>
    </div>
    <div class="channel">
      <div>
        <div style="background-color: burlywood;margin-left: -30px"><a href="create">心愿</a></div>
        <div style="background-color: #de5454"><a href="create">爱情</a></div>
        <div class="disable"></div>
      </div>
      <div>
        <div class="disable" style="margin-left: -70px"></div>
        <div style="background-color: #afde8d"><a href="create">亲情</a></div>
        <div class="disable"></div>
        <div class="disable"></div>
      </div>
      <div>
        <div class="disable" style="margin-left: -30px"></div>
        <div style="background-color: #959ede"><a href="create">职场</a></div>
        <div class="disable"></div>
      </div>
      <div>
        <div class="disable" style="margin-left: -20px"></div>
        <div style="background-color: #b776de"><a href="create">秘密</a></div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "channel"
  };
</script>

<style>
  .channelTip {
    margin: 24px;
    font-size: 20px;
    color: white;
  }
  .channel {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    color: white;
  }
  .channel>div{
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    width: auto;
  }
  .channel>div>div{
    max-width: 136px;
    width: 136px;
    height: 32px;
    margin: 4px;
    border-radius: 16px;
    text-align: center;

  }
  .disable{
    background-color: gray;
  }
</style>
