<script>
  import {  NotificationDisplay } from '@beyonk/svelte-notifications';
	import { Router } from "@sveltech/routify";
	import { routes } from "@sveltech/routify/tmp/routes";
</script>

<Router {routes} />
<NotificationDisplay />

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>