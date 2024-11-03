module.exports = {
	apps: [
		{
			name: "medical_expert",
			port: 3000,
			exec_mode: "cluster",
			instances: "max",
			script: './.output/server/index.mjs',
			args: "start",
			max_memory_restart: "100M",
    	    watch: true,
		}
	]
}
