<template>
    <svg class="g-icon">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
import './svg.js'
export default {
  props: ['name'],
  name: 'gIcon'
}
</script>

<style lang="scss" scoped>
@import '../../style/icon.scss';
 .g-icon {height: 1em;width: 1em;}
</style>
