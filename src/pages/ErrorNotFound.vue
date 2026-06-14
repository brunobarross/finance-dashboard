<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <q-icon name="error_outline" size="80px" class="text-grey-5" />
      <h2 class="text-h4 text-grey-8">404</h2>
      <p class="text-body1 text-grey-6">{{ $t('errors.notFound') }}</p>
      <q-btn color="primary" :label="$t('errors.goBack')" to="/" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// Error page content
</script>
