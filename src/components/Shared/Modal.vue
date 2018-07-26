<template>
    <div id="modal">
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    data () {
        return {
            title: 'Elements:',
            subtitle: 'Shared Components'
        }
    }
}
</script>
