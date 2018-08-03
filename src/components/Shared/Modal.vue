<template>
    <div id="modal">
        <slot name="modalheader"></slot>
        <div id="modal-msg">
            <h2>{{ title }}</h2>
            <p>{{ subtitle }}</p>
        </div>
        <slot></slot>
        <slot name="modalfooter"></slot>
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
