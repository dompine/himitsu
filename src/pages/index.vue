<template>
  <div >
    <div class="ripple fadeIn">
      <div class="userinfo" >
        <div v-if="userInfo">
          <a href="mine"><img  class="userinfo-avatar"  v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" /></a>
          <img  class="userinfo-avatar"  v-if="!userInfo.avatarUrl" src="/static/img/avatar.png"  />
        </div>
      </div>
      <div class="indexPage">
      <div class="indexText" >在孤独星球，等待每一次相遇</div>
      <div class="mt56" >
        <img mode="widthFix" class="indexPic" src="/static/img/demo.png" />
      </div>
        <div class="mt216"  v-if="user.userId">

          <div v-if="!userInfo.avatarUrl" class="hideButton">
            <button  open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">*</button>
          </div>
          <a @click="toPost" ><p class="searchButton">收信（今日剩余 {{ user.times }} 次相遇机会）</p></a>
        </div>
      </div>

      <i-modal title="糟了，你今天的机会用光了"  v-bind:visible="visible" @ok="handleok" @cancel="handlecancel">
        <div>要消耗一张邮票去邂逅吗？（现有{{user.tickets}}张）</div>
      </i-modal>
      <div class="space">
      <div id='stars' style="z-index: 1"></div>
      <div id='stars2' style="z-index: 1"></div>
      <div id='stars3' style="z-index: 3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data () {
    return {
      isActive: false,
      visible: false,
    }
  },
  computed: {
    ...mapState([
      "userInfo",
      "user",
    ])
  },
  methods: {
    handleok: function () {
      this.trade()
        this.visible= false
    },
    handlecancel: function () {
        this.visible= false
    },
    onGotUserInfo: function(e) {
      if (e.mp.detail.userInfo) {
      this.$store.state.userInfo = e.mp.detail.userInfo
      this.getUserInfo()
    }
    },
    toPost () {
      const that = this
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {   //已经授权
            if (that.user.times <= 0) {
              that.visible = true
            } else {
              that.$router.push({ path: 'post' });
            }
          } else {   //未授权
            wx.showToast({
              title: '需要授权才能使用',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    },
    ...mapMutations([
      "getUserInfo",
      "trade",
      "getTickets"
    ])
  },
  onShareAppMessage: function(res){
    let that = this;
    return{
      title: '在孤独星球，等待每一次相遇',
      path: 'pages/index',
      imageUrl: '/static/img/share.png',
      success(res){
        that.getTickets()
      }
    }
  },
  created () {
   this.getUserInfo()

  },
}
</script>

<style>
  html{
    background-image: url("https://zhenshigushi.net/himitsu/space.jpg");
    background-attachment: fixed;
    background-size: cover;
  }
.indexPage{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.indexText{
  color: white;
  font-size: 12px;
  margin-top: 32px;
}
.mt56{
  margin-top: 56px;
}
.mt216{
  margin-top: 176px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 216px;
  height: 32px;
  background-color: #353A4A;
  color: white;
  text-align: center;
  border-radius: 1rem;
}
.indexPic{
  height: 144px;
  width: 244px;
}
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 2;
  }
  .userinfo-avatar {
    width: 32px;
    height: 32px;
    margin: 16px;
    border-radius: 50%;
  }
  .back{
    position: absolute;
    top: 25%;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .searchButton{
    font-size: 12px;
  }
  .hideButton{
    position: absolute;
    z-index: 2;
    top: 78%;
    bottom: 0;
    left: 15%;
    right: 15%;
  }
  .hideButton>button{
    width: 100%;
    height: 100%;
    color: rgba(0,0,0,0);
    background: none;
  }
  .hideButton>button:after{
    border: none;
  }
  .space{
    position: absolute;
    overflow: hidden;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
  #stars {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: 817px 197px #f8f8f8, 250px 788px #f8f8f8, 1720px 775px #f8f8f8, 1907px 635px #f8f8f8, 190px 1409px #f8f8f8, 1523px 1165px #f8f8f8, 321px 216px #f8f8f8, 1614px 186px #f8f8f8, 283px 916px #f8f8f8, 1734px 813px #f8f8f8, 269px 515px #f8f8f8, 1641px 574px #f8f8f8, 792px 1669px #f8f8f8, 1161px 1662px #f8f8f8, 687px 434px #f8f8f8, 1466px 262px #f8f8f8, 1614px 1376px #f8f8f8, 488px 761px #f8f8f8, 1079px 1293px #f8f8f8, 1649px 1096px #f8f8f8, 1644px 1516px #f8f8f8, 903px 1316px #f8f8f8, 1533px 927px #f8f8f8, 1159px 113px #f8f8f8, 1531px 1448px #f8f8f8, 775px 1068px #f8f8f8, 906px 1000px #f8f8f8, 611px 933px #f8f8f8, 1703px 399px #f8f8f8, 734px 509px #f8f8f8, 1992px 1919px #f8f8f8, 764px 262px #f8f8f8, 1930px 1959px #f8f8f8, 1355px 638px #f8f8f8, 1654px 1873px #f8f8f8, 1709px 1404px #f8f8f8, 1988px 354px #f8f8f8, 701px 591px #f8f8f8, 347px 1px #f8f8f8, 1485px 1546px #f8f8f8, 395px 834px #f8f8f8, 1005px 1323px #f8f8f8, 1610px 315px #f8f8f8, 1666px 1679px #f8f8f8, 1005px 585px #f8f8f8, 500px 777px #f8f8f8, 1076px 1630px #f8f8f8, 612px 1054px #f8f8f8, 1551px 921px #f8f8f8, 1238px 553px #f8f8f8, 1225px 1533px #f8f8f8, 177px 1633px #f8f8f8, 1464px 971px #f8f8f8, 673px 990px #f8f8f8, 1871px 196px #f8f8f8, 130px 214px #f8f8f8, 1020px 1838px #f8f8f8, 930px 1916px #f8f8f8, 1379px 1608px #f8f8f8, 1274px 997px #f8f8f8, 1340px 796px #f8f8f8, 774px 295px #f8f8f8, 1199px 166px #f8f8f8, 1142px 1870px #f8f8f8, 391px 534px #f8f8f8, 1383px 250px #f8f8f8, 1412px 567px #f8f8f8, 113px 1015px #f8f8f8, 1045px 329px #f8f8f8, 1348px 1177px #f8f8f8, 1903px 623px #f8f8f8, 90px 1990px #f8f8f8, 1395px 150px #f8f8f8, 904px 907px #f8f8f8, 965px 491px #f8f8f8, 1814px 349px #f8f8f8, 1730px 1886px #f8f8f8, 1050px 930px #f8f8f8, 1315px 1460px #f8f8f8, 1269px 789px #f8f8f8, 257px 1009px #f8f8f8, 1303px 567px #f8f8f8, 1300px 713px #f8f8f8, 1210px 1007px #f8f8f8, 258px 1621px #f8f8f8, 1495px 1347px #f8f8f8, 1097px 1691px #f8f8f8, 977px 1226px #f8f8f8, 1360px 822px #f8f8f8, 24px 1250px #f8f8f8, 392px 1261px #f8f8f8, 149px 476px #f8f8f8, 623px 1590px #f8f8f8, 715px 229px #f8f8f8, 997px 573px #f8f8f8, 1754px 579px #f8f8f8, 641px 651px #f8f8f8, 453px 595px #f8f8f8, 433px 939px #f8f8f8, 87px 783px #f8f8f8, 1919px 1928px #f8f8f8, 1482px 578px #f8f8f8, 1985px 1883px #f8f8f8, 210px 612px #f8f8f8, 1120px 343px #f8f8f8, 1745px 1138px #f8f8f8, 986px 1218px #f8f8f8, 1790px 533px #f8f8f8, 13px 1991px #f8f8f8, 1454px 1744px #f8f8f8, 373px 1767px #f8f8f8, 100px 283px #f8f8f8, 342px 1483px #f8f8f8, 1235px 242px #f8f8f8, 813px 1362px #f8f8f8, 745px 50px #f8f8f8, 1075px 748px #f8f8f8, 254px 339px #f8f8f8, 1445px 1144px #f8f8f8, 1850px 263px #f8f8f8, 1742px 1175px #f8f8f8, 1873px 257px #f8f8f8, 1702px 969px #f8f8f8, 1377px 252px #f8f8f8, 463px 1685px #f8f8f8, 322px 714px #f8f8f8, 1411px 1825px #f8f8f8, 1212px 555px #f8f8f8, 759px 90px #f8f8f8, 1004px 726px #f8f8f8, 1410px 1091px #f8f8f8, 229px 524px #f8f8f8, 824px 137px #f8f8f8, 504px 1357px #f8f8f8, 950px 740px #f8f8f8, 304px 87px #f8f8f8, 853px 1429px #f8f8f8, 572px 275px #f8f8f8, 1722px 480px #f8f8f8, 1267px 248px #f8f8f8, 1759px 1048px #f8f8f8, 306px 414px #f8f8f8, 1489px 1837px #f8f8f8, 1889px 885px #f8f8f8, 1793px 1089px #f8f8f8, 883px 1499px #f8f8f8, 532px 1359px #f8f8f8, 538px 205px #f8f8f8, 463px 1924px #f8f8f8, 614px 1872px #f8f8f8, 1973px 5px #f8f8f8, 197px 572px #f8f8f8, 1622px 185px #f8f8f8, 847px 1361px #f8f8f8, 1616px 1218px #f8f8f8, 1702px 291px #f8f8f8, 1619px 1345px #f8f8f8, 384px 1625px #f8f8f8, 548px 1729px #f8f8f8, 853px 133px #f8f8f8, 897px 87px #f8f8f8, 1409px 862px #f8f8f8, 1904px 705px #f8f8f8, 1369px 52px #f8f8f8, 1887px 134px #f8f8f8, 1050px 1470px #f8f8f8, 350px 1783px #f8f8f8, 958px 351px #f8f8f8, 1199px 216px #f8f8f8, 997px 1181px #f8f8f8, 1673px 1921px #f8f8f8, 741px 45px #f8f8f8, 1296px 1312px #f8f8f8, 229px 749px #f8f8f8, 1221px 897px #f8f8f8, 1211px 137px #f8f8f8, 693px 917px #f8f8f8, 498px 587px #f8f8f8, 146px 945px #f8f8f8, 928px 112px #f8f8f8, 508px 1596px #f8f8f8, 230px 1953px #f8f8f8, 955px 1231px #f8f8f8, 119px 319px #f8f8f8, 495px 320px #f8f8f8, 1271px 792px #f8f8f8, 1901px 945px #f8f8f8, 378px 1375px #f8f8f8, 1658px 4px #f8f8f8, 557px 1311px #f8f8f8, 621px 887px #f8f8f8, 1606px 1937px #f8f8f8, 42px 693px #f8f8f8, 9px 774px #f8f8f8, 1558px 1989px #f8f8f8, 625px 903px #f8f8f8, 751px 762px #f8f8f8, 1178px 689px #f8f8f8, 1201px 101px #f8f8f8, 137px 446px #f8f8f8, 101px 1030px #f8f8f8, 1768px 819px #f8f8f8, 1388px 49px #f8f8f8, 1721px 817px #f8f8f8, 376px 1388px #f8f8f8, 119px 1972px #f8f8f8, 162px 1126px #f8f8f8, 332px 606px #f8f8f8, 518px 429px #f8f8f8, 873px 112px #f8f8f8, 1852px 69px #f8f8f8, 799px 1016px #f8f8f8, 1599px 1314px #f8f8f8, 1075px 1220px #f8f8f8, 365px 1275px #f8f8f8, 1494px 967px #f8f8f8, 1922px 1725px #f8f8f8, 1688px 1934px #f8f8f8, 680px 736px #f8f8f8, 690px 682px #f8f8f8, 1985px 977px #f8f8f8, 449px 601px #f8f8f8, 390px 1551px #f8f8f8, 1992px 953px #f8f8f8, 1474px 1501px #f8f8f8, 1269px 673px #f8f8f8, 813px 124px #f8f8f8, 1850px 311px #f8f8f8, 248px 1756px #f8f8f8, 601px 668px #f8f8f8, 232px 1660px #f8f8f8, 1398px 1983px #f8f8f8, 373px 950px #f8f8f8, 1711px 1132px #f8f8f8, 1338px 489px #f8f8f8, 922px 1572px #f8f8f8, 1363px 1037px #f8f8f8, 1696px 926px #f8f8f8, 348px 702px #f8f8f8, 1006px 1682px #f8f8f8, 742px 1598px #f8f8f8, 1769px 1501px #f8f8f8, 1643px 1911px #f8f8f8, 1781px 1327px #f8f8f8, 1155px 1382px #f8f8f8, 86px 1937px #f8f8f8, 1481px 1031px #f8f8f8, 1427px 559px #f8f8f8, 1931px 652px #f8f8f8, 1544px 357px #f8f8f8, 1624px 192px #f8f8f8, 1925px 413px #f8f8f8, 1757px 288px #f8f8f8, 1310px 1826px #f8f8f8, 609px 175px #f8f8f8, 1502px 1629px #f8f8f8, 1535px 854px #f8f8f8, 536px 813px #f8f8f8, 829px 29px #f8f8f8, 1334px 412px #f8f8f8, 524px 498px #f8f8f8, 1140px 1593px #f8f8f8, 1241px 1490px #f8f8f8, 868px 1144px #f8f8f8, 777px 1090px #f8f8f8, 365px 30px #f8f8f8, 499px 1564px #f8f8f8, 887px 935px #f8f8f8, 982px 1406px #f8f8f8, 155px 1524px #f8f8f8, 1861px 1609px #f8f8f8, 1117px 1518px #f8f8f8, 1240px 933px #f8f8f8, 1720px 1270px #f8f8f8, 1457px 169px #f8f8f8, 1849px 709px #f8f8f8, 386px 1617px #f8f8f8, 1259px 222px #f8f8f8, 996px 1836px #f8f8f8, 1194px 1599px #f8f8f8, 1483px 590px #f8f8f8, 887px 1739px #f8f8f8, 1234px 825px #f8f8f8, 648px 442px #f8f8f8, 1787px 591px #f8f8f8, 1818px 783px #f8f8f8, 681px 994px #f8f8f8, 768px 1062px #f8f8f8, 1857px 1744px #f8f8f8, 1864px 492px #f8f8f8, 147px 236px #f8f8f8, 241px 519px #f8f8f8, 440px 1845px #f8f8f8, 760px 746px #f8f8f8, 281px 960px #f8f8f8, 1628px 1267px #f8f8f8, 1470px 1592px #f8f8f8, 164px 199px #f8f8f8, 1387px 1618px #f8f8f8, 1392px 1862px #f8f8f8, 764px 1560px #f8f8f8, 72px 1955px #f8f8f8, 63px 1777px #f8f8f8, 1051px 1744px #f8f8f8, 1264px 286px #f8f8f8, 1088px 830px #f8f8f8, 1985px 85px #f8f8f8, 836px 430px #f8f8f8, 709px 1392px #f8f8f8, 1549px 1812px #f8f8f8, 712px 232px #f8f8f8, 1587px 554px #f8f8f8, 123px 661px #f8f8f8, 513px 815px #f8f8f8, 359px 1854px #f8f8f8, 1670px 837px #f8f8f8, 1638px 870px #f8f8f8, 983px 1747px #f8f8f8, 1728px 210px #f8f8f8, 152px 1851px #f8f8f8, 663px 1822px #f8f8f8, 706px 139px #f8f8f8, 306px 619px #f8f8f8, 578px 1875px #f8f8f8, 1246px 207px #f8f8f8, 450px 1615px #f8f8f8, 332px 623px #f8f8f8, 1598px 1534px #f8f8f8, 1198px 237px #f8f8f8, 1465px 94px #f8f8f8, 800px 870px #f8f8f8, 1409px 381px #f8f8f8, 662px 826px #f8f8f8, 1516px 1338px #f8f8f8, 1082px 218px #f8f8f8, 691px 516px #f8f8f8, 1502px 1719px #f8f8f8, 898px 816px #f8f8f8, 192px 1059px #f8f8f8, 652px 1827px #f8f8f8, 418px 1748px #f8f8f8, 1924px 696px #f8f8f8, 63px 235px #f8f8f8, 688px 18px #f8f8f8, 945px 1758px #f8f8f8, 1731px 1855px #f8f8f8, 681px 761px #f8f8f8, 1551px 721px #f8f8f8, 483px 734px #f8f8f8, 527px 1159px #f8f8f8, 27px 458px #f8f8f8, 1648px 1422px #f8f8f8, 1251px 1482px #f8f8f8, 917px 383px #f8f8f8, 428px 298px #f8f8f8, 103px 558px #f8f8f8, 797px 1453px #f8f8f8, 1549px 1988px #f8f8f8, 33px 211px #f8f8f8, 1321px 347px #f8f8f8, 1404px 1423px #f8f8f8, 517px 834px #f8f8f8, 5px 1943px #f8f8f8, 1346px 1129px #f8f8f8, 215px 1897px #f8f8f8, 1648px 1553px #f8f8f8, 505px 786px #f8f8f8, 1461px 72px #f8f8f8, 1694px 394px #f8f8f8, 1679px 1357px #f8f8f8, 72px 1111px #f8f8f8, 1442px 902px #f8f8f8, 171px 711px #f8f8f8, 443px 1750px #f8f8f8, 939px 364px #f8f8f8, 60px 1340px #f8f8f8, 306px 106px #f8f8f8, 134px 340px #f8f8f8, 873px 606px #f8f8f8, 76px 713px #f8f8f8, 1118px 585px #f8f8f8, 548px 586px #f8f8f8, 1679px 28px #f8f8f8, 1774px 1277px #f8f8f8, 1762px 602px #f8f8f8, 641px 954px #f8f8f8, 1937px 104px #f8f8f8, 293px 1px #f8f8f8, 1644px 551px #f8f8f8, 235px 1984px #f8f8f8, 949px 937px #f8f8f8, 411px 1419px #f8f8f8, 500px 694px #f8f8f8, 168px 690px #f8f8f8, 1816px 856px #f8f8f8, 1091px 747px #f8f8f8, 1216px 199px #f8f8f8, 695px 1622px #f8f8f8, 339px 1441px #f8f8f8, 1076px 792px #f8f8f8, 310px 277px #f8f8f8, 736px 977px #f8f8f8, 28px 1601px #f8f8f8, 471px 1331px #f8f8f8, 1425px 851px #f8f8f8, 1169px 607px #f8f8f8, 1105px 1471px #f8f8f8, 628px 1664px #f8f8f8, 27px 301px #f8f8f8, 1530px 1939px #f8f8f8, 1016px 1425px #f8f8f8, 841px 1341px #f8f8f8, 663px 628px #f8f8f8, 231px 809px #f8f8f8, 1806px 1228px #f8f8f8, 1089px 1714px #f8f8f8, 1160px 354px #f8f8f8, 1718px 1280px #f8f8f8, 251px 607px #f8f8f8, 787px 1665px #f8f8f8, 540px 109px #f8f8f8, 138px 1221px #f8f8f8, 1841px 665px #f8f8f8, 442px 232px #f8f8f8, 1445px 635px #f8f8f8, 1636px 323px #f8f8f8, 1201px 864px #f8f8f8, 269px 1588px #f8f8f8, 526px 1508px #f8f8f8, 99px 1385px #f8f8f8, 1385px 300px #f8f8f8, 670px 162px #f8f8f8, 120px 1693px #f8f8f8, 202px 1255px #f8f8f8, 1093px 1636px #f8f8f8, 804px 1291px #f8f8f8, 697px 948px #f8f8f8, 783px 788px #f8f8f8, 1967px 591px #f8f8f8, 130px 423px #f8f8f8, 1332px 319px #f8f8f8, 580px 1679px #f8f8f8, 1665px 1314px #f8f8f8, 1511px 726px #f8f8f8, 1370px 811px #f8f8f8, 1387px 1263px #f8f8f8, 1459px 1446px #f8f8f8, 461px 1035px #f8f8f8, 1327px 475px #f8f8f8, 651px 834px #f8f8f8, 1891px 1476px #f8f8f8, 1439px 114px #f8f8f8, 165px 1257px #f8f8f8, 389px 745px #f8f8f8, 1042px 394px #f8f8f8, 483px 1995px #f8f8f8, 269px 794px #f8f8f8, 1374px 1747px #f8f8f8, 1342px 431px #f8f8f8, 1577px 1041px #f8f8f8, 929px 1549px #f8f8f8, 140px 493px #f8f8f8, 1758px 1374px #f8f8f8, 1042px 211px #f8f8f8, 956px 936px #f8f8f8, 1976px 265px #f8f8f8, 1548px 1880px #f8f8f8, 1755px 610px #f8f8f8, 1337px 443px #f8f8f8, 173px 1785px #f8f8f8, 1613px 1760px #f8f8f8, 1578px 1306px #f8f8f8, 795px 193px #f8f8f8, 1574px 1667px #f8f8f8, 1374px 49px #f8f8f8, 1301px 1141px #f8f8f8, 1840px 804px #f8f8f8, 829px 1193px #f8f8f8, 1962px 192px #f8f8f8, 86px 1612px #f8f8f8, 1718px 1242px #f8f8f8, 537px 80px #f8f8f8, 138px 379px #f8f8f8, 933px 406px #f8f8f8, 1099px 1098px #f8f8f8, 1836px 469px #f8f8f8, 1446px 1250px #f8f8f8, 236px 107px #f8f8f8, 1555px 470px #f8f8f8, 1691px 418px #f8f8f8, 460px 1465px #f8f8f8, 1476px 835px #f8f8f8, 1125px 1311px #f8f8f8, 644px 229px #f8f8f8, 585px 272px #f8f8f8, 76px 218px #f8f8f8, 801px 1921px #f8f8f8, 1654px 155px #f8f8f8, 640px 178px #f8f8f8, 819px 110px #f8f8f8, 1443px 1416px #f8f8f8, 1477px 650px #f8f8f8, 91px 931px #f8f8f8, 413px 1851px #f8f8f8, 1315px 1391px #f8f8f8, 356px 679px #f8f8f8, 1232px 1176px #f8f8f8, 363px 1469px #f8f8f8, 1947px 1235px #f8f8f8, 1581px 1786px #f8f8f8, 284px 140px #f8f8f8, 812px 1991px #f8f8f8, 107px 1612px #f8f8f8, 1160px 1324px #f8f8f8, 966px 1610px #f8f8f8, 1928px 1685px #f8f8f8, 985px 439px #f8f8f8, 414px 1726px #f8f8f8, 23px 1680px #f8f8f8, 640px 1924px #f8f8f8, 922px 1594px #f8f8f8, 1404px 144px #f8f8f8, 1167px 1462px #f8f8f8, 1410px 1052px #f8f8f8, 590px 443px #f8f8f8, 1334px 1281px #f8f8f8, 217px 1652px #f8f8f8, 265px 1170px #f8f8f8, 148px 336px #f8f8f8, 602px 1602px #f8f8f8, 181px 932px #f8f8f8, 1019px 520px #f8f8f8, 657px 650px #f8f8f8, 419px 971px #f8f8f8, 739px 1725px #f8f8f8, 326px 1791px #f8f8f8, 1443px 679px #f8f8f8, 909px 992px #f8f8f8, 1581px 1123px #f8f8f8, 1732px 1371px #f8f8f8, 1393px 1803px #f8f8f8, 388px 1678px #f8f8f8, 410px 197px #f8f8f8, 572px 1570px #f8f8f8, 688px 921px #f8f8f8, 121px 1000px #f8f8f8, 1237px 1132px #f8f8f8, 1066px 1373px #f8f8f8, 1195px 78px #f8f8f8, 885px 1175px #f8f8f8, 967px 323px #f8f8f8, 286px 981px #f8f8f8, 1370px 638px #f8f8f8, 160px 193px #f8f8f8, 463px 430px #f8f8f8, 145px 84px #f8f8f8, 1326px 48px #f8f8f8, 1421px 1816px #f8f8f8, 476px 181px #f8f8f8, 1006px 811px #f8f8f8, 741px 1585px #f8f8f8, 1611px 1648px #f8f8f8, 1226px 1037px #f8f8f8, 1647px 655px #f8f8f8, 849px 1590px #f8f8f8, 416px 681px #f8f8f8, 1366px 65px #f8f8f8, 1791px 992px #f8f8f8, 1771px 1059px #f8f8f8, 747px 1461px #f8f8f8, 1849px 672px #f8f8f8, 798px 72px #f8f8f8, 744px 1697px #f8f8f8, 1050px 154px #f8f8f8, 1658px 756px #f8f8f8, 69px 785px #f8f8f8, 776px 1736px #f8f8f8, 221px 707px #f8f8f8, 48px 342px #f8f8f8, 1921px 1519px #f8f8f8, 1328px 1173px #f8f8f8, 785px 110px #f8f8f8, 1058px 721px #f8f8f8, 382px 1029px #f8f8f8, 366px 1224px #f8f8f8, 1970px 1897px #f8f8f8, 469px 693px #f8f8f8, 1890px 1434px #f8f8f8, 1276px 785px #f8f8f8, 265px 624px #f8f8f8, 558px 1322px #f8f8f8, 1573px 680px #f8f8f8, 1740px 671px #f8f8f8, 1626px 984px #f8f8f8, 489px 621px #f8f8f8, 1962px 236px #f8f8f8, 1128px 1298px #f8f8f8, 1305px 1831px #f8f8f8, 1562px 564px #f8f8f8, 1595px 45px #f8f8f8, 1141px 415px #f8f8f8, 1901px 1293px #f8f8f8, 401px 226px #f8f8f8, 1027px 234px #f8f8f8, 1334px 1278px #f8f8f8, 794px 1626px #f8f8f8, 694px 810px #f8f8f8, 1245px 493px #f8f8f8, 359px 1797px #f8f8f8, 583px 1582px #f8f8f8, 765px 1287px #f8f8f8, 1355px 691px #f8f8f8, 1369px 718px #f8f8f8, 1883px 1554px #f8f8f8, 17px 723px #f8f8f8, 1461px 708px #f8f8f8, 331px 1244px #f8f8f8, 1875px 780px #f8f8f8, 1782px 1838px #f8f8f8, 1949px 487px #f8f8f8, 1503px 1340px #f8f8f8, 1796px 153px #f8f8f8, 939px 736px #f8f8f8, 114px 1641px #f8f8f8, 1448px 401px #f8f8f8, 1410px 670px #f8f8f8, 1005px 465px #f8f8f8, 381px 1052px #f8f8f8, 76px 1585px #f8f8f8, 1469px 1664px #f8f8f8, 1737px 1715px #f8f8f8, 1950px 1742px #f8f8f8, 1287px 323px #f8f8f8, 492px 1080px #f8f8f8, 1159px 786px #f8f8f8, 498px 1122px #f8f8f8, 725px 1859px #f8f8f8, 1915px 558px #f8f8f8, 1957px 368px #f8f8f8, 475px 1443px #f8f8f8, 1967px 102px #f8f8f8, 323px 437px #f8f8f8, 323px 1004px #f8f8f8, 725px 325px #f8f8f8, 722px 1467px #f8f8f8, 1812px 852px #f8f8f8, 401px 1013px #f8f8f8, 1463px 1076px #f8f8f8, 1482px 444px #f8f8f8, 1562px 1871px #f8f8f8, 1950px 1435px #f8f8f8, 514px 412px #f8f8f8, 1557px 291px #f8f8f8, 321px 474px #f8f8f8, 1140px 66px #f8f8f8, 1940px 981px #f8f8f8, 1320px 1553px #f8f8f8, 56px 1311px #f8f8f8, 1905px 40px #f8f8f8, 1050px 743px #f8f8f8, 1093px 882px #f8f8f8, 508px 769px #f8f8f8, 374px 575px #f8f8f8, 1500px 510px #f8f8f8, 1727px 1971px #f8f8f8, 1185px 1502px #f8f8f8, 65px 1766px #f8f8f8, 2000px 790px #f8f8f8, 1719px 1425px #f8f8f8, 48px 566px #f8f8f8, 586px 554px #f8f8f8, 67px 1787px #f8f8f8, 1209px 1466px #f8f8f8, 1591px 1472px #f8f8f8, 1368px 1597px #f8f8f8, 599px 1080px #f8f8f8, 1802px 866px #f8f8f8, 148px 890px #f8f8f8, 1903px 910px #f8f8f8, 935px 617px #f8f8f8, 1515px 909px #f8f8f8, 1826px 43px #f8f8f8, 620px 236px #f8f8f8, 265px 1896px #f8f8f8, 1247px 1820px #f8f8f8, 774px 428px #f8f8f8, 1785px 1674px #f8f8f8, 1107px 1271px #f8f8f8, 486px 686px #f8f8f8, 944px 94px #f8f8f8, 1383px 1562px #f8f8f8, 104px 937px #f8f8f8, 396px 272px #f8f8f8, 941px 941px #f8f8f8, 657px 375px #f8f8f8, 1830px 805px #f8f8f8, 1076px 1681px #f8f8f8, 1343px 1875px #f8f8f8, 488px 103px #f8f8f8, 1937px 1675px #f8f8f8;
    animation: animStar2 25s linear infinite;
  }

  #stars:after {
    content: " ";
    position: absolute;
    left: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: 817px 197px #f8f8f8, 250px 788px #f8f8f8, 1720px 775px #f8f8f8, 1907px 635px #f8f8f8, 190px 1409px #f8f8f8, 1523px 1165px #f8f8f8, 321px 216px #f8f8f8, 1614px 186px #f8f8f8, 283px 916px #f8f8f8, 1734px 813px #f8f8f8, 269px 515px #f8f8f8, 1641px 574px #f8f8f8, 792px 1669px #f8f8f8, 1161px 1662px #f8f8f8, 687px 434px #f8f8f8, 1466px 262px #f8f8f8, 1614px 1376px #f8f8f8, 488px 761px #f8f8f8, 1079px 1293px #f8f8f8, 1649px 1096px #f8f8f8, 1644px 1516px #f8f8f8, 903px 1316px #f8f8f8, 1533px 927px #f8f8f8, 1159px 113px #f8f8f8, 1531px 1448px #f8f8f8, 775px 1068px #f8f8f8, 906px 1000px #f8f8f8, 611px 933px #f8f8f8, 1703px 399px #f8f8f8, 734px 509px #f8f8f8, 1992px 1919px #f8f8f8, 764px 262px #f8f8f8, 1930px 1959px #f8f8f8, 1355px 638px #f8f8f8, 1654px 1873px #f8f8f8, 1709px 1404px #f8f8f8, 1988px 354px #f8f8f8, 701px 591px #f8f8f8, 347px 1px #f8f8f8, 1485px 1546px #f8f8f8, 395px 834px #f8f8f8, 1005px 1323px #f8f8f8, 1610px 315px #f8f8f8, 1666px 1679px #f8f8f8, 1005px 585px #f8f8f8, 500px 777px #f8f8f8, 1076px 1630px #f8f8f8, 612px 1054px #f8f8f8, 1551px 921px #f8f8f8, 1238px 553px #f8f8f8, 1225px 1533px #f8f8f8, 177px 1633px #f8f8f8, 1464px 971px #f8f8f8, 673px 990px #f8f8f8, 1871px 196px #f8f8f8, 130px 214px #f8f8f8, 1020px 1838px #f8f8f8, 930px 1916px #f8f8f8, 1379px 1608px #f8f8f8, 1274px 997px #f8f8f8, 1340px 796px #f8f8f8, 774px 295px #f8f8f8, 1199px 166px #f8f8f8, 1142px 1870px #f8f8f8, 391px 534px #f8f8f8, 1383px 250px #f8f8f8, 1412px 567px #f8f8f8, 113px 1015px #f8f8f8, 1045px 329px #f8f8f8, 1348px 1177px #f8f8f8, 1903px 623px #f8f8f8, 90px 1990px #f8f8f8, 1395px 150px #f8f8f8, 904px 907px #f8f8f8, 965px 491px #f8f8f8, 1814px 349px #f8f8f8, 1730px 1886px #f8f8f8, 1050px 930px #f8f8f8, 1315px 1460px #f8f8f8, 1269px 789px #f8f8f8, 257px 1009px #f8f8f8, 1303px 567px #f8f8f8, 1300px 713px #f8f8f8, 1210px 1007px #f8f8f8, 258px 1621px #f8f8f8, 1495px 1347px #f8f8f8, 1097px 1691px #f8f8f8, 977px 1226px #f8f8f8, 1360px 822px #f8f8f8, 24px 1250px #f8f8f8, 392px 1261px #f8f8f8, 149px 476px #f8f8f8, 623px 1590px #f8f8f8, 715px 229px #f8f8f8, 997px 573px #f8f8f8, 1754px 579px #f8f8f8, 641px 651px #f8f8f8, 453px 595px #f8f8f8, 433px 939px #f8f8f8, 87px 783px #f8f8f8, 1919px 1928px #f8f8f8, 1482px 578px #f8f8f8, 1985px 1883px #f8f8f8, 210px 612px #f8f8f8, 1120px 343px #f8f8f8, 1745px 1138px #f8f8f8, 986px 1218px #f8f8f8, 1790px 533px #f8f8f8, 13px 1991px #f8f8f8, 1454px 1744px #f8f8f8, 373px 1767px #f8f8f8, 100px 283px #f8f8f8, 342px 1483px #f8f8f8, 1235px 242px #f8f8f8, 813px 1362px #f8f8f8, 745px 50px #f8f8f8, 1075px 748px #f8f8f8, 254px 339px #f8f8f8, 1445px 1144px #f8f8f8, 1850px 263px #f8f8f8, 1742px 1175px #f8f8f8, 1873px 257px #f8f8f8, 1702px 969px #f8f8f8, 1377px 252px #f8f8f8, 463px 1685px #f8f8f8, 322px 714px #f8f8f8, 1411px 1825px #f8f8f8, 1212px 555px #f8f8f8, 759px 90px #f8f8f8, 1004px 726px #f8f8f8, 1410px 1091px #f8f8f8, 229px 524px #f8f8f8, 824px 137px #f8f8f8, 504px 1357px #f8f8f8, 950px 740px #f8f8f8, 304px 87px #f8f8f8, 853px 1429px #f8f8f8, 572px 275px #f8f8f8, 1722px 480px #f8f8f8, 1267px 248px #f8f8f8, 1759px 1048px #f8f8f8, 306px 414px #f8f8f8, 1489px 1837px #f8f8f8, 1889px 885px #f8f8f8, 1793px 1089px #f8f8f8, 883px 1499px #f8f8f8, 532px 1359px #f8f8f8, 538px 205px #f8f8f8, 463px 1924px #f8f8f8, 614px 1872px #f8f8f8, 1973px 5px #f8f8f8, 197px 572px #f8f8f8, 1622px 185px #f8f8f8, 847px 1361px #f8f8f8, 1616px 1218px #f8f8f8, 1702px 291px #f8f8f8, 1619px 1345px #f8f8f8, 384px 1625px #f8f8f8, 548px 1729px #f8f8f8, 853px 133px #f8f8f8, 897px 87px #f8f8f8, 1409px 862px #f8f8f8, 1904px 705px #f8f8f8, 1369px 52px #f8f8f8, 1887px 134px #f8f8f8, 1050px 1470px #f8f8f8, 350px 1783px #f8f8f8, 958px 351px #f8f8f8, 1199px 216px #f8f8f8, 997px 1181px #f8f8f8, 1673px 1921px #f8f8f8, 741px 45px #f8f8f8, 1296px 1312px #f8f8f8, 229px 749px #f8f8f8, 1221px 897px #f8f8f8, 1211px 137px #f8f8f8, 693px 917px #f8f8f8, 498px 587px #f8f8f8, 146px 945px #f8f8f8, 928px 112px #f8f8f8, 508px 1596px #f8f8f8, 230px 1953px #f8f8f8, 955px 1231px #f8f8f8, 119px 319px #f8f8f8, 495px 320px #f8f8f8, 1271px 792px #f8f8f8, 1901px 945px #f8f8f8, 378px 1375px #f8f8f8, 1658px 4px #f8f8f8, 557px 1311px #f8f8f8, 621px 887px #f8f8f8, 1606px 1937px #f8f8f8, 42px 693px #f8f8f8, 9px 774px #f8f8f8, 1558px 1989px #f8f8f8, 625px 903px #f8f8f8, 751px 762px #f8f8f8, 1178px 689px #f8f8f8, 1201px 101px #f8f8f8, 137px 446px #f8f8f8, 101px 1030px #f8f8f8, 1768px 819px #f8f8f8, 1388px 49px #f8f8f8, 1721px 817px #f8f8f8, 376px 1388px #f8f8f8, 119px 1972px #f8f8f8, 162px 1126px #f8f8f8, 332px 606px #f8f8f8, 518px 429px #f8f8f8, 873px 112px #f8f8f8, 1852px 69px #f8f8f8, 799px 1016px #f8f8f8, 1599px 1314px #f8f8f8, 1075px 1220px #f8f8f8, 365px 1275px #f8f8f8, 1494px 967px #f8f8f8, 1922px 1725px #f8f8f8, 1688px 1934px #f8f8f8, 680px 736px #f8f8f8, 690px 682px #f8f8f8, 1985px 977px #f8f8f8, 449px 601px #f8f8f8, 390px 1551px #f8f8f8, 1992px 953px #f8f8f8, 1474px 1501px #f8f8f8, 1269px 673px #f8f8f8, 813px 124px #f8f8f8, 1850px 311px #f8f8f8, 248px 1756px #f8f8f8, 601px 668px #f8f8f8, 232px 1660px #f8f8f8, 1398px 1983px #f8f8f8, 373px 950px #f8f8f8, 1711px 1132px #f8f8f8, 1338px 489px #f8f8f8, 922px 1572px #f8f8f8, 1363px 1037px #f8f8f8, 1696px 926px #f8f8f8, 348px 702px #f8f8f8, 1006px 1682px #f8f8f8, 742px 1598px #f8f8f8, 1769px 1501px #f8f8f8, 1643px 1911px #f8f8f8, 1781px 1327px #f8f8f8, 1155px 1382px #f8f8f8, 86px 1937px #f8f8f8, 1481px 1031px #f8f8f8, 1427px 559px #f8f8f8, 1931px 652px #f8f8f8, 1544px 357px #f8f8f8, 1624px 192px #f8f8f8, 1925px 413px #f8f8f8, 1757px 288px #f8f8f8, 1310px 1826px #f8f8f8, 609px 175px #f8f8f8, 1502px 1629px #f8f8f8, 1535px 854px #f8f8f8, 536px 813px #f8f8f8, 829px 29px #f8f8f8, 1334px 412px #f8f8f8, 524px 498px #f8f8f8, 1140px 1593px #f8f8f8, 1241px 1490px #f8f8f8, 868px 1144px #f8f8f8, 777px 1090px #f8f8f8, 365px 30px #f8f8f8, 499px 1564px #f8f8f8, 887px 935px #f8f8f8, 982px 1406px #f8f8f8, 155px 1524px #f8f8f8, 1861px 1609px #f8f8f8, 1117px 1518px #f8f8f8, 1240px 933px #f8f8f8, 1720px 1270px #f8f8f8, 1457px 169px #f8f8f8, 1849px 709px #f8f8f8, 386px 1617px #f8f8f8, 1259px 222px #f8f8f8, 996px 1836px #f8f8f8, 1194px 1599px #f8f8f8, 1483px 590px #f8f8f8, 887px 1739px #f8f8f8, 1234px 825px #f8f8f8, 648px 442px #f8f8f8, 1787px 591px #f8f8f8, 1818px 783px #f8f8f8, 681px 994px #f8f8f8, 768px 1062px #f8f8f8, 1857px 1744px #f8f8f8, 1864px 492px #f8f8f8, 147px 236px #f8f8f8, 241px 519px #f8f8f8, 440px 1845px #f8f8f8, 760px 746px #f8f8f8, 281px 960px #f8f8f8, 1628px 1267px #f8f8f8, 1470px 1592px #f8f8f8, 164px 199px #f8f8f8, 1387px 1618px #f8f8f8, 1392px 1862px #f8f8f8, 764px 1560px #f8f8f8, 72px 1955px #f8f8f8, 63px 1777px #f8f8f8, 1051px 1744px #f8f8f8, 1264px 286px #f8f8f8, 1088px 830px #f8f8f8, 1985px 85px #f8f8f8, 836px 430px #f8f8f8, 709px 1392px #f8f8f8, 1549px 1812px #f8f8f8, 712px 232px #f8f8f8, 1587px 554px #f8f8f8, 123px 661px #f8f8f8, 513px 815px #f8f8f8, 359px 1854px #f8f8f8, 1670px 837px #f8f8f8, 1638px 870px #f8f8f8, 983px 1747px #f8f8f8, 1728px 210px #f8f8f8, 152px 1851px #f8f8f8, 663px 1822px #f8f8f8, 706px 139px #f8f8f8, 306px 619px #f8f8f8, 578px 1875px #f8f8f8, 1246px 207px #f8f8f8, 450px 1615px #f8f8f8, 332px 623px #f8f8f8, 1598px 1534px #f8f8f8, 1198px 237px #f8f8f8, 1465px 94px #f8f8f8, 800px 870px #f8f8f8, 1409px 381px #f8f8f8, 662px 826px #f8f8f8, 1516px 1338px #f8f8f8, 1082px 218px #f8f8f8, 691px 516px #f8f8f8, 1502px 1719px #f8f8f8, 898px 816px #f8f8f8, 192px 1059px #f8f8f8, 652px 1827px #f8f8f8, 418px 1748px #f8f8f8, 1924px 696px #f8f8f8, 63px 235px #f8f8f8, 688px 18px #f8f8f8, 945px 1758px #f8f8f8, 1731px 1855px #f8f8f8, 681px 761px #f8f8f8, 1551px 721px #f8f8f8, 483px 734px #f8f8f8, 527px 1159px #f8f8f8, 27px 458px #f8f8f8, 1648px 1422px #f8f8f8, 1251px 1482px #f8f8f8, 917px 383px #f8f8f8, 428px 298px #f8f8f8, 103px 558px #f8f8f8, 797px 1453px #f8f8f8, 1549px 1988px #f8f8f8, 33px 211px #f8f8f8, 1321px 347px #f8f8f8, 1404px 1423px #f8f8f8, 517px 834px #f8f8f8, 5px 1943px #f8f8f8, 1346px 1129px #f8f8f8, 215px 1897px #f8f8f8, 1648px 1553px #f8f8f8, 505px 786px #f8f8f8, 1461px 72px #f8f8f8, 1694px 394px #f8f8f8, 1679px 1357px #f8f8f8, 72px 1111px #f8f8f8, 1442px 902px #f8f8f8, 171px 711px #f8f8f8, 443px 1750px #f8f8f8, 939px 364px #f8f8f8, 60px 1340px #f8f8f8, 306px 106px #f8f8f8, 134px 340px #f8f8f8, 873px 606px #f8f8f8, 76px 713px #f8f8f8, 1118px 585px #f8f8f8, 548px 586px #f8f8f8, 1679px 28px #f8f8f8, 1774px 1277px #f8f8f8, 1762px 602px #f8f8f8, 641px 954px #f8f8f8, 1937px 104px #f8f8f8, 293px 1px #f8f8f8, 1644px 551px #f8f8f8, 235px 1984px #f8f8f8, 949px 937px #f8f8f8, 411px 1419px #f8f8f8, 500px 694px #f8f8f8, 168px 690px #f8f8f8, 1816px 856px #f8f8f8, 1091px 747px #f8f8f8, 1216px 199px #f8f8f8, 695px 1622px #f8f8f8, 339px 1441px #f8f8f8, 1076px 792px #f8f8f8, 310px 277px #f8f8f8, 736px 977px #f8f8f8, 28px 1601px #f8f8f8, 471px 1331px #f8f8f8, 1425px 851px #f8f8f8, 1169px 607px #f8f8f8, 1105px 1471px #f8f8f8, 628px 1664px #f8f8f8, 27px 301px #f8f8f8, 1530px 1939px #f8f8f8, 1016px 1425px #f8f8f8, 841px 1341px #f8f8f8, 663px 628px #f8f8f8, 231px 809px #f8f8f8, 1806px 1228px #f8f8f8, 1089px 1714px #f8f8f8, 1160px 354px #f8f8f8, 1718px 1280px #f8f8f8, 251px 607px #f8f8f8, 787px 1665px #f8f8f8, 540px 109px #f8f8f8, 138px 1221px #f8f8f8, 1841px 665px #f8f8f8, 442px 232px #f8f8f8, 1445px 635px #f8f8f8, 1636px 323px #f8f8f8, 1201px 864px #f8f8f8, 269px 1588px #f8f8f8, 526px 1508px #f8f8f8, 99px 1385px #f8f8f8, 1385px 300px #f8f8f8, 670px 162px #f8f8f8, 120px 1693px #f8f8f8, 202px 1255px #f8f8f8, 1093px 1636px #f8f8f8, 804px 1291px #f8f8f8, 697px 948px #f8f8f8, 783px 788px #f8f8f8, 1967px 591px #f8f8f8, 130px 423px #f8f8f8, 1332px 319px #f8f8f8, 580px 1679px #f8f8f8, 1665px 1314px #f8f8f8, 1511px 726px #f8f8f8, 1370px 811px #f8f8f8, 1387px 1263px #f8f8f8, 1459px 1446px #f8f8f8, 461px 1035px #f8f8f8, 1327px 475px #f8f8f8, 651px 834px #f8f8f8, 1891px 1476px #f8f8f8, 1439px 114px #f8f8f8, 165px 1257px #f8f8f8, 389px 745px #f8f8f8, 1042px 394px #f8f8f8, 483px 1995px #f8f8f8, 269px 794px #f8f8f8, 1374px 1747px #f8f8f8, 1342px 431px #f8f8f8, 1577px 1041px #f8f8f8, 929px 1549px #f8f8f8, 140px 493px #f8f8f8, 1758px 1374px #f8f8f8, 1042px 211px #f8f8f8, 956px 936px #f8f8f8, 1976px 265px #f8f8f8, 1548px 1880px #f8f8f8, 1755px 610px #f8f8f8, 1337px 443px #f8f8f8, 173px 1785px #f8f8f8, 1613px 1760px #f8f8f8, 1578px 1306px #f8f8f8, 795px 193px #f8f8f8, 1574px 1667px #f8f8f8, 1374px 49px #f8f8f8, 1301px 1141px #f8f8f8, 1840px 804px #f8f8f8, 829px 1193px #f8f8f8, 1962px 192px #f8f8f8, 86px 1612px #f8f8f8, 1718px 1242px #f8f8f8, 537px 80px #f8f8f8, 138px 379px #f8f8f8, 933px 406px #f8f8f8, 1099px 1098px #f8f8f8, 1836px 469px #f8f8f8, 1446px 1250px #f8f8f8, 236px 107px #f8f8f8, 1555px 470px #f8f8f8, 1691px 418px #f8f8f8, 460px 1465px #f8f8f8, 1476px 835px #f8f8f8, 1125px 1311px #f8f8f8, 644px 229px #f8f8f8, 585px 272px #f8f8f8, 76px 218px #f8f8f8, 801px 1921px #f8f8f8, 1654px 155px #f8f8f8, 640px 178px #f8f8f8, 819px 110px #f8f8f8, 1443px 1416px #f8f8f8, 1477px 650px #f8f8f8, 91px 931px #f8f8f8, 413px 1851px #f8f8f8, 1315px 1391px #f8f8f8, 356px 679px #f8f8f8, 1232px 1176px #f8f8f8, 363px 1469px #f8f8f8, 1947px 1235px #f8f8f8, 1581px 1786px #f8f8f8, 284px 140px #f8f8f8, 812px 1991px #f8f8f8, 107px 1612px #f8f8f8, 1160px 1324px #f8f8f8, 966px 1610px #f8f8f8, 1928px 1685px #f8f8f8, 985px 439px #f8f8f8, 414px 1726px #f8f8f8, 23px 1680px #f8f8f8, 640px 1924px #f8f8f8, 922px 1594px #f8f8f8, 1404px 144px #f8f8f8, 1167px 1462px #f8f8f8, 1410px 1052px #f8f8f8, 590px 443px #f8f8f8, 1334px 1281px #f8f8f8, 217px 1652px #f8f8f8, 265px 1170px #f8f8f8, 148px 336px #f8f8f8, 602px 1602px #f8f8f8, 181px 932px #f8f8f8, 1019px 520px #f8f8f8, 657px 650px #f8f8f8, 419px 971px #f8f8f8, 739px 1725px #f8f8f8, 326px 1791px #f8f8f8, 1443px 679px #f8f8f8, 909px 992px #f8f8f8, 1581px 1123px #f8f8f8, 1732px 1371px #f8f8f8, 1393px 1803px #f8f8f8, 388px 1678px #f8f8f8, 410px 197px #f8f8f8, 572px 1570px #f8f8f8, 688px 921px #f8f8f8, 121px 1000px #f8f8f8, 1237px 1132px #f8f8f8, 1066px 1373px #f8f8f8, 1195px 78px #f8f8f8, 885px 1175px #f8f8f8, 967px 323px #f8f8f8, 286px 981px #f8f8f8, 1370px 638px #f8f8f8, 160px 193px #f8f8f8, 463px 430px #f8f8f8, 145px 84px #f8f8f8, 1326px 48px #f8f8f8, 1421px 1816px #f8f8f8, 476px 181px #f8f8f8, 1006px 811px #f8f8f8, 741px 1585px #f8f8f8, 1611px 1648px #f8f8f8, 1226px 1037px #f8f8f8, 1647px 655px #f8f8f8, 849px 1590px #f8f8f8, 416px 681px #f8f8f8, 1366px 65px #f8f8f8, 1791px 992px #f8f8f8, 1771px 1059px #f8f8f8, 747px 1461px #f8f8f8, 1849px 672px #f8f8f8, 798px 72px #f8f8f8, 744px 1697px #f8f8f8, 1050px 154px #f8f8f8, 1658px 756px #f8f8f8, 69px 785px #f8f8f8, 776px 1736px #f8f8f8, 221px 707px #f8f8f8, 48px 342px #f8f8f8, 1921px 1519px #f8f8f8, 1328px 1173px #f8f8f8, 785px 110px #f8f8f8, 1058px 721px #f8f8f8, 382px 1029px #f8f8f8, 366px 1224px #f8f8f8, 1970px 1897px #f8f8f8, 469px 693px #f8f8f8, 1890px 1434px #f8f8f8, 1276px 785px #f8f8f8, 265px 624px #f8f8f8, 558px 1322px #f8f8f8, 1573px 680px #f8f8f8, 1740px 671px #f8f8f8, 1626px 984px #f8f8f8, 489px 621px #f8f8f8, 1962px 236px #f8f8f8, 1128px 1298px #f8f8f8, 1305px 1831px #f8f8f8, 1562px 564px #f8f8f8, 1595px 45px #f8f8f8, 1141px 415px #f8f8f8, 1901px 1293px #f8f8f8, 401px 226px #f8f8f8, 1027px 234px #f8f8f8, 1334px 1278px #f8f8f8, 794px 1626px #f8f8f8, 694px 810px #f8f8f8, 1245px 493px #f8f8f8, 359px 1797px #f8f8f8, 583px 1582px #f8f8f8, 765px 1287px #f8f8f8, 1355px 691px #f8f8f8, 1369px 718px #f8f8f8, 1883px 1554px #f8f8f8, 17px 723px #f8f8f8, 1461px 708px #f8f8f8, 331px 1244px #f8f8f8, 1875px 780px #f8f8f8, 1782px 1838px #f8f8f8, 1949px 487px #f8f8f8, 1503px 1340px #f8f8f8, 1796px 153px #f8f8f8, 939px 736px #f8f8f8, 114px 1641px #f8f8f8, 1448px 401px #f8f8f8, 1410px 670px #f8f8f8, 1005px 465px #f8f8f8, 381px 1052px #f8f8f8, 76px 1585px #f8f8f8, 1469px 1664px #f8f8f8, 1737px 1715px #f8f8f8, 1950px 1742px #f8f8f8, 1287px 323px #f8f8f8, 492px 1080px #f8f8f8, 1159px 786px #f8f8f8, 498px 1122px #f8f8f8, 725px 1859px #f8f8f8, 1915px 558px #f8f8f8, 1957px 368px #f8f8f8, 475px 1443px #f8f8f8, 1967px 102px #f8f8f8, 323px 437px #f8f8f8, 323px 1004px #f8f8f8, 725px 325px #f8f8f8, 722px 1467px #f8f8f8, 1812px 852px #f8f8f8, 401px 1013px #f8f8f8, 1463px 1076px #f8f8f8, 1482px 444px #f8f8f8, 1562px 1871px #f8f8f8, 1950px 1435px #f8f8f8, 514px 412px #f8f8f8, 1557px 291px #f8f8f8, 321px 474px #f8f8f8, 1140px 66px #f8f8f8, 1940px 981px #f8f8f8, 1320px 1553px #f8f8f8, 56px 1311px #f8f8f8, 1905px 40px #f8f8f8, 1050px 743px #f8f8f8, 1093px 882px #f8f8f8, 508px 769px #f8f8f8, 374px 575px #f8f8f8, 1500px 510px #f8f8f8, 1727px 1971px #f8f8f8, 1185px 1502px #f8f8f8, 65px 1766px #f8f8f8, 2000px 790px #f8f8f8, 1719px 1425px #f8f8f8, 48px 566px #f8f8f8, 586px 554px #f8f8f8, 67px 1787px #f8f8f8, 1209px 1466px #f8f8f8, 1591px 1472px #f8f8f8, 1368px 1597px #f8f8f8, 599px 1080px #f8f8f8, 1802px 866px #f8f8f8, 148px 890px #f8f8f8, 1903px 910px #f8f8f8, 935px 617px #f8f8f8, 1515px 909px #f8f8f8, 1826px 43px #f8f8f8, 620px 236px #f8f8f8, 265px 1896px #f8f8f8, 1247px 1820px #f8f8f8, 774px 428px #f8f8f8, 1785px 1674px #f8f8f8, 1107px 1271px #f8f8f8, 486px 686px #f8f8f8, 944px 94px #f8f8f8, 1383px 1562px #f8f8f8, 104px 937px #f8f8f8, 396px 272px #f8f8f8, 941px 941px #f8f8f8, 657px 375px #f8f8f8, 1830px 805px #f8f8f8, 1076px 1681px #f8f8f8, 1343px 1875px #f8f8f8, 488px 103px #f8f8f8, 1937px 1675px #f8f8f8;
  }

  #stars2 {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: 886px 267px #f8f8f8, 989px 1388px #f8f8f8, 1243px 90px #f8f8f8, 410px 268px #f8f8f8, 320px 400px #f8f8f8, 154px 858px #f8f8f8, 183px 478px #f8f8f8, 377px 121px #f8f8f8, 397px 1443px #f8f8f8, 1654px 826px #f8f8f8, 1947px 221px #f8f8f8, 1178px 1933px #f8f8f8, 298px 283px #f8f8f8, 894px 98px #f8f8f8, 1382px 465px #f8f8f8, 1814px 1105px #f8f8f8, 992px 40px #f8f8f8, 346px 554px #f8f8f8, 1397px 714px #f8f8f8, 1775px 1098px #f8f8f8, 960px 101px #f8f8f8, 1469px 870px #f8f8f8, 1059px 1241px #f8f8f8, 899px 1866px #f8f8f8, 957px 238px #f8f8f8, 1283px 1806px #f8f8f8, 833px 1761px #f8f8f8, 1850px 250px #f8f8f8, 962px 321px #f8f8f8, 1017px 871px #f8f8f8, 1133px 228px #f8f8f8, 68px 1565px #f8f8f8, 1697px 1320px #f8f8f8, 1138px 1730px #f8f8f8, 1237px 1527px #f8f8f8, 278px 1418px #f8f8f8, 235px 376px #f8f8f8, 758px 1627px #f8f8f8, 1979px 1629px #f8f8f8, 1740px 175px #f8f8f8, 114px 753px #f8f8f8, 1730px 162px #f8f8f8, 181px 700px #f8f8f8, 860px 1441px #f8f8f8, 468px 52px #f8f8f8, 1031px 1573px #f8f8f8, 1482px 441px #f8f8f8, 482px 1656px #f8f8f8, 1009px 1808px #f8f8f8, 279px 1858px #f8f8f8, 1940px 1262px #f8f8f8, 1992px 1069px #f8f8f8, 1436px 1622px #f8f8f8, 980px 1881px #f8f8f8, 1134px 1473px #f8f8f8, 773px 523px #f8f8f8, 151px 256px #f8f8f8, 817px 1789px #f8f8f8, 585px 675px #f8f8f8, 1130px 280px #f8f8f8, 409px 668px #f8f8f8, 892px 496px #f8f8f8, 100px 34px #f8f8f8, 1694px 1827px #f8f8f8, 1257px 1496px #f8f8f8, 809px 155px #f8f8f8, 361px 699px #f8f8f8, 1294px 256px #f8f8f8, 1947px 1176px #f8f8f8, 530px 1619px #f8f8f8, 85px 140px #f8f8f8, 1600px 1228px #f8f8f8, 1159px 1156px #f8f8f8, 1442px 905px #f8f8f8, 558px 562px #f8f8f8, 1185px 1513px #f8f8f8, 380px 1754px #f8f8f8, 290px 177px #f8f8f8, 76px 480px #f8f8f8, 1050px 1970px #f8f8f8, 1676px 1855px #f8f8f8, 365px 430px #f8f8f8, 1226px 740px #f8f8f8, 1700px 1205px #f8f8f8, 191px 1589px #f8f8f8, 1897px 125px #f8f8f8, 1276px 1171px #f8f8f8, 1210px 1148px #f8f8f8, 1931px 1506px #f8f8f8, 1392px 1601px #f8f8f8, 1805px 1105px #f8f8f8, 1134px 1989px #f8f8f8, 1112px 1508px #f8f8f8, 717px 141px #f8f8f8, 1356px 348px #f8f8f8, 692px 950px #f8f8f8, 1166px 476px #f8f8f8, 482px 1500px #f8f8f8, 94px 878px #f8f8f8, 1648px 414px #f8f8f8, 1206px 1689px #f8f8f8, 1349px 468px #f8f8f8, 112px 1728px #f8f8f8, 1630px 1685px #f8f8f8, 1825px 1489px #f8f8f8, 1466px 1127px #f8f8f8, 1821px 437px #f8f8f8, 232px 638px #f8f8f8, 285px 319px #f8f8f8, 161px 1298px #f8f8f8, 1947px 1490px #f8f8f8, 833px 313px #f8f8f8, 1810px 1696px #f8f8f8, 1183px 1179px #f8f8f8, 1544px 449px #f8f8f8, 1230px 103px #f8f8f8, 251px 617px #f8f8f8, 287px 799px #f8f8f8, 1364px 1664px #f8f8f8, 274px 866px #f8f8f8, 203px 883px #f8f8f8, 1347px 1837px #f8f8f8, 76px 1076px #f8f8f8, 1132px 1065px #f8f8f8, 200px 1312px #f8f8f8, 1844px 1430px #f8f8f8, 28px 1040px #f8f8f8, 1777px 1646px #f8f8f8, 1716px 65px #f8f8f8, 160px 541px #f8f8f8, 1465px 872px #f8f8f8, 1563px 684px #f8f8f8, 1217px 719px #f8f8f8, 1567px 1539px #f8f8f8, 1977px 391px #f8f8f8, 1901px 592px #f8f8f8, 1029px 306px #f8f8f8, 1276px 1823px #f8f8f8, 293px 1391px #f8f8f8, 1857px 732px #f8f8f8, 1735px 866px #f8f8f8, 1446px 713px #f8f8f8, 732px 1248px #f8f8f8, 1986px 428px #f8f8f8, 1036px 1228px #f8f8f8, 803px 881px #f8f8f8, 1958px 1857px #f8f8f8, 831px 1532px #f8f8f8, 1707px 779px #f8f8f8, 1453px 934px #f8f8f8, 1540px 1038px #f8f8f8, 1502px 205px #f8f8f8, 1904px 1090px #f8f8f8, 180px 1889px #f8f8f8, 199px 1304px #f8f8f8, 876px 480px #f8f8f8, 1565px 358px #f8f8f8, 1549px 1921px #f8f8f8, 988px 1137px #f8f8f8, 245px 1826px #f8f8f8, 524px 13px #f8f8f8, 1179px 1994px #f8f8f8, 1855px 1387px #f8f8f8, 1106px 170px #f8f8f8, 1290px 108px #f8f8f8, 1756px 1777px #f8f8f8, 729px 1841px #f8f8f8, 1171px 1540px #f8f8f8, 1681px 1297px #f8f8f8, 55px 1097px #f8f8f8, 1418px 1469px #f8f8f8, 1322px 939px #f8f8f8, 97px 842px #f8f8f8, 1220px 557px #f8f8f8, 170px 569px #f8f8f8, 1782px 1169px #f8f8f8, 1006px 1098px #f8f8f8, 932px 1444px #f8f8f8, 308px 937px #f8f8f8, 541px 236px #f8f8f8, 967px 1024px #f8f8f8, 791px 671px #f8f8f8, 65px 378px #f8f8f8, 586px 843px #f8f8f8, 114px 1834px #f8f8f8, 871px 922px #f8f8f8, 876px 1029px #f8f8f8, 353px 1857px #f8f8f8, 976px 1867px #f8f8f8, 1064px 1386px #f8f8f8, 1564px 80px #f8f8f8, 1739px 57px #f8f8f8, 1604px 1450px #f8f8f8, 1675px 1138px #f8f8f8, 879px 1219px #f8f8f8, 7px 1635px #f8f8f8, 651px 1780px #f8f8f8, 1769px 286px #f8f8f8, 1871px 87px #f8f8f8, 570px 340px #f8f8f8;
    animation: animStar2 50s linear infinite;
  }

  #stars2:after {
    content: " ";
    position: absolute;
    left: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: 886px 267px #f8f8f8, 989px 1388px #f8f8f8, 1243px 90px #f8f8f8, 410px 268px #f8f8f8, 320px 400px #f8f8f8, 154px 858px #f8f8f8, 183px 478px #f8f8f8, 377px 121px #f8f8f8, 397px 1443px #f8f8f8, 1654px 826px #f8f8f8, 1947px 221px #f8f8f8, 1178px 1933px #f8f8f8, 298px 283px #f8f8f8, 894px 98px #f8f8f8, 1382px 465px #f8f8f8, 1814px 1105px #f8f8f8, 992px 40px #f8f8f8, 346px 554px #f8f8f8, 1397px 714px #f8f8f8, 1775px 1098px #f8f8f8, 960px 101px #f8f8f8, 1469px 870px #f8f8f8, 1059px 1241px #f8f8f8, 899px 1866px #f8f8f8, 957px 238px #f8f8f8, 1283px 1806px #f8f8f8, 833px 1761px #f8f8f8, 1850px 250px #f8f8f8, 962px 321px #f8f8f8, 1017px 871px #f8f8f8, 1133px 228px #f8f8f8, 68px 1565px #f8f8f8, 1697px 1320px #f8f8f8, 1138px 1730px #f8f8f8, 1237px 1527px #f8f8f8, 278px 1418px #f8f8f8, 235px 376px #f8f8f8, 758px 1627px #f8f8f8, 1979px 1629px #f8f8f8, 1740px 175px #f8f8f8, 114px 753px #f8f8f8, 1730px 162px #f8f8f8, 181px 700px #f8f8f8, 860px 1441px #f8f8f8, 468px 52px #f8f8f8, 1031px 1573px #f8f8f8, 1482px 441px #f8f8f8, 482px 1656px #f8f8f8, 1009px 1808px #f8f8f8, 279px 1858px #f8f8f8, 1940px 1262px #f8f8f8, 1992px 1069px #f8f8f8, 1436px 1622px #f8f8f8, 980px 1881px #f8f8f8, 1134px 1473px #f8f8f8, 773px 523px #f8f8f8, 151px 256px #f8f8f8, 817px 1789px #f8f8f8, 585px 675px #f8f8f8, 1130px 280px #f8f8f8, 409px 668px #f8f8f8, 892px 496px #f8f8f8, 100px 34px #f8f8f8, 1694px 1827px #f8f8f8, 1257px 1496px #f8f8f8, 809px 155px #f8f8f8, 361px 699px #f8f8f8, 1294px 256px #f8f8f8, 1947px 1176px #f8f8f8, 530px 1619px #f8f8f8, 85px 140px #f8f8f8, 1600px 1228px #f8f8f8, 1159px 1156px #f8f8f8, 1442px 905px #f8f8f8, 558px 562px #f8f8f8, 1185px 1513px #f8f8f8, 380px 1754px #f8f8f8, 290px 177px #f8f8f8, 76px 480px #f8f8f8, 1050px 1970px #f8f8f8, 1676px 1855px #f8f8f8, 365px 430px #f8f8f8, 1226px 740px #f8f8f8, 1700px 1205px #f8f8f8, 191px 1589px #f8f8f8, 1897px 125px #f8f8f8, 1276px 1171px #f8f8f8, 1210px 1148px #f8f8f8, 1931px 1506px #f8f8f8, 1392px 1601px #f8f8f8, 1805px 1105px #f8f8f8, 1134px 1989px #f8f8f8, 1112px 1508px #f8f8f8, 717px 141px #f8f8f8, 1356px 348px #f8f8f8, 692px 950px #f8f8f8, 1166px 476px #f8f8f8, 482px 1500px #f8f8f8, 94px 878px #f8f8f8, 1648px 414px #f8f8f8, 1206px 1689px #f8f8f8, 1349px 468px #f8f8f8, 112px 1728px #f8f8f8, 1630px 1685px #f8f8f8, 1825px 1489px #f8f8f8, 1466px 1127px #f8f8f8, 1821px 437px #f8f8f8, 232px 638px #f8f8f8, 285px 319px #f8f8f8, 161px 1298px #f8f8f8, 1947px 1490px #f8f8f8, 833px 313px #f8f8f8, 1810px 1696px #f8f8f8, 1183px 1179px #f8f8f8, 1544px 449px #f8f8f8, 1230px 103px #f8f8f8, 251px 617px #f8f8f8, 287px 799px #f8f8f8, 1364px 1664px #f8f8f8, 274px 866px #f8f8f8, 203px 883px #f8f8f8, 1347px 1837px #f8f8f8, 76px 1076px #f8f8f8, 1132px 1065px #f8f8f8, 200px 1312px #f8f8f8, 1844px 1430px #f8f8f8, 28px 1040px #f8f8f8, 1777px 1646px #f8f8f8, 1716px 65px #f8f8f8, 160px 541px #f8f8f8, 1465px 872px #f8f8f8, 1563px 684px #f8f8f8, 1217px 719px #f8f8f8, 1567px 1539px #f8f8f8, 1977px 391px #f8f8f8, 1901px 592px #f8f8f8, 1029px 306px #f8f8f8, 1276px 1823px #f8f8f8, 293px 1391px #f8f8f8, 1857px 732px #f8f8f8, 1735px 866px #f8f8f8, 1446px 713px #f8f8f8, 732px 1248px #f8f8f8, 1986px 428px #f8f8f8, 1036px 1228px #f8f8f8, 803px 881px #f8f8f8, 1958px 1857px #f8f8f8, 831px 1532px #f8f8f8, 1707px 779px #f8f8f8, 1453px 934px #f8f8f8, 1540px 1038px #f8f8f8, 1502px 205px #f8f8f8, 1904px 1090px #f8f8f8, 180px 1889px #f8f8f8, 199px 1304px #f8f8f8, 876px 480px #f8f8f8, 1565px 358px #f8f8f8, 1549px 1921px #f8f8f8, 988px 1137px #f8f8f8, 245px 1826px #f8f8f8, 524px 13px #f8f8f8, 1179px 1994px #f8f8f8, 1855px 1387px #f8f8f8, 1106px 170px #f8f8f8, 1290px 108px #f8f8f8, 1756px 1777px #f8f8f8, 729px 1841px #f8f8f8, 1171px 1540px #f8f8f8, 1681px 1297px #f8f8f8, 55px 1097px #f8f8f8, 1418px 1469px #f8f8f8, 1322px 939px #f8f8f8, 97px 842px #f8f8f8, 1220px 557px #f8f8f8, 170px 569px #f8f8f8, 1782px 1169px #f8f8f8, 1006px 1098px #f8f8f8, 932px 1444px #f8f8f8, 308px 937px #f8f8f8, 541px 236px #f8f8f8, 967px 1024px #f8f8f8, 791px 671px #f8f8f8, 65px 378px #f8f8f8, 586px 843px #f8f8f8, 114px 1834px #f8f8f8, 871px 922px #f8f8f8, 876px 1029px #f8f8f8, 353px 1857px #f8f8f8, 976px 1867px #f8f8f8, 1064px 1386px #f8f8f8, 1564px 80px #f8f8f8, 1739px 57px #f8f8f8, 1604px 1450px #f8f8f8, 1675px 1138px #f8f8f8, 879px 1219px #f8f8f8, 7px 1635px #f8f8f8, 651px 1780px #f8f8f8, 1769px 286px #f8f8f8, 1871px 87px #f8f8f8, 570px 340px #f8f8f8;
  }

  #stars3 {
    width: 4px;
    height: 4px;
    background: transparent;
    box-shadow: 1188px 989px #f8f8f8, 962px 269px #f8f8f8, 1826px 1894px #f8f8f8, 247px 675px #f8f8f8, 396px 1444px #f8f8f8, 1215px 388px #f8f8f8, 1616px 964px #f8f8f8, 1821px 1731px #f8f8f8, 753px 456px #f8f8f8, 1698px 1791px #f8f8f8, 907px 469px #f8f8f8, 1757px 1486px #f8f8f8, 1997px 477px #f8f8f8, 1990px 1549px #f8f8f8, 1040px 597px #f8f8f8, 503px 963px #f8f8f8, 1857px 222px #f8f8f8, 1758px 1966px #f8f8f8, 611px 1999px #f8f8f8, 897px 1047px #f8f8f8, 1484px 25px #f8f8f8, 167px 310px #f8f8f8, 1119px 1873px #f8f8f8, 1691px 1704px #f8f8f8, 1688px 860px #f8f8f8, 432px 1413px #f8f8f8, 787px 1898px #f8f8f8, 1960px 1929px #f8f8f8, 1471px 1310px #f8f8f8, 708px 1482px #f8f8f8, 194px 1808px #f8f8f8, 1837px 86px #f8f8f8, 895px 1359px #f8f8f8, 1936px 810px #f8f8f8, 1482px 962px #f8f8f8, 951px 30px #f8f8f8, 1181px 887px #f8f8f8, 1320px 344px #f8f8f8, 1232px 1872px #f8f8f8, 866px 1468px #f8f8f8, 246px 1816px #f8f8f8, 386px 448px #f8f8f8, 1746px 1928px #f8f8f8, 1701px 1320px #f8f8f8, 1967px 1767px #f8f8f8, 1706px 1232px #f8f8f8, 1728px 385px #f8f8f8, 383px 1338px #f8f8f8, 329px 283px #f8f8f8, 1412px 341px #f8f8f8, 1069px 1337px #f8f8f8, 509px 1883px #f8f8f8, 403px 1758px #f8f8f8, 1485px 1811px #f8f8f8, 817px 1445px #f8f8f8, 1743px 1958px #f8f8f8, 588px 519px #f8f8f8, 1493px 1221px #f8f8f8, 1850px 1648px #f8f8f8, 1879px 259px #f8f8f8, 246px 1981px #f8f8f8, 256px 1390px #f8f8f8, 635px 939px #f8f8f8, 773px 1479px #f8f8f8, 1556px 1385px #f8f8f8, 214px 144px #f8f8f8, 1343px 375px #f8f8f8, 1238px 560px #f8f8f8, 1521px 1580px #f8f8f8, 1008px 1906px #f8f8f8, 1206px 623px #f8f8f8, 1189px 1418px #f8f8f8, 259px 260px #f8f8f8, 420px 1926px #f8f8f8, 78px 1023px #f8f8f8, 493px 481px #f8f8f8, 1422px 1224px #f8f8f8, 343px 178px #f8f8f8, 677px 513px #f8f8f8, 91px 985px #f8f8f8, 34px 1393px #f8f8f8, 605px 1768px #f8f8f8, 735px 1579px #f8f8f8, 942px 1805px #f8f8f8, 1622px 228px #f8f8f8, 284px 864px #f8f8f8, 985px 417px #f8f8f8, 762px 674px #f8f8f8, 1437px 1630px #f8f8f8, 1571px 1995px #f8f8f8, 1132px 1369px #f8f8f8, 276px 261px #f8f8f8, 376px 1556px #f8f8f8, 229px 1588px #f8f8f8, 331px 1211px #f8f8f8, 1536px 494px #f8f8f8, 1327px 1433px #f8f8f8, 987px 1154px #f8f8f8, 1191px 284px #f8f8f8, 899px 130px #f8f8f8;
    animation: animStar3 75s linear infinite;
  }

  #stars3:after {
    content: " ";
    position: absolute;
    left: 2000px;
    width: 4px;
    height: 4px;
    background: transparent;
    box-shadow: 1188px 989px #f8f8f8, 962px 269px #f8f8f8, 1826px 1894px #f8f8f8, 247px 675px #f8f8f8, 396px 1444px #f8f8f8, 1215px 388px #f8f8f8, 1616px 964px #f8f8f8, 1821px 1731px #f8f8f8, 753px 456px #f8f8f8, 1698px 1791px #f8f8f8, 907px 469px #f8f8f8, 1757px 1486px #f8f8f8, 1997px 477px #f8f8f8, 1990px 1549px #f8f8f8, 1040px 597px #f8f8f8, 503px 963px #f8f8f8, 1857px 222px #f8f8f8, 1758px 1966px #f8f8f8, 611px 1999px #f8f8f8, 897px 1047px #f8f8f8, 1484px 25px #f8f8f8, 167px 310px #f8f8f8, 1119px 1873px #f8f8f8, 1691px 1704px #f8f8f8, 1688px 860px #f8f8f8, 432px 1413px #f8f8f8, 787px 1898px #f8f8f8, 1960px 1929px #f8f8f8, 1471px 1310px #f8f8f8, 708px 1482px #f8f8f8, 194px 1808px #f8f8f8, 1837px 86px #f8f8f8, 895px 1359px #f8f8f8, 1936px 810px #f8f8f8, 1482px 962px #f8f8f8, 951px 30px #f8f8f8, 1181px 887px #f8f8f8, 1320px 344px #f8f8f8, 1232px 1872px #f8f8f8, 866px 1468px #f8f8f8, 246px 1816px #f8f8f8, 386px 448px #f8f8f8, 1746px 1928px #f8f8f8, 1701px 1320px #f8f8f8, 1967px 1767px #f8f8f8, 1706px 1232px #f8f8f8, 1728px 385px #f8f8f8, 383px 1338px #f8f8f8, 329px 283px #f8f8f8, 1412px 341px #f8f8f8, 1069px 1337px #f8f8f8, 509px 1883px #f8f8f8, 403px 1758px #f8f8f8, 1485px 1811px #f8f8f8, 817px 1445px #f8f8f8, 1743px 1958px #f8f8f8, 588px 519px #f8f8f8, 1493px 1221px #f8f8f8, 1850px 1648px #f8f8f8, 1879px 259px #f8f8f8, 246px 1981px #f8f8f8, 256px 1390px #f8f8f8, 635px 939px #f8f8f8, 773px 1479px #f8f8f8, 1556px 1385px #f8f8f8, 214px 144px #f8f8f8, 1343px 375px #f8f8f8, 1238px 560px #f8f8f8, 1521px 1580px #f8f8f8, 1008px 1906px #f8f8f8, 1206px 623px #f8f8f8, 1189px 1418px #f8f8f8, 259px 260px #f8f8f8, 420px 1926px #f8f8f8, 78px 1023px #f8f8f8, 493px 481px #f8f8f8, 1422px 1224px #f8f8f8, 343px 178px #f8f8f8, 677px 513px #f8f8f8, 91px 985px #f8f8f8, 34px 1393px #f8f8f8, 605px 1768px #f8f8f8, 735px 1579px #f8f8f8, 942px 1805px #f8f8f8, 1622px 228px #f8f8f8, 284px 864px #f8f8f8, 985px 417px #f8f8f8, 762px 674px #f8f8f8, 1437px 1630px #f8f8f8, 1571px 1995px #f8f8f8, 1132px 1369px #f8f8f8, 276px 261px #f8f8f8, 376px 1556px #f8f8f8, 229px 1588px #f8f8f8, 331px 1211px #f8f8f8, 1536px 494px #f8f8f8, 1327px 1433px #f8f8f8, 987px 1154px #f8f8f8, 1191px 284px #f8f8f8, 899px 130px #f8f8f8;
  }
  @keyframes animStar {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-2000px);
    }
  }

  @keyframes animStar2 {
    from {
      transform: translateX(0rpx);
    }
    to {
      transform: translateX(-2000rpx);
    }
  }
  @keyframes animStar3 {
    from {
      transform: translateX(-2000rpx);
    }
    to {
      transform: translateX(0rpx);
    }
  }
</style>
