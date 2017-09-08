<template>
  <div id="app">
    {{#less}}
    <div class="logo"></div>
    {{else}}
    <img src="./assets/logo.png">
    {{less}}
    {{#router}}
    <router-view></router-view>
    {{else}}
    <hello></hello>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import Hello from './components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{/unless}}
export default {
  name: 'app'{{#router}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{else}},
  components: {
    Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{/router}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

{{#less}}
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.bgImg(@imgUrl,@scale:1){
    @url:"@{imgUrl}?scale=@{scale}";
    @imgW:unit(image-width(@imgUrl),px) * @scale;
    @imgH:unit(image-height(@imgUrl),px) * @scale;
    background-image: url(@url);
    background-repeat: no-repeat;
    background-size: 100%;
    width: @imgW;
    height: @imgH;
    display: inline-block;
}
.logo {
  .bgImg('../images/sprites/logo.png');
}
</style>
{{else}}
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
{{/less}}
