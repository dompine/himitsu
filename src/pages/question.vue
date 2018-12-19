<template>
  <div class="question">
    <div>
      <p>Q: 真故邮局是什么？</p>
      <p>A: 在故事里遇见同类。每天凌晨3点，你会随机收到三个新故事，查看更多故事需要邮票。你回复的故事会进入收发室，其他故事1天后消失。</p>
    </div>
    <div>
      <p>Q: 为什么每天只能写1个故事？</p>
      <p>A: 我们希望你用心记录自己的生活，打动人心的故事也更有可能得到回复。</p>
    </div>
    <div>
      <p>Q: 为什么每天只能回复1个故事？</p>
      <p>A: 我们有意做了限制。希望你挑选最打动自己的故事进行回复，也许真的能够遇见同类。请慎重选择。</p>
    </div>
    <div>
      <p>Q: 我们的隐私会被泄露吗？</p>
      <p>A: 我们不会有意泄露你的个人信息。为安全起见，写作时请斟酌用词。</p>
    </div>
    <div>
      <p>更多问题请添加脸叔的微信咨询，微信号uncleface6。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "question"
  };
</script>

<style>
  .question {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: white;
  }

  .question > div {
    margin-top: 24px;
    margin-left: 16px;
    margin-right: 16px;
  }
</style>
