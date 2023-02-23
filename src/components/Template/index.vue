<template #{{key}}>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Icon',
	props: {
		key: {
			type: String,
			required: false,
			default: ''
		}
	},
	emits: ['success'],
	setup: () => ({})
})
</script>
