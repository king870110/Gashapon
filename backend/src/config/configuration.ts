export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		url: process.env.DATABASE_URL,
	},
	redis: {
		url: process.env.REDIS_URL,
	},
	jwt: {
		secret: process.env.JWT_SECRET || "your-secret-key",
		expiresIn: "1d",
	},
})
