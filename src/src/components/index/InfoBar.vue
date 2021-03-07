<template>
    <div class="info-bar">
        <div class="infobar-item"><span>@XXX</span></div>
        <div class="infobar-item"><span>毕业设计</span></div>
        <div class="infobar-item music-item">
            <span class="iconfont icon-yinfu"></span>
            <div class="music-name">
                <span data-text="zjt设计">zjt设计</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.info-bar{
    color: #fff;
    font-size: 16px;
    padding-left: 10px;
}
.info-bar .infobar-item{
    padding: 5px 0;
}
.infobar-item .icon-yinfu{
    margin-right: 5px;
}
.music-item{
    display: flex;
    align-items: center;
}
.music-item .music-name{
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
}
.music-item .music-name span{
    display: inline-block;
    animation: scroll 5s linear infinite;
}
.music-item .music-name span::after{
    content: attr(data-text);
    margin-left: 30px;
}
@keyframes scroll{
    from{
        transform: translateX(0);
    }
    to{
        transform: translateX(calc(-50% - 30px));
    }
}
</style>