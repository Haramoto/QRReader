<template>
	<v-app>
		<h2 class="text-center">QRReader v{{version}}</h2>
		<QRReader v-if="started"></QRReader>

		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>お知らせ</v-card-title>

				<v-card-text style="font-size:120%">新しいバージョンがあります。リロードします。</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="reload()">OK</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QRReader from "./components/QRReader.vue";
import axios from "axios";
import compareVersions from "compare-versions";

@Component({ components: { QRReader } })
export default class App extends Vue {
	private version = "0.1.4";
	private started = false;
	private dialog = false;

	async mounted(this: any) {
		try {
			// バージョン確認
			const response = await axios.get("version.json?date=" + new Date());
			const ajax_version = response.data.version;
			if (compareVersions.compare(this.version, ajax_version, "<")) {
				this.dialog = true;
				return;
			}
		} catch (e) {}
		this.started = true;
	}

	reload() {
		window.location.reload(true);
	}
}
</script>
